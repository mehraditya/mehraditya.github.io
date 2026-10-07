import fs from "node:fs";
import path from "node:path";

export type ImageSize = {
  width: number;
  height: number;
};

const cache = new Map<string, ImageSize | null>();

function fromPng(buf: Buffer): ImageSize | null {
  if (buf.length < 24) return null;
  const signature = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
  for (let i = 0; i < signature.length; i++) {
    if (buf[i] !== signature[i]) return null;
  }
  if (buf.toString("ascii", 12, 16) !== "IHDR") return null;
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

function fromJpeg(buf: Buffer): ImageSize | null {
  if (buf.length < 4 || buf[0] !== 0xff || buf[1] !== 0xd8) return null;

  let i = 2;
  while (i + 9 < buf.length) {
    if (buf[i] !== 0xff) {
      i += 1;
      continue;
    }
    const marker = buf[i + 1];
    if (marker === 0xff) {
      i += 1;
      continue;
    }
    if (marker === 0x01 || (marker >= 0xd0 && marker <= 0xd9)) {
      i += 2;
      continue;
    }
    const length = buf.readUInt16BE(i + 2);
    if (length < 2) return null;

    const isFrameHeader =
      marker >= 0xc0 &&
      marker <= 0xcf &&
      marker !== 0xc4 &&
      marker !== 0xc8 &&
      marker !== 0xcc;

    if (isFrameHeader) {
      return { height: buf.readUInt16BE(i + 5), width: buf.readUInt16BE(i + 7) };
    }

    i += 2 + length;
  }
  return null;
}

function fromGif(buf: Buffer): ImageSize | null {
  if (buf.length < 10) return null;
  const signature = buf.toString("ascii", 0, 6);
  if (signature !== "GIF87a" && signature !== "GIF89a") return null;
  return { width: buf.readUInt16LE(6), height: buf.readUInt16LE(8) };
}

function fromWebp(buf: Buffer): ImageSize | null {
  if (buf.length < 30) return null;
  if (buf.toString("ascii", 0, 4) !== "RIFF") return null;
  if (buf.toString("ascii", 8, 12) !== "WEBP") return null;

  const chunk = buf.toString("ascii", 12, 16);

  if (chunk === "VP8 ") {
    if (buf[23] !== 0x9d || buf[24] !== 0x01 || buf[25] !== 0x2a) return null;
    return {
      width: buf.readUInt16LE(26) & 0x3fff,
      height: buf.readUInt16LE(28) & 0x3fff,
    };
  }

  if (chunk === "VP8L") {
    if (buf[20] !== 0x2f) return null;
    const width =
      1 + ((buf[21] | (buf[22] << 8)) & 0x3fff);
    const height =
      1 + (((buf[22] >> 6) | (buf[23] << 2) | (buf[24] << 10)) & 0x3fff);
    return { width, height };
  }

  if (chunk === "VP8X") {
    return {
      width:
        1 + (buf[24] | (buf[25] << 8) | (buf[26] << 16)),
      height:
        1 + (buf[27] | (buf[28] << 8) | (buf[29] << 16)),
    };
  }

  return null;
}

function fromSvg(buf: Buffer): ImageSize | null {
  const head = buf.toString("utf8", 0, Math.min(buf.length, 4096));
  if (!/<svg[\s>]/i.test(head)) return null;

  const width = /\bwidth\s*=\s*["']([\d.]+)/i.exec(head);
  const height = /\bheight\s*=\s*["']([\d.]+)/i.exec(head);
  if (width && height) {
    const w = Number.parseFloat(width[1]);
    const h = Number.parseFloat(height[1]);
    if (w > 0 && h > 0) return { width: w, height: h };
  }

  const viewBox =
    /\bviewBox\s*=\s*["']\s*[-\d.eE]+[,\s]+[-\d.eE]+[,\s]+([\d.eE]+)[,\s]+([\d.eE]+)/i.exec(
      head
    );
  if (viewBox) {
    const w = Number.parseFloat(viewBox[1]);
    const h = Number.parseFloat(viewBox[2]);
    if (w > 0 && h > 0) return { width: w, height: h };
  }

  return null;
}

function measure(buf: Buffer): ImageSize | null {
  return (
    fromPng(buf) ??
    fromJpeg(buf) ??
    fromGif(buf) ??
    fromWebp(buf) ??
    fromSvg(buf)
  );
}

export function readImageSize(src: string): ImageSize | null {
  if (typeof src !== "string" || !src.startsWith("/")) return null;

  const clean = src.split(/[?#]/)[0];
  if (!clean || clean.includes("..")) return null;
  if (cache.has(clean)) return cache.get(clean) ?? null;

  let size: ImageSize | null = null;
  try {
    size = measure(fs.readFileSync(path.join(process.cwd(), "public", clean)));
  } catch {
    size = null;
  }

  if (!size) {
    console.warn(`[content] could not read image dimensions for ${clean}`);
  }

  cache.set(clean, size);
  return size;
}
