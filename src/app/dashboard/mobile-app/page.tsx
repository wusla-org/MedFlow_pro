"use client";

import React, { useState } from "react";
import { useRecruitmentStore } from "../../../store/useRecruitmentStore";
import { 
  Smartphone, Calendar, Users, Bell, Search, 
  Check, CheckCircle, Wifi, Battery, Bot 
} from "lucide-react";

export default function MobileAppPreview() {
  const { currentJobId, jobs, candidates, activityLogs } = useRecruitmentStore();
  const activeJob = jobs.find(j => j.id === currentJobId) || jobs[0];

  const [activeTab, setActiveTab] = useState<"home" | "lookup" | "alerts">("home");
  const [lookupQuery, setLookupQuery] = useState("");
  const [recruiterNote, setRecruiterNote] = useState("");
  const [noteSaved, setNoteSaved] = useState(false);

  const jobCandidates = candidates.filter(c => c.jobId === currentJobId);

  const handleSaveNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recruiterNote.trim()) return;
    setNoteSaved(true);
    setTimeout(() => {
      setNoteSaved(false);
      setRecruiterNote("");
    }, 2000);
  };

  return (
    <div className="space-y-6 relative text-left font-sans text-xs">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-4xl mx-auto">
        {/* Left Column: Controls & Info */}
        <div className="lg:col-span-6 space-y-6">
          <div className="glass-card rounded-2xl p-5 bg-white border border-[#c6c6cd]/30 space-y-3 shadow-sm">
            <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 bg-[#86f2e4]/30 text-[#006f66] w-fit block rounded">
              Specialist Doctor App
            </span>
            <h3 className="text-base font-bold text-black">MedFlow Specialist</h3>
            <p className="text-xs text-[#45464d] leading-relaxed">
              Provides medical directors and attending specialists with immediate mobile access to room allocations and treatment agendas. Dictate case consult notes directly on-the-go and check Daman / AXA insurance approvals.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-5 bg-white border border-[#c6c6cd]/30 space-y-3 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#45464d]">Features to test inside simulator</h3>
            <ul className="text-xs text-[#45464d] space-y-2.5">
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-[#006a61]" /> Verify upcoming treatments in the **Agenda** tab.</li>
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-[#006a61]" /> Search patient diagnoses under the **Lookup** directory.</li>
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-[#006a61]" /> Review automated insurance gateway pre-auths in the **Alerts** feed.</li>
            </ul>
          </div>
        </div>

        {/* Right Column: Simulated iPhone chassis */}
        <div className="lg:col-span-6 flex justify-center">
          <div className="w-[280px] h-[550px] rounded-[40px] bg-[#191c1e] border-[6px] border-[#2d3133] shadow-2xl relative flex flex-col justify-between overflow-hidden">
            
            {/* Top Notch */}
            <div className="absolute top-0 inset-x-0 h-4 bg-[#191c1e] flex justify-center items-center z-50">
              <div className="w-20 h-2.5 rounded-full bg-[#2d3133]"></div>
            </div>

            {/* Status Bar */}
            <div className="pt-4 px-5 pb-1 flex justify-between items-center text-[8px] font-bold text-[#eceef0] bg-[#191c1e] z-40">
              <span>9:41</span>
              <div className="flex items-center gap-1">
                <Wifi className="h-2 w-2" />
                <span className="text-[7px]">5G</span>
                <Battery className="h-2.5 w-2.5" />
              </div>
            </div>

            {/* SCREEN VIEWPORT */}
            <div className="flex-1 bg-[#f7f9fb] p-3 overflow-y-auto relative text-[11px] flex flex-col justify-between text-[#191c1e]">
              
              {/* Screen header */}
              <div className="flex items-center justify-between pb-3 border-b border-[#c6c6cd]/30 mt-1">
                <div>
                  <p className="text-[8px] text-[#45464d]">Attending Specialist</p>
                  <h4 className="font-bold text-black">Dr. Sarah Al-Sayed</h4>
                </div>
                <span className="h-2 w-2 rounded-full bg-[#10b981]"></span>
              </div>

              {/* Screen Contents */}
              <div className="flex-1 py-3 space-y-3">
                {activeTab === "home" && (
                  <>
                    {/* Active Job Brief */}
                    <div className="p-3 rounded-xl bg-white border border-[#c6c6cd]/30 space-y-1 text-[10px] shadow-sm">
                      <span className="font-bold text-[8px] text-[#45464d] uppercase tracking-wider block">Active Department</span>
                      <p className="font-bold text-black">{activeJob.title}</p>
                      <p className="text-[#45464d] text-[9px]">{activeJob.client}</p>
                    </div>

                    {/* Today's Agenda list */}
                    <div className="p-3 rounded-xl bg-white border border-[#c6c6cd]/30 space-y-2 text-[10px] shadow-sm">
                      <span className="font-bold text-[8px] text-[#45464d] uppercase tracking-wider block font-bold">Today's Patient Schedule</span>
                      
                      <div className="space-y-2 max-h-[120px] overflow-y-auto pr-1">
                        {jobCandidates.slice(0, 2).map((c, i) => (
                          <div key={c.id} className="p-2 rounded bg-[#f2f4f6] border border-[#c6c6cd]/20 text-[9px] flex justify-between items-center">
                            <div>
                              <p className="font-bold text-black">{c.name}</p>
                              <p className="text-[#45464d] text-[8px]">
                                {c.visaStatus === 'Immediate Joiner (Resident)' ? 'Daman Platinum' :
                                 'AXA Premium'}
                              </p>
                            </div>
                            <span className="text-[8px] text-[#006a61] font-mono">{i === 0 ? "10:00" : "14:00"}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Quick note recorder */}
                    <form onSubmit={handleSaveNote} className="p-3 rounded-xl bg-white border border-[#c6c6cd]/30 space-y-2 shadow-sm">
                      <label className="text-[8px] text-[#45464d] uppercase tracking-wider block font-bold">Log Clinical Chart Note</label>
                      <textarea
                        placeholder="Type patient chart notes..."
                        value={recruiterNote}
                        onChange={(e) => setRecruiterNote(e.target.value)}
                        className="w-full p-2 bg-[#f2f4f6] border border-[#c6c6cd]/30 rounded-lg text-[9px] text-black outline-none h-14 resize-none focus:border-[#006a61] focus:ring-0"
                      />
                      {noteSaved ? (
                        <div className="text-[8px] text-[#10b981] font-bold text-center flex items-center justify-center gap-1">
                          <CheckCircle className="h-3.5 w-3.5" /> Note Saved to Patient File!
                        </div>
                      ) : (
                        <button
                          type="submit"
                          className="w-full py-1.5 rounded-lg bg-black text-white text-[8px] font-bold transition-all"
                        >
                          Save to Case Chart
                        </button>
                      )}
                    </form>
                  </>
                )}

                {activeTab === "lookup" && (
                  <div className="space-y-2">
                    <span className="font-bold text-[8px] text-[#45464d] uppercase tracking-wider block">Patient Lookup</span>
                    
                    <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-[#f2f4f6] border border-[#c6c6cd]/30">
                      <Search className="h-3 w-3 text-[#45464d]" />
                      <input 
                        type="text" 
                        placeholder="Search patients, coverages..."
                        value={lookupQuery}
                        onChange={(e) => setLookupQuery(e.target.value)}
                        className="bg-transparent border-none text-[9px] text-black outline-none w-full focus:ring-0"
                      />
                    </div>

                    <div className="space-y-1.5 max-h-[170px] overflow-y-auto pr-1">
                      {candidates.filter(c => c.name.toLowerCase().includes(lookupQuery.toLowerCase())).map(c => (
                        <div key={c.id} className="p-2 rounded bg-white border border-[#c6c6cd]/35 text-[9px] flex justify-between items-center shadow-sm">
                          <div>
                            <p className="font-bold text-black">{c.name}</p>
                            <p className="text-[8px] text-[#45464d]">{c.currentRole}</p>
                          </div>
                          <span className="text-[8px] text-[#006a61] font-bold font-mono">{c.score}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "alerts" && (
                  <div className="space-y-2">
                    <span className="font-bold text-[8px] text-[#45464d] uppercase tracking-wider block">Gateway Alerts</span>
                    
                    <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                      {activityLogs.slice().reverse().slice(0, 3).map(log => (
                        <div key={log.id} className="p-2 rounded bg-[#eceef0] border border-[#c6c6cd]/30 text-[8px] leading-normal flex gap-1.5 shadow-sm">
                          <Bot className="h-3.5 w-3.5 text-[#006a61] shrink-0 mt-0.5" />
                          <span className="text-black">{log.message}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Phone Navigation Tabs */}
              <div className="flex border-t border-[#c6c6cd]/25 pt-2 bg-[#f7f9fb] z-40 text-center">
                {[
                  { id: "home", label: "Agenda", icon: Calendar },
                  { id: "lookup", label: "Lookup", icon: Users },
                  { id: "alerts", label: "Alerts", icon: Bell }
                ].map((tab) => {
                  const Icon = tab.icon;
                  const active = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex-1 flex flex-col items-center gap-0.5 text-[8px] font-semibold ${
                        active ? "text-[#006a61] font-bold" : "text-[#45464d]"
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
