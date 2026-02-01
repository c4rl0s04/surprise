import React from 'react';
import { motion } from 'framer-motion';
import { TARGET_NAME } from '../../shared/config';

interface ScoreboardProps {
  homeScore: number;
  visitorScore?: number;
  quarter?: string;
  time?: string;
}

export const Scoreboard = ({ homeScore, visitorScore = 99, quarter = "Q4", time = "00:03.2" }: ScoreboardProps) => {
  return (
    <motion.div 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="w-full max-w-3xl mx-auto mb-8 relative z-20"
    >
      {/* Broadcast Header Strip */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 h-2 w-full rounded-t-lg shadow-[0_0_15px_rgba(30,58,138,0.5)]"></div>
      
      {/* Main Board */}
      <div className="bg-slate-900/95 backdrop-blur-md border-x-2 border-b-2 border-slate-700 rounded-b-lg p-3 md:p-4 shadow-2xl relative overflow-hidden">
        {/* Gloss Effect */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none"></div>

        <div className="flex items-center justify-between relative z-10">
          
          {/* HOME TEAM - NOSOTROS */}
          <div className="flex items-center gap-3 md:gap-4 flex-1">
             <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-slate-300 overflow-hidden group">
                 {/* Home Logo */}
                 <div className="bg-slate-900 text-white font-bold rounded-full w-full h-full flex items-center justify-center text-xs md:text-lg tracking-tighter">US</div>
             </div>
             <div className="text-left hidden xs:block">
                <div className="text-slate-400 text-[10px] font-bold tracking-widest uppercase">LOCAL</div>
                <div className="text-white font-bold text-sm md:text-lg leading-none uppercase max-w-[100px] truncate">{TARGET_NAME}</div>
                <div className="flex gap-1 mt-1">
                   {[1,2,3,4].map(i => <div key={i} className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full ${i<=4 ? 'bg-red-500 shadow-[0_0_5px_#ef4444]' : 'bg-slate-700'}`}></div>)}
                   <span className="text-[8px] md:text-[10px] text-slate-500 ml-1 font-bold">FOULS</span>
                </div>
             </div>
          </div>

          {/* SCORES & CLOCK */}
          <div className="flex flex-col items-center px-4 md:px-6 border-x border-slate-700/50 bg-slate-950/40 rounded-lg py-1 md:py-2 mx-2">
             <div className="flex items-center gap-4 md:gap-6 mb-1">
                <span className="text-5xl md:text-6xl font-['Teko'] font-bold text-white tabular-nums tracking-widest drop-shadow-[0_0_10px_rgba(255,255,255,0.2)] leading-none">{homeScore}</span>
                <span className="text-slate-500 text-2xl font-bold opacity-50">-</span>
                <span className="text-5xl md:text-6xl font-['Teko'] font-bold text-white tabular-nums tracking-widest leading-none">{visitorScore}</span>
             </div>
             <div className="flex items-center gap-2 md:gap-3 bg-black px-3 py-0.5 rounded border border-slate-800 shadow-inner">
                <span className="text-orange-500 font-bold text-xs md:text-sm tracking-widest">{quarter}</span>
                <div className="w-[1px] h-3 bg-slate-700"></div>
                <span className="text-red-500 font-mono font-bold text-xs md:text-sm tracking-widest">{time}</span>
             </div>
          </div>

          {/* AWAY TEAM - EL MUNDO */}
          <div className="flex items-center gap-3 md:gap-4 flex-1 justify-end">
             <div className="text-right hidden xs:block">
                <div className="text-slate-400 text-[10px] font-bold tracking-widest uppercase">VISITANTE</div>
                <div className="text-white font-bold text-sm md:text-lg leading-none uppercase">EL MUNDO</div>
                <div className="flex gap-1 mt-1 justify-end">
                   {[1,2].map(i => <div key={i} className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full ${i<=4 ? 'bg-red-500 shadow-[0_0_5px_#ef4444]' : 'bg-slate-700'}`}></div>)}
                   <span className="text-[8px] md:text-[10px] text-slate-500 ml-1 font-bold">FOULS</span>
                </div>
             </div>
             <div className="w-12 h-12 md:w-16 md:h-16 bg-slate-800 rounded-full flex items-center justify-center shadow-lg border-2 border-slate-600 overflow-hidden">
                <div className="text-slate-400 font-bold text-xs md:text-lg tracking-tighter">THEM</div>
             </div>
          </div>

        </div>
      </div>
      
      {/* Possession Indicator */}
      <div className="flex justify-center -mt-1 relative z-10">
         <div className="bg-slate-800 px-4 py-0.5 rounded-b-md border border-slate-700 shadow-lg flex items-center gap-2">
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] text-slate-300 uppercase tracking-widest font-bold">POSESIÓN</span>
         </div>
      </div>
    </motion.div>
  );
};