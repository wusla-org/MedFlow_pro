"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRecruitmentStore } from "../../../store/useRecruitmentStore";
import { 
  Search, Plus, Send, FileText, 
  Mail, MessageSquare, Mic, MicOff, X 
} from "lucide-react";

export default function PatientDirectory() {
  const { 
    currentJobId, jobs, candidates, whatsAppChats, 
    updateCandidateStatus, addCandidate, sendWhatsAppMessage 
  } = useRecruitmentStore();

  const activeJob = jobs.find(j => j.id === currentJobId) || jobs[0];

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [visaFilter, setVisaFilter] = useState("all");
  const [selectedCandidateId, setSelectedCandidateId] = useState<string>("cand-initial-1");

  const [showAddModal, setShowAddModal] = useState(false);
  const [activeCommTab, setActiveCommTab] = useState<"whatsapp" | "linkedin" | "email">("whatsapp");
  const [chatInput, setChatInput] = useState("");

  // Voice AI Dictation State
  const [isDictating, setIsDictating] = useState(false);
  const [dictatedText, setDictatedText] = useState("");
  const dictationInterval = useRef<any>(null);

  // Form State
  const [formName, setFormName] = useState("");
  const [formAge, setFormAge] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formLoc, setFormLoc] = useState("");
  const [formNat, setFormNat] = useState("");
  const [formExp, setFormExp] = useState("");
  const [formVisa, setFormVisa] = useState<any>("Immediate Joiner (Resident)");
  const [formSkills, setFormSkills] = useState("");
  const [formRole, setFormRole] = useState("");
  const [formPrev, setFormPrev] = useState("");
  const [formNotes, setFormNotes] = useState("");

  const handleRegisterCandidate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formPhone) return;

    const cand = addCandidate({
      name: formName,
      age: parseInt(formAge) || 30,
      phone: formPhone,
      email: formEmail,
      location: formLoc || "Dubai, UAE",
      nationality: formNat || "Emirati",
      experienceYears: parseInt(formExp) || 3,
      skills: formSkills ? formSkills.split(",").map(s => s.trim()) : ["Dental Veneers"],
      visaStatus: formVisa,
      drivingLicense: true, // Consent signed
      score: 95,
      status: "Applied", // Intake
      currentRole: formRole || "Orthodontic Crowding",
      previousEmployer: formPrev || "Dr. Sarah Al-Sayed",
      jobId: currentJobId,
      notes: formNotes
    });

    setFormName("");
    setFormAge("");
    setFormPhone("");
    setFormEmail("");
    setFormLoc("");
    setFormNat("");
    setFormExp("");
    setFormSkills("");
    setFormRole("");
    setFormPrev("");
    setFormNotes("");
    setShowAddModal(false);
    setSelectedCandidateId(cand.id);
  };

  // Filter patients
  const jobCandidates = candidates.filter(c => {
    const matchesJob = c.jobId === currentJobId;
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.nationality.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    
    let matchesVisa = true;
    if (visaFilter !== "all") {
      matchesVisa = c.visaStatus === visaFilter;
    }
    return matchesJob && matchesSearch && matchesVisa;
  });

  const activeCandidate = candidates.find(c => c.id === selectedCandidateId) || jobCandidates[0] || candidates[0];
  const activeChat = whatsAppChats.find(chat => chat.candidateName === activeCandidate?.name);

  const saveDictatedNotes = (text: string) => {
    if (!activeCandidate) return;
    const updatedNotes = activeCandidate.notes ? `${activeCandidate.notes} ${text}` : text;
    
    useRecruitmentStore.setState((state) => ({
      candidates: state.candidates.map((c) => 
        c.id === activeCandidate.id ? { ...c, notes: updatedNotes } : c
      )
    }));
    
    useRecruitmentStore.getState().addActivityLog(`Voice AI dictated notes saved for patient ${activeCandidate.name}.`, "success");
  };

  const handleToggleVoiceDictation = () => {
    if (isDictating) {
      clearInterval(dictationInterval.current);
      setIsDictating(false);
      if (dictatedText) {
        saveDictatedNotes(dictatedText);
      }
    } else {
      setIsDictating(true);
      setDictatedText("");
      const fullText = "Patient Sarah Al-Mansoori reports severe sensitivity in the upper right quadrant. Visual examination reveals deep caries on the distal of the second premolar. Recommend immediate endodontic treatment. Digital consent obtained, AXA pre-auth sent.";
      let index = 0;
      
      dictationInterval.current = setInterval(() => {
        if (index < fullText.length) {
          setDictatedText(prev => prev + fullText[index]);
          index++;
        } else {
          clearInterval(dictationInterval.current);
          setIsDictating(false);
          saveDictatedNotes(fullText);
        }
      }, 30);
    }
  };

  useEffect(() => {
    return () => clearInterval(dictationInterval.current);
  }, []);

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || !activeChat) return;

    sendWhatsAppMessage(activeChat.id, 'ai', chatInput);
    const textToSend = chatInput;
    setChatInput("");

    setTimeout(() => {
      let replyText = "مفهوم. سأقوم بمراجعة مواعيدي وتأكيدها معكم قريباً.";
      if (textToSend.toLowerCase().includes("insurance") || textToSend.toLowerCase().includes("coverage")) {
        replyText = `تأمين ضمان بلاتينيوم الخاص بي يغطي الاستشارة الطبية بالكامل.`;
      } else if (textToSend.toLowerCase().includes("appointment") || textToSend.toLowerCase().includes("time")) {
        replyText = "يوم الخميس صباحاً مناسب لي جداً. الرجاء إرسال تفاصيل العيادة.";
      }
      sendWhatsAppMessage(activeChat.id, 'candidate', replyText);
    }, 1500);
  };

  const getTimeline = () => {
    if (!activeCandidate) return [];
    
    const events = [
      { id: "e1", time: activeCandidate.parsedAt || new Date().toISOString(), title: "Intake Form Parsed", desc: "AI extracted symptoms and insurance coverage plans from uploader PDF." },
      { id: "e2", time: new Date().toISOString(), title: "WhatsApp Intake Complete", desc: "Patient symptoms verified by bot. Medical digital consent signed." },
      { id: "e3", time: new Date().toISOString(), title: "Diagnostic Score: Confirmed", desc: `AI diagnostic accuracy calculated at ${activeCandidate.score}%.` }
    ];

    if (activeCandidate.status === 'Interviewing') {
      events.push({ id: "e4", time: new Date().toISOString(), title: "Approved for Treatment", desc: "Medical Director signed and approved treatment plan proposal." });
    }

    return events;
  };

  const timeline = getTimeline();
  const isArabicText = (text: string) => /[\u0600-\u06FF]/.test(text);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative text-left font-sans text-xs">
      
      {/* LEFT SIDE: Directory list (4 cols) */}
      <div className="lg:col-span-4 flex flex-col gap-4">
        <div className="glass-card rounded-2xl p-4 bg-white border border-[#c6c6cd]/30 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-black">Patient Directory</h3>
            <button
              onClick={() => setShowAddModal(true)}
              className="p-1.5 rounded-lg bg-black text-white hover:opacity-90 transition-all flex items-center gap-1 text-[10px] font-bold"
            >
              <Plus className="h-3.5 w-3.5" /> Register Patient
            </button>
          </div>

          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#f2f4f6] border border-[#c6c6cd]/30">
            <Search className="h-4 w-4 text-[#45464d]" />
            <input 
              type="text" 
              placeholder="Search name, procedures, nationality..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none text-xs text-black placeholder-[#45464d]/60 outline-none w-full focus:ring-0"
            />
          </div>

          <div className="flex items-center gap-1.5 px-2 py-1.5 rounded bg-[#f2f4f6] border border-[#c6c6cd]/30 text-[10px]">
            <span className="text-[#45464d] font-bold">Insurance:</span>
            <select
              value={visaFilter}
              onChange={(e) => setVisaFilter(e.target.value)}
              className="bg-transparent text-black border-none outline-none font-bold flex-1 focus:ring-0"
            >
              <option value="all">All Plans</option>
              <option value="Immediate Joiner (Resident)">Daman Premium</option>
              <option value="Visa Sponsorship Required">Self Pay (Aesthetic)</option>
              <option value="Emiratisation Eligible">Thiqa Covered</option>
            </select>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-2 bg-white border border-[#c6c6cd]/30 space-y-1.5 max-h-[460px] overflow-y-auto pr-1">
          {jobCandidates.length === 0 ? (
            <p className="text-xs text-slate-400 text-center py-12">No patient records found.</p>
          ) : (
            jobCandidates.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCandidateId(c.id)}
                className={`w-full p-3 rounded-xl text-left transition-all border flex items-center justify-between group ${
                  selectedCandidateId === c.id 
                    ? "bg-[#86f2e4]/15 border-[#006a61] text-[#006a61] shadow-sm font-bold" 
                    : "bg-[#f2f4f6]/30 hover:bg-[#eceef0]/30 border-transparent text-[#191c1e]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="h-8.5 w-8.5 rounded-lg bg-[#eceef0] flex items-center justify-center text-[#45464d] font-bold text-xs shrink-0">
                    {c.name[0]}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-black">{c.name}</h4>
                    <p className="text-[10px] text-[#45464d] mt-0.5">{c.nationality} • {c.age} yrs old</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-[#006a61] font-mono">{c.score}%</span>
              </button>
            ))
          )}
        </div>
      </div>

      {/* RIGHT SIDE: Patient folder (8 cols) */}
      <div className="lg:col-span-8 space-y-6">
        {activeCandidate ? (
          <>
            <div className="p-5 rounded-2xl bg-white glass-card border border-[#c6c6cd]/30 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-[#86f2e4]/20 border border-[#006a61]/20 flex items-center justify-center text-[#006a61] font-extrabold text-lg">
                  {activeCandidate.name[0]}
                </div>
                <div>
                  <h2 className="text-sm font-bold text-black flex items-center gap-2">
                    {activeCandidate.name}
                    <span className="text-[9px] px-2 py-0.5 rounded bg-[#f2f4f6] border border-[#c6c6cd]/30 text-[#45464d] font-bold font-mono">
                      {activeCandidate.id}
                    </span>
                  </h2>
                  <p className="text-[10px] text-[#45464d] mt-0.5">
                    Diagnosis: {activeCandidate.currentRole} • Specialist Attending: {activeCandidate.previousEmployer}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[9px] uppercase font-bold tracking-wider px-2.5 py-1 rounded bg-[#f2f4f6] border border-[#c6c6cd]/40 text-[#006a61] font-mono">
                  Confidence: {activeCandidate.score}%
                </span>
                <select
                  value={activeCandidate.status}
                  onChange={(e) => updateCandidateStatus(activeCandidate.id, e.target.value as any)}
                  className="bg-white border border-[#c6c6cd] rounded-lg p-2 text-[10px] font-bold text-[#006a61] outline-none"
                >
                  <option value="Applied">Intake</option>
                  <option value="Shortlisted">Scheduled</option>
                  <option value="Screened">In Consultation</option>
                  <option value="Interviewing">Treatment</option>
                  <option value="Offered">Post-op Followup</option>
                  <option value="Rejected">Discharged</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 rounded-xl bg-white border border-[#c6c6cd]/30 space-y-1">
                <span className="text-[9px] text-[#45464d] uppercase tracking-wider font-bold">Insurance Status</span>
                <p className="font-bold text-[#006a61] pt-1">
                  {activeCandidate.visaStatus === 'Immediate Joiner (Resident)' ? 'Daman Premium' :
                   activeCandidate.visaStatus === 'Saudi National (Saudization)' ? 'GOSI Covered' :
                   activeCandidate.visaStatus === 'Emiratisation Eligible' ? 'Thiqa Covered' :
                   'AXA Premium'}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#c6c6cd]/30 space-y-1">
                <span className="text-[9px] text-[#45464d] uppercase tracking-wider font-bold">Medical Consent</span>
                <p className="font-bold text-[#006a61] pt-1">
                  {activeCandidate.drivingLicense ? "✓ Digital Consent Signed" : "✗ Missing Signature"}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#c6c6cd]/30 space-y-1">
                <span className="text-[9px] text-[#45464d] uppercase tracking-wider block font-bold">Contact Details</span>
                <p className="text-[10px] text-black mt-1 truncate">{activeCandidate.phone}</p>
                <p className="text-[10px] text-[#45464d] truncate">{activeCandidate.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-7 glass-card rounded-2xl p-5 bg-white border border-[#c6c6cd]/30 space-y-4 shadow-sm">
                <div className="flex items-center justify-between pb-2 border-b border-[#c6c6cd]/20">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-black flex items-center gap-1.5">
                    <Mic className="h-4 w-4 text-[#cf6721]" />
                    AI Medical Scribe Console
                  </h4>
                  <span className="text-[9px] text-[#45464d] font-mono">Voice AI</span>
                </div>

                <div className="space-y-4">
                  {isDictating ? (
                    <div className="h-14 rounded-xl bg-[#f2f4f6] flex items-center justify-center gap-1.5 border border-[#cf6721]/30 shadow-sm relative overflow-hidden">
                      <div className="w-1.5 h-6 bg-[#cf6721] rounded-full animate-wave-bar" style={{ animationDelay: "0.1s" }}></div>
                      <div className="w-1.5 h-10 bg-[#cf6721] rounded-full animate-wave-bar" style={{ animationDelay: "0.3s" }}></div>
                      <div className="w-1.5 h-7 bg-[#cf6721] rounded-full animate-wave-bar" style={{ animationDelay: "0.5s" }}></div>
                      <div className="w-1.5 h-11 bg-[#cf6721] rounded-full animate-wave-bar" style={{ animationDelay: "0.2s" }}></div>
                    </div>
                  ) : (
                    <div className="h-14 rounded-xl bg-[#f2f4f6]/60 border border-[#c6c6cd]/20 flex items-center justify-center text-[#45464d] italic">
                      Mic offline. Click Dictate to record consultant notes.
                    </div>
                  )}

                  {dictatedText && (
                    <div className="p-3 bg-[#f2f4f6] rounded-xl border border-[#c6c6cd]/30 font-mono text-[10px] text-black max-h-[80px] overflow-y-auto">
                      <span className="text-[#cf6721] font-bold block mb-1">Dictation Log:</span>
                      {dictatedText}
                    </div>
                  )}

                  <button
                    onClick={handleToggleVoiceDictation}
                    className={`w-full py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm ${
                      isDictating 
                        ? "bg-red-50 border border-red-300 text-red-650" 
                        : "bg-[#86f2e4]/20 hover:bg-[#86f2e4]/30 border border-[#006a61]/30 text-[#006f66]"
                    }`}
                  >
                    {isDictating ? (
                      <>
                        <MicOff className="h-4 w-4" /> Stop Recording & Save
                      </>
                    ) : (
                      <>
                        <Mic className="h-4 w-4 animate-pulse" /> Dictate Consultation Notes
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="md:col-span-5 glass-card rounded-2xl p-5 bg-white border border-[#c6c6cd]/30 space-y-3 shadow-sm">
                <h4 className="text-xs font-bold uppercase tracking-wider text-black">Prescribed Procedures</h4>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {activeCandidate.skills.map((s, i) => (
                    <span key={i} className="px-2.5 py-1 rounded bg-[#f2f4f6] border border-[#c6c6cd]/30 text-[10px] text-black font-semibold">
                      {s}
                    </span>
                  ))}
                </div>
                <div className="p-3 rounded-lg bg-[#f2f4f6]/50 border border-[#c6c6cd]/20 text-[10px] text-[#45464d] mt-4 leading-relaxed">
                  <span className="font-bold text-black block mb-0.5">Clinical Scribe Notes:</span>
                  "{activeCandidate.notes || "Parsed successfully with zero compliance warnings."}"
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Stepper (5 cols) */}
              <div className="md:col-span-5 glass-card rounded-2xl p-5 bg-white border border-[#c6c6cd]/30 space-y-4 shadow-sm">
                <h3 className="text-xs font-bold uppercase tracking-wider text-black">Case File Logs</h3>
                <div className="relative border-l border-[#c6c6cd]/40 pl-4 space-y-5 ml-2 pt-2 max-h-[300px] overflow-y-auto pr-1">
                  {timeline.map((evt) => (
                    <div key={evt.id} className="relative text-xs">
                      <span className="absolute -left-[21px] top-1.5 h-2 w-2 rounded-full bg-[#006a61] border border-white shadow-sm"></span>
                      <div className="space-y-0.5">
                        <span className="text-[9px] text-[#45464d] font-mono">
                          {new Date(evt.time).toLocaleDateString([], {month:'short', day:'numeric'})}
                        </span>
                        <h4 className="font-bold text-black">{evt.title}</h4>
                        <p className="text-[10px] text-[#45464d] leading-normal">{evt.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chat Inbox (7 cols) */}
              <div className="md:col-span-7 glass-card rounded-2xl overflow-hidden flex flex-col h-[380px] bg-white border border-[#c6c6cd]/30 shadow-sm">
                <div className="flex bg-[#f2f4f6]/50 border-b border-[#c6c6cd]/20 text-xs">
                  <button 
                    onClick={() => setActiveCommTab("whatsapp")}
                    className={`flex-1 py-3 font-bold text-center border-r border-[#c6c6cd]/10 flex items-center justify-center gap-1.5 transition-all ${
                      activeCommTab === "whatsapp" ? "bg-white text-[#006a61] border-b-2 border-b-[#006a61]" : "text-[#45464d] hover:text-black"
                    }`}
                  >
                    <MessageSquare className="h-4 w-4 text-[#006a61]" /> WhatsApp
                  </button>
                  <button 
                    onClick={() => setActiveCommTab("linkedin")}
                    className={`flex-1 py-3 font-bold text-center border-r border-[#c6c6cd]/10 flex items-center justify-center gap-1.5 transition-all ${
                      activeCommTab === "linkedin" ? "bg-white text-[#006a61] border-b-2 border-b-[#006a61]" : "text-[#45464d] hover:text-black"
                    }`}
                  >
                    <FileText className="h-4 w-4 text-blue-650 text-blue-600" /> Patient Chart
                  </button>
                  <button 
                    onClick={() => setActiveCommTab("email")}
                    className={`flex-1 py-3 font-bold text-center flex items-center justify-center gap-1.5 transition-all ${
                      activeCommTab === "email" ? "bg-white text-[#006a61] border-b-2 border-b-[#006a61]" : "text-[#45464d] hover:text-black"
                    }`}
                  >
                    <Mail className="h-4 w-4 text-[#006a61]" /> Referral Dispatch
                  </button>
                </div>

                <div className="flex-1 p-3 overflow-y-auto space-y-3 text-[11px] leading-relaxed bg-[#f7f9fb]/20">
                  {activeCommTab === "whatsapp" && (
                    <>
                      {activeChat ? (
                        activeChat.messages.map((m) => {
                          const isArabic = isArabicText(m.text);
                          return (
                            <div 
                              key={m.id} 
                              className={`flex ${m.sender === 'ai' ? 'justify-start' : 'justify-end'}`}
                              dir={isArabic ? "rtl" : "ltr"}
                            >
                              <div className={`p-2.5 rounded-xl max-w-[85%] border ${
                                m.sender === 'ai' 
                                  ? 'bg-[#86f2e4]/10 border-[#006a61]/20 text-black' 
                                  : 'bg-white text-black border-[#c6c6cd]/30 shadow-sm'
                              }`}>
                                <p className={isArabic ? "text-right" : "text-left"}>{m.text}</p>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <p className="text-slate-400 italic text-center py-12">No active WhatsApp logs.</p>
                      )}
                    </>
                  )}

                  {activeCommTab === "linkedin" && (
                    <div className="p-3 bg-blue-50 border border-blue-200 text-black rounded-xl space-y-1">
                      <span className="font-bold text-blue-750 block mb-1">Primary Clinical Case:</span>
                      Patient registered under diagnosis: {activeCandidate.currentRole}. Attending therapist: {activeCandidate.previousEmployer}. Medical history includes dental implants consult. Next checkup scheduled via room scheduler.
                    </div>
                  )}

                  {activeCommTab === "email" && (
                    <div className="p-3 rounded-xl bg-white border border-[#c6c6cd]/30 space-y-3 shadow-sm">
                      <div className="space-y-1 font-mono text-[9px] text-[#45464d] border-b border-[#c6c6cd]/20 pb-2">
                        <p>From: referrals@medflow-gateway.ae</p>
                        <p>To: approvals@daman.ae</p>
                      </div>
                      <p className="text-black">
                        Dear Daman Approvals,<br /><br />
                        We have submitted clinical pre-auth request for patient **{activeCandidate.name}**. Treatment: **{activeCandidate.skills.join(', ')}**.
                      </p>
                      <button 
                        onClick={() => alert("Pre-auth claim request submitted successfully!")}
                        className="px-3 py-1.5 rounded-lg bg-[#006a61] hover:opacity-90 text-white font-bold text-[9px] transition-all"
                      >
                        Submit Pre-Auth Claim to Daman
                      </button>
                    </div>
                  )}
                </div>

                {activeCommTab === "whatsapp" && activeChat && (
                  <form onSubmit={handleSendChat} className="p-2 bg-white border-t border-[#c6c6cd]/25 flex gap-2">
                    <input 
                      type="text" 
                      placeholder="Type WhatsApp reply..."
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      className="flex-1 bg-[#f2f4f6] border border-[#c6c6cd]/30 rounded-xl px-2.5 py-2 text-[10px] text-black outline-none focus:border-[#006a61]"
                    />
                    <button type="submit" className="p-2 rounded-xl bg-[#006a61] text-white flex items-center justify-center hover:opacity-90">
                      <Send className="h-3.5 w-3.5" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="glass-card rounded-2xl p-12 text-center text-xs text-slate-400 italic bg-white">
            Select a patient file chart from the directory list.
          </div>
        )}
      </div>

      {/* ADD MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white border border-[#c6c6cd]/40 shadow-2xl rounded-3xl p-6 w-full max-w-md relative">
            <button 
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 text-[#45464d] hover:text-black"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="text-sm font-bold text-black flex items-center gap-2 mb-4">
              <FileText className="h-5 w-5 text-[#006a61]" />
              Register Patient Case Chart
            </h3>

            <form onSubmit={handleRegisterCandidate} className="space-y-4 text-xs font-semibold">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] text-[#45464d] block font-bold">Patient Name</label>
                  <input 
                    required
                    type="text" 
                    placeholder="Sarah Al-Mansoori"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full p-2 bg-[#f2f4f6] border border-[#c6c6cd]/30 rounded-xl text-black"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-[#45464d] block font-bold">Age</label>
                  <input 
                    required
                    type="number" 
                    placeholder="28"
                    value={formAge}
                    onChange={(e) => setFormAge(e.target.value)}
                    className="w-full p-2 bg-[#f2f4f6] border border-[#c6c6cd]/30 rounded-xl text-black"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] text-[#45464d] block font-bold">Mobile</label>
                  <input 
                    required
                    type="text" 
                    placeholder="+971 52 111 2233"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    className="w-full p-2 bg-[#f2f4f6] border border-[#c6c6cd]/30 rounded-xl text-black"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-[#45464d] block font-bold">Email</label>
                  <input 
                    required
                    type="email" 
                    placeholder="s.mansoori@gov.ae"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    className="w-full p-2 bg-[#f2f4f6] border border-[#c6c6cd]/30 rounded-xl text-black"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] text-[#45464d] block font-bold">Insurance coverage</label>
                  <select
                    value={formVisa}
                    onChange={(e) => setFormVisa(e.target.value as any)}
                    className="w-full p-2 bg-[#f2f4f6] border border-[#c6c6cd]/30 rounded-xl text-black"
                  >
                    <option value="Immediate Joiner (Resident)">Daman Platinum</option>
                    <option value="Visa Sponsorship Required">Self Pay (Cash)</option>
                    <option value="Emiratisation Eligible">Thiqa Covered</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-[#45464d] block font-bold">Primary Diagnosis</label>
                  <input 
                    type="text" 
                    placeholder="Orthodontic Crowding"
                    value={formRole}
                    onChange={(e) => setFormRole(e.target.value)}
                    className="w-full p-2 bg-[#f2f4f6] border border-[#c6c6cd]/30 rounded-xl text-black"
                  />
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-[#f2f4f6] border border-[#c6c6cd]/30 text-[#45464d] text-center"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#006a61] text-white text-center font-bold"
                >
                  Register Patient
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
