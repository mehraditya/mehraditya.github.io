import Link from "next/link";
import Container from "@/components/layout/Container";
import Introduction from "@/components/home/Introduction";
import PortalGrid from "@/components/home/PortalGrid";

export default function Home() {
  return (
    <Container className="home">
      <Introduction />
      <PortalGrid />
      <p className="home-about">
        <Link href="/about">About</Link>
      </p>
    </Container>
  );
}
