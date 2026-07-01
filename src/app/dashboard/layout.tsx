"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useRecruitmentStore } from "../../store/useRecruitmentStore";
import { Search, Bell, Command, X, Check, ChevronDown } from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { currentJobId, setJobId, jobs, activityLogs, triggerBulkUpload, resetMockData } = useRecruitmentStore();

  const [showJobDropdown, setShowJobDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [commandSearch, setCommandSearch] = useState("");

  const activeJob = jobs.find(j => j.id === currentJobId) || jobs[0];

  const menuItems = [
    { name: "Dashboard", href: "/dashboard", icon: "dashboard" },
    { name: "Intake", href: "/dashboard/candidates", icon: "person_add" },
    { name: "Insurance", href: "/dashboard/employer-portal", icon: "security" },
    { name: "Scheduler", href: "/dashboard/scheduler", icon: "calendar_month" },
    { name: "Specialist", href: "/dashboard/mobile-app", icon: "smartphone" },
    { name: "Reports", href: "/dashboard/analytics", icon: "analytics" },
  ];

  const commands = [
    { id: "cmd-ingest", name: "Bulk Ingest 100 Patient Records", desc: "Simulates intake extraction pipeline", action: () => triggerBulkUpload() },
    { id: "cmd-crm", name: "Navigate to Patient Directory", desc: "View timelines and WhatsApp logs", action: () => router.push("/dashboard/candidates") },
    { id: "cmd-employer", name: "Navigate to Clinical Portal", desc: "Coordinate Emaar & Riyadh client feedback", action: () => router.push("/dashboard/employer-portal") },
    { id: "cmd-scheduler", name: "Navigate to Treatment Scheduler", desc: "View room booking grids", action: () => router.push("/dashboard/scheduler") },
    { id: "cmd-mobile", name: "Navigate to Specialist App Preview", desc: "Simulated iPhone agenda & notes", action: () => router.push("/dashboard/mobile-app") },
    { id: "cmd-reset", name: "Reset Clinic Database", desc: "Wipes database logs and resets state", action: () => resetMockData() }
  ];

  const filteredCommands = commands.filter(c => 
    c.name.toLowerCase().includes(commandSearch.toLowerCase()) ||
    c.desc.toLowerCase().includes(commandSearch.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setShowCommandPalette(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleCommandTrigger = (action: () => void) => {
    action();
    setShowCommandPalette(false);
    setCommandSearch("");
  };

  // Compute Page Title based on pathname
  const getPageTitle = () => {
    if (pathname === "/dashboard") return "Clinic Dashboard";
    if (pathname === "/dashboard/candidates") return "Patient Intake Directory";
    if (pathname === "/dashboard/employer-portal") return "Insurance Gateway";
    if (pathname === "/dashboard/scheduler") return "Treatment Scheduler";
    if (pathname === "/dashboard/mobile-app") return "Specialist Companion App";
    if (pathname === "/dashboard/analytics") return "Clinical Reports";
    return "MedFlow Dashboard";
  };

  return (
    <div className="min-h-screen bg-[#f7f9fb] text-[#191c1e] flex font-sans">
      {/* Side Navigation */}
      <aside className="h-screen w-64 fixed left-0 top-0 bg-white shadow-sm flex flex-col py-6 px-4 z-50 border-r border-[#c6c6cd]/30">
        <div className="mb-10 px-2">
          <h1 className="text-xl font-bold text-black tracking-tight">MedFlow Pro</h1>
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#45464d] opacity-70 mt-0.5">Dubai Health Care City</p>
        </div>

        <nav className="flex-1 space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors group ${
                  isActive 
                    ? "text-[#006a61] font-bold bg-[#86f2e4]/15 border-r-4 border-[#006a61]" 
                    : "text-[#45464d] hover:bg-[#eceef0] hover:text-[#006a61]"
                }`}
              >
                <span 
                  className="material-symbols-outlined transition-colors"
                  style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                >
                  {item.icon}
                </span>
                <span className="text-xs font-semibold">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto border-t border-[#c6c6cd]/30 pt-6 space-y-1.5">
          <button 
            onClick={() => setShowCommandPalette(true)}
            className="w-full text-left flex items-center gap-3 px-4 py-2.5 rounded-lg text-[#45464d] hover:bg-[#eceef0] transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">bolt</span>
            <span className="text-xs font-semibold">Command Palette</span>
          </button>
          
          <button 
            onClick={() => resetMockData()}
            className="w-full text-left flex items-center gap-3 px-4 py-2.5 rounded-lg text-[#45464d] hover:bg-[#eceef0] transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">settings_backup_restore</span>
            <span className="text-xs font-semibold">Reset Database</span>
          </button>

          <button 
            onClick={() => alert("Clinic location switched successfully!")}
            className="mt-4 w-full py-2.5 px-4 bg-[#006a61] text-white rounded-lg text-xs font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            Switch Location
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="ml-64 flex-1 min-h-screen flex flex-col">
        {/* Top App Bar */}
        <header className="flex justify-between items-center w-full px-8 py-4 sticky top-0 z-40 bg-[#f7f9fb]/80 backdrop-blur-md border-b border-[#c6c6cd]/30">
          <div className="flex items-center gap-8">
            <h2 className="text-lg font-bold text-[#006a61]">{getPageTitle()}</h2>
            
            {/* Dept Selector */}
            <div className="relative">
              <button 
                onClick={() => setShowJobDropdown(!showJobDropdown)}
                className="flex items-center gap-1.5 text-xs text-[#45464d] hover:text-[#006a61] transition-colors font-semibold"
              >
                <span>Dept:</span>
                <span className="text-black font-bold">{activeJob.title}</span>
                <ChevronDown className="h-3 w-3" />
              </button>

              {showJobDropdown && (
                <div className="absolute top-full left-0 mt-2 w-72 rounded-xl bg-white border border-[#c6c6cd]/30 shadow-2xl p-1.5 z-50">
                  <div className="p-2 text-[9px] text-[#45464d] font-bold uppercase tracking-wider border-b border-[#c6c6cd]/20">Select Department Workspace</div>
                  <div className="max-h-64 overflow-y-auto py-1">
                    {jobs.map((j) => (
                      <button
                        key={j.id}
                        onClick={() => {
                          setJobId(j.id);
                          setShowJobDropdown(false);
                        }}
                        className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold hover:bg-[#eceef0] text-[#191c1e] text-left transition-all"
                      >
                        <div>
                          <p className="font-bold">{j.title}</p>
                          <p className="text-[10px] text-[#45464d]">{j.client} • {j.location}</p>
                        </div>
                        {currentJobId === j.id && <Check className="h-4 w-4 text-[#006a61]" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-4">
              <span className="text-black font-bold border-b-2 border-[#006a61] pb-0.5 text-xs">Dubai</span>
              <span className="text-[#45464d] hover:text-[#006a61] transition-colors cursor-pointer text-xs" onClick={() => alert("Switched to Riyadh clinic node")}>Riyadh</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 bg-[#86f2e4]/20 px-3 py-1.5 rounded-full border border-[#006a61]/15 ai-pulse">
              <span className="material-symbols-outlined text-[#b45309] text-[16px] animate-spin">auto_awesome</span>
              <span className="text-[10px] font-bold text-[#b45309]">AI Autopilot: Active</span>
            </div>

            <div className="flex items-center gap-4 text-[#45464d]">
              {/* Notifications */}
              <div className="relative">
                <button onClick={() => setShowNotifications(!showNotifications)} className="hover:text-[#006a61] transition-colors relative flex items-center">
                  <span className="material-symbols-outlined">notifications</span>
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-600 rounded-full border border-[#f7f9fb]"></span>
                </button>

                {showNotifications && (
                  <div className="absolute top-full right-0 mt-2 w-80 rounded-xl bg-white border border-[#c6c6cd]/30 shadow-2xl z-50 p-2 overflow-hidden">
                    <div className="p-3 border-b border-[#c6c6cd]/20 flex items-center justify-between">
                      <span className="text-xs font-bold text-black font-sans">Pipeline Streams</span>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#86f2e4]/30 text-[#006f66] font-bold">Autopilot</span>
                    </div>
                    <div className="max-h-72 overflow-y-auto divide-y divide-[#c6c6cd]/10">
                      {activityLogs.slice().reverse().slice(0, 4).map((log) => (
                        <div key={log.id} className="p-3 text-[11px] space-y-1">
                          <div className="flex items-center justify-between">
                            <span className={`text-[9px] px-1 bg-[#eceef0] rounded font-semibold ${
                              log.type === 'success' ? 'text-[#006a61]' :
                              log.type === 'warning' ? 'text-red-600' :
                              'text-blue-600'
                            }`}>
                              {log.type.toUpperCase()}
                            </span>
                            <span className="text-[8px] text-[#45464d] font-mono">{log.time}</span>
                          </div>
                          <p className="text-[#45464d] leading-normal font-sans">{log.message}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="h-8 w-8 rounded-full overflow-hidden border border-[#c6c6cd]/40">
                <img 
                  className="w-full h-full object-cover" 
                  alt="Medical Director" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1OuMZFrVxmbUIQtqOxo0pSh3UPB9DOiRDgm7kuHNMwj-6c3-HHKcpLp6oSpugOtHK8kZALDQ95yj5UHdyXzkpSDYpN0ms5gmLFXeKK9KmXIIFEzHL4D77zywLCpz0UO8osv_0R9ceoN4zFx3bwW3vISZ8y3sZjSoKFdEl4jeUpKWT_ZD-bL_p0O4PHdTN3DKe5VFgqv0UxLiuD8DZbJrlexIEKirOY1Ks-qbu4KKmVRex8vJ-Ajdfy6WJgPYi9pHLMCaE4zRI6Q"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content Viewport */}
        <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
          {children}
        </div>
      </main>

      {/* COMMAND PALETTE PANEL */}
      {showCommandPalette && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white border border-[#c6c6cd]/40 shadow-2xl rounded-2xl p-4 w-full max-w-lg relative">
            <button 
              onClick={() => { setShowCommandPalette(false); setCommandSearch(""); }}
              className="absolute top-4 right-4 text-[#45464d] hover:text-black"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2 text-[#006a61] pb-2.5 border-b border-[#c6c6cd]/25 mb-3.5 text-xs font-bold uppercase tracking-wider">
              <Command className="h-4.5 w-4.5 animate-pulse" />
              <span>MedFlow Command Operations</span>
            </div>

            <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-[#f2f4f6] border border-[#c6c6cd]/30">
              <Search className="h-4.5 w-4.5 text-[#45464d]" />
              <input 
                autoFocus
                type="text" 
                placeholder="Type command action..."
                value={commandSearch}
                onChange={(e) => setCommandSearch(e.target.value)}
                className="bg-transparent border-none text-xs text-black placeholder-slate-400 outline-none w-full font-sans focus:ring-0"
              />
            </div>

            <div className="max-h-60 overflow-y-auto space-y-1.5 pt-2">
              {filteredCommands.length === 0 ? (
                <p className="text-xs text-[#45464d] text-center py-6">No clinical commands matching query</p>
              ) : (
                filteredCommands.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => handleCommandTrigger(c.action)}
                    className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-[#86f2e4]/10 border border-transparent hover:border-[#006a61]/20 text-left transition-all text-xs"
                  >
                    <div>
                      <p className="font-bold text-black">{c.name}</p>
                      <p className="text-[10px] text-[#45464d] mt-0.5">{c.desc}</p>
                    </div>
                    <span className="text-[10px] text-[#006a61] font-bold font-mono">↵</span>
                  </button>
                ))
              )}
            </div>

            <div className="flex items-center justify-between text-[9px] text-[#45464d] font-mono pt-3 border-t border-[#c6c6cd]/20 mt-4">
              <span>Use ↑↓ keys and enter</span>
              <span>ESC to exit panel</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
