import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Skull, Ban, Power, AlertTriangle } from 'lucide-react';

interface SelfDestructModalProps {
  onCancel: () => void; // Actually means "Accept" or "Stop"
}

export const SelfDestructModal = ({ onCancel }: SelfDestructModalProps) => {
  const [countdown, setCountdown] = useState(10);
  const [stage, setStage] = useState<'COUNTDOWN' | 'DETONATION'>('COUNTDOWN');

  useEffect(() => {
    if (stage === 'COUNTDOWN') {
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 0) {
            clearInterval(interval);
            setStage('DETONATION');
            return 0;
          }
          return prev - 0.1;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [stage]);

  return (
    <div className="fixed inset-0 z-[100] bg-red-950/90 backdrop-blur-md flex items-center justify-center p-4 overflow-hidden font-['Orbitron']">
      
      {/* Background Alarm Effect */}
      <motion.div 
        animate={{ opacity: [0.2, 0.6, 0.2] }}
        transition={{ duration: 0.5, repeat: Infinity }}
        className="absolute inset-0 bg-red-600 mix-blend-overlay pointer-events-none"
      />
      
      {/* Scanning Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] pointer-events-none z-0"></div>

      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative z-10 w-full max-w-2xl bg-black border-2 md:border-4 border-red-600 shadow-[0_0_50px_rgba(220,38,38,0.5)] md:shadow-[0_0_100px_rgba(220,38,38,0.8)] p-6 md:p-8 text-center clip-path-polygon flex flex-col max-h-[90vh] overflow-y-auto scrollbar-hide"
        style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 90%, 90% 100%, 0 100%, 0 10%)' }}
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b-2 border-red-600 pb-4 mb-6 shrink-0">
           <div className="flex items-center gap-2 md:gap-3 text-red-500">
              <Skull className="w-6 h-6 md:w-8 md:h-8 animate-pulse" />
              <span className="text-lg md:text-2xl font-black tracking-widest uppercase">ERROR FATAL</span>
           </div>
           <div className="text-red-500 font-mono text-sm md:text-xl animate-pulse">
              000-DESTRUCT
           </div>
        </div>

        {stage === 'COUNTDOWN' ? (
            <div className="space-y-6 md:space-y-8 flex-1 flex flex-col justify-center">
                <h2 className="text-2xl md:text-5xl text-white font-bold uppercase tracking-wider leading-tight">
                    RECHAZO NO AUTORIZADO
                </h2>
                
                <div className="bg-red-900/20 border border-red-500 p-4 md:p-6 rounded relative overflow-hidden">
                    <div className="absolute inset-0 bg-red-500/10 animate-pulse"></div>
                    <p className="text-red-300 text-sm md:text-lg font-mono mb-2 relative z-10">SECUENCIA DE AUTO DESTRUCCIÓN</p>
                    <div className="text-6xl md:text-9xl font-black text-red-500 font-mono tabular-nums tracking-tighter drop-shadow-[0_0_20px_rgba(220,38,38,0.8)] relative z-10">
                        00:0{countdown.toFixed(1)}
                    </div>
                </div>

                <div className="text-left text-[10px] md:text-xs font-mono text-red-400 space-y-1 opacity-70 bg-black/50 p-2 rounded border border-red-900/50">
                    <p>{`> DELETING HEART.EXE... [PENDING]`}</p>
                    <p>{`> OVERLOADING LOVE REACTOR... [CRITICAL]`}</p>
                    <p>{`> LOCKING EXITS... [DONE]`}</p>
                </div>

                {/* JARVIS STYLE OVERRIDE BUTTON */}
                <button 
                  onClick={onCancel}
                  className="w-full relative group bg-cyan-600 hover:bg-cyan-500 text-white py-4 md:py-6 px-4 font-bold uppercase tracking-widest shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:shadow-[0_0_50px_rgba(6,182,212,0.6)] border-y border-cyan-300 transition-all flex items-center justify-center gap-3 overflow-hidden"
                  style={{ clipPath: 'polygon(5% 0, 100% 0, 95% 100%, 0 100%)' }}
                >
                   {/* Shine Effect */}
                   <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 skew-y-12 origin-bottom"></div>
                   
                   <ShieldAlert size={24} className="md:w-8 md:h-8 group-hover:scale-110 transition-transform relative z-10 shrink-0" />
                   <div className="flex flex-col relative z-10 leading-none">
                      <span className="text-sm md:text-xl lg:text-2xl">ANULACIÓN DE EMERGENCIA</span>
                      <span className="text-[10px] md:text-xs text-cyan-200 opacity-80 mt-1">( CLICK AQUÍ PARA DECIR SÍ )</span>
                   </div>
                </button>
            </div>
        ) : (
            <div className="space-y-6 md:space-y-8 py-6 md:py-10 flex-1 flex flex-col items-center justify-center">
                 <Ban className="w-16 h-16 md:w-20 md:h-20 text-white mb-2 md:mb-4" />
                 <h2 className="text-3xl md:text-6xl text-white font-black uppercase tracking-wider leading-none">
                    FALLO DEL SISTEMA
                 </h2>
                 <p className="text-lg md:text-xl text-red-400 font-mono max-w-md mx-auto">
                    "Es broma. No puedes destruir algo tan fuerte."
                 </p>
                 
                 <button 
                  onClick={onCancel}
                  className="mt-4 md:mt-8 w-full group relative bg-transparent border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-900/30 hover:text-white text-lg md:text-xl px-8 py-4 font-bold uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_40px_rgba(6,182,212,0.5)] flex items-center justify-center gap-3 rounded"
                >
                   <Power size={24} className="group-hover:text-cyan-200 transition-colors" />
                   <span>REINICIAR SISTEMA (SÍ)</span>
                </button>
            </div>
        )}
      </motion.div>
    </div>
  );
};