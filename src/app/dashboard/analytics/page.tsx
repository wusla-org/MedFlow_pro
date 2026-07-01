"use client";

import React, { useState, useEffect } from "react";
import { useRecruitmentStore } from "../../../store/useRecruitmentStore";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, BarChart, Bar, Legend 
} from "recharts";
import { 
  TrendingUp, Calendar, Clock, Star, 
  BarChart3, ShieldAlert, Sparkles, DollarSign 
} from "lucide-react";

export default function AnalyticsDashboard() {
  const { currentJobId, jobs } = useRecruitmentStore();
  const activeJob = jobs.find(j => j.id === currentJobId) || jobs[0];
  const currencySymbol = 'AED';

  // Hydration Guard
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // Data 1: Month-over-month Clinical revenues (AED)
  const revenueData = [
    { month: "Jan", revenue: 185000 },
    { month: "Feb", revenue: 210000 },
    { month: "Mar", revenue: 245000 },
    { month: "Apr", revenue: 230000 },
    { month: "May", revenue: 290000 },
    { month: "Jun", revenue: 345000 },
  ];

  // Data 2: Patient Wait Time (Manual vs MedFlow Pro) in minutes
  const velocityData = [
    { name: "Dental", Manual: 28, MedFlow: 3 },
    { name: "Aesthetics", Manual: 35, MedFlow: 5 },
    { name: "Physio", Manual: 22, MedFlow: 4 },
    { name: "Surgery", Manual: 45, MedFlow: 8 },
  ];

  if (!mounted) {
    return (
      <div className="py-24 text-center text-xs text-slate-500 font-mono">
        Loading clinical charts...
      </div>
    );
  }

  return (
    <div className="space-y-6 text-left font-sans">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-900">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            Clinical Revenue & Patient Analytics
            <BarChart3 className="h-5 w-5 text-cyan" />
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">Track clinical billing revenues, patient consultation wait times, and intake success ratios</p>
        </div>
      </div>

      {/* Stats counters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-5 rounded-2xl glass-card text-xs space-y-2">
          <span className="text-slate-500 uppercase tracking-wider block font-bold">Total Clinical Billing (Q1-Q2)</span>
          <div className="text-2xl font-extrabold text-white font-mono flex items-baseline gap-1.5 pt-1">
            1,505,000 <span className="text-xs text-slate-500 font-sans">{currencySymbol}</span>
          </div>
          <span className="text-[10px] text-emerald font-semibold flex items-center gap-1">
            <TrendingUp className="h-3.5 w-3.5" /> +32% increase since deploying MedFlow Pro
          </span>
        </div>

        <div className="p-5 rounded-2xl glass-card text-xs space-y-2">
          <span className="text-slate-500 uppercase tracking-wider block font-bold">Avg. Consultation Wait Time</span>
          <div className="text-2xl font-extrabold text-white font-mono flex items-baseline gap-1.5 pt-1">
            5.0 <span className="text-xs text-slate-500 font-sans">Minutes</span>
          </div>
          <span className="text-[10px] text-emerald font-semibold flex items-center gap-1">
            <TrendingUp className="h-3.5 w-3.5" /> Reduced from 32-minute average manual queues
          </span>
        </div>

        <div className="p-5 rounded-2xl glass-card text-xs space-y-2">
          <span className="text-slate-500 uppercase tracking-wider block font-bold">AI-Processed Intakes</span>
          <div className="text-2xl font-extrabold text-white font-mono flex items-baseline gap-1.5 pt-1">
            98.4% <span className="text-xs text-slate-500 font-sans">Accuracy</span>
          </div>
          <span className="text-[10px] text-cyan font-semibold flex items-center gap-1">
            <Sparkles className="h-3.5 w-3.5" /> Zero manual front-desk charting required
          </span>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Revenue chart (7 cols) */}
        <div className="lg:col-span-7 glass-card rounded-2xl p-5 space-y-4">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">Clinical Department Revenues</h3>
            <p className="text-[10px] text-slate-500 mt-0.5">Billing collections generated from completed treatments (Q1-Q2)</p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#090D16" />
                <XAxis dataKey="month" stroke="#475569" fontSize={10} />
                <YAxis stroke="#475569" fontSize={10} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#030712', borderColor: '#1f2937', borderRadius: '12px' }} 
                  labelStyle={{ color: '#94a3b8', fontWeight: 'bold', fontSize: '10px' }}
                  itemStyle={{ color: '#f8fafc', fontSize: '11px' }}
                />
                <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />
                <Area type="monotone" dataKey="revenue" name={`Revenue (${currencySymbol})`} stroke="#0ea5e9" fillOpacity={1} fill="url(#colorRev)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Velocity chart (5 cols) */}
        <div className="lg:col-span-5 glass-card rounded-2xl p-5 space-y-4">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">Patient Wait Time (Minutes)</h3>
            <p className="text-[10px] text-slate-500 mt-0.5">Comparing manual front-desk queue delays against MedFlow Pro AI</p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={velocityData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#090D16" />
                <XAxis dataKey="name" stroke="#475569" fontSize={8} />
                <YAxis stroke="#475569" fontSize={10} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#030712', borderColor: '#1f2937', borderRadius: '12px' }}
                  labelStyle={{ color: '#94a3b8', fontWeight: 'bold', fontSize: '10px' }}
                  itemStyle={{ fontSize: '11px' }}
                />
                <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />
                <Bar dataKey="Manual" name="Manual Wait" fill="#1e293b" radius={[4, 4, 0, 0]} />
                <Bar dataKey="MedFlow" name="MedFlow Pro" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
}
