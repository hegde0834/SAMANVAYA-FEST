import React, { Suspense } from "react";
import { Metadata } from "next";
import RegistrationForm from "@/components/registration/RegistrationForm";
import { Sparkles, Loader2, Sword } from "lucide-react";

export const metadata: Metadata = {
  title: "Guild Party Registration | SAMANVAYA 2.0 — NIE Mysuru",
  description:
    "Register your team for SAMANVAYA 2.0 fest events. Enter your team name, shared department, and member details.",
};

export default function RegisterPage() {
  return (
    <div className="pt-28 pb-24 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#091029] border border-[#00f3ff]/40 text-xs font-mono font-bold text-[#00f3ff] mb-4 shadow-neon-cyan">
            <Sword className="w-3.5 h-3.5 text-[#00f3ff]" />
            <span>GUILD PARTY FORMATION // ギルド結成</span>
          </div>
          <h1 className="font-anime font-black text-3xl sm:text-5xl text-white tracking-tight mb-3">
            Register Your Party
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-xl mx-auto leading-relaxed font-normal">
            Select your event arena, designate your party leader, provide your shared department, and enlist your party members to awaken victory in SAMANVAYA 2.0.
          </p>
        </div>

        {/* Suspense wrapper for query parameters */}
        <Suspense
          fallback={
            <div className="anime-manga-card p-12 rounded-2xl flex flex-col items-center justify-center gap-4 text-center">
              <Loader2 className="w-8 h-8 animate-spin text-[#00f3ff]" />
              <p className="text-sm text-cyan-300 font-mono">Initializing Guild Registration Protocol...</p>
            </div>
          }
        >
          <RegistrationForm />
        </Suspense>
      </div>
    </div>
  );
}
