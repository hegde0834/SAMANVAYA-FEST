import React from "react";
import EventShowcase from "@/components/home/EventShowcase";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fest Events | SAMANVAYA 2.0 — NIE Mysuru",
  description: "Explore all four flagship competitions of SAMANVAYA 2.0: Reel Campus, Prompting the Image, Treasure Hunt, and Kairos.",
};

export default function EventsPage() {
  return (
    <div className="pt-20">
      <EventShowcase />
    </div>
  );
}
