import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Fingerprint, Paperclip, Trophy, Activity } from 'lucide-react';

interface UniverseCardProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  delay: number;
  onClick: () => void;
  variant: 'SCIFI' | 'FILE' | 'SPORT';
}

export const UniverseCard = ({
  title,
  subtitle,
  icon,
  delay,
  onClick,
  variant
}: UniverseCardProps) => {
  
  // --- VARIANT 1: IRON MAN / SCI-FI ---
  if (variant === 'SCIFI') {
    return (
      <motion.button 
        onClick={onClick}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.03 }}
        transition={{ delay, duration: 0.5 }}
        className="group relative h-96 w-full rounded-xl overflow-hidden bg-black border border-cyan-500/30 flex flex-col items-center justify-center isolate"
      >
        {/* Holographic Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.15)_0%,transparent_70%)] opacity-50 group-hover:opacity-100 transition-opacity" />
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(6, 182, 212, .3) 25%, rgba(6, 182, 212, .3) 26%, transparent 27%, transparent 74%, rgba(6, 182, 212, .3) 75%, rgba(6, 182, 212, .3) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(6, 182, 212, .3) 25%, rgba(6, 182, 212, .3) 26%, transparent 27%, transparent 74%, rgba(6, 182, 212, .3) 75%, rgba(6, 182, 212, .3) 76%, transparent 77%, transparent)', backgroundSize: '50px 50px' }}></div>
        
        {/* Animated Scanner Line */}
        <div className="absolute top-0 w-full h-1 bg-cyan-400 shadow-[0_0_15px_#22d3ee] opacity-0 group-hover:opacity-100 group-hover:animate-scan transition-opacity" />

        {/* Tech Corners */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-500"></div>
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-500"></div>
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-500"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-500"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center">
            <div className="w-24 h-24 rounded-full border-2 border-cyan-400/50 flex items-center justify-center mb-6 group-hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-shadow bg-black/50 backdrop-blur-sm">
               <div className="text-cyan-400 group-hover:animate-pulse">{icon}</div>
            </div>
            <h2 className="text-3xl font-bold text-cyan-400 tracking-[0.2em] uppercase mb-2 font-['Orbitron']">{title}</h2>
            <div className="flex items-center gap-2 text-cyan-600 font-mono text-xs tracking-widest">
                <Activity size={12} /> {subtitle}
            </div>
        </div>
      </motion.button>
    );
  }

  // --- VARIANT 2: BROOKLYN 99 / CASE FILE ---
  if (variant === 'FILE') {
    return (
      <motion.button 
        onClick={onClick}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.03, rotate: 1 }}
        transition={{ delay, duration: 0.5 }}
        className="group relative h-96 w-full rounded-lg bg-[#f0e6d2] shadow-xl border-l-8 border-l-amber-700/50 flex flex-col items-center justify-center overflow-hidden"
      >
        {/* Paper Texture */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}></div>
        
        {/* Folder Tab Visual */}
        <div className="absolute top-0 right-0 w-32 h-12 bg-[#e6dcc3] border-b border-l border-[#d3c9b0] rounded-bl-xl shadow-inner flex items-center justify-center">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">EVIDENCE #99</span>
        </div>

        {/* Stamps */}
        <div className="absolute top-10 left-6 border-4 border-red-600/30 text-red-600/30 font-black text-4xl p-2 transform -rotate-12 opacity-50 pointer-events-none group-hover:opacity-80 transition-opacity">
            CONFIDENTIAL
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center">
            <div className="relative mb-6">
                <Paperclip className="absolute -top-6 -right-6 text-gray-400 w-12 h-12 rotate-45" />
                <div className="w-24 h-24 bg-white shadow-md rotate-[-2deg] flex items-center justify-center border p-2">
                    <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                        <div className="text-amber-400">{icon}</div>
                    </div>
                </div>
            </div>
            <h2 className="text-3xl font-bold text-slate-800 tracking-tighter uppercase mb-2 font-['Special_Elite'] underline decoration-wavy decoration-red-400">{title}</h2>
            <p className="text-slate-600 font-['Special_Elite'] text-sm">{subtitle}</p>
        </div>
      </motion.button>
    );
  }

  // --- VARIANT 3: EUROLEAGUE / SPORTS ---
  if (variant === 'SPORT') {
    return (
      <motion.button 
        onClick={onClick}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.03 }}
        transition={{ delay, duration: 0.5 }}
        className="group relative h-96 w-full rounded-2xl bg-orange-600 overflow-hidden flex flex-col items-center justify-center border-4 border-slate-900 shadow-2xl"
      >
        {/* Basketball Texture */}
        <div className="absolute inset-0 opacity-30 bg-black" style={{ backgroundImage: 'radial-gradient(circle, transparent 20%, #000 20%, #000 80%, transparent 80%, transparent), radial-gradient(circle, transparent 20%, #000 20%, #000 80%, transparent 80%, transparent)', backgroundSize: '10px 10px', backgroundPosition: '0 0, 5px 5px' }}></div>
        
        {/* Court Lines */}
        <div className="absolute inset-4 border-2 border-white/40 rounded-xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-2 border-white/20 rounded-full"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center w-full">
            <div className="w-full bg-slate-900/90 py-8 transform -skew-y-3 mb-6 group-hover:bg-slate-800 transition-colors shadow-lg border-y-2 border-orange-500">
                <div className="transform skew-y-3 flex justify-center">
                    <div className="text-orange-500 drop-shadow-[0_2px_0_rgba(255,255,255,0.2)]">{icon}</div>
                </div>
            </div>
            <h2 className="text-5xl font-black text-white italic tracking-tighter uppercase mb-1 font-['Teko'] drop-shadow-md transform -rotate-2">{title}</h2>
            <div className="bg-white text-slate-900 px-3 py-1 font-bold font-sans text-xs tracking-widest transform rotate-1 uppercase">
                {subtitle}
            </div>
        </div>
      </motion.button>
    );
  }

  return null;
};