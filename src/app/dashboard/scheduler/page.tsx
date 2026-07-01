"use client";

import React, { useState } from "react";
import { useRecruitmentStore } from "../../../store/useRecruitmentStore";
import { 
  Video, ChevronLeft, ChevronRight, Sparkles 
} from "lucide-react";

export default function TreatmentScheduler() {
  const { currentJobId, jobs, candidates } = useRecruitmentStore();
  const activeJob = jobs.find(j => j.id === currentJobId) || jobs[0];

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [schedulerApplied, setSchedulerApplied] = useState(false);

  // Generate mock treatments
  const interviewingCandidates = candidates.filter(
    c => c.jobId === currentJobId && c.status === 'Interviewing'
  );

  const getDayOffsetDate = (days: number) => {
    const d = new Date();
    d.setDate(d.getDate() + days);
    return d;
  };

  const mockInterviews = interviewingCandidates.map((c, index) => {
    const hours = [10, 14, 16];
    const offset = index % 3;
    const date = getDayOffsetDate(offset === 0 ? 1 : offset === 1 ? 2 : 3);
    date.setHours(hours[offset], 0, 0, 0);

    return {
      id: `int-${c.id}`,
      candidateName: c.name,
      specialty: c.currentRole,
      type: offset === 0 ? "Aesthetic Laser Procedure" : offset === 1 ? "Orthodontic Aligner Fitting" : "Clinical Followup Consult",
      interviewer: offset === 0 ? "Dr. Elena Rostova (MD)" : offset === 1 ? "Dr. Sarah Al-Sayed (DDS)" : "Dr. Tariq Al-Enazi (FACS)",
      time: date.toISOString(),
      link: `https://telehealth.medflow-pro.ae/l/consult-${c.id}`,
      status: "Confirmed"
    };
  });

  const hoursGrid = Array.from({ length: 9 }, (_, i) => 9 + i); // 9:00 to 17:00

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative text-left font-sans text-xs">
      {/* LEFT COLUMN: Calendar timeline (9 cols) */}
      <div className="lg:col-span-9 flex flex-col gap-4">
        {/* Calendar control */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-white border border-[#c6c6cd]/30 shadow-sm">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => {
                const prev = new Date(selectedDate);
                prev.setDate(selectedDate.getDate() - 7);
                setSelectedDate(prev);
              }}
              className="p-2 rounded-lg bg-[#f2f4f6] border border-[#c6c6cd]/40 text-[#45464d] hover:bg-[#eceef0] transition-all"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <h3 className="text-xs font-bold text-black min-w-[200px] text-center font-mono">
              Week of {selectedDate.toLocaleDateString([], {month:'short', day:'numeric'})} - {new Date(selectedDate.getTime() + 6 * 24 * 60 * 60 * 1000).toLocaleDateString([], {month:'short', day:'numeric', year:'numeric'})}
            </h3>
            <button 
              onClick={() => {
                const next = new Date(selectedDate);
                next.setDate(selectedDate.getDate() + 7);
                setSelectedDate(next);
              }}
              className="p-2 rounded-lg bg-[#f2f4f6] border border-[#c6c6cd]/40 text-[#45464d] hover:bg-[#eceef0] transition-all"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[10px] px-2 py-0.5 rounded bg-[#86f2e4]/30 text-[#006f66] font-bold uppercase">
              Specialist Clinic Mode
            </span>
          </div>
        </div>

        {/* Calendar Grid Week layout */}
        <div className="rounded-2xl bg-white border border-[#c6c6cd]/30 p-4 space-y-4 shadow-sm">
          <h4 className="text-xs font-bold text-[#45464d] uppercase tracking-wider">Scheduled Treatment Room Sessions</h4>
          
          <div className="space-y-2">
            {hoursGrid.map((hour) => {
              const hourInterviews = mockInterviews.filter(item => {
                const intDate = new Date(item.time);
                return intDate.getHours() === hour;
              });

              return (
                <div key={hour} className="flex gap-4 p-3 rounded-xl bg-[#f2f4f6]/40 border border-[#c6c6cd]/20 items-center">
                  <span className="w-16 text-right text-xs font-mono text-[#45464d] font-bold shrink-0">
                    {hour.toString().padStart(2, '0')}:00
                  </span>
                  
                  <div className="flex-1 flex gap-3">
                    {hourInterviews.length === 0 ? (
                      <span className="text-[10px] text-[#45464d] opacity-50 italic">No treatment slots scheduled</span>
                    ) : (
                      hourInterviews.map((item) => (
                        <div
                          key={item.id}
                          className="px-4 py-2.5 rounded-xl border flex items-center justify-between gap-6 transition-all text-xs font-semibold flex-1 bg-[#86f2e4]/15 border-[#006a61]/35 text-[#006f66]"
                        >
                          <div>
                            <p className="font-bold text-black">{item.candidateName} • <span className="opacity-80 font-normal">{item.type}</span></p>
                            <p className="text-[9px] text-[#45464d] mt-0.5">{item.interviewer} • Clinic Center</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <a 
                              href={item.link} 
                              target="_blank" 
                              rel="noreferrer"
                              className="px-2 py-1 bg-white hover:bg-[#f2f4f6] border border-[#c6c6cd]/40 text-[10px] font-bold text-[#006a61] rounded-lg flex items-center gap-1 transition-all"
                            >
                              <Video className="h-3 w-3" /> Telehealth Link
                            </a>
                            <span className="text-[9px] bg-white px-2 py-1 rounded text-emerald font-bold border border-[#c6c6cd]/40">
                              {item.status}
                            </span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: AI Autopilot & Scheduled loops (3 cols) */}
      <div className="lg:col-span-3 space-y-6">
        <div className="glass-card p-4 bg-white border border-[#006a61]/30 rounded-2xl space-y-4 shadow-sm ai-glow">
          <div className="flex items-center gap-2 text-[#b45309]">
            <Sparkles className="h-4.5 w-4.5 animate-pulse" />
            <h3 className="text-xs font-bold uppercase tracking-wider">AI Scheduling Autopilot</h3>
          </div>

          <p className="text-[11px] text-[#45464d] leading-relaxed">
            MedFlow AI interacts directly with patients on WhatsApp to schedule appointments. Once the patient confirms, clinic rooms and telehealth consults are locked in automatically.
          </p>

          <div className="p-3 rounded-xl bg-[#f2f4f6] border border-[#c6c6cd]/30 space-y-1.5 text-[10px] text-[#45464d]">
            <span className="font-bold text-black block">Scheduler Stats:</span>
            <p>• Collection: 100% via bot chats</p>
            <p>• Room conflicts resolved: 0 cases</p>
          </div>

          {schedulerApplied ? (
            <div className="p-2.5 rounded-lg bg-[#ecfdf5] border border-[#a7f3d0] text-[#065f46] text-[10px] font-bold text-center">
              ✓ Automated room allocations active
            </div>
          ) : (
            <button
              onClick={() => setSchedulerApplied(true)}
              className="w-full py-2.5 rounded-xl bg-black text-white text-[10px] font-bold transition-all text-center"
            >
              Configure Allocation Thresholds
            </button>
          )}
        </div>

        <div className="glass-card rounded-2xl p-4 bg-white border border-[#c6c6cd]/30 shadow-sm">
          <h3 className="text-xs font-bold uppercase tracking-wider text-black pb-3 border-b border-[#c6c6cd]/25 mb-3">
            Active Room Bookings ({mockInterviews.length})
          </h3>

          <div className="space-y-3.5">
            {mockInterviews.length === 0 ? (
              <p className="text-[10px] text-[#45464d] opacity-50 italic text-center py-6">No scheduled treatments. Approve diagnostic files in the Clinical Portal first.</p>
            ) : (
              mockInterviews.map((item) => (
                <div key={item.id} className="p-3 rounded-xl bg-[#f2f4f6] border border-[#c6c6cd]/20 space-y-2 text-xs">
                  <div>
                    <h4 className="font-bold text-black">{item.candidateName}</h4>
                    <p className="text-[9px] text-[#45464d]">{item.type}</p>
                    <p className="text-[9px] text-[#45464d] font-mono mt-1">
                      {new Date(item.time).toLocaleString([], {month:'short', day:'numeric', hour:'2-digit', minute:'2-digit'})}
                    </p>
                  </div>
                  <a
                    href={item.link}
                    target="_blank"
                    className="w-full py-1.5 bg-white border border-[#c6c6cd]/40 text-[9px] text-center font-bold text-[#006a61] rounded-lg flex items-center justify-center gap-1 transition-all"
                  >
                    <Video className="h-3 w-3" /> Connect to Telehealth Room
                  </a>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
