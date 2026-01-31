import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';

export const HeartRateMonitor = () => {
  const [bpm, setBpm] = useState(124);
  const [history, setHistory] = useState<number[]>(new Array(40).fill(50));

  // Simulate Heart Rate Fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setBpm((prev) => {
        const change = Math.floor(Math.random() * 7) - 3; // -3 to +3
        const newVal = prev + change;
        // Keep it high (Excitement)
        if (newVal > 145) return 145;
        if (newVal < 115) return 115;
        return newVal;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Update Graph Data
  useEffect(() => {
    const interval = setInterval(() => {
      setHistory(prev => {
        const next = [...prev.slice(1)];
        // Create a heartbeat spike pattern
        const time = Date.now();
        if (time % 1000 < 100) next.push(100); // Systole
        else if (time % 1000 < 200) next.push(0); // Diastole
        else next.push(50 + (Math.random() * 10 - 5)); // Baseline noise
        return next;
      });
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-black/80 border border-cyan-500/30 p-4 rounded-tl-xl relative overflow-hidden h-48 flex flex-col">
       {/* Grid Background */}
       <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[size:10px_10px]"></div>

       <div className="flex justify-between items-start mb-2 relative z-10">
           <div>
               <span className="text-[10px] text-cyan-400 font-bold block">BIO.METRICS</span>
               <span className="text-[8px] text-cyan-700">SUBJECT: T. STARK</span>
           </div>
           <Activity size={16} className="text-red-500 animate-pulse" />
       </div>

       <div className="flex-1 flex items-center justify-center relative z-10">
           <div className="text-center">
               <div className="text-6xl font-mono text-white font-bold tracking-tighter drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]">
                   {bpm}
               </div>
               <div className="text-xs text-red-500 font-bold tracking-widest animate-pulse">BPM // HIGH</div>
           </div>
       </div>

       {/* EKG Visual */}
       <div className="h-12 w-full flex items-end justify-between gap-[2px] relative z-10 mt-auto opacity-80">
           {history.map((h, i) => (
               <div 
                  key={i} 
                  className="w-1 bg-red-500 shadow-[0_0_5px_rgba(239,68,68,0.5)]"
                  style={{ height: `${h}%`, opacity: i / history.length }}
               />
           ))}
       </div>
    </div>
  );
};