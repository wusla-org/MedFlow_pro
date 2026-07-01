import { create } from 'zustand';
import { 
  Job, Candidate, WhatsAppChatSession, 
  mockJobs, mockInitialCandidates, mockUploadedCandidates, mockWhatsAppChats 
} from '../utils/candidateMock';

interface ActivityLog {
  id: string;
  time: string;
  type: "info" | "success" | "warning" | "query";
  message: string;
}

interface RecruitmentState {
  currentJobId: string;
  jobs: Job[];
  candidates: Candidate[];
  whatsAppChats: WhatsAppChatSession[];
  isUploading: boolean;
  uploadedCount: number;
  activityLogs: ActivityLog[];
  
  // Actions
  setJobId: (id: string) => void;
  updateCandidateStatus: (id: string, status: Candidate['status']) => void;
  triggerBulkUpload: () => Promise<void>;
  addCandidate: (cand: Omit<Candidate, 'id'>) => Candidate;
  addActivityLog: (message: string, type?: ActivityLog['type']) => void;
  sendWhatsAppMessage: (chatId: string, sender: 'candidate' | 'ai', text: string) => void;
  approveEmployerCandidate: (candId: string) => void;
  rejectEmployerCandidate: (candId: string) => void;
  resetMockData: () => void;
}

export const useRecruitmentStore = create<RecruitmentState>((set, get) => ({
  currentJobId: 'job-hvac',
  jobs: mockJobs,
  candidates: mockInitialCandidates,
  whatsAppChats: mockWhatsAppChats,
  isUploading: false,
  uploadedCount: 0,
  activityLogs: [
    { id: "log-1", time: new Date().toLocaleTimeString([], {hour12:false}), type: "info", message: "MedFlow Pro clinical operating system online." },
    { id: "log-2", time: new Date().toLocaleTimeString([], {hour12:false}), type: "success", message: "Synced insurance gateway with Daman, AXA, and Thiqa portals." }
  ],

  setJobId: (id) => set({ currentJobId: id }),

  updateCandidateStatus: (id, status) => {
    set((state) => ({
      candidates: state.candidates.map((c) => 
        c.id === id ? { ...c, status } : c
      )
    }));

    const cand = get().candidates.find(c => c.id === id);
    if (cand) {
      get().addActivityLog(`Status of candidate ${cand.name} updated to ${status.toUpperCase()}.`, "info");
      
      // Auto notification log simulation
      if (status === 'Interviewing') {
        get().addActivityLog(`Interview invitation WhatsApp notification sent to ${cand.name}.`, "success");
      }
    }
  },

  triggerBulkUpload: async () => {
    set({ isUploading: true });
    get().addActivityLog("Initializing bulk Patient Intake document parsing queue for 100 files.", "query");
    
    // Simulate parsing delays
    await new Promise((resolve) => setTimeout(resolve, 2500));

    set((state) => {
      // Avoid duplicate uploads if triggered multiple times
      const hasUploaded = state.candidates.some(c => c.id.includes("cand-hvac"));
      const newCandidates = hasUploaded ? state.candidates : [...state.candidates, ...mockUploadedCandidates];
      
      return {
        candidates: newCandidates,
        isUploading: false,
        uploadedCount: 100
      };
    });

    get().addActivityLog("Ingested 100 patient intake records successfully.", "success");
    get().addActivityLog("AI Extracted Symptoms, Insurance Coverages, and Clinical History.", "info");
    get().addActivityLog("Ingested: 12 matches for Dental & Orthodontics (4 Daman Premium, 2 Self Pay).", "success");
  },

  addCandidate: (newCand) => {
    const id = `cand-${Date.now()}`;
    const candidate: Candidate = {
      ...newCand,
      id
    };
    set((state) => ({
      candidates: [...state.candidates, candidate]
    }));
    get().addActivityLog(`Manually created candidate profile: ${candidate.name}.`, "success");
    return candidate;
  },

  addActivityLog: (message, type = "info") => {
    const time = new Date().toLocaleTimeString([], { hour12: false });
    const newLog: ActivityLog = {
      id: `log-${Date.now()}-${Math.random()}`,
      time,
      type,
      message
    };
    set((state) => ({
      activityLogs: [...state.activityLogs, newLog]
    }));
  },

  sendWhatsAppMessage: (chatId, sender, text) => {
    set((state) => ({
      whatsAppChats: state.whatsAppChats.map((chat) => {
        if (chat.id === chatId) {
          const newMessage = {
            id: `msg-${Date.now()}`,
            sender,
            text,
            timestamp: new Date().toISOString()
          };
          return {
            ...chat,
            messages: [...chat.messages, newMessage]
          };
        }
        return chat;
      })
    }));

    if (sender === 'candidate') {
      get().addActivityLog(`WhatsApp reply received from candidate on chat ${chatId}: "${text.substring(0, 30)}..."`, "info");
    }
  },

  approveEmployerCandidate: (candId) => {
    get().updateCandidateStatus(candId, 'Interviewing');
    const cand = get().candidates.find(c => c.id === candId);
    const job = get().jobs.find(j => j.id === cand?.jobId);
    
    get().addActivityLog(`Medical Director approved patient treatment plan for ${cand?.name}.`, "success");
    get().addActivityLog(`Dispatched digital prescription and clinic access link to patient.`, "success");
  },

  rejectEmployerCandidate: (candId) => {
    get().updateCandidateStatus(candId, 'Rejected');
    const cand = get().candidates.find(c => c.id === candId);
    const job = get().jobs.find(j => j.id === cand?.jobId);
    
    get().addActivityLog(`Medical Director suspended patient treatment plan for ${cand?.name}. File archived.`, "warning");
  },

  resetMockData: () => set({
    currentJobId: 'job-hvac',
    jobs: mockJobs,
    candidates: mockInitialCandidates,
    whatsAppChats: mockWhatsAppChats,
    isUploading: false,
    uploadedCount: 0,
    activityLogs: [
      { id: "log-1", time: new Date().toLocaleTimeString([], {hour12:false}), type: "info", message: "MedFlow Pro clinical operating system online." },
      { id: "log-2", time: new Date().toLocaleTimeString([], {hour12:false}), type: "success", message: "Synced insurance gateway with Daman, AXA, and Thiqa portals." }
    ]
  })
}));
