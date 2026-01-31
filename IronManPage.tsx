import React from 'react';

export const IronManPage = ({ onBack, onPropose }: { onBack: () => void, onPropose: () => void }) => {
  return (
    <div className="min-h-screen bg-black text-cyan-400 font-['Orbitron'] relative overflow-hidden flex flex-col items-center justify-center">
      {/* HUD Rings */}
      <div className="absolute w-[600px] h-[600px] border border-cyan-500/30 rounded-full animate-spin-slow"></div>
      <div className="absolute w-[500px] h-[500px] border border-dashed border-cyan-500/50 rounded-full animate-spin-reverse"></div>
      <div className="absolute w-[800px] h-[1px] bg-cyan-900/50 rotate-45"></div>
      <div className="absolute w-[800px] h-[1px] bg-cyan-900/50 -rotate-45"></div>

      <div className="z-10 max-w-2xl w-full bg-black/80 backdrop-blur-sm border border-cyan-500 p-8 rounded-lg shadow-[0_0_50px_rgba(6,182,212,0.2)]">
        <div className="flex justify-between items-center mb-8 border-b border-cyan-800 pb-2">
          <span className="text-xs tracking-[0.3em]">JARVIS SYSTEM V.42.0</span>
          <button onClick={onBack} className="text-xs hover:text-white transition-colors">[ ABORT ]</button>
        </div>

        <div className="space-y-6 text-center">
          <h2 className="text-3xl font-bold tracking-widest text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
            ANALYSIS COMPLETE
          </h2>
          <div className="grid grid-cols-2 gap-4 text-left text-sm font-mono border border-cyan-900 p-4 rounded">
            <div>TARGET: <span className="text-white">LOML</span></div>
            <div>STATUS: <span className="text-green-400">IRREPLACEABLE</span></div>
            <div>COMPATIBILITY: <span className="text-white">100%</span></div>
            <div>HEART RATE: <span className="text-red-400 animate-pulse">ELEVATED</span></div>
          </div>
          
          <p className="text-cyan-200 leading-relaxed py-4">
            "I love you 3000. But I think we can aim for a higher number. Like infinity."
          </p>

          <button 
            onClick={onPropose}
            className="w-full py-4 bg-gradient-to-r from-red-600 to-red-800 text-white font-bold text-xl uppercase tracking-[0.2em] rounded clip-path-polygon hover:scale-105 transition-transform shadow-[0_0_20px_rgba(220,38,38,0.5)] border border-red-400"
            style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%)' }}
          >
            Engage Eternity Protocol
          </button>
        </div>
      </div>
    </div>
  );
};