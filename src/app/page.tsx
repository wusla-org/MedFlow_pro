"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRecruitmentStore } from "../store/useRecruitmentStore";
import { 
  Sparkles, CheckCircle, ArrowRight, ShieldCheck, 
  Terminal, RotateCcw, AlertTriangle, FileText, 
  Search, Play, RefreshCw, BarChart2 
} from "lucide-react";

export default function MarketingLandingPage() {
  const { triggerBulkUpload, isUploading, uploadedCount, candidates } = useRecruitmentStore();
  const [activeTab, setActiveTab] = useState<"scribe" | "insurance" | "intake">("scribe");

  // Ingest gameplay handler
  const handleSimulatedIngest = () => {
    triggerBulkUpload();
  };

  return (
    <div className="min-h-screen bg-[#f7f9fb] text-[#191c1e] font-sans selection:bg-[#86f2e4] selection:text-[#006f66] relative overflow-hidden">
      
      {/* Top Navigation */}
      <header className="fixed top-0 w-full z-50 bg-[#f7f9fb]/80 backdrop-blur-xl border-b border-[#c6c6cd]/30 shadow-sm">
        <nav className="flex items-center justify-between px-8 max-w-7xl mx-auto h-20">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#006a61] text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>medical_services</span>
            <span className="text-xl font-extrabold tracking-tight text-black">MedFlow Pro</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-6 text-xs font-bold text-[#45464d]">
            <a className="text-[#006a61] border-b-2 border-[#006a61] pb-1" href="#platform">Platform</a>
            <a className="hover:text-[#006a61] transition-colors" href="#scribe">AI Scribe</a>
            <a className="hover:text-[#006a61] transition-colors" href="#insurance">Insurance</a>
            <a className="hover:text-[#006a61] transition-colors" href="#roi">ROI</a>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="px-5 py-2.5 font-bold text-xs text-[#45464d] hover:bg-[#eceef0]/50 rounded-lg transition-all">
              Enter Portal
            </Link>
            <Link href="/dashboard" className="px-5 py-2.5 bg-black text-white rounded-lg text-xs font-bold hover:opacity-90 transition-all">
              Request Demo
            </Link>
          </div>
        </nav>
      </header>

      <main className="pt-20">
        
        {/* Hero Section */}
        <section className="relative min-h-[750px] flex items-center overflow-hidden py-12" id="platform">
          <div className="relative z-10 max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#86f2e4]/20 text-[#006a61] rounded-full border border-[#006a61]/15">
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                <span className="text-[10px] font-bold uppercase tracking-widest">The Operating System for GCC Healthcare</span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl lg:leading-[58px] font-black text-black tracking-tight">
                Clinic Intelligence: <br/>
                <span className="text-[#006a61]">Healing</span> Over Administration.
              </h1>
              
              <p className="text-sm text-[#45464d] leading-relaxed max-w-lg">
                Empower your medical team with the first AI-powered operating system designed for premium clinics in Dubai, Riyadh, and Doha. Automate chart scribing, pre-auth verification, and onboarding in seconds.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link 
                  href="/dashboard" 
                  className="px-6 py-3.5 bg-black text-white rounded-xl text-xs font-bold shadow-lg hover:translate-y-[-2px] transition-all flex items-center justify-center gap-2"
                >
                  Enter Clinic Command Center
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
                <a 
                  href="#roi" 
                  className="px-6 py-3.5 bg-white border border-[#c6c6cd] text-black rounded-xl text-xs font-bold hover:bg-[#eceef0]/30 transition-all flex items-center justify-center gap-2"
                >
                  See Revenue Impact
                </a>
              </div>
            </div>

            {/* Right side visual mock */}
            <div className="relative">
              <div className="glass-card rounded-[32px] p-4 shadow-xl relative z-20 group bg-white/40">
                <div className="rounded-[24px] overflow-hidden aspect-video bg-[#eceef0]">
                  <img 
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700" 
                    alt="Futuristic Clinic interior Jumeirah" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDV8HMd7G701ABoyr17yWtvodREn4b-K7xt2sreJmPTZFyKnEtezzMCFw52czcb9SG3_pGORtwJ11JjVdusxsW8ZiAPmdMxg_VKVKjXHhvPAlZ3dotbNwWvt9LpZJY_6x8yV4wjesAMyBEvRGRDmVvfWVBwrajXQgIakI8PY02Ww91nZXim5IEqgkmAIHzjbO5KX510jplTbDjewbZ9o62IsrIR9yRPmBnUjhNunEAvDkgTFrsbBYueXC3GD0x2MUDuWgFD-FkzCQ"
                  />
                </div>

                {/* Floating status badge */}
                <div className="absolute -bottom-4 -right-4 glass-card ai-glow p-4 rounded-2xl max-w-xs bg-white/90">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-[#86f2e4]/30 flex items-center justify-center text-[#006a61]">
                      <span className="material-symbols-outlined text-base">mic</span>
                    </div>
                    <div className="text-left">
                      <p className="text-[10px] font-bold text-[#006a61] uppercase tracking-wider">AI Scribe Active</p>
                      <p className="text-[9px] text-[#45464d] font-mono mt-0.5">Structured EMR transcript 98% complete</p>
                    </div>
                  </div>
                  <div className="h-1 w-full bg-[#eceef0] rounded-full overflow-hidden">
                    <div className="h-full bg-[#006a61] w-4/5"></div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-12 -left-12 w-64 h-64 bg-[#86f2e4]/20 rounded-full blur-3xl"></div>
            </div>

          </div>
        </section>

        {/* Ingest Ingestion Playground Section */}
        <section className="py-16 bg-[#f2f4f6]/50 border-y border-[#c6c6cd]/30" id="intake-playground">
          <div className="max-w-7xl mx-auto px-8">
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-5 text-left space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#cf6721]/10 text-[#cf6721] border border-[#cf6721]/20 font-bold text-[9px] uppercase tracking-wider">
                  <span className="material-symbols-outlined text-xs">auto_awesome</span>
                  Live Import Preview
                </div>
                <h2 className="text-3xl font-black text-black tracking-tight">Import 100 Patient Records</h2>
                <p className="text-xs text-[#45464d] leading-relaxed">
                  Run MedFlow's clinical processing system. Uploading parses symptoms, checks insurance approvals against Dubai/Riyadh carrier rules, and sorts active cases.
                </p>

                <div className="pt-2">
                  <button 
                    onClick={handleSimulatedIngest}
                    disabled={isUploading}
                    className="px-6 py-3.5 bg-[#006a61] hover:opacity-90 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    {isUploading ? (
                      <>
                        <RefreshCw className="h-4 w-4 animate-spin" /> Importing & Scanning...
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4" /> Run 100 Intake Scans
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Playground Ingestion HUD (7 cols) */}
              <div className="lg:col-span-7">
                <div className="glass-card rounded-2xl p-5 bg-white border border-[#c6c6cd]/30 shadow-sm min-h-[220px] flex flex-col justify-between relative overflow-hidden">
                  
                  {isUploading && (
                    <div className="absolute inset-x-0 top-0 h-[2.5px] bg-[#006a61] shadow-[0_0_15px_#006a61] opacity-80 animate-scanning"></div>
                  )}

                  <div className="flex justify-between items-center pb-3 border-b border-[#c6c6cd]/20">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#45464d]">Processing Log</span>
                    <span className="text-[9px] px-2 py-0.5 rounded bg-[#f2f4f6] text-[#006a61] font-bold font-mono">
                      {isUploading ? "SCANNING RECORDS..." : uploadedCount > 0 ? "100 RECORDS IMPORTED" : "READY"}
                    </span>
                  </div>

                  <div className="my-3 flex-1 min-h-[100px] flex flex-col justify-center">
                    {isUploading ? (
                      <div className="space-y-3 animate-pulse">
                        <div className="h-3.5 w-3/4 bg-[#eceef0] rounded"></div>
                        <div className="h-3.5 w-1/2 bg-[#eceef0] rounded"></div>
                        <div className="h-3.5 w-2/3 bg-[#eceef0] rounded"></div>
                      </div>
                    ) : uploadedCount > 0 ? (
                      <div className="space-y-3.5 text-left text-xs">
                        <p className="text-[#006a61] font-bold flex items-center gap-1.5">
                          <CheckCircle className="h-4 w-4 text-[#006a61]" /> Batch extraction complete: 12 high-priority clinical files sorted.
                        </p>
                        
                        <div className="grid grid-cols-2 gap-4 text-[10px] pt-1">
                          <div className="p-3 bg-[#f2f4f6] rounded-lg">
                            <span className="font-bold text-black block mb-0.5">Top symptoms extracted:</span>
                            Hyperpigmentation, Caries, Herniations.
                          </div>
                          <div className="p-3 bg-[#f2f4f6] rounded-lg">
                            <span className="font-bold text-black block mb-0.5">Insurance gateways checked:</span>
                            Daman Enhanced, AXA Gulf, Thiqa.
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p className="text-xs text-[#45464d] italic text-center py-6">
                        Click the button above to upload a simulated batch of patient intake PDFs.
                      </p>
                    )}
                  </div>

                  <div className="pt-2 text-[9px] text-[#45464d] font-mono flex justify-between">
                    <span>Dubai Hub pre-auth gateway</span>
                    <span>Confidence Limit: &gt;90%</span>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Bento Grid Solutions */}
        <section className="py-20" id="platform">
          <div className="max-w-7xl mx-auto px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-black text-black tracking-tight mb-3">The MedFlow Platform</h2>
              <p className="text-xs text-[#45464d] max-w-md mx-auto">One unified clinical operating system to handle everything but the care.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 text-left">
              
              {/* Card 1: AI Voice Scribe */}
              <div className="md:col-span-2 glass-card rounded-3xl p-6 bg-white border border-[#c6c6cd]/30 flex flex-col justify-between hover:shadow-lg transition-all">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <div className="w-12 h-12 bg-[#86f2e4]/20 rounded-2xl flex items-center justify-center mb-4 text-[#006a61]">
                      <span className="material-symbols-outlined text-2xl font-bold">keyboard_voice</span>
                    </div>
                    <h3 className="text-sm font-bold text-black">AI Voice Scribe</h3>
                    <p className="text-xs text-[#45464d] mt-1.5 max-w-sm">
                      Ambient AI that transcribes natural consultations directly into structured EMR records with medical coding precision.
                    </p>
                  </div>
                  <span className="material-symbols-outlined text-[#cf6721]/30 text-3xl">spark</span>
                </div>
                <div className="bg-[#f2f4f6] rounded-xl p-4 font-mono text-[10px] text-[#45464d]">
                  <div className="flex gap-2 text-[#006a61] font-bold mb-1.5">
                    <span className="animate-pulse">●</span> Processing clinical dictation...
                  </div>
                  <p>"Patient presents with localized inflammation in the lower-right molar quadrant. Recommend immediate diagnostic imaging..."</p>
                </div>
              </div>

              {/* Card 2: Insurance Gateway */}
              <div className="glass-card rounded-3xl p-6 bg-white border border-[#c6c6cd]/30 flex flex-col hover:shadow-lg transition-all justify-between">
                <div>
                  <div className="w-12 h-12 bg-[#eceef0] rounded-2xl flex items-center justify-center mb-4 text-black">
                    <span className="material-symbols-outlined text-2xl font-bold">verified_user</span>
                  </div>
                  <h3 className="text-sm font-bold text-black">Insurance Gateway</h3>
                  <p className="text-xs text-[#45464d] mt-1.5">
                    Instant pre-auth verification for Daman, AXA, Thiqa, and major GCC carriers. Zero manual billing friction.
                  </p>
                </div>
                <div className="pt-6 flex -space-x-1.5">
                  <div className="w-10 h-10 rounded-full border-2 border-white bg-[#f2f4f6] flex items-center justify-center text-[8px] font-extrabold text-[#006a61]">DAMAN</div>
                  <div className="w-10 h-10 rounded-full border-2 border-white bg-[#f2f4f6] flex items-center justify-center text-[8px] font-extrabold text-red-600">AXA</div>
                  <div className="w-10 h-10 rounded-full border-2 border-white bg-[#f2f4f6] flex items-center justify-center text-[8px] font-extrabold text-green-700">THIQA</div>
                </div>
              </div>

              {/* Card 3: Intelligent Intake */}
              <div className="glass-card rounded-3xl p-6 bg-white border border-[#c6c6cd]/30 flex flex-col hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-[#86f2e4]/20 rounded-2xl flex items-center justify-center mb-4 text-[#006a61]">
                  <span className="material-symbols-outlined text-2xl font-bold">assignment_ind</span>
                </div>
                <h3 className="text-sm font-bold text-black">Intelligent Intake</h3>
                <p className="text-xs text-[#45464d] mt-1.5">
                  10x faster patient onboarding speed with automated history parsing and biometric clinical verification.
                </p>
              </div>

              {/* Card 4: Clinical Director View */}
              <div className="md:col-span-2 glass-card rounded-3xl p-6 bg-white border border-[#c6c6cd]/30 flex flex-col lg:flex-row items-center gap-6 hover:shadow-lg transition-all">
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-black">Clinical Director View</h3>
                  <p className="text-xs text-[#45464d] mt-1.5">
                    High-level capacity metrics, case sheet reviews, and automated treatment sign-offs for multisite clinic networks.
                  </p>
                </div>
                <div className="hidden lg:block w-1/2 aspect-[4/3] rounded-xl overflow-hidden shadow-sm border border-[#c6c6cd]/40">
                  <img 
                    className="w-full h-full object-cover" 
                    alt="Clinic Capacity Metrics Graph" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZuSWgR3jWHZ4se0V-N1Oe3ZX4eaYfQPNSrLctjyTJPRybdfYzWgkAjZ3Rhaitt9GK2gjc807FLjgv-Hb0WcYQoc1VSU3hrORY-7NN-YDEfeMpGw_yvnntXioxEDZUUMnA87t_BdL0vboYa0Ozz9I7bVNAZcIjlUVAo_7xTQLdfhu1D6Vr4jdSjFIJGRBOPiTZ8Ezi3r7Tw2Adi34B4JcUR3Y4OcuuWAib4dEZqH7aQngITxKXaNSoISeM6rZY6r3_KmqcxzsVUA"
                  />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ROI Metrics */}
        <section className="py-20 bg-black text-white relative overflow-hidden" id="roi">
          <div className="max-w-7xl mx-auto px-8 relative z-10">
            
            <div className="text-center mb-12">
              <h2 className="text-3xl font-black text-white tracking-tight">Revenue & Efficiency Impact</h2>
              <p className="text-xs text-slate-400 mt-1">Real-world impact across GCC's leading clinical networks.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center space-y-1">
                <p className="text-5xl font-black text-[#89f5e7] font-mono">85%</p>
                <p className="text-xs font-bold text-slate-350">Charting Time Reduction</p>
              </div>
              <div className="text-center space-y-1">
                <p className="text-5xl font-black text-[#89f5e7] font-mono">10x</p>
                <p className="text-xs font-bold text-slate-350">Onboarding Speed</p>
              </div>
              <div className="text-center space-y-1">
                <p className="text-5xl font-black text-[#89f5e7] font-mono">4.2x</p>
                <p className="text-xs font-bold text-slate-350">Patient Capacity Increase</p>
              </div>
            </div>

          </div>
        </section>

        {/* Target Audience (Specialties) */}
        <section className="py-16 bg-white border-b border-[#c6c6cd]/30" id="specialties">
          <div className="max-w-7xl mx-auto px-8">
            
            <div className="text-center mb-12">
              <h2 className="text-xl font-black text-black uppercase tracking-wider">Engineered for Specialties</h2>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              
              <div className="p-6 rounded-2xl hover:bg-[#86f2e4]/10 transition-all group">
                <div className="w-16 h-16 mx-auto bg-[#f2f4f6] rounded-full flex items-center justify-center mb-3 group-hover:bg-[#86f2e4]/20 transition-all text-black">
                  <span className="material-symbols-outlined text-3xl">dentistry</span>
                </div>
                <h4 className="text-xs font-bold text-black">Dental</h4>
              </div>

              <div className="p-6 rounded-2xl hover:bg-[#86f2e4]/10 transition-all group">
                <div className="w-16 h-16 mx-auto bg-[#f2f4f6] rounded-full flex items-center justify-center mb-3 group-hover:bg-[#86f2e4]/20 transition-all text-black">
                  <span className="material-symbols-outlined text-3xl">face_retouching_natural</span>
                </div>
                <h4 className="text-xs font-bold text-black">Aesthetic</h4>
              </div>

              <div className="p-6 rounded-2xl hover:bg-[#86f2e4]/10 transition-all group">
                <div className="w-16 h-16 mx-auto bg-[#f2f4f6] rounded-full flex items-center justify-center mb-3 group-hover:bg-[#86f2e4]/20 transition-all text-black">
                  <span className="material-symbols-outlined text-3xl">content_cut</span>
                </div>
                <h4 className="text-xs font-bold text-black">Cosmetic</h4>
              </div>

              <div className="p-6 rounded-2xl hover:bg-[#86f2e4]/10 transition-all group">
                <div className="w-16 h-16 mx-auto bg-[#f2f4f6] rounded-full flex items-center justify-center mb-3 group-hover:bg-[#86f2e4]/20 transition-all text-black">
                  <span className="material-symbols-outlined text-3xl">rebase_edit</span>
                </div>
                <h4 className="text-xs font-bold text-black">Physio / Rehab</h4>
              </div>

            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 max-w-5xl mx-auto px-8">
          <div className="bg-[#131b2e] text-white rounded-[40px] p-12 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#006a61]/20 rounded-full blur-3xl"></div>
            <div className="relative z-10 space-y-6">
              <h2 className="text-3xl font-black text-white leading-tight">Stop Losing Revenue to <br/>Operational Chaos</h2>
              <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                Missed appointments, reception overload, and scattered patient data cost your clinic thousands every month. MedFlow Pro eliminates all of it.
              </p>
              <div className="pt-4">
                <Link 
                  href="/dashboard"
                  className="px-8 py-4 bg-[#89f5e7] text-[#00201d] font-bold text-xs rounded-xl hover:scale-102 transition-all inline-block shadow-lg"
                >
                  Request Private Demo
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="w-full py-12 bg-[#2d3133] border-t border-[#c6c6cd]/10">
        <div className="flex flex-col items-center justify-center space-y-4 px-8 max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-[#89f5e7] text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>medical_services</span>
            <span className="text-sm font-black text-white">MedFlow Pro</span>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-xs text-slate-400 text-center">
            <a className="hover:text-white transition-colors" href="#">Privacy Policy</a>
            <a className="hover:text-white transition-colors" href="#">Terms of Service</a>
            <a className="hover:text-white transition-colors" href="#">Security</a>
            <a className="hover:text-white transition-colors" href="#">API Documentation</a>
            <a className="hover:text-white transition-colors" href="#">Contact Support</a>
          </div>

          <p className="text-[10px] text-slate-500 text-center">
            © 2026 MedFlow Pro. AI-Powered Clinic Operating System. Dubai · Riyadh · Doha
          </p>
        </div>
      </footer>

    </div>
  );
}
