import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

export const LoveTrendGraph = () => {
  return (
    <div className="bg-black/80 border border-cyan-500/30 p-4 rounded-tr-xl relative flex flex-col h-48 overflow-hidden">
         {/* Background Grid Pattern (CSS) */}
         <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:20px_20px]"></div>

         <div className="text-[10px] text-cyan-400 font-bold mb-2 z-10 relative flex justify-between items-center">
             <span>AFFECTION.TREND</span>
             <TrendingUp size={14} className="text-green-400" />
         </div>

         {/* Flexible Container for SVG */}
         <div className="flex-1 relative z-10 w-full min-h-0">
            <svg className="w-full h-full" viewBox="0 0 100 50" preserveAspectRatio="none">
                <defs>
                    <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
                    </linearGradient>
                </defs>
                
                {/* Horizontal Grid Lines inside SVG for alignment */}
                {[10, 20, 30, 40].map(y => (
                    <line 
                        key={y} 
                        x1="0" y1={y} x2="100" y2={y} 
                        stroke="#22d3ee" 
                        strokeWidth="0.2" 
                        opacity="0.3" 
                        vectorEffect="non-scaling-stroke" 
                    />
                ))}

                {/* 
                   The Graph Line - Quadratic Curve
                   Start: Bottom Left (0, 50)
                   Curve: Accelerates upwards
                   End: Top Right with padding (100, 5)
                */}
                <motion.path 
                    d="M0,50 Q40,50 60,35 T100,5" 
                    fill="none" 
                    stroke="#22d3ee" 
                    strokeWidth="2" 
                    vectorEffect="non-scaling-stroke"
                    className="drop-shadow-[0_0_5px_#22d3ee]"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                />
                
                {/* Gradient Fill Area */}
                <motion.path 
                    d="M0,50 Q40,50 60,35 T100,5 V50 H0 Z" 
                    fill="url(#trendGradient)" 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                />

                {/* Animated Blip at the end */}
                <motion.circle 
                    cx="100" cy="5" r="3" fill="white"
                    initial={{ opacity: 0 }}
                    animate={{ 
                        opacity: [0, 1, 0.5, 1], 
                        r: [2, 4, 2],
                        strokeWidth: [0, 3, 0]
                    }}
                    transition={{ delay: 1.5, duration: 2, repeat: Infinity, times: [0, 0.2, 0.5, 1] }}
                    stroke="#22d3ee"
                    vectorEffect="non-scaling-stroke"
                />
            </svg>
         </div>
         
         <div className="absolute top-8 right-2 text-right pointer-events-none z-20">
             <div className="text-[8px] text-cyan-600 bg-black/50 px-1 rounded">FORECAST</div>
             <div className="text-xl font-bold text-green-400 tracking-tighter drop-shadow-[0_0_10px_rgba(74,222,128,0.8)]">∞</div>
         </div>
    </div>
  );
};