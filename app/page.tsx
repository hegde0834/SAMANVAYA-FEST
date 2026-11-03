import React from "react";
import Hero from "@/components/home/Hero";
import AboutSection from "@/components/home/AboutSection";
import EventShowcase from "@/components/home/EventShowcase";
import GeneralRules from "@/components/home/GeneralRules";

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* About Samanvaya Section */}
      <AboutSection />

      {/* Flagship Event Showcase */}
      <EventShowcase />

      {/* Code of Conduct & Guidelines */}
      <GeneralRules />
    </>
  );
}
