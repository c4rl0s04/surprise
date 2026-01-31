import React from 'react';
import { motion } from 'framer-motion';
import { Bug } from 'lucide-react';

interface GlitchSystemProps {
  glitchesFixed: number;
  totalGlitches: number;
  activeGlitches: number[];
  onGlitchClick: (index: number) => void;
}

export const GlitchSystem = ({ glitchesFixed, totalGlitches, activeGlitches, onGlitchClick }: GlitchSystemProps) => {
  return (
    <motion.div
       key="stabilizing"
       initial={{ opacity: 0 }}
       animate={{ opacity: 1 }}
       exit={{ opacity: 0, scale: 0.9 }}
       className="z-50 w-full max-w-lg px-4"
    >
       <div className="bg-black/90 border border-red-500/50 p-6 rounded-xl shadow-[0_0_30px_rgba(220,38,38,0.2)]">
          <div className="flex justify-between items-center mb-6 border-b border-red-900 pb-2">
              <span className="text-red-500 font-bold uppercase tracking-widest flex items-center gap-2 animate-pulse">
                  <Bug size={20} /> INTERFAZ CORRUPTA
              </span>
              <span className="font-mono text-xs text-red-400">REPARACIÓN: {Math.round((glitchesFixed / totalGlitches) * 100)}%</span>
          </div>

          <div className="text-center mb-8">
              <p className="text-cyan-200 text-sm mb-4 font-mono">
                  TOCA LOS NÓDULOS ROJOS PARA REINICIAR EL SISTEMA
              </p>
              {/* The Grid - Fixed size container and cells */}
              <div className="grid grid-cols-3 gap-3 w-64 h-64 mx-auto relative bg-slate-900/50 p-2 rounded border border-slate-800">
                  {[0,1,2,3,4,5,6,7,8].map((index) => {
                      const isGlitch = activeGlitches.includes(index);
                      return (
                          <motion.button
                              key={index}
                              onClick={() => isGlitch ? onGlitchClick(index) : null}
                              whileTap={{ scale: 0.95 }}
                              className={`relative w-full h-full rounded border transition-all duration-200 flex items-center justify-center overflow-hidden
                                  ${isGlitch 
                                      ? 'bg-red-500/20 border-red-500 shadow-[0_0_15px_rgba(220,38,38,0.6)] cursor-pointer' 
                                      : 'bg-cyan-900/10 border-cyan-800/30 cursor-default'
                                  }
                              `}
                          >
                              {isGlitch ? (
                                  <>
                                    <div className="absolute inset-0 bg-red-500 opacity-20 animate-pulse"></div>
                                    <div className="text-xs font-mono text-red-500 font-bold z-10 select-none">ERR</div>
                                    {/* Static effect overlay */}
                                    <div className="absolute inset-0 opacity-30" style={{backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, #000 3px)'}}></div>
                                  </>
                              ) : (
                                  <div className="w-1.5 h-1.5 bg-cyan-900 rounded-full"></div>
                              )}
                          </motion.button>
                      )
                  })}
              </div>
          </div>
          
          <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-700">
              <motion.div 
                  className="h-full bg-cyan-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${(glitchesFixed / totalGlitches) * 100}%` }}
              />
          </div>
       </div>
    </motion.div>
  );
};