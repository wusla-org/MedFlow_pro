"use client";

import React, { useState } from "react";
import { useRecruitmentStore } from "../../../store/useRecruitmentStore";
import { 
  TrendingUp, Clock, Sparkles, ShieldCheck, 
  CheckCircle, AlertCircle, XCircle, ChevronLeft, 
  ChevronRight, ArrowRight, Zap 
} from "lucide-react";

export default function InsuranceGateway() {
  const { 
    currentJobId, jobs, candidates, 
    approveEmployerCandidate, rejectEmployerCandidate 
  } = useRecruitmentStore();

  const activeJob = jobs.find(j => j.id === currentJobId) || jobs[0];

  // Keep track of manual updates locally for a dynamic experience
  const [localApprovals, setLocalApprovals] = useState<Record<string, string>>({
    "claim-1": "Approved",
    "claim-2": "Review",
    "claim-3": "Rejected",
    "claim-4": "Approved",
  });

  const handleAction = (id: string, status: string) => {
    setLocalApprovals(prev => ({ ...prev, [id]: status }));
  };

  return (
    <div className="space-y-6 text-left font-sans animate-fade-in">
      
      {/* Summary Gate Widget */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
          
          <div className="glass-card p-6 rounded-xl shadow-sm border-l-4 border-[#006a61] bg-white">
            <p className="text-[10px] font-bold text-[#45464d] uppercase mb-2">Total Authorized (24h)</p>
            <h3 className="text-2xl font-black text-black font-mono">AED 284,500</h3>
            <p className="text-[#006a61] text-[10px] font-bold flex items-center gap-1 mt-2">
              <TrendingUp className="h-3 w-3" /> +12.5% from yesterday
            </p>
          </div>

          <div className="glass-card p-6 rounded-xl shadow-sm border-l-4 border-[#ffb68e] bg-white">
            <p className="text-[10px] font-bold text-[#45464d] uppercase mb-2">Pending Volume</p>
            <h3 className="text-2xl font-black text-black font-mono">AED 92,120</h3>
            <p className="text-[#45464d] text-[10px] font-bold flex items-center gap-1 mt-2">
              <Clock className="h-3 w-3" /> 14 claims in queue
            </p>
          </div>

          <div className="glass-card p-6 rounded-xl shadow-sm border-l-4 border-[#cf6721] ai-glow bg-white">
            <div className="flex justify-between items-start">
              <p className="text-[10px] font-bold text-[#45464d] uppercase mb-2">AI Approval Rate</p>
              <span className="material-symbols-outlined text-[#cf6721] text-lg font-bold">auto_awesome</span>
            </div>
            <h3 className="text-2xl font-black text-black font-mono">94.2%</h3>
            <p className="text-[#cf6721] text-[10px] font-bold flex items-center gap-1 mt-2">
              <span className="material-symbols-outlined text-xs">spark</span> Optimized by MedFlow AI
            </p>
          </div>

        </div>

        <div className="col-span-12 lg:col-span-4 glass-card p-6 rounded-xl shadow-sm relative overflow-hidden flex flex-col justify-center bg-white border border-[#c6c6cd]/30">
          <div className="relative z-10">
            <h4 className="text-sm font-bold text-black mb-1">Carrier Network</h4>
            <p className="text-[11px] text-[#45464d] mb-3">Direct Billing Status: GCC Region</p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2.5 py-1 bg-[#eceef0] rounded-full text-[9px] font-extrabold text-[#006a61] border border-[#c6c6cd]/40">DAMAN</span>
              <span className="px-2.5 py-1 bg-[#eceef0] rounded-full text-[9px] font-extrabold text-red-750 border border-[#c6c6cd]/40">AXA</span>
              <span className="px-2.5 py-1 bg-[#eceef0] rounded-full text-[9px] font-extrabold text-green-750 border border-[#c6c6cd]/40">THIQA</span>
              <span className="px-2.5 py-1 bg-[#eceef0] rounded-full text-[9px] font-extrabold text-blue-900 border border-[#c6c6cd]/40">GOSI</span>
            </div>
          </div>
          <div className="absolute -right-6 -bottom-6 opacity-[0.03] pointer-events-none">
            <span className="material-symbols-outlined text-[120px]">verified_user</span>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="glass-card rounded-xl shadow-sm overflow-hidden border border-[#c6c6cd]/30 bg-white">
        <div className="px-6 py-5 border-b border-[#c6c6cd]/30 flex justify-between items-center bg-[#f2f4f6]/50">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-black">Pending Pre-Authorizations</h3>
            <p className="text-xs text-[#45464d]">Reviewing automated decisions and manual escalations.</p>
          </div>
          <div className="flex gap-2.5">
            <button 
              onClick={() => alert("Pushed all pre-auth claims to Daman/AXA portals.")}
              className="px-4 py-2 bg-black text-white rounded-lg text-[11px] font-bold hover:opacity-90 transition-all flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-xs">publish</span>
              Push All to Portal
            </button>
            <button 
              onClick={() => alert("Exporting report PDF...")}
              className="px-4 py-2 border border-[#c6c6cd] text-[#191c1e] rounded-lg text-[11px] font-bold hover:bg-[#eceef0] transition-all"
            >
              Export Report
            </button>
          </div>
        </div>

        <div className="overflow-x-auto text-xs">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#f7f9fb] border-b border-[#c6c6cd]/30">
              <tr>
                <th className="px-6 py-4 font-bold text-[#45464d] uppercase tracking-wider">Carrier</th>
                <th className="px-6 py-4 font-bold text-[#45464d] uppercase tracking-wider">Patient & Procedure</th>
                <th className="px-6 py-4 font-bold text-[#45464d] uppercase tracking-wider">Cost (AED)</th>
                <th className="px-6 py-4 font-bold text-[#45464d] uppercase tracking-wider">Gateway Status</th>
                <th className="px-6 py-4 font-bold text-[#45464d] uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c6c6cd]/25">
              
              {/* Row 1 */}
              <tr className="hover:bg-[#f2f4f6]/20 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded bg-[#eceef0] border border-[#c6c6cd]/40 flex items-center justify-center font-black text-[9px] text-[#006a61]">
                      DAMAN
                    </div>
                    <span className="font-bold text-black">Daman Enhanced</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-bold text-black">Dental Implant (Stage 1)</span>
                    <span className="text-[10px] text-[#45464d] mt-0.5">Zayed Al-Mansouri • #DXB-8821</span>
                  </div>
                </td>
                <td className="px-6 py-4 font-mono font-bold text-black">12,450.00</td>
                <td className="px-6 py-4">
                  {localApprovals["claim-1"] === "Approved" ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#ecfdf5] text-[#065f46] border border-[#a7f3d0] font-bold text-[9px]">
                      <CheckCircle className="h-3 w-3" /> AI Pre-Auth Approved
                    </span>
                  ) : (
                    <span className="text-[#45464d] italic">Claim Overriden</span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => handleAction("claim-1", "Finalized")}
                    className="text-[#006a61] hover:underline font-bold"
                  >
                    Finalize Approval
                  </button>
                </td>
              </tr>

              {/* Row 2 */}
              <tr className="hover:bg-[#f2f4f6]/20 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded bg-[#eceef0] border border-[#c6c6cd]/40 flex items-center justify-center font-black text-[9px] text-red-650 text-red-600">
                      AXA
                    </div>
                    <span className="font-bold text-black">AXA Gulf Executive</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-bold text-black">Laser Resurfacing (Full Face)</span>
                    <span className="text-[10px] text-[#45464d] mt-0.5">Sarah Jenkins • #DXB-9104</span>
                  </div>
                </td>
                <td className="px-6 py-4 font-mono font-bold text-black">8,200.00</td>
                <td className="px-6 py-4">
                  {localApprovals["claim-2"] === "Review" ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#fffbeb] text-[#92400e] border border-[#fde68a] font-bold text-[9px]">
                      <Clock className="h-3 w-3" /> Manual Review Needed
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#ecfdf5] text-[#065f46] border border-[#a7f3d0] font-bold text-[9px]">
                      <CheckCircle className="h-3 w-3" /> Override Approved
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => handleAction("claim-2", "OverrideApproved")}
                    className="text-[#006a61] hover:underline font-bold"
                  >
                    Manual Override
                  </button>
                </td>
              </tr>

              {/* Row 3 */}
              <tr className="hover:bg-[#f2f4f6]/20 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded bg-[#eceef0] border border-[#c6c6cd]/40 flex items-center justify-center font-black text-[9px] text-green-750">
                      THIQA
                    </div>
                    <span className="font-bold text-black">Thiqa Plan 1</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-bold text-black">MRI Scan (Contrast)</span>
                    <span className="text-[10px] text-[#45464d] mt-0.5">Khalid Ibrahim • #DXB-7723</span>
                  </div>
                </td>
                <td className="px-6 py-4 font-mono font-bold text-black">3,150.00</td>
                <td className="px-6 py-4">
                  {localApprovals["claim-3"] === "Rejected" ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#fef2f2] text-[#991b1b] border border-[#fecaca] font-bold text-[9px]">
                      <AlertCircle className="h-3 w-3" /> Rejected - Billing Mismatch
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#ecfdf5] text-[#065f46] border border-[#a7f3d0] font-bold text-[9px]">
                      <CheckCircle className="h-3 w-3" /> Resubmitted
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => handleAction("claim-3", "Resubmitted")}
                    className="text-black hover:underline font-bold px-3 py-1 border border-black rounded-lg"
                  >
                    Re-submit
                  </button>
                </td>
              </tr>

              {/* Row 4 */}
              <tr className="hover:bg-[#f2f4f6]/20 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded bg-[#eceef0] border border-[#c6c6cd]/40 flex items-center justify-center font-black text-[9px] text-blue-900">
                      GOSI
                    </div>
                    <span className="font-bold text-black">GOSI Occupational</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-bold text-black">Physiotherapy Program</span>
                    <span className="text-[10px] text-[#45464d] mt-0.5">Omar Farooq • #DXB-5521</span>
                  </div>
                </td>
                <td className="px-6 py-4 font-mono font-bold text-black">450.00</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#ecfdf5] text-[#065f46] border border-[#a7f3d0] font-bold text-[9px]">
                    <CheckCircle className="h-3 w-3" /> AI Pre-Auth Approved
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => alert("Pushed claim details to provider gateway")}
                    className="text-[#006a61] hover:underline font-bold"
                  >
                    Push to Provider Portal
                  </button>
                </td>
              </tr>

            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 bg-[#f2f4f6]/50 flex justify-between items-center border-t border-[#c6c6cd]/30">
          <span className="text-[10px] font-bold text-[#45464d]">Showing 4 of 14 pending pre-authorizations</span>
          <div className="flex items-center gap-1.5">
            <button className="p-1 hover:bg-[#eceef0] rounded transition-colors"><span className="material-symbols-outlined text-sm">chevron_left</span></button>
            <span className="text-[10px] font-bold text-black bg-white px-2 py-1 rounded border border-[#c6c6cd]/40">1</span>
            <span className="text-[10px] text-[#45464d] px-2 py-1">2</span>
            <button className="p-1 hover:bg-[#eceef0] rounded transition-colors"><span className="material-symbols-outlined text-sm">chevron_right</span></button>
          </div>
        </div>
      </div>

      {/* AI Insight Section (Asymmetric / Glassmorphism) */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 glass-card p-8 rounded-xl relative overflow-hidden ai-glow bg-white border border-[#cf6721]/30">
          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-2 text-[#cf6721]">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
              <h4 className="text-sm font-bold uppercase tracking-wider">AI Automation Engine</h4>
            </div>
            <p className="text-xs text-black leading-relaxed">
              MedFlow AI has identified a 15% increase in "Billing Mismatch" rejections for Thiqa plans this week. We recommend updating the ICD-10 mapping for radiology codes to prevent future delays.
            </p>
            <button 
              onClick={() => alert("ICD-10 auto-fix rule applied!")}
              className="bg-black text-white px-5 py-2.5 rounded-lg font-bold text-xs flex items-center gap-2 hover:opacity-90 transition-all w-fit shadow"
            >
              Apply Auto-Fix Rule
              <Zap className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <div className="w-full md:w-1/3 glass-card p-6 rounded-xl flex flex-col bg-white border border-[#c6c6cd]/30">
          <h4 className="text-xs font-bold uppercase tracking-wider text-black mb-4">Authorization Latency</h4>
          <div className="space-y-4 flex-1 text-xs">
            
            <div className="space-y-1">
              <div className="flex justify-between font-bold text-[#45464d]">
                <span>AI Response Time</span>
                <span>1.2s</span>
              </div>
              <div className="h-2 w-full bg-[#eceef0] rounded-full overflow-hidden">
                <div className="h-full bg-[#006a61] w-[95%]"></div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between font-bold text-[#45464d]">
                <span>Carrier Portal Sync</span>
                <span>45.5s</span>
              </div>
              <div className="h-2 w-full bg-[#eceef0] rounded-full overflow-hidden">
                <div className="h-full bg-[#cf6721] w-[40%]"></div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between font-bold text-[#45464d]">
                <span>Manual Review Queue</span>
                <span>3.4h</span>
              </div>
              <div className="h-2 w-full bg-[#eceef0] rounded-full overflow-hidden">
                <div className="h-full bg-red-650 bg-red-600 w-[65%]"></div>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
