import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, ShieldAlert, Skull, Ban } from 'lucide-react';

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
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative z-10 w-full max-w-2xl bg-black border-4 border-red-600 shadow-[0_0_100px_rgba(220,38,38,0.8)] p-8 text-center clip-path-polygon"
        style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 90%, 90% 100%, 0 100%, 0 10%)' }}
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b-2 border-red-600 pb-4 mb-6">
           <div className="flex items-center gap-3 text-red-500">
              <Skull size={32} className="animate-pulse" />
              <span className="text-2xl font-black tracking-widest uppercase">FATAL ERROR</span>
           </div>
           <div className="text-red-500 font-mono text-xl animate-pulse">
              CODE: 000-DESTRUCT
           </div>
        </div>

        {stage === 'COUNTDOWN' ? (
            <div className="space-y-8">
                <h2 className="text-4xl md:text-5xl text-white font-bold uppercase tracking-wider">
                    REJECTION NOT AUTHORIZED
                </h2>
                
                <div className="bg-red-900/30 border border-red-500 p-6 rounded">
                    <p className="text-red-300 text-lg font-mono mb-2">SELF-DESTRUCT SEQUENCE INITIATED</p>
                    <div className="text-7xl md:text-9xl font-black text-red-500 font-mono tabular-nums tracking-tighter drop-shadow-[0_0_20px_rgba(220,38,38,0.8)]">
                        00:0{countdown.toFixed(1)}
                    </div>
                </div>

                <div className="text-left text-xs font-mono text-red-400 space-y-1 opacity-70">
                    <p>{`> DELETING HEART.EXE... [PENDING]`}</p>
                    <p>{`> OVERLOADING LOVE REACTOR... [98%]`}</p>
                    <p>{`> LOCKING EXITS... [DONE]`}</p>
                </div>

                <button 
                  onClick={onCancel}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white text-2xl py-6 font-bold uppercase tracking-widest shadow-[0_0_30px_rgba(37,99,235,0.6)] animate-pulse border-2 border-white flex items-center justify-center gap-4 group"
                >
                   <ShieldAlert size={32} className="group-hover:rotate-12 transition-transform" />
                   EMERGENCY OVERRIDE (SAY YES)
                </button>
            </div>
        ) : (
            <div className="space-y-8 py-10">
                 <Ban size={80} className="mx-auto text-white mb-4" />
                 <h2 className="text-4xl md:text-6xl text-white font-black uppercase tracking-wider">
                    SYSTEM FAILURE
                 </h2>
                 <p className="text-xl text-red-400 font-mono">
                    "Es broma. No puedes destruir algo tan fuerte."
                 </p>
                 <button 
                  onClick={onCancel}
                  className="mt-8 bg-white text-black text-xl px-8 py-4 font-bold uppercase tracking-widest hover:bg-gray-200"
                >
                   REBOOT SYSTEM (AND SAY YES)
                </button>
            </div>
        )}
      </motion.div>
    </div>
  );
};