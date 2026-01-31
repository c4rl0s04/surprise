import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Thermometer } from 'lucide-react';

export const CoreTempGauge = () => {
  const [rotation, setRotation] = useState(0);
  const [coreLoads, setCoreLoads] = useState([45, 60, 30, 80]);

  useEffect(() => {
     // Rotate the outer ring slowly
     const rotInterval = setInterval(() => setRotation(r => r + 1), 50);
     
     // Fluctuate core loads
     const loadInterval = setInterval(() => {
         setCoreLoads(prev => prev.map(val => {
             const change = Math.random() * 20 - 10;
             return Math.max(10, Math.min(95, val + change));
         }));
     }, 800);

     return () => { clearInterval(rotInterval); clearInterval(loadInterval); };
  }, []);

  return (
    <div className="bg-black/80 border border-cyan-500/30 p-4 relative flex-1 flex flex-col h-64 overflow-hidden">
        <div className="flex justify-between items-center mb-4 z-10 relative">
            <span className="text-[10px] text-cyan-400 font-bold">SUIT.THERMAL</span>
            <Thermometer size={14} className="text-cyan-500" />
        </div>

        {/* Circular Gauge */}
        <div className="flex justify-center mb-6 relative z-10">
            <div className="relative w-28 h-28 flex items-center justify-center">
                {/* Outer Rotating Ring */}
                <div 
                    className="absolute inset-0 border-2 border-dashed border-cyan-800 rounded-full"
                    style={{ transform: `rotate(${rotation}deg)` }}
                ></div>
                
                {/* Inner Static Ring */}
                <div className="absolute inset-2 border-4 border-cyan-900/30 rounded-full"></div>
                
                {/* Value */}
                <div className="text-center">
                    <div className="text-2xl font-bold text-white">98°F</div>
                    <div className="text-[8px] text-cyan-600">STABLE</div>
                </div>

                {/* Decorative Ticks */}
                <div className="absolute top-0 w-1 h-3 bg-cyan-500"></div>
                <div className="absolute bottom-0 w-1 h-3 bg-cyan-500"></div>
                <div className="absolute left-0 w-3 h-1 bg-cyan-500"></div>
                <div className="absolute right-0 w-3 h-1 bg-cyan-500"></div>
            </div>
        </div>

        {/* Core Bars */}
        <div className="space-y-2 mt-auto z-10 relative">
            {coreLoads.map((load, i) => (
                <div key={i} className="flex items-center gap-2">
                    <span className="text-[8px] text-cyan-600 w-8">CORE_{i}</span>
                    <div className="flex-1 h-1.5 bg-cyan-900/50 overflow-hidden">
                        <motion.div 
                            className="h-full bg-cyan-400 shadow-[0_0_5px_#22d3ee]"
                            animate={{ width: `${load}%` }}
                            transition={{ duration: 0.5 }}
                        />
                    </div>
                    <span className="text-[8px] text-cyan-400 w-6 text-right">{Math.round(load)}%</span>
                </div>
            ))}
        </div>
    </div>
  );
};