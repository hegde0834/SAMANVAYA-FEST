"use client";

import React from "react";
import { User, Phone, Mail, Crown, Shield, Sword, Compass } from "lucide-react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { RegistrationFormData } from "@/lib/validations";

interface TeamMemberFieldsProps {
  index: number;
  register: UseFormRegister<RegistrationFormData>;
  errors: FieldErrors<RegistrationFormData>;
  roleLabel?: string;
}

export default function TeamMemberFields({
  index,
  register,
  errors,
  roleLabel,
}: TeamMemberFieldsProps) {
  const memberErrors = errors.members?.[index];

  const getRoleBadge = (idx: number) => {
    switch (idx) {
      case 0:
        return {
          icon: Crown,
          title: "Party Leader // 隊長",
          badgeColor: "text-amber-400 bg-amber-400/10 border-amber-400/40",
        };
      case 1:
        return {
          icon: Sword,
          title: "Party Member 2 // 副隊長",
          badgeColor: "text-cyan-400 bg-cyan-400/10 border-cyan-400/40",
        };
      case 2:
        return {
          icon: Shield,
          title: "Party Member 3 // 術士",
          badgeColor: "text-purple-400 bg-purple-400/10 border-purple-400/40",
        };
      case 3:
        return {
          icon: Compass,
          title: "Party Member 4 // 先鋒",
          badgeColor: "text-pink-400 bg-pink-400/10 border-pink-400/40",
        };
      default:
        return {
          icon: User,
          title: `Member ${idx + 1}`,
          badgeColor: "text-gray-400 bg-gray-400/10 border-gray-400/40",
        };
    }
  };

  const role = getRoleBadge(index);
  const RoleIcon = role.icon;

  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-[#050918]/95 border border-[#182752] relative overflow-hidden transition-all duration-300 hover:border-[#00f3ff]/50 shadow-glass">
      {/* Anime Member Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#182752]">
        <div className="flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00f3ff]/20 to-[#ff007f]/20 border border-[#00f3ff]/40 flex items-center justify-center text-xs font-mono font-black text-[#00f3ff]">
            {index + 1}P
          </span>
          <div>
            <h4 className="font-anime font-black text-sm text-white tracking-wide flex items-center gap-2">
              <span>{role.title}</span>
              {index === 0 && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 font-mono font-bold">
                  CHIEF
                </span>
              )}
            </h4>
          </div>
        </div>
        <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest px-2 py-0.5 rounded bg-white/5 border border-white/10">
          REQUIRED
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Full Name */}
        <div>
          <label
            htmlFor={`members.${index}.fullName`}
            className="block text-xs font-semibold text-gray-300 mb-1.5"
          >
            Full Name <span className="text-[#ff007f]">*</span>
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id={`members.${index}.fullName`}
              type="text"
              placeholder="e.g. Rahul Sharma"
              {...register(`members.${index}.fullName` as const)}
              className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-[#091029] border border-[#182752] text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#00f3ff] focus:ring-1 focus:ring-[#00f3ff] transition-colors"
            />
          </div>
          {memberErrors?.fullName && (
            <p className="text-[11px] text-[#ff007f] mt-1 font-medium">
              {memberErrors.fullName.message}
            </p>
          )}
        </div>

        {/* Mobile Number */}
        <div>
          <label
            htmlFor={`members.${index}.phoneNumber`}
            className="block text-xs font-semibold text-gray-300 mb-1.5"
          >
            Mobile Number <span className="text-[#ff007f]">*</span>
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id={`members.${index}.phoneNumber`}
              type="tel"
              placeholder="10-digit mobile number"
              {...register(`members.${index}.phoneNumber` as const)}
              className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-[#091029] border border-[#182752] text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#00f3ff] focus:ring-1 focus:ring-[#00f3ff] transition-colors"
            />
          </div>
          {memberErrors?.phoneNumber && (
            <p className="text-[11px] text-[#ff007f] mt-1 font-medium">
              {memberErrors.phoneNumber.message}
            </p>
          )}
        </div>

        {/* College Email */}
        <div>
          <label
            htmlFor={`members.${index}.collegeEmail`}
            className="block text-xs font-semibold text-gray-300 mb-1.5"
          >
            College Email ID <span className="text-[#ff007f]">*</span>
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id={`members.${index}.collegeEmail`}
              type="email"
              placeholder="student@college.edu"
              {...register(`members.${index}.collegeEmail` as const)}
              className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-[#091029] border border-[#182752] text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#00f3ff] focus:ring-1 focus:ring-[#00f3ff] transition-colors"
            />
          </div>
          {memberErrors?.collegeEmail && (
            <p className="text-[11px] text-[#ff007f] mt-1 font-medium">
              {memberErrors.collegeEmail.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
