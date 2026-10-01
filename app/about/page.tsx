import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import Crumb from "@/components/editorial/Crumb";
import SectionTitle from "@/components/editorial/SectionTitle";

export const metadata: Metadata = {
  title: "About",
  description: "About Aditya Mehra and this notebook.",
};

export default function AboutPage() {
  return (
    <Container className="page-top">
      <Crumb href="/" label="Home" />
      <SectionTitle title="About" />
      <div className="article">
        <div className="prose">
          <p>
            I read, build, and write about intelligent systems. This site is
            where that work is published: research notes from papers and
            technical reading, and writings that try to connect them.
          </p>
          <p>It is a notebook. It grows as the reading and thinking continue.</p>
        </div>
      </div>
    </Container>
  );
}
