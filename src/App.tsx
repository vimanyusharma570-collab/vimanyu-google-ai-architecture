/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Database, 
  BrainCircuit, 
  Activity, 
  Cpu, 
  Download, 
  Terminal, 
  Users,
  ChevronRight,
  Code2,
  FileJson
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PROJECT_ARCHITECTURE, Role, ArchitectureDetail } from './types';

export default function App() {
  const [selectedRole, setSelectedRole] = useState<Role>('Backend');
  const [showPrompt, setShowPrompt] = useState(false);

  const currentArch = PROJECT_ARCHITECTURE.find(a => a.role === selectedRole)!;

  const downloadCSV = () => {
    const headers = ['id', 'timestamp', 'feature_a', 'feature_b', 'label'];
    const rows = Array.from({ length: 10 }, (_, i) => [
      i + 1,
      new Date().toISOString(),
      Math.random().toFixed(4),
      Math.random().toFixed(4),
      Math.floor(Math.random() * 2)
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'project_dataset.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const aiStudioPrompt = `Act as a senior software architect. I am building a collaborative project named "PBA-1" with 4 specialized roles:
1. Backend (Express/SQLite/Cloud Functions/BigQuery/AIOps/DevOps)
2. Training & Testing (Deep Learning/Transformers/Vertex AI/Agentic AI/MLOps)
3. LSTM (Sequential Data)
4. Transformer (Anomaly Detection Architect)

Please help me implement the core communication layer between these modules, specifically focusing on the DevOps CI/CD pipeline with Docker and Kubernetes. 
Specifically, I need:
- A shared data schema in TypeScript.
- A Python bridge for the ML models to interact with the Express backend using Vertex AI Endpoints.
- A Dockerfile and Kubernetes deployment manifest for the backend and AI services.
- A CI/CD workflow (Cloud Build or GitHub Actions) for automated deployment to GKE.
- An automated MLOps pipeline using Vertex AI Pipelines or Kubeflow.
- An Agentic AI orchestration layer using LangChain or similar.
- An AIOps log analysis pipeline using the Transformer anomaly detection module.
- A standardized evaluation script for comparing LSTM vs Transformer performance on the provided CSV dataset.`;

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-slate-200 font-sans selection:bg-emerald-500/30">
      {/* Header */}
      <header className="border-b border-white/5 bg-black/20 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              <LayoutDashboard className="w-5 h-5 text-black" />
            </div>
            <h1 className="text-lg font-semibold tracking-tight text-white">PBA-1 <span className="text-emerald-500">Architect</span></h1>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={downloadCSV}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-sm font-medium transition-all"
            >
              <Download className="w-4 h-4" />
              Export Dataset (CSV)
            </button>
            <button 
              onClick={() => setShowPrompt(!showPrompt)}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black rounded-full text-sm font-bold transition-all shadow-lg shadow-emerald-500/20"
            >
              <Terminal className="w-4 h-4" />
              AI Studio Prompt
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Sidebar Navigation */}
          <div className="lg:col-span-3 space-y-2">
            <div className="flex items-center gap-2 px-3 mb-6 text-xs font-bold uppercase tracking-widest text-slate-500">
              <Users className="w-3 h-3" />
              Project Roles
            </div>
            {PROJECT_ARCHITECTURE.map((item) => (
              <button
                key={item.role}
                onClick={() => setSelectedRole(item.role)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all group ${
                  selectedRole === item.role 
                  ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400' 
                  : 'hover:bg-white/5 text-slate-400'
                }`}
              >
                <div className="flex items-center gap-3">
                  {item.role === 'Backend' && <Database className="w-4 h-4" />}
                  {item.role === 'DL & Transformer' && <BrainCircuit className="w-4 h-4" />}
                  {item.role === 'LSTM' && <Activity className="w-4 h-4" />}
                  {item.role === 'Transformer' && <Cpu className="w-4 h-4" />}
                  <span className="font-medium">{item.role}</span>
                </div>
                <ChevronRight className={`w-4 h-4 transition-transform ${selectedRole === item.role ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'}`} />
              </button>
            ))}
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-9">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedRole}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div className="space-y-4">
                  <div className="inline-flex px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                    {currentArch.role} Specialist
                  </div>
                  <h2 className="text-4xl font-bold text-white tracking-tight">{currentArch.title}</h2>
                  <p className="text-xl text-slate-400 leading-relaxed max-w-3xl">
                    {currentArch.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4">
                    <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
                      <Code2 className="w-4 h-4 text-emerald-500" />
                      Responsibilities
                    </h3>
                    <ul className="space-y-3">
                      {currentArch.responsibilities.map((resp, i) => (
                        <li key={i} className="flex gap-3 text-slate-400 text-sm leading-relaxed">
                          <span className="text-emerald-500 mt-1">•</span>
                          {resp}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4">
                    <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-emerald-500" />
                      Tech Stack
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {currentArch.techStack.map((tech) => (
                        <span key={tech} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-medium text-slate-300">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="pt-4 space-y-2">
                      <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Architecture Strategy</h4>
                      <p className="text-sm text-slate-400 italic">
                        "{currentArch.architecture}"
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* AI Studio Prompt Modal */}
      <AnimatePresence>
        {showPrompt && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPrompt(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-[#121214] border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-8 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center">
                      <Terminal className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">AI Studio Prompt</h3>
                      <p className="text-sm text-slate-500">Copy this to continue development in AI Studio</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setShowPrompt(false)}
                    className="p-2 hover:bg-white/5 rounded-full transition-colors"
                  >
                    <svg className="w-6 h-6 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="relative group">
                  <pre className="p-6 rounded-2xl bg-black/40 border border-white/5 text-emerald-400 font-mono text-sm whitespace-pre-wrap leading-relaxed max-h-[400px] overflow-y-auto">
                    {aiStudioPrompt}
                  </pre>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(aiStudioPrompt);
                      alert('Prompt copied to clipboard!');
                    }}
                    className="absolute top-4 right-4 px-3 py-1.5 bg-emerald-500 text-black text-[10px] font-bold uppercase tracking-widest rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    Copy
                  </button>
                </div>

                <div className="flex items-center gap-3 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm">
                  <FileJson className="w-5 h-5 flex-shrink-0" />
                  <p>This prompt includes context for all 4 roles and the dataset structure.</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            © 2026 PBA-1 Project Architect. Built for high-performance collaboration.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-emerald-500 transition-colors">Documentation</a>
            <a href="#" className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-emerald-500 transition-colors">GitHub Repo</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
