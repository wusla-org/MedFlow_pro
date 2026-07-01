"use client";

import React, { useState } from "react";
import { useRecruitmentStore } from "../../store/useRecruitmentStore";
import { 
  Plus, Search, ArrowRight, ShieldCheck, 
  RotateCcw, AlertTriangle, CheckCircle 
} from "lucide-react";

export default function PatientIntakeDashboard() {
  const { 
    currentJobId, jobs, candidates, activityLogs, 
    isUploading, uploadedCount, triggerBulkUpload, 
    updateCandidateStatus, resetMockData 
  } = useRecruitmentStore();

  const activeJob = jobs.find(j => j.id === currentJobId) || jobs[0];
  const jobCandidates = candidates.filter(c => c.jobId === currentJobId);

  // Preview Side Panel State (Zaid Khan is the default active preview)
  const [selectedPatientId, setSelectedPatientId] = useState<string>("cand-initial-1");
  const selectedPatient = candidates.find(c => c.id === selectedPatientId) || jobCandidates[0] || candidates[0];

  const handlePatientSelect = (id: string) => {
    setSelectedPatientId(id);
  };

  return (
    <div className="space-y-6 text-left font-sans animate-fade-in">
      {/* Welcome & Stats */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-black tracking-tight">Patient Intake</h2>
          <p className="text-xs text-[#45464d] mt-0.5">Verify incoming clinical data and automated extractions.</p>
        </div>

        <div className="flex gap-4">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-[#c6c6cd]/30 flex items-center gap-4 min-w-[140px]">
            <div className="p-2 bg-[#006a61]/10 rounded-lg text-[#006a61]">
              <span className="material-symbols-outlined text-[20px] font-bold">group</span>
            </div>
            <div>
              <p className="text-[10px] text-[#45464d] uppercase font-bold opacity-60">Total Today</p>
              <p className="text-xl font-extrabold text-black font-mono">
                {uploadedCount > 0 ? "100" : jobCandidates.length + 1}
              </p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm border border-[#c6c6cd]/30 flex items-center gap-4 min-w-[140px]">
            <div className="p-2 bg-red-650/10 bg-red-100 text-red-650 text-red-600">
              <span className="material-symbols-outlined text-[20px] font-bold">warning</span>
            </div>
            <div>
              <p className="text-[10px] text-[#45464d] uppercase font-bold opacity-60">Flagged</p>
              <p className="text-xl font-extrabold text-black font-mono">03</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid View */}
      <div className="grid grid-cols-12 gap-6">
        
        {/* Left Column: Uploader & List (8 cols) */}
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
          
          {/* Uploader Card */}
          <section 
            onClick={triggerBulkUpload}
            className="glass-card p-6 rounded-xl border-2 border-dashed border-[#006a61]/30 flex flex-col items-center justify-center min-h-[200px] transition-all hover:border-[#006a61]/60 group cursor-pointer text-center relative overflow-hidden"
          >
            <div className="w-14 h-14 rounded-full bg-[#86f2e4]/30 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[#006a61] text-2xl">cloud_upload</span>
            </div>
            <h3 className="text-base font-bold text-black">Upload Patient Records</h3>
            <p className="text-xs text-[#45464d] max-w-sm mt-1">
              Drag and drop PDF reports, JPG scans, or hospital discharge summaries for AI-powered clinical extraction.
            </p>
            <div className="mt-4 flex gap-3">
              <button className="px-5 py-2 bg-black text-white rounded-full text-[11px] font-bold hover:shadow-lg transition-shadow">
                {isUploading ? "Scanning..." : "Select Files"}
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); resetMockData(); }}
                className="px-5 py-2 border border-[#c6c6cd] text-[#191c1e] font-bold text-[11px] rounded-full hover:bg-[#eceef0] transition-colors"
              >
                Reset Database
              </button>
            </div>

            {/* Glowing Laser Scan Bar */}
            {isUploading && (
              <div className="absolute inset-x-0 top-0 h-[2.5px] bg-[#006a61] shadow-[0_0_15px_#006a61] opacity-80 animate-scanning"></div>
            )}
          </section>

          {/* Intake Table */}
          <section className="bg-white rounded-xl shadow-sm border border-[#c6c6cd]/30 overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-[#c6c6cd]/30 flex justify-between items-center bg-[#f2f4f6]/40">
              <h3 className="text-xs font-bold uppercase tracking-wider text-black">Today's New Intakes</h3>
              <div className="flex gap-2">
                <button className="p-1 rounded hover:bg-[#eceef0] transition-colors"><span className="material-symbols-outlined text-[#45464d]">filter_list</span></button>
                <button className="p-1 rounded hover:bg-[#eceef0] transition-colors"><span className="material-symbols-outlined text-[#45464d]">more_vert</span></button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#f2f4f6]/20 border-b border-[#c6c6cd]/30 text-[#45464d]">
                    <th className="px-6 py-4 font-bold uppercase tracking-wider">Patient & ID</th>
                    <th className="px-6 py-4 font-bold uppercase tracking-wider">Parsing Status</th>
                    <th className="px-6 py-4 font-bold uppercase tracking-wider">Top Symptoms</th>
                    <th className="px-6 py-4 font-bold uppercase tracking-wider text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#c6c6cd]/20">
                  {/* Dynamic patients from store */}
                  {jobCandidates.map((c) => (
                    <tr 
                      key={c.id} 
                      onClick={() => handlePatientSelect(c.id)}
                      className={`hover:bg-[#eceef0]/30 transition-colors cursor-pointer group ${
                        selectedPatientId === c.id ? "bg-[#86f2e4]/10 border-l-4 border-[#006a61]" : ""
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-[#86f2e4]/20 text-[#006f66] flex items-center justify-center font-bold">
                            {c.name[0]}
                          </div>
                          <div>
                            <p className="font-bold text-black">{c.name}</p>
                            <p className="text-[10px] text-[#45464d] font-mono">{c.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-[#064e3b] bg-[#dcfce7] px-2.5 py-1 rounded-full w-fit border border-[#059669]/20 font-bold text-[9px] uppercase tracking-tight">
                          <span className="material-symbols-outlined text-sm font-bold">check_circle</span>
                          <span>Complete</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1.5">
                          {c.skills.slice(0, 2).map((s, i) => (
                            <span key={i} className="px-2 py-0.5 bg-[#eceef0] rounded text-[10px] font-bold text-[#45464d]">
                              {s}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-[#006a61] font-bold hover:underline text-[11px]">Review</button>
                      </td>
                    </tr>
                  ))}

                  {/* Static mock files for parity with Stitch design */}
                  <tr className="hover:bg-[#eceef0]/30 transition-colors cursor-pointer">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-[#eceef0] text-black flex items-center justify-center font-bold">FA</div>
                        <div>
                          <p className="font-bold text-black">Fatima Al-Sayed</p>
                          <p className="text-[10px] text-[#45464d] font-mono">MF-99201-DX</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-[#b45309] bg-[#ffdbca] px-2.5 py-1 rounded-full w-fit border border-[#b45309]/20 font-bold text-[9px] uppercase tracking-tight">
                        <span className="material-symbols-outlined text-sm animate-spin">refresh</span>
                        <span>Extracting</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-1">
                        <span className="w-16 h-2 bg-[#e0e3e5] rounded-full animate-pulse"></span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-[#006a61] font-bold hover:underline text-[11px]">View Progress</button>
                    </td>
                  </tr>

                  <tr className="hover:bg-[#eceef0]/30 transition-colors cursor-pointer">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-red-100 text-red-650 text-red-600 flex items-center justify-center font-bold">EM</div>
                        <div>
                          <p className="font-bold text-black">Elena Markov</p>
                          <p className="text-[10px] text-[#45464d] font-mono">MF-10293-AZ</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-red-600 bg-red-50 px-2.5 py-1 rounded-full w-fit border border-red-300 font-bold text-[9px] uppercase tracking-tight">
                        <span className="material-symbols-outlined text-sm">report</span>
                        <span>Flagged</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-0.5 bg-[#eceef0] rounded text-[10px] font-bold text-[#45464d] opacity-50">Unclear Scan</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-red-600 font-bold hover:underline text-[11px]">Fix Errors</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

        </div>

        {/* Right Column: Data Preview Side Panel (4 cols) */}
        <div className="col-span-12 lg:col-span-4 flex flex-col h-full">
          <section className="bg-white rounded-xl shadow-lg border border-[#c6c6cd]/30 flex flex-col overflow-hidden h-full">
            <div className="p-6 border-b border-[#c6c6cd]/30 bg-[#f2f4f6]/30">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[9px] font-bold text-[#006a61] uppercase tracking-wider bg-[#86f2e4]/30 px-2 py-1 rounded">
                  Selected: {selectedPatient?.name || "Zaid Khan"}
                </span>
                <div className="w-10 h-10 rounded-full border-2 border-[#ffdbca] overflow-hidden ai-pulse">
                  <img 
                    className="w-full h-full object-cover" 
                    alt="Doctor Avatar" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFkstO_pA13x4yFzEITheTnbf5mNEPk1PFJYPUk57aV_pglWnoRuFXahoslgFwUvSHg8v_NjnM9XezS51svp2XSw7WNS8vRBNTNCsjJiKB5cE1s76de_nJCskQQkQzDGqNEMrkNA_PqxMPOzHD8NfmiylcAe_LNP2pakNU4YYI0P-2bPOf5x7D6zoEvf8tLFMVLj1HqySpqFoHPR3PeYJWj-2QjUWoLyHCgfcLq04TyiuA6XsqibRuejcQoH38P7NBMal86R0H1w"
                  />
                </div>
              </div>
              <h3 className="text-base font-bold text-black">Extracted Data Preview</h3>
              <div className="flex items-center gap-2 mt-2">
                <span className="material-symbols-outlined text-[#b45309] text-sm animate-pulse">auto_awesome</span>
                <p className="text-xs text-[#45464d] italic">AI Confidence: <span className="font-bold text-[#006a61]">{selectedPatient?.score || 98.4}%</span></p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
              
              {/* Clinical Summary */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="material-symbols-outlined text-[#006a61] text-lg">medical_information</span>
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#45464d]">Clinical Summary</h4>
                </div>
                <div className="p-4 bg-[#f2f4f6] rounded-xl text-xs text-black leading-relaxed">
                  {selectedPatient?.notes || "Patient registered for cosmetic dental aligners. Intending full suite veneering and cosmetic laser sessions. Insurance coverage validated via pre-auth gateway."}
                </div>
              </div>

              {/* Verification Status */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="material-symbols-outlined text-[#006a61] text-lg">verified_user</span>
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#45464d]">History Verification</h4>
                </div>
                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between p-3 border border-[#c6c6cd]/50 rounded-lg">
                    <span className="font-semibold text-black">Insurance Validity</span>
                    <span className="px-2 py-0.5 bg-[#86f2e4]/30 text-[#006f66] text-[9px] font-bold rounded">VERIFIED</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border border-[#c6c6cd]/50 rounded-lg">
                    <span className="font-semibold text-black">Primary Care Sync</span>
                    <span className="px-2 py-0.5 bg-[#86f2e4]/30 text-[#006f66] text-[9px] font-bold rounded">SYNCED</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border border-red-200 bg-red-50 rounded-lg">
                    <span className="font-semibold text-black">Allergy Conflict</span>
                    <span className="px-2 py-0.5 bg-red-100 text-red-600 text-[9px] font-bold rounded">
                      {selectedPatient?.name.includes("Sarah") ? "PENICILLIN ALERT" : "0 ALERTS"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Extracted Symptoms */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="material-symbols-outlined text-[#006a61] text-lg">list_alt</span>
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#45464d]">Parsed Attributes</h4>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-3 bg-[#f2f4f6] rounded-lg border-l-4 border-[#006a61]">
                    <p className="text-[9px] text-[#45464d] uppercase font-bold opacity-60">Heart Rate</p>
                    <p className="font-bold text-black font-mono mt-0.5">115 BPM</p>
                  </div>
                  <div className="p-3 bg-[#f2f4f6] rounded-lg">
                    <p className="text-[9px] text-[#45464d] uppercase font-bold opacity-60">BP</p>
                    <p className="font-bold text-black font-mono mt-0.5">142/90</p>
                  </div>
                  <div className="p-3 bg-[#f2f4f6] rounded-lg">
                    <p className="text-[9px] text-[#45464d] uppercase font-bold opacity-60">Oxygen</p>
                    <p className="font-bold text-black font-mono mt-0.5">98%</p>
                  </div>
                  <div className="p-3 bg-[#f2f4f6] rounded-lg">
                    <p className="text-[9px] text-[#45464d] uppercase font-bold opacity-60">Pain Scale</p>
                    <p className="font-bold text-black font-mono mt-0.5">4/10</p>
                  </div>
                </div>
              </div>

              {/* Original Document Preview */}
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#45464d] mb-2">Original Document</h4>
                <div className="relative group h-28 rounded-xl overflow-hidden border border-[#c6c6cd] cursor-pointer">
                  <img 
                    className="w-full h-full object-cover" 
                    alt="Document Scan" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXlNELfX0EW65JI90rH_J9lk3cUJgdYjjVH6lA2R2gkr9k3BHKZRHxpQxoqlLvYKEsJ7LfgT7uHQg1y6-pqcSosqCNauNm1SlyOLThK8IcH8UcsBBsSIFU5MmBHO3SLPY1bZQINeaAukgB0-EquRiNzKdWXvnZM-TOQRFq4pxc_S5rfhgYYNwx2PgiqdpLqXdZiuSLfnNAhGQefxHKm-eGeh3VznmOI8Et-h7lOZhwUGMuC-ndLhvpVSbrcDgRsatiYhkdVA8hCA"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-bold text-[10px]">
                    Click to Zoom Scan
                  </div>
                </div>
              </div>

            </div>
          </section>
        </div>

      </div>
    </div>
  );
}
