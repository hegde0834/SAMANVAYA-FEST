"use client";

import React, { useState, useEffect } from "react";
import {
  Shield,
  Search,
  Download,
  Filter,
  RefreshCw,
  LogOut,
  Users,
  Building2,
  Calendar,
  Lock,
  CheckCircle,
  Clock,
  Settings,
  ChevronLeft,
  ChevronRight,
  Eye,
  X,
  FileSpreadsheet,
  Sword,
  Flame,
} from "lucide-react";
import { toast } from "sonner";
import { FEST_EVENTS } from "@/lib/events";
import { animeAudio } from "@/lib/audio";

interface RegistrationRecord {
  id: string;
  registrationId: string;
  teamName: string;
  eventSlug: string;
  eventName: string;
  departmentName: string;
  status: string;
  createdAt: string;
  members: {
    id: string;
    fullName: string;
    phoneNumber: string;
    collegeEmail: string;
    memberIndex: number;
  }[];
}

interface EventSettingRecord {
  id: string;
  eventSlug: string;
  eventName: string;
  isOpen: boolean;
  maxTeams: number;
  dateText: string;
  venueText: string;
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState<boolean>(true);
  const [adminToken, setAdminToken] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Dashboard Data States
  const [registrations, setRegistrations] = useState<RegistrationRecord[]>([]);
  const [stats, setStats] = useState<{ total: number; byEvent: Record<string, number> }>({
    total: 0,
    byEvent: {},
  });
  const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0, totalPages: 1 });
  const [loading, setLoading] = useState(false);

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEventFilter, setSelectedEventFilter] = useState("all");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("all");
  const [activeTab, setActiveTab] = useState<"registrations" | "settings">("registrations");

  // Settings
  const [eventSettings, setEventSettings] = useState<EventSettingRecord[]>([]);

  // Selected Team Modal
  const [activeTeamDetail, setActiveTeamDetail] = useState<RegistrationRecord | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const getActiveToken = () => {
    if (adminToken) return adminToken;
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("samanvaya_admin_token") || "";
    }
    return "";
  };

  const checkAuth = async () => {
    try {
      const savedToken = typeof window !== "undefined" ? sessionStorage.getItem("samanvaya_admin_token") : null;
      if (!savedToken) {
        setIsAuthenticated(false);
        setIsCheckingAuth(false);
        return;
      }

      const res = await fetch("/api/admin/check", {
        headers: { Authorization: `Bearer ${savedToken}` },
      });
      const data = await res.json();
      if (data.authenticated) {
        setAdminToken(savedToken);
        setIsAuthenticated(true);
        fetchRegistrations(1, savedToken);
        fetchSettings(savedToken);
      } else {
        sessionStorage.removeItem("samanvaya_admin_token");
        setIsAuthenticated(false);
      }
    } catch {
      setIsAuthenticated(false);
    } finally {
      setIsCheckingAuth(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    animeAudio.playPowerUpSound();
    setIsLoggingIn(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: passwordInput }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        animeAudio.playVictoryFanfare();
        const token = data.token || passwordInput;
        if (typeof window !== "undefined") {
          sessionStorage.setItem("samanvaya_admin_token", token);
        }
        setAdminToken(token);
        setIsAuthenticated(true);
        toast.success("Tactical Command Authorized! Welcome, Commander.");
        fetchRegistrations(1, token);
        fetchSettings(token);
      } else {
        toast.error(data.error || "Invalid organizer access key");
      }
    } catch {
      toast.error("Login request failed");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    animeAudio.playClickSound();
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("samanvaya_admin_token");
    }
    setAdminToken("");
    setIsAuthenticated(false);
    setPasswordInput("");
    await fetch("/api/admin/logout", { method: "POST" });
    toast.success("Tactical console locked.");
  };

  const fetchRegistrations = async (page = 1, tokenOverride?: string) => {
    setLoading(true);
    try {
      const query = new URLSearchParams({
        page: page.toString(),
        limit: "20",
        search: searchTerm,
        event: selectedEventFilter,
        status: selectedStatusFilter,
      });

      const token = tokenOverride || getActiveToken();
      const res = await fetch(`/api/admin/registrations?${query.toString()}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (res.ok) {
        const data = await res.json();
        setRegistrations(data.registrations || []);
        setPagination(data.pagination || { page: 1, limit: 20, total: 0, totalPages: 1 });
        setStats(data.stats || { total: 0, byEvent: {} });
      } else if (res.status === 401) {
        if (typeof window !== "undefined") {
          sessionStorage.removeItem("samanvaya_admin_token");
        }
        setAdminToken("");
        setIsAuthenticated(false);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load registrations telemetry");
    } finally {
      setLoading(false);
    }
  };

  const fetchSettings = async (tokenOverride?: string) => {
    try {
      const token = tokenOverride || getActiveToken();
      const res = await fetch("/api/admin/settings", {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (res.ok) {
        const data = await res.json();
        setEventSettings(data.settings || []);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleStatusUpdate = async (registrationId: string, newStatus: string) => {
    animeAudio.playClickSound();
    try {
      const token = getActiveToken();
      const res = await fetch("/api/admin/registrations", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ registrationId, status: newStatus }),
      });

      if (res.ok) {
        toast.success(`Updated status to ${newStatus}`);
        setRegistrations((prev) =>
          prev.map((r) => (r.registrationId === registrationId ? { ...r, status: newStatus } : r))
        );
        if (activeTeamDetail?.registrationId === registrationId) {
          setActiveTeamDetail((prev) => (prev ? { ...prev, status: newStatus } : null));
        }
      } else {
        toast.error("Failed to update status");
      }
    } catch {
      toast.error("Network error");
    }
  };

  const handleExportExcel = async () => {
    animeAudio.playClickSound();
    toast.info("Generating official Excel workbook from database source of truth...");
    try {
      const token = getActiveToken();
      const res = await fetch("/api/admin/registrations/export", {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (!res.ok) {
        toast.error("Unauthorized or failed to export");
        return;
      }
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `SAMANVAYA_2_0_Registrations_${new Date().toISOString().slice(0, 10)}.xlsx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success("Excel workbook downloaded successfully!");
    } catch {
      toast.error("Export download failed");
    }
  };

  const handleToggleEvent = async (eventSlug: string, currentOpen: boolean) => {
    animeAudio.playClickSound();
    try {
      const token = getActiveToken();
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ eventSlug, isOpen: !currentOpen }),
      });

      if (res.ok) {
        toast.success(`Registration status updated`);
        fetchSettings();
      }
    } catch {
      toast.error("Update failed");
    }
  };

  // 1. While verifying session, show clean security gateway spinner
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 pt-24 pb-16">
        <div className="anime-manga-card p-8 rounded-2xl max-w-md w-full border border-[#00f3ff]/40 text-center shadow-glass-elevated">
          <div className="w-12 h-12 border-2 border-[#00f3ff] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="font-mono text-xs text-[#00f3ff] tracking-widest uppercase">
            INITIALIZING SECURITY GATEWAY...
          </p>
        </div>
      </div>
    );
  }

  // 2. If NOT authenticated, ALWAYS show secure login prompt (STRICT REQUIREMENT: NO PHONE NUMBERS IN LOGIN SCREEN)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 pt-24 pb-16">
        <div className="anime-manga-card p-8 rounded-2xl max-w-md w-full border border-[#00f3ff]/40 shadow-glass-elevated">
          <div className="text-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#00f3ff] via-[#9d4edd] to-[#ff007f] p-0.5 mx-auto mb-4 flex items-center justify-center shadow-neon-cyan animate-pulse">
              <div className="w-full h-full bg-[#030612] rounded-[14px] flex items-center justify-center">
                <Shield className="w-7 h-7 text-[#00f3ff]" />
              </div>
            </div>
            <div className="font-kanji text-xs text-[#ff85a2] font-black uppercase tracking-[0.25em] mb-1">
              運営統括本部 • AUTHORIZED PERSONNEL
            </div>
            <h1 className="font-anime font-black text-2xl text-white">
              Tactical Command Portal
            </h1>
            <p className="text-xs text-gray-400 mt-1 font-mono">
              SAMANVAYA 2.0 • The National Institute of Engineering, Mysuru
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor="admin-password"
                className="block text-xs font-mono font-semibold text-gray-300 uppercase tracking-wider mb-2"
              >
                Access Secret Key // 暗証コード
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="admin-password"
                  type="password"
                  placeholder="Enter secret authorization key"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#050918] border border-[#182752] text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#00f3ff] focus:ring-1 focus:ring-[#00f3ff] font-mono"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="cyber-button-cyan w-full py-3.5 rounded-xl text-xs font-anime font-black tracking-wider uppercase flex items-center justify-center gap-2"
            >
              <Shield className="w-4 h-4" />
              <span>{isLoggingIn ? "VERIFYING CIPHER..." : "ACCESS COMMAND DECK // 認証"}</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-[#182752] mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00f3ff]/15 border border-[#00f3ff]/40 text-xs font-mono font-bold text-[#00f3ff] mb-2 shadow-neon-cyan">
            <Shield className="w-3.5 h-3.5" />
            <span>TACTICAL COMMAND DECK // 運営統括本部</span>
          </div>
          <h1 className="font-anime font-black text-2xl sm:text-3xl text-white">
            Guild Registry & Arena Controls
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 font-normal">
            Real-time database records and official Excel export engine
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportExcel}
            className="cyber-button-cyan px-4 py-2.5 rounded-xl text-xs font-mono font-bold flex items-center gap-2 shadow-neon-cyan"
            title="Download Registrations Excel Workbook"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>EXPORT WORKBOOK (.XLSX)</span>
          </button>

          <button
            onClick={handleLogout}
            className="p-2.5 rounded-xl bg-[#091029] border border-[#182752] text-gray-400 hover:text-[#ff007f] hover:border-[#ff007f]/50 transition-colors"
            title="Lock Console"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <div className="anime-manga-card p-5 rounded-2xl border border-[#00f3ff]/50">
          <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block mb-1 font-bold">
            TOTAL PARTIES // 全隊
          </span>
          <span className="font-anime font-black text-2xl sm:text-3xl text-white">
            {stats.total}
          </span>
        </div>

        {FEST_EVENTS.map((ev) => (
          <div key={ev.slug} className="anime-manga-card p-5 rounded-2xl border border-[#182752]">
            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block mb-1 truncate font-bold">
              {ev.name}
            </span>
            <span className="font-anime font-black text-xl sm:text-2xl text-[#00f3ff]">
              {stats.byEvent[ev.slug] || 0}
            </span>
          </div>
        ))}
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-3 border-b border-[#182752] mb-6">
        <button
          onClick={() => {
            animeAudio.playClickSound();
            setActiveTab("registrations");
          }}
          className={`px-4 py-2 text-xs font-mono font-bold tracking-wider uppercase border-b-2 transition-colors flex items-center gap-1.5 ${
            activeTab === "registrations"
              ? "border-[#00f3ff] text-[#00f3ff]"
              : "border-transparent text-gray-400 hover:text-white"
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>ALL REGISTRATIONS // 登録一覧</span>
        </button>
        <button
          onClick={() => {
            animeAudio.playClickSound();
            setActiveTab("settings");
          }}
          className={`px-4 py-2 text-xs font-mono font-bold tracking-wider uppercase border-b-2 transition-colors flex items-center gap-1.5 ${
            activeTab === "settings"
              ? "border-[#00f3ff] text-[#00f3ff]"
              : "border-transparent text-gray-400 hover:text-white"
          }`}
        >
          <Settings className="w-3.5 h-3.5" />
          <span>EVENT CONTROLS // 設定</span>
        </button>
      </div>

      {activeTab === "registrations" ? (
        <>
          {/* Search & Filters */}
          <div className="anime-manga-card p-4 rounded-xl border border-[#182752] mb-6 flex flex-col md:flex-row items-center gap-4">
            {/* Search */}
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by ID, team name, department, or member..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && fetchRegistrations(1)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#050918] border border-[#182752] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#00f3ff] font-mono"
              />
            </div>

            {/* Event Filter */}
            <select
              value={selectedEventFilter}
              onChange={(e) => {
                setSelectedEventFilter(e.target.value);
              }}
              className="w-full md:w-48 px-3 py-2.5 rounded-lg bg-[#050918] border border-[#182752] text-xs text-white focus:outline-none focus:border-[#00f3ff] font-medium"
            >
              <option value="all">All Events // 全競技</option>
              {FEST_EVENTS.map((ev) => (
                <option key={ev.slug} value={ev.slug}>
                  {ev.name}
                </option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={selectedStatusFilter}
              onChange={(e) => {
                setSelectedStatusFilter(e.target.value);
              }}
              className="w-full md:w-40 px-3 py-2.5 rounded-lg bg-[#050918] border border-[#182752] text-xs text-white focus:outline-none focus:border-[#00f3ff] font-medium"
            >
              <option value="all">All Statuses</option>
              <option value="CONFIRMED">CONFIRMED</option>
              <option value="WAITLISTED">WAITLISTED</option>
              <option value="CANCELLED">CANCELLED</option>
            </select>

            <button
              onClick={() => {
                animeAudio.playClickSound();
                fetchRegistrations(1);
              }}
              className="w-full md:w-auto px-4 py-2.5 rounded-lg bg-[#091029] border border-[#182752] hover:border-[#00f3ff] text-xs font-mono font-bold text-white flex items-center justify-center gap-1.5"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              <span>FILTER // 絞り込み</span>
            </button>
          </div>

          {/* Registrations Table */}
          <div className="anime-manga-card rounded-2xl border border-[#182752] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-gray-300">
                <thead className="bg-[#050918] border-b border-[#182752] uppercase text-[10px] tracking-wider text-gray-400 font-mono font-bold">
                  <tr>
                    <th className="py-3 px-4">Registration ID</th>
                    <th className="py-3 px-4">Party Name</th>
                    <th className="py-3 px-4">Arena Event</th>
                    {/* STRICT REQUIREMENT A: Single Department Name field shown ONCE */}
                    <th className="py-3 px-4">Department Name</th>
                    <th className="py-3 px-4">Members</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#182752]/50">
                  {registrations.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-8 text-gray-500 font-mono">
                        {loading ? "Decrypting telemetry data..." : "No registrations found matching criteria."}
                      </td>
                    </tr>
                  ) : (
                    registrations.map((reg) => (
                      <tr key={reg.id} className="hover:bg-[#0c1638]/70 transition-colors">
                        <td className="py-3.5 px-4 font-mono font-bold text-[#00f3ff]">
                          {reg.registrationId}
                        </td>
                        <td className="py-3.5 px-4 font-anime font-semibold text-white">
                          {reg.teamName}
                        </td>
                        <td className="py-3.5 px-4 text-cyan-200 font-medium">
                          {reg.eventName}
                        </td>
                        {/* Single Shared Department value */}
                        <td className="py-3.5 px-4 font-medium text-gray-200">
                          {reg.departmentName}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="inline-flex items-center gap-1 text-[11px] text-gray-300">
                            <Users className="w-3 h-3 text-[#00f3ff]" />
                            {reg.members.length} ({reg.members.map((m) => m.fullName).join(", ")})
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <select
                            value={reg.status}
                            onChange={(e) => handleStatusUpdate(reg.registrationId, e.target.value)}
                            className="bg-[#050918] border border-[#182752] rounded-lg px-2.5 py-1 text-[11px] font-mono font-bold text-[#00f3ff] focus:outline-none focus:border-[#00f3ff]"
                          >
                            <option value="CONFIRMED">CONFIRMED</option>
                            <option value="WAITLISTED">WAITLISTED</option>
                            <option value="CANCELLED">CANCELLED</option>
                          </select>
                        </td>
                        <td className="py-3.5 px-4">
                          <button
                            onClick={() => {
                              animeAudio.playClickSound();
                              setActiveTeamDetail(reg);
                            }}
                            className="p-1.5 rounded-lg bg-[#091029] border border-[#182752] text-gray-300 hover:text-[#00f3ff] hover:border-[#00f3ff]/50 transition-colors"
                            title="Inspect Guild Party"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Bar */}
            <div className="p-4 border-t border-[#182752] flex items-center justify-between text-xs text-gray-400 font-mono">
              <div>
                Showing page {pagination.page} of {pagination.totalPages} ({pagination.total} registrations)
              </div>
              <div className="flex items-center gap-2">
                <button
                  disabled={pagination.page <= 1}
                  onClick={() => {
                    animeAudio.playClickSound();
                    fetchRegistrations(pagination.page - 1);
                  }}
                  className="p-2 rounded-lg bg-[#091029] border border-[#182752] disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#00f3ff]"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  disabled={pagination.page >= pagination.totalPages}
                  onClick={() => {
                    animeAudio.playClickSound();
                    fetchRegistrations(pagination.page + 1);
                  }}
                  className="p-2 rounded-lg bg-[#091029] border border-[#182752] disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#00f3ff]"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        /* Event Settings Tab */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {FEST_EVENTS.map((ev) => {
            const setting = eventSettings.find((s) => s.eventSlug === ev.slug);
            const isOpen = setting ? setting.isOpen : true;
            return (
              <div key={ev.slug} className="anime-manga-card p-6 rounded-2xl border border-[#182752]">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#182752]">
                  <div>
                    <h3 className="font-anime font-bold text-lg text-white">
                      {ev.name}
                    </h3>
                    <span className="text-xs text-gray-400 font-mono">{ev.category}</span>
                  </div>
                  <button
                    onClick={() => handleToggleEvent(ev.slug, isOpen)}
                    className={`px-3 py-1.5 rounded-full text-xs font-mono font-bold uppercase transition-colors ${
                      isOpen
                        ? "bg-green-500/20 text-green-400 border border-green-500/40"
                        : "bg-red-500/20 text-red-400 border border-red-500/40"
                    }`}
                  >
                    {isOpen ? "OPEN // 受付中" : "CLOSED // 終了"}
                  </button>
                </div>

                <div className="space-y-3 text-xs text-gray-300">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Team Size:</span>
                    <span className="font-bold text-white font-mono">{ev.teamSize} members</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Venue:</span>
                    <span className="font-medium text-white">{ev.venue}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Date:</span>
                    <span className="font-medium text-white">{ev.date}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Team Detail Modal (Restricted to Authorized Admin) */}
      {activeTeamDetail && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActiveTeamDetail(null)}
        >
          <div
            className="anime-manga-card p-6 sm:p-8 rounded-2xl max-w-2xl w-full border border-[#00f3ff]/50 shadow-neon-cyan/20 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#182752] mb-6">
              <div>
                <span className="text-xs font-mono text-[#00f3ff] uppercase tracking-wider font-bold">
                  REGISTRATION ID: {activeTeamDetail.registrationId}
                </span>
                <h3 className="font-anime font-black text-2xl text-white">
                  {activeTeamDetail.teamName}
                </h3>
              </div>
              <button
                onClick={() => setActiveTeamDetail(null)}
                className="p-2 rounded-lg bg-[#050918] text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-1">
                  Championship Arena
                </span>
                <div className="text-sm font-anime font-bold text-white">
                  {activeTeamDetail.eventName}
                </div>
              </div>

              {/* Shared Department displayed once */}
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-1">
                  Shared Department
                </span>
                <div className="text-sm font-bold text-[#00f3ff]">
                  {activeTeamDetail.departmentName}
                </div>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <span className="text-xs font-mono uppercase tracking-wider font-bold text-gray-300 block">
                Party Roster ({activeTeamDetail.members.length} Members)
              </span>
              {activeTeamDetail.members.map((m, idx) => (
                <div
                  key={m.id}
                  className="p-3.5 rounded-xl bg-[#050918] border border-[#182752] flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded bg-[#00f3ff]/15 text-[#00f3ff] text-xs font-mono font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span className="font-semibold text-sm text-white">{m.fullName}</span>
                  </div>
                  <div className="text-xs text-gray-400 flex items-center gap-4 font-mono">
                    <span>{m.phoneNumber}</span>
                    <span className="text-cyan-300">{m.collegeEmail}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-[#182752]">
              <button
                onClick={() => setActiveTeamDetail(null)}
                className="px-5 py-2.5 rounded-xl bg-[#091029] border border-[#182752] text-xs font-mono font-bold text-white hover:border-[#00f3ff]"
              >
                CLOSE // 閉じる
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
