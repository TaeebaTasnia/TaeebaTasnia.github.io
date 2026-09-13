"use client";

import CustomCursor from "@/components/CustomCursor";
import Nav from "@/components/Nav";
import SmoothScroll from "@/components/SmoothScroll";
import IntroExperience from "@/components/intro/IntroExperience";
import HomeSection from "@/components/sections/HomeSection";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Research from "@/components/sections/Research";
import Skills from "@/components/sections/Skills";
import EducationCerts from "@/components/sections/EducationCerts";
import TransitionContact from "@/components/sections/TransitionContact";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <SmoothScroll>
        <Nav />
        <main>
          <IntroExperience />
          <HomeSection />
          <Experience />
          <Projects />
          <Research />
          <Skills />
          <EducationCerts />
          <TransitionContact />
        </main>
      </SmoothScroll>
    </>
  );
}
