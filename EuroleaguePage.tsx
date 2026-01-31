import React from 'react';

export const EuroleaguePage = ({ onBack, onPropose }: { onBack: () => void, onPropose: () => void }) => {
  return (
    <div className="min-h-screen bg-orange-50 text-slate-900 font-['Teko'] flex flex-col relative overflow-hidden">
      {/* Court Lines */}
      <div className="absolute inset-0 border-[20px] border-orange-600 pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-[10px] border-orange-600 rounded-full opacity-20 pointer-events-none"></div>
      
      {/* Header */}
      <div className="bg-slate-900 text-white p-4 flex justify-between items-center z-10 border-b-4 border-orange-500">
        <button onClick={onBack} className="text-xl hover:text-orange-500 transition-colors font-sans">BACK</button>
        <div className="text-4xl font-bold tracking-widest text-orange-500">FINAL 4</div>
        <div className="text-xl font-sans">Q4 | 00:03.2</div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-4">
        {/* Scoreboard */}
        <div className="bg-slate-800 text-white p-6 rounded-lg shadow-2xl mb-12 transform scale-100 md:scale-125 border-4 border-slate-700">
          <div className="flex gap-12 text-center">
            <div>
              <div className="text-gray-400 text-2xl mb-1">ME</div>
              <div className="text-6xl font-bold text-orange-500 font-mono">99</div>
            </div>
            <div className="flex flex-col justify-center">
               <span className="text-4xl font-bold text-white">VS</span>
            </div>
            <div>
              <div className="text-gray-400 text-2xl mb-1">YOU</div>
              <div className="text-6xl font-bold text-orange-500 font-mono">99</div>
            </div>
          </div>
        </div>

        {/* Play call */}
        <div className="max-w-xl text-center space-y-8 z-10">
          <h2 className="text-5xl md:text-7xl font-bold text-slate-900 uppercase leading-none">
            THE FINAL PLAY
          </h2>
          <p className="text-2xl md:text-3xl font-sans text-slate-600 bg-white/50 p-4 rounded backdrop-blur-sm">
            Ball is in your hands. The crowd is silent. It's time to make the winning move.
          </p>

          <button 
            onClick={onPropose}
            className="group relative bg-orange-600 text-white text-4xl px-12 py-6 rounded-full font-bold shadow-lg overflow-hidden transition-transform hover:scale-105 hover:bg-orange-500"
          >
            <span className="relative z-10">TAKE THE SHOT</span>
            <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
          </button>
        </div>
      </div>
    </div>
  );
};