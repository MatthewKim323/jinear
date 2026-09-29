import type { ComponentType } from "react";
import { Nav } from "@/components/sections/nav";
import { Hero } from "@/components/sections/hero";
import { Logos } from "@/components/sections/logos";
import { Manifesto } from "@/components/sections/manifesto";
import { Pillars } from "@/components/sections/pillars";
import { Intake } from "@/components/sections/intake";
import { Planning } from "@/components/sections/planning";
import { Automations } from "@/components/sections/automations";
import { Ship } from "@/components/sections/ship";
import { Changelog } from "@/components/sections/changelog";
import { Customers } from "@/components/sections/customers";
import { Cta } from "@/components/sections/cta";
import { Footer } from "@/components/sections/footer";

// Order matters: this is the page, top to bottom (nav and footer are the shell).
const SECTIONS: Record<string, ComponentType> = {
  hero: Hero,
  logos: Logos,
  manifesto: Manifesto,
  pillars: Pillars,
  intake: Intake,
  planning: Planning,
  automations: Automations,
  ship: Ship,
  changelog: Changelog,
  customers: Customers,
  cta: Cta,
};

export default async function Home({ searchParams }: PageProps<"/">) {
  const { only } = await searchParams;
  if (typeof only === "string") {
    if (only === "nav") return <Nav />;
    if (only === "footer") return <Footer />;
    const One = SECTIONS[only];
    return One ? <One /> : null;
  }
  return (
    <>
      <Nav />
      <main className="page-main">
        {Object.entries(SECTIONS).map(([key, S]) => (
          <S key={key} />
        ))}
      </main>
      <Footer />
    </>
  );
}
