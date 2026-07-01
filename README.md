# MedFlow Pro — AI-Powered Clinic Operating System

MedFlow Pro is a high-end, premium clinical operating system designed for private healthcare centers and multi-site clinics in the GCC region (Dubai, Riyadh, Doha, Abu Dhabi). It replaces fragmented front-desk tasks, manual insurance verification bottlenecks, and doctor documentation overhead with automated, intelligent workflows.

Optimized for high-volume specialties:
* **Dental & Orthodontic Clinics** (Smile design, veneering, aligner tracking)
* **Aesthetic & Dermatological Centers** (Laser resurfacing, skin therapy)
* **Cosmetic Surgery Practices** (Consultation approvals, pre-op consents)
* **Rehabilitation & Physiotherapy Hubs** (Treatment session tracking, room allocations)

---

## 🚀 Core Features

### 1. Interactive Patient Intake & Ingestion Playground
* **Bulk Ingestion Simulator**: Instantly parse batches of 100 patient intake forms, automatically extracting diagnostic symptoms and clinical alerts (such as Penicillin conflicts).
* **Confidence Gating**: Employs AI confidence parsing metrics (target limit: >90%) with vital sign capture (BPM, BP, Oxygen, Pain Scale) and digital medical consent audits.

### 2. Insurance Pre-Auth Gateway
* **Direct GCC Carrier Sync**: Automated eligibility checks and claim submissions for **Daman Enhanced**, **AXA Gulf**, **Thiqa**, and **GOSI**.
* **AI Coding Assistance**: Recommends auto-fix rules for billing rejections (e.g. updating ICD-10 radiology mappings) and monitors authorization latency (Response times, portal syncs, queue delays).

### 3. AI Medical Scribe Console
* **Ambient Voice Scribing**: Simulates clinician speech transcription, converting natural patient dialogues into structured, diagnostic assessment charts and prescribed drug logs.

### 4. Treatment Room Scheduler
* **Capacity Coordinator**: Manages room allocations (Laser Room 2, Dental Bay 1, Rehab) alongside telehealth consultation links.

### 5. Specialist App Companion
* **Mobile Doctor Agenda**: Mobile simulator tracking daily patient schedule, active clinic status, and clinical notes on-the-go.

---

## 🛠️ Architecture & Tech Stack

This repository is built using next-generation frontend technologies:
* **Core Framework**: [Next.js 15.0.0](https://nextjs.org/) (App Router)
* **UI Engine**: [React 19 (Release Candidate)](https://react.dev/)
* **Styling**: [Tailwind CSS v3](https://tailwindcss.com/) with a light glassmorphic clinical visual design system, custom scrollbars, and pulsing AI alerts.
* **State Management**: [Zustand v5](https://github.com/pmndrs/zustand) for reactive clinical database pipelines, logs, and activity streams.
* **Data Visualization**: [Recharts](https://recharts.org/) for clinic revenues and latency tracking.
* **Icons**: [Google Material Symbols Outlined](https://fonts.google.com/icons) and [Lucide React](https://lucide.github.io/lucide-react/).

---

## 📥 Getting Started

### Prerequisites
* Node.js v18.17.0+ or v20+
* npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-organization/medflow-pro.git
   cd medflow-pro
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to interact with the platform.

### Production Build
Compile and verify static generation:
```bash
npm run build
```

---

## 🔐 Security & Public Compliance

This is a **public-compliant repository**. Local mock databases mimic private GCC hospital networks under simulated clinic data.
* Zero environment variables (`.env` files) or API keys are committed.
* Direct insurance carrier endpoints (Daman/AXA) are mocked client-side with status logs.
* Build caches (`.next`) and `node_modules` directories are excluded via `.gitignore`.
