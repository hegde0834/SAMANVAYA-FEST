import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { FEST_EVENTS, getEventBySlug } from "@/lib/events";
import EventDetails from "@/components/events/EventDetails";

interface EventPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return FEST_EVENTS.map((event) => ({
    slug: event.slug,
  }));
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const event = getEventBySlug(params.slug);
  if (!event) {
    return {
      title: "Event Not Found | SAMANVAYA 2.0",
    };
  }

  return {
    title: `${event.name} | SAMANVAYA 2.0 — NIE Mysuru`,
    description: `${event.tagline}. ${event.description}`,
    openGraph: {
      title: `${event.name} — SAMANVAYA 2.0`,
      description: event.description,
      images: [
        {
          url: event.posterImage,
          width: 800,
          height: 1200,
          alt: `${event.name} Poster`,
        },
      ],
    },
  };
}

export default function EventPage({ params }: EventPageProps) {
  const event = getEventBySlug(params.slug);

  if (!event) {
    notFound();
  }

  return <EventDetails event={event} />;
}
