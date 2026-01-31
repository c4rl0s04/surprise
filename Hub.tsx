import React from 'react';
import { Universe } from './types';

export const Hub = ({ onSelect }: { onSelect: (u: Universe) => void }) => {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6 relative overflow-hidden font-['Orbitron']">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-20" 
           style={{ backgroundImage: 'linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      <div className="z-10 text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 tracking-widest mb-4">
          MULTIVERSE MISSION CONTROL
        </h1>
        <p className="text-slate-400 text-sm md:text-lg tracking-[0.2em] uppercase">
          Select Target Timeline
        </p>
      </div>

      <div className="z-10 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {/* Card 1: Iron Man */}
        <button 
          onClick={() => onSelect('IRONMAN')}
          className="group relative h-80 bg-slate-800/50 border border-cyan-500/30 rounded-xl overflow-hidden hover:border-cyan-400 transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] flex flex-col items-center justify-center"
        >
          <div className="absolute inset-0 bg-cyan-900/10 group-hover:bg-cyan-900/20 transition-colors"></div>
          <div className="w-24 h-24 rounded-full border-4 border-cyan-500 flex items-center justify-center mb-6 animate-pulse-glow">
            <div className="w-4 h-4 bg-cyan-400 rounded-full"></div>
          </div>
          <h2 className="text-2xl font-bold text-cyan-400 uppercase tracking-wider">Protocol: STARK</h2>
          <p className="text-cyan-200/60 text-xs mt-2">Jarvis AI Integration</p>
        </button>

        {/* Card 2: Brooklyn 99 */}
        <button 
          onClick={() => onSelect('B99')}
          className="group relative h-80 bg-amber-100/10 border border-amber-500/30 rounded-xl overflow-hidden hover:border-amber-400 transition-all duration-300 hover:shadow-[0_0_30px_rgba(251,191,36,0.3)] flex flex-col items-center justify-center font-['Special_Elite']"
        >
          <div className="absolute inset-0 bg-amber-900/10 group-hover:bg-amber-900/20 transition-colors"></div>
          <div className="w-20 h-28 border-2 border-amber-600 mb-6 bg-amber-100/80 flex items-center justify-center rotate-3 group-hover:rotate-0 transition-transform">
            <span className="text-amber-900 text-3xl font-bold">TOP<br/>SECRET</span>
          </div>
          <h2 className="text-2xl font-bold text-amber-500 uppercase">Case: SANTIAGO</h2>
          <p className="text-amber-200/60 text-xs mt-2 font-sans">99th Precinct Data</p>
        </button>

        {/* Card 3: Euroleague */}
        <button 
          onClick={() => onSelect('EUROLEAGUE')}
          className="group relative h-80 bg-orange-900/20 border border-orange-500/30 rounded-xl overflow-hidden hover:border-orange-400 transition-all duration-300 hover:shadow-[0_0_30px_rgba(249,115,22,0.3)] flex flex-col items-center justify-center font-['Teko']"
        >
          <div className="absolute inset-0 bg-orange-900/10 group-hover:bg-orange-900/20 transition-colors"></div>
          <div className="w-24 h-24 rounded-full border-4 border-orange-500 mb-6 border-dashed flex items-center justify-center group-hover:rotate-180 transition-transform duration-700">
             <span className="text-4xl">🏀</span>
          </div>
          <h2 className="text-4xl font-bold text-orange-500 uppercase tracking-wide">FINAL FOUR</h2>
          <p className="text-orange-200/60 text-xl mt-0 font-sans tracking-normal">Clutch Time</p>
        </button>
      </div>
    </div>
  );
};