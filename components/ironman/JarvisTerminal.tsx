import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Heart, User, Flame, Star, AlertCircle } from 'lucide-react';
import { HeartRateMonitor } from './widgets/HeartRateMonitor';
import { CoreTempGauge } from './widgets/CoreTempGauge';
import { LoveTrendGraph } from './widgets/LoveTrendGraph';
import { TARGET_NAME } from '../../shared/config';

interface JarvisTerminalProps {
  onBack: () => void;
  onEngage: () => void;
  onAbort: () => void;
}

export const JarvisTerminal = ({ onBack, onEngage, onAbort }: JarvisTerminalProps) => {
  return (
    <motion.div 
      key="active"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: { 
          opacity: 1, 
          transition: { 
            staggerChildren: 0.2,
            delayChildren: 0.1
          } 
        }
      }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      className="z-10 w-full max-w-6xl px-4 flex flex-col md:flex-row gap-4 items-stretch h-[85vh] md:h-auto overflow-y-auto md:overflow-visible"
    >
      {/* LEFT COLUMN: EXTRA STATS (Overburden) */}
      <motion.div 
        variants={{ hidden: { x: -50, opacity: 0 }, visible: { x: 0, opacity: 1 } }}
        className="hidden md:flex flex-col gap-4 w-72"
      >
         {/* Widget 1: Dynamic Heart Rate */}
         <HeartRateMonitor />

         {/* Widget 2: Sophisticated Core Temp */}
         <CoreTempGauge />
      </motion.div>


      {/* CENTER: MAIN INTERFACE (Restored Content) */}
      <div className="flex-1 relative bg-black/90 backdrop-blur-md border border-cyan-500/50 p-6 md:p-10 rounded-2xl shadow-[0_0_50px_rgba(6,182,212,0.15)] overflow-hidden flex flex-col justify-between min-h-[500px]">
         {/* Tech Decorations */}
         <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-400"></div>
         <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-400"></div>
         <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-400"></div>
         <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-400"></div>

         {/* Header */}
         <div className="flex justify-between items-center mb-6 border-b border-cyan-900/50 pb-4">
           <div className="flex items-center gap-3">
             <div className="w-3 h-3 bg-cyan-400 rounded-full animate-ping"></div>
             <div>
               <span className="block text-xs tracking-[0.3em] text-cyan-200">JARVIS.UI</span>
               <span className="text-[10px] text-cyan-600">SECURE CONNECTION</span>
             </div>
           </div>
           <button onClick={onBack} className="text-xs text-red-500/50 hover:text-red-500 transition-colors uppercase font-mono">
             [ TERMINATE ]
           </button>
         </div>

         {/* Content */}
         <div className="space-y-6 text-center relative z-10 flex-1 flex flex-col justify-center">
           
           <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
              <div className="inline-block bg-cyan-950/50 px-4 py-1 rounded border border-cyan-500/30 text-[10px] tracking-widest text-cyan-400 mb-4">
                  TARGET ACQUIRED: {TARGET_NAME}
              </div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-[0.1em] text-white drop-shadow-[0_0_15px_rgba(6,182,212,0.8)] mb-2">
                 FINAL CALCULATION
              </h2>
           </motion.div>
           
           {/* RESTORED STATS GRID */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full text-left">
              
              {/* Section 1: User Attributes */}
              <motion.div 
                  variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}
                  className="bg-cyan-950/20 border border-cyan-500/30 p-3 relative rounded"
              >
                  <h3 className="text-cyan-400 text-[10px] font-bold tracking-[0.2em] mb-3 border-b border-cyan-800 pb-1 flex items-center gap-2">
                     <User size={12} /> ANÁLISIS DE SUJETO
                  </h3>
                  <div className="space-y-2 font-mono text-xs">
                      <div className="flex justify-between items-center">
                          <span className="text-cyan-600">IDENTIDAD</span> 
                          <span className="text-white font-bold tracking-widest">{TARGET_NAME}</span>
                      </div>
                      <div className="flex justify-between items-center">
                          <span className="text-cyan-600">APARIENCIA</span> 
                          <span className="text-pink-400 flex items-center gap-1 font-bold"><Star size={10} fill="currentColor" /> ESPECTACULAR</span>
                      </div>
                      <div className="flex justify-between items-center">
                          <span className="text-cyan-600">NIVEL SEXY</span> 
                          <span className="text-red-500 font-bold flex items-center gap-1 animate-pulse"><Flame size={10} fill="currentColor" /> PELIGROSO 🔥</span>
                      </div>
                      <div className="flex justify-between items-center">
                          <span className="text-cyan-600">CARISMA</span> 
                          <span className="text-cyan-200 font-bold">MÁXIMO</span>
                      </div>
                  </div>
              </motion.div>

              {/* Section 2: Relationship Status */}
              <motion.div 
                  variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 } }}
                  className="bg-cyan-950/20 border border-cyan-500/30 p-3 relative rounded"
              >
                   <h3 className="text-cyan-400 text-[10px] font-bold tracking-[0.2em] mb-3 border-b border-cyan-800 pb-1 flex items-center gap-2">
                     <Activity size={12} /> DIAGNÓSTICO DEL SISTEMA
                  </h3>
                  <div className="space-y-2 font-mono text-xs">
                      <div className="flex justify-between items-center">
                          <span className="text-cyan-600">ESTADO EMOCIONAL</span> 
                          <span className="text-green-400 font-bold tracking-widest">ENAMORADOS</span>
                      </div>
                      <div className="flex justify-between items-center">
                          <span className="text-cyan-600">COMPATIBILIDAD</span> 
                          <span className="text-white font-bold">3000%</span>
                      </div>
                      <div className="flex justify-between items-center">
                          <span className="text-cyan-600">FUTURO</span> 
                          <span className="text-purple-400 font-bold">ETERNO</span>
                      </div>
                      <div className="flex justify-between items-center">
                          <span className="text-cyan-600">CONCLUSIÓN</span> 
                          <span className="text-cyan-300 font-bold animate-pulse">IRREEMPLAZABLE</span>
                      </div>
                  </div>
              </motion.div>
           </div>

           <motion.div className="py-2">
             <h3 className="text-2xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
               ¿QUIERES SER MI SAN VALENTÍN?
             </h3>
           </motion.div>

           <div className="space-y-3">
               <motion.button 
                 whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(6,182,212,0.4)" }}
                 whileTap={{ scale: 0.98 }}
                 onClick={onEngage}
                 className="w-full py-5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xl uppercase tracking-[0.3em] clip-path-polygon border-t border-cyan-300 relative overflow-hidden group shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                 style={{ clipPath: 'polygon(5% 0, 100% 0, 100% 80%, 95% 100%, 0 100%, 0 20%)' }}
               >
                 <span className="relative z-10 flex items-center justify-center gap-4">
                    <Heart className="fill-white" size={20} /> INICIAR PROTOCOLO: SÍ
                 </span>
               </motion.button>

               {/* PRANK BUTTON */}
               <motion.button 
                 onClick={onAbort}
                 className="w-full py-3 bg-transparent border border-red-900/50 text-red-800 hover:bg-red-950/30 hover:text-red-500 hover:border-red-500 font-mono text-xs tracking-widest transition-all"
               >
                 [ ABORT MISSION ]
               </motion.button>
           </div>
         </div>
      </div>

      {/* RIGHT COLUMN: MORE STATS */}
      <motion.div 
        variants={{ hidden: { x: 50, opacity: 0 }, visible: { x: 0, opacity: 1 } }}
        className="hidden md:flex flex-col gap-4 w-72"
      >
         {/* Widget 3: Love Trend Graph - Takes remaining space */}
         <div className="flex-1 min-h-0">
             <LoveTrendGraph />
         </div>

         {/* Warning Panel - Compact */}
         <div className="bg-red-950/20 border border-red-500/30 p-4 shrink-0 flex flex-col justify-center">
             <div className="flex items-center gap-2 mb-2">
                 <AlertCircle size={14} className="text-red-500" />
                 <span className="text-[10px] text-red-500 font-bold">ALERTS</span>
             </div>
             <p className="text-[10px] text-red-400 font-mono leading-relaxed">
                  &gt; EXCESO DE BELLEZA DETECTADO<br/>
                  &gt; RESISTANCE IS FUTILE<br/>
                  &gt; DI QUE SÍ INMEDIATAMENTE<br/>
                  &gt; SOBRECALIENTAMIENTO DEL SISTEMA DEBIDO A NUESTRO AMOR
             </p>
         </div>
      </motion.div>

    </motion.div>
  );
};