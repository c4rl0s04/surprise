import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Zap } from 'lucide-react';

interface ArcReactorProps {
  powerLevel: number;
  onStartCharging: () => void;
  onStopCharging: () => void;
}

export const ArcReactor = ({ powerLevel, onStartCharging, onStopCharging }: ArcReactorProps) => {
  return (
    <motion.div
      key="failure"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.2, filter: 'blur(20px)' }}
      className="z-20 flex flex-col items-center text-center max-w-lg px-4"
    >
      <AlertTriangle size={64} className="text-red-500 mb-6 animate-pulse" />
      <h2 className="text-3xl font-bold text-red-500 tracking-widest uppercase mb-2">FALLO CRÍTICO DE ENERGÍA</h2>
      <p className="text-red-300 font-mono text-sm mb-8">REACTOR ARC APAGADO. RECARGA MANUAL REQUERIDA.</p>
      
      <div 
        className="relative w-64 h-64 cursor-pointer group"
        onMouseDown={onStartCharging}
        onMouseUp={onStopCharging}
        onMouseLeave={onStopCharging}
        onTouchStart={onStartCharging}
        onTouchEnd={onStopCharging}
        onContextMenu={(e) => e.preventDefault()}
      >
        <div 
          className="absolute inset-0 rounded-full bg-cyan-500 blur-2xl transition-opacity duration-100"
          style={{ opacity: powerLevel / 150 }}
        ></div>
        <div className="relative w-full h-full bg-slate-900 rounded-full border-4 border-slate-700 flex items-center justify-center shadow-2xl overflow-hidden">
          <div 
            className="absolute bottom-0 left-0 right-0 bg-cyan-400 transition-all duration-75 ease-linear box-border"
            style={{ height: `${powerLevel}%`, boxShadow: '0 0 20px #22d3ee' }}
          ></div>
          <div className="absolute inset-0 border-8 border-slate-800 rounded-full"></div>
          <div className="absolute w-20 h-20 bg-slate-900 rounded-full border-4 border-slate-600 z-10 flex items-center justify-center">
             <Zap size={32} className={`text-cyan-200 transition-all ${powerLevel > 0 ? 'opacity-100' : 'opacity-30'}`} />
          </div>
        </div>
        <div className="mt-8 font-bold text-xl tracking-widest text-cyan-500 animate-pulse">
          {powerLevel < 100 ? "MANTÉN PULSADO PARA RECARGAR" : "ENERGÍA RESTAURADA"}
        </div>
        <div className="text-xs text-cyan-700 mt-2 font-mono">CAPACIDAD: {powerLevel}%</div>
      </div>
    </motion.div>
  );
};