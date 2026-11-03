"use client";

import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import {
  Users,
  Building2,
  Sparkles,
  AlertCircle,
  Loader2,
  Info,
  CheckCircle,
  Sword,
  Flame,
  Zap,
} from "lucide-react";
import { FEST_EVENTS, getEventBySlug } from "@/lib/events";
import { registrationSchema, RegistrationFormData } from "@/lib/validations";
import TeamMemberFields from "./TeamMemberFields";
import { animeAudio } from "@/lib/audio";

export default function RegistrationForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialEventParam = searchParams.get("event") || "reel-campus";

  const validInitialEvent = FEST_EVENTS.some((e) => e.slug === initialEventParam)
    ? (initialEventParam as any)
    : "reel-campus";

  const [selectedEventSlug, setSelectedEventSlug] = useState<string>(validInitialEvent);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pendingEventChange, setPendingEventChange] = useState<string | null>(null);

  const selectedEvent = getEventBySlug(selectedEventSlug) || FEST_EVENTS[0];
  const requiredMemberCount = selectedEventSlug === "treasure-hunt" ? 4 : 2;

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      teamName: "",
      eventSlug: validInitialEvent,
      departmentName: "",
      members: Array.from({ length: requiredMemberCount }, () => ({
        fullName: "",
        phoneNumber: "",
        collegeEmail: "",
      })),
    },
  });

  const { fields, replace } = useFieldArray({
    control,
    name: "members",
  });

  const currentMembers = watch("members");

  const adjustMembersForEvent = (eventSlug: string) => {
    const targetCount = eventSlug === "treasure-hunt" ? 4 : 2;
    const existing = currentMembers || [];

    if (existing.length < targetCount) {
      const updated = [...existing];
      while (updated.length < targetCount) {
        updated.push({ fullName: "", phoneNumber: "", collegeEmail: "" });
      }
      replace(updated);
    } else if (existing.length > targetCount) {
      replace(existing.slice(0, targetCount));
    }
  };

  const handleEventChange = (newSlug: string) => {
    animeAudio.playClickSound();

    if (selectedEventSlug === "treasure-hunt" && newSlug !== "treasure-hunt") {
      const hasMember3Or4Data =
        (currentMembers[2]?.fullName && currentMembers[2]?.fullName.trim() !== "") ||
        (currentMembers[3]?.fullName && currentMembers[3]?.fullName.trim() !== "");

      if (hasMember3Or4Data) {
        setPendingEventChange(newSlug);
        return;
      }
    }

    applyEventSelection(newSlug);
  };

  const applyEventSelection = (newSlug: string) => {
    setSelectedEventSlug(newSlug);
    setValue("eventSlug", newSlug as any, { shouldValidate: true });
    adjustMembersForEvent(newSlug);
    setPendingEventChange(null);
  };

  const onSubmit = async (data: RegistrationFormData) => {
    animeAudio.playPowerUpSound();
    setIsSubmitting(true);
    const toastId = toast.loading("Registering your guild party with fest registry...");

    try {
      const response = await fetch("/api/registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        toast.error(result.error || "Registration failed. Please check your details.", {
          id: toastId,
        });
        setIsSubmitting(false);
        return;
      }

      animeAudio.playVictoryFanfare();
      toast.success("Party registered successfully! Summoning Hunter Pass...", { id: toastId });
      router.push(`/confirmation/${result.registrationId}`);
    } catch (error) {
      console.error("Submission network error:", error);
      toast.error("Network error. Please check your connection and try again.", {
        id: toastId,
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative">
      {/* Event Warning Modal when switching sizes */}
      {pendingEventChange && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="anime-manga-card p-6 rounded-2xl max-w-md w-full border border-[#ff007f] shadow-neon-magenta">
            <div className="flex items-center gap-3 text-[#ff007f] mb-3">
              <AlertCircle className="w-6 h-6 animate-pulse" />
              <h3 className="font-anime font-black text-lg text-white">
                Change Party Size? // 人数変更
              </h3>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed mb-6 font-normal">
              Switching from Treasure Hunt (4 members) to this 2-member event will remove the information entered for Member 3 and Member 4. Do you wish to proceed?
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setPendingEventChange(null)}
                className="px-4 py-2 rounded-xl bg-[#091029] border border-[#182752] text-xs font-semibold text-gray-300 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => applyEventSelection(pendingEventChange)}
                className="cyber-button-magenta px-5 py-2 rounded-xl text-xs font-bold"
              >
                Confirm Change
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Registration Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* SECTION 1: EVENT SELECTION CARDS */}
        <div className="cyber-card p-6 sm:p-8 rounded-2xl border border-[#182752]">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#182752]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#00f3ff]/10 border border-[#00f3ff]/40 flex items-center justify-center text-[#00f3ff]">
                <Sword className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-anime font-black text-lg text-white flex items-center gap-2">
                  <span>Choose Quest Arena</span>
                  <span className="font-kanji text-xs text-cyan-400 font-bold">[ 競技選択 ]</span>
                </h3>
                <p className="text-xs text-gray-400">
                  Select which championship event your guild is entering
                </p>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-cyan-400 px-3 py-1 rounded-full bg-[#00f3ff]/10 border border-[#00f3ff]/30">
              {requiredMemberCount}P SQUAD
            </span>
          </div>

          {/* Visual Event Selector Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {FEST_EVENTS.map((ev) => {
              const isSelected = selectedEventSlug === ev.slug;
              return (
                <div
                  key={ev.slug}
                  onClick={() => handleEventChange(ev.slug)}
                  className={`cursor-pointer p-4 rounded-xl border transition-all duration-200 relative overflow-hidden ${
                    isSelected
                      ? "bg-gradient-to-b from-[#00f3ff]/15 to-[#ff007f]/10 border-[#00f3ff] shadow-neon-cyan"
                      : "bg-[#050918]/90 border-[#182752] hover:border-gray-600 hover:bg-[#091029]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-cyan-300">
                      {ev.teamSize} Members
                    </span>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-[#00f3ff] shadow-[0_0_8px_#00f3ff] animate-ping" />
                    )}
                  </div>
                  <h4 className="font-anime font-bold text-sm text-white mb-1">
                    {ev.name}
                  </h4>
                  <p className="text-[11px] text-gray-400 line-clamp-1">
                    {ev.tagline}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Hidden select for standard form compliance */}
          <select
            id="eventSlug"
            value={selectedEventSlug}
            onChange={(e) => handleEventChange(e.target.value)}
            className="sr-only"
          >
            {FEST_EVENTS.map((ev) => (
              <option key={ev.slug} value={ev.slug}>
                {ev.name} ({ev.teamSize} Members)
              </option>
            ))}
          </select>

          {/* SECTION 1B: TEAM & SHARED DEPARTMENT INFO */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Team Name */}
            <div>
              <label
                htmlFor="teamName"
                className="block text-xs font-semibold text-gray-200 uppercase tracking-wider mb-2"
              >
                Team / Guild Name <span className="text-[#ff007f]">*</span>
              </label>
              <input
                id="teamName"
                type="text"
                placeholder="e.g. Cyber Shinobi / Phantom Titans"
                {...register("teamName")}
                className="w-full px-4 py-3 rounded-xl bg-[#050918] border border-[#182752] text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#00f3ff] focus:ring-1 focus:ring-[#00f3ff] transition-colors"
              />
              {errors.teamName && (
                <p className="text-[11px] text-[#ff007f] mt-1 font-medium">
                  {errors.teamName.message}
                </p>
              )}
            </div>

            {/* STRICT REQUIREMENT A: ONE SHARED DEPARTMENT FIELD FOR THE WHOLE TEAM */}
            <div>
              <label
                htmlFor="departmentName"
                className="block text-xs font-semibold text-gray-200 uppercase tracking-wider mb-2"
              >
                Department Name (Shared by All Members) <span className="text-[#ff007f]">*</span>
              </label>
              <div className="relative">
                <Building2 className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  id="departmentName"
                  type="text"
                  placeholder="e.g. Master of Computer Applications (MCA)"
                  {...register("departmentName")}
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#050918] border border-[#182752] text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#00f3ff] focus:ring-1 focus:ring-[#00f3ff] transition-colors"
                />
              </div>
              <p className="text-[11px] text-cyan-300/80 mt-1.5 flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-[#00f3ff]" />
                <span>
                  Single shared department value applied to all members of your party.
                </span>
              </p>
              {errors.departmentName && (
                <p className="text-[11px] text-[#ff007f] mt-1 font-medium">
                  {errors.departmentName.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* SECTION 2: TEAM MEMBERS (Dynamic based on event) */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h3 className="font-anime font-black text-lg text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#00f3ff]" />
              <span>Party Members Roster ({fields.length} Required)</span>
            </h3>
            {selectedEventSlug === "treasure-hunt" && (
              <span className="text-xs px-3 py-1 rounded-full bg-[#9d4edd]/20 border border-[#9d4edd]/50 text-[#c084fc] font-semibold flex items-center gap-1.5">
                <Zap className="w-3 h-3 text-[#c084fc]" />
                <span>Format: Exactly 2 Girls + 2 Boys</span>
              </span>
            )}
          </div>

          {fields.map((field, index) => (
            <TeamMemberFields
              key={field.id}
              index={index}
              register={register}
              errors={errors}
              roleLabel={index === 0 ? "Party Chief" : `Member ${index + 1}`}
            />
          ))}

          {errors.members?.root && (
            <p className="text-xs text-[#ff007f] mt-2 font-medium">
              {errors.members.root.message}
            </p>
          )}
        </div>

        {/* SECTION 3: SUBMIT BUTTON */}
        <div className="pt-4">
          <button
            type="submit"
            id="register-submit-button"
            disabled={isSubmitting}
            className="w-full cyber-button-cyan py-4 px-8 rounded-xl font-anime font-black text-sm tracking-widest uppercase flex items-center justify-center gap-3 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-neon-cyan"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin text-[#030612]" />
                <span>TRANSMITTING PARTY REGISTRY...</span>
              </>
            ) : (
              <>
                <Flame className="w-5 h-5 text-[#030612]" />
                <span>CONFIRM GUILD PARTY REGISTRATION // 登録完了</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
