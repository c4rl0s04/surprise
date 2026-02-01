import React from 'react';
import { Universe } from '../shared/types';
import { motion } from 'framer-motion';
import { Zap, Briefcase, Trophy, Globe } from 'lucide-react';
import { UniverseCard } from '../components/hub/UniverseCard';
import { TARGET_NAME } from '../shared/config';

export const Hub = ({ onSelect }: { onSelect: (u: Universe) => void }) => {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 relative overflow-hidden font-['Orbitron'] selection:bg-cyan-500/30">
      
      {/* Animated Background Stars */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-[#050a14] to-black">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full"
            initial={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000), 
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
              opacity: Math.random(),
              scale: Math.random() * 0.5 + 0.5
            }}
            animate={{ 
              opacity: [0.1, 0.8, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{ 
              duration: Math.random() * 4 + 3, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{ width: Math.random() * 2 + 1, height: Math.random() * 2 + 1 }}
          />
        ))}
      </div>

      <div className="z-10 text-center mb-16 relative w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          {/* Decorative lines behind title */}
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-900/50 to-transparent -z-10"></div>
          
          <div className="inline-flex items-center gap-2 px-4 py-1 border border-cyan-500/30 rounded-full bg-cyan-950/30 text-cyan-400 text-[10px] tracking-[0.3em] mb-6 backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.1)]">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
            SYSTEM ONLINE
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-100 to-cyan-400 tracking-wider mb-2 drop-shadow-[0_0_20px_rgba(6,182,212,0.3)]">
            MULTIVERSE
          </h1>
          <p className="text-slate-500 text-sm md:text-lg tracking-[0.8em] uppercase font-light">
            Mission Control
          </p>
        </motion.div>
      </div>

      <div className="z-10 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-7xl px-4">
        
        {/* Card 1: Iron Man */}
        <UniverseCard 
          title="STARK"
          subtitle="JARVIS INTERFACE"
          icon={<Zap size={40} />}
          delay={0.2}
          onClick={() => onSelect('IRONMAN')}
          variant="SCIFI"
        />

        {/* Card 2: Brooklyn 99 */}
        <UniverseCard 
          title={TARGET_NAME}
          subtitle="GRAN ROBO"
          icon={<Briefcase size={40} />}
          delay={0.4}
          onClick={() => onSelect('B99')}
          variant="FILE"
        />

        {/* Card 3: Euroleague */}
        <UniverseCard 
          title="FINAL 4"
          subtitle="CLUTCH TIME"
          icon={<Trophy size={40} />}
          delay={0.6}
          onClick={() => onSelect('EUROLEAGUE')}
          variant="SPORT"
        />

      </div>
      
      {/* Bottom Status Bar */}
      <div className="absolute bottom-0 w-full p-4 border-t border-white/5 flex justify-between text-[10px] text-slate-600 uppercase tracking-widest z-10 font-mono">
        <div>Coordinates: 40.7128° N, 74.0060° W</div>
        <div>Target: {TARGET_NAME}</div>
        <div>Version: 4.0.2</div>
      </div>
    </div>
  );
};