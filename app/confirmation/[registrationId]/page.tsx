import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import RegistrationSuccess from "@/components/registration/RegistrationSuccess";

interface ConfirmationPageProps {
  params: {
    registrationId: string;
  };
}

export async function generateMetadata({
  params,
}: ConfirmationPageProps): Promise<Metadata> {
  return {
    title: `Registration Pass (${params.registrationId}) | SAMANVAYA 2.0`,
    description: "Official team registration confirmation pass for SAMANVAYA 2.0 Fest.",
  };
}

export default async function ConfirmationPage({ params }: ConfirmationPageProps) {
  const { registrationId } = params;

  // Query database (source of truth)
  const reg = await prisma.registration.findUnique({
    where: { registrationId },
    select: {
      registrationId: true,
      teamName: true,
      eventName: true,
      eventSlug: true,
      departmentName: true, // Shared department once
      status: true,
      createdAt: true,
      // PRIVACY RESTRICTION: Only select fullName & memberIndex for public pass
      members: {
        select: {
          fullName: true,
          memberIndex: true,
        },
        orderBy: { memberIndex: "asc" },
      },
    },
  });

  if (!reg) {
    notFound();
  }

  // Convert dates to serializable string
  const serializedRegistration = {
    ...reg,
    createdAt: reg.createdAt.toISOString(),
  };

  return <RegistrationSuccess registration={serializedRegistration} />;
}
