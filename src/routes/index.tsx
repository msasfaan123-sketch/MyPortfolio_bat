import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { BootSequence } from "@/components/boot-sequence";
import { CursorSpotlight, GridBackdrop } from "@/components/atmosphere";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/sections/hero";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { Achievements } from "@/components/sections/achievements";
import { AssistantPanel } from "@/components/sections/assistant-panel";
import { Contact } from "@/components/sections/contact";
import { Chatbot } from "@/components/chatbot";
import { BatIcon } from "@/components/bat-icon";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Mohamed Sathak Asfaan — AI Engineer Portfolio" },
      {
        name: "description",
        content:
          "Cinematic Batcomputer-themed portfolio of Mohamed Sathak Asfaan — AI Engineer & Full Stack Developer based in Chennai.",
      },
      { property: "og:title", content: "Mohamed Sathak Asfaan — AI Engineer" },
      {
        property: "og:description",
        content: "AI Engineer & Full Stack Developer. Building intelligent systems.",
      },
    ],
  }),
});

function Index() {
  const [booted, setBooted] = useState(false);
  return (
    <div className="relative min-h-screen">
      <BootSequence onDone={() => setBooted(true)} />
      <GridBackdrop />
      <CursorSpotlight />
      {booted && (
        <>
          <Navbar />
          <main>
            <Hero />
            <Experience />
            <Projects />
            <Skills />
            <Achievements />
            <AssistantPanel />
            <Contact />
          </main>
          <footer className="border-t border-bat/15 px-6 py-8 text-center font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            <BatIcon className="mx-auto mb-2 h-5 w-5 text-bat/60" />
            © 2026 Mohamed Sathak Asfaan · Encrypted by Wayne Enterprises
          </footer>
          <Chatbot />
        </>
      )}
    </div>
  );
}
