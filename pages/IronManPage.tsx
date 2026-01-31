import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scan, Send, User, Shield, Heart, Lock } from 'lucide-react';
import { IronManBackground } from '../components/ironman/IronManBackground';
import { ArcReactor } from '../components/ironman/ArcReactor';
import { GlitchSystem } from '../components/ironman/GlitchSystem';
import { JarvisTerminal } from '../components/ironman/JarvisTerminal';
import { SelfDestructModal } from '../components/ironman/SelfDestructModal';

export const IronManPage = ({ onBack, onPropose }: { onBack: () => void, onPropose: () => void }) => {
  // Flow: SCANNING -> GRANTED -> POWER_FAILURE -> STABILIZING (Mini-game) -> ANALYZING (Animation) -> ACTIVE -> CELEBRATION
  const [status, setStatus] = useState<'SCANNING' | 'GRANTED' | 'POWER_FAILURE' | 'STABILIZING' | 'ANALYZING' | 'ACTIVE' | 'CELEBRATION'>('SCANNING');
  const [powerLevel, setPowerLevel] = useState(0);
  const [showSelfDestruct, setShowSelfDestruct] = useState(false);
  
  // --- MINI-GAME STATE (Glitch Repair) ---
  const [glitchesFixed, setGlitchesFixed] = useState(0);
  const TOTAL_GLITCHES_NEEDED = 8;
  const [activeGlitches, setActiveGlitches] = useState<number[]>([0, 4, 8]); // Start with 3 glitches
  
  // --- ANALYSIS STATE ---
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisStep, setAnalysisStep] = useState(0); // 0: Armor, 1: Heart, 2: Future

  const chargingInterval = useRef<any>(null);

  // Sequence: Scan -> Granted -> Power Failure
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (status === 'SCANNING') {
      timer = setTimeout(() => {
        setStatus('GRANTED');
      }, 3500);
    } else if (status === 'GRANTED') {
      timer = setTimeout(() => {
        setStatus('POWER_FAILURE');
      }, 2000);
    }

    return () => clearTimeout(timer);
  }, [status]);

  // --- CHARGING LOGIC (Power Failure) ---
  const startCharging = () => {
    if (status !== 'POWER_FAILURE') return;
    if (chargingInterval.current) clearInterval(chargingInterval.current);

    chargingInterval.current = setInterval(() => {
      setPowerLevel((prev) => {
        if (prev >= 100) {
          clearInterval(chargingInterval.current);
          setStatus('STABILIZING');
          return 100;
        }
        return prev + 1; // Slower charge to enjoy the boot up animation
      });
    }, 40);
  };

  const stopCharging = () => {
    if (chargingInterval.current) {
      clearInterval(chargingInterval.current);
      chargingInterval.current = null;
    }
    if (status !== 'POWER_FAILURE') return;

    chargingInterval.current = setInterval(() => {
      setPowerLevel((prev) => {
        if (prev <= 0) {
          clearInterval(chargingInterval.current);
          return 0;
        }
        if (prev >= 100) return 100;
        return prev - 2; // Decay faster
      });
    }, 40);
  };

  // --- GLITCH REPAIR LOGIC ---
  const handleGlitchClick = (index: number) => {
    // Remove the clicked glitch
    setActiveGlitches(prev => prev.filter(g => g !== index));
    
    const newFixed = glitchesFixed + 1;
    setGlitchesFixed(newFixed);

    // Win Condition
    if (newFixed >= TOTAL_GLITCHES_NEEDED) {
        setTimeout(() => setStatus('ANALYZING'), 500);
    } else {
        // Spawn a new glitch somewhere else randomly to keep playing
        if (newFixed < TOTAL_GLITCHES_NEEDED - 1) {
            const availableSlots = [0,1,2,3,4,5,6,7,8].filter(i => i !== index && !activeGlitches.includes(i));
            const randomSlot = availableSlots[Math.floor(Math.random() * availableSlots.length)];
            if (randomSlot !== undefined) {
                setTimeout(() => {
                    setActiveGlitches(prev => [...prev, randomSlot]);
                }, 200);
            }
        }
    }
  };

  // --- ANALYSIS ANIMATION LOGIC ---
  useEffect(() => {
      if (status === 'ANALYZING') {
          // Simulate progress bars filling up
          const interval = setInterval(() => {
              setAnalysisProgress(prev => {
                  if (prev >= 100) {
                      clearInterval(interval);
                      setTimeout(() => setStatus('ACTIVE'), 1000);
                      return 100;
                  }
                  const jump = Math.random() * 5; 
                  return Math.min(prev + jump, 100);
              });
          }, 100);

          const progressChecker = setInterval(() => {
             setAnalysisProgress(p => {
                 if (p < 33) setAnalysisStep(0);
                 else if (p < 66) setAnalysisStep(1);
                 else setAnalysisStep(2);
                 return p;
             });
          }, 100);

          return () => {
              clearInterval(interval);
              clearInterval(progressChecker);
          };
      }
  }, [status]);

  const handleEngage = () => {
    setStatus('CELEBRATION');
  };

  const handleAbort = () => {
    setShowSelfDestruct(true);
  };

  const handleCancelSelfDestruct = () => {
    // Cancelling self-destruct effectively forces acceptance or resets. 
    // Let's make it accept the proposal as a "Override" mechanism
    setShowSelfDestruct(false);
    setStatus('CELEBRATION');
  };

  return (
    <div className="min-h-screen bg-black text-cyan-400 font-['Orbitron'] relative overflow-hidden flex flex-col items-center justify-center select-none">
      
      {/* Background (Always Visible but opacity controlled by powerLevel) */}
      <IronManBackground 
        powerLevel={powerLevel} 
        isStable={status !== 'SCANNING' && status !== 'GRANTED' && status !== 'POWER_FAILURE'} 
      />

      <AnimatePresence mode='wait'>
        {status === 'SCANNING' && (
          <motion.div 
            key="scanning"
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 backdrop-blur-sm"
          >
             <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent h-[10vh] animate-scan w-full"></div>
             <div className="relative z-10 flex flex-col items-center">
                <div className="relative w-80 h-80 border-4 border-cyan-500/50 rounded-full flex items-center justify-center overflow-hidden mb-8">
                  <div className="absolute w-72 h-72 border-2 border-cyan-400/30 rounded-full border-t-transparent animate-spin-slow"></div>
                  <div className="absolute w-60 h-60 border border-dashed border-cyan-300/20 rounded-full animate-spin-reverse"></div>
                  <User size={120} strokeWidth={0.5} className="text-cyan-500 opacity-50" />
                </div>
                <h2 className="text-2xl tracking-[0.3em] font-bold text-cyan-400 animate-pulse bg-black px-4 py-2 border border-cyan-900">
                  ESCANEO FACIAL...
                </h2>
                <div className="mt-2 text-xs text-cyan-700 font-mono">
                  IDENTIFICANDO SUJETO
                </div>
             </div>
          </motion.div>
        )}

        {status === 'GRANTED' && (
          <motion.div 
            key="granted"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="z-20 flex flex-col items-center"
          >
            <div className="text-green-400 border-2 border-green-500 rounded-full p-6 mb-4 shadow-[0_0_50px_rgba(34,197,94,0.5)] bg-black">
              <Scan size={64} />
            </div>
            <h2 className="text-3xl font-bold text-green-400 tracking-widest uppercase">ACCESO CONCEDIDO</h2>
          </motion.div>
        )}

        {status === 'POWER_FAILURE' && (
          <ArcReactor 
            powerLevel={powerLevel}
            onStartCharging={startCharging}
            onStopCharging={stopCharging}
          />
        )}

        {/* --- GLITCH REPAIR MINI-GAME --- */}
        {status === 'STABILIZING' && (
          <GlitchSystem 
            glitchesFixed={glitchesFixed}
            totalGlitches={TOTAL_GLITCHES_NEEDED}
            activeGlitches={activeGlitches}
            onGlitchClick={handleGlitchClick}
          />
        )}

        {/* --- ANALYSIS ANIMATION PHASE --- */}
        {status === 'ANALYZING' && (
           <motion.div
             key="analyzing"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="z-50 w-full h-full flex flex-col items-center justify-center relative p-6"
           >
              {/* Central Visual */}
              <div className="relative w-64 h-80 mb-8 flex items-center justify-center">
                  {/* Rotating Scanner Rings */}
                  <div className="absolute w-64 h-64 border border-cyan-500/20 rounded-full animate-spin-slow"></div>
                  <div className="absolute w-56 h-56 border border-dashed border-cyan-500/40 rounded-full animate-spin-reverse"></div>
                  
                  {/* Hologram Icon changing based on step */}
                  <div className="z-10 text-cyan-400 drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]">
                      {analysisStep === 0 && <Shield size={80} strokeWidth={1} className="animate-pulse" />}
                      {analysisStep === 1 && <Heart size={80} strokeWidth={1} className="animate-pulse text-pink-400" />}
                      {analysisStep === 2 && <Lock size={80} strokeWidth={1} className="animate-pulse text-green-400" />}
                  </div>

                  {/* Scan Line */}
                  <motion.div 
                    className="absolute w-full h-2 bg-cyan-400/50 blur-md top-0"
                    animate={{ top: ["0%", "100%", "0%"] }}
                    transition={{ duration: 3, ease: "linear", repeat: Infinity }}
                  />
              </div>

              {/* Data readout */}
              <div className="w-full max-w-md space-y-4">
                  <div className="bg-black/50 border border-cyan-800 p-4 rounded text-left">
                      <div className="flex justify-between text-xs font-mono text-cyan-500 mb-1">
                          <span>
                            {analysisStep === 0 && "INTEGRIDAD DE ARMADURA"}
                            {analysisStep === 1 && "RESONANCIA CARDÍACA"}
                            {analysisStep === 2 && "CÁLCULO DE FUTURO"}
                          </span>
                          <span>{Math.round(analysisProgress)}%</span>
                      </div>
                      <div className="w-full h-1 bg-cyan-900/50">
                          <motion.div 
                              className="h-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]" 
                              style={{ width: `${analysisProgress}%` }}
                          />
                      </div>
                      {/* Flying text effect */}
                      <div className="h-6 overflow-hidden mt-2">
                        <motion.div 
                           key={analysisStep}
                           initial={{ y: 20, opacity: 0 }}
                           animate={{ y: 0, opacity: 1 }}
                           className="text-white font-bold tracking-widest text-sm"
                        >
                            {analysisStep === 0 && "RESTAURANDO HUD..."}
                            {analysisStep === 1 && "DETECTANDO SENTIMIENTOS..."}
                            {analysisStep === 2 && "PROBABILIDAD: 100%..."}
                        </motion.div>
                      </div>
                  </div>
              </div>
           </motion.div>
        )}

        {status === 'ACTIVE' && (
          <JarvisTerminal 
            onBack={onBack} 
            onEngage={handleEngage} 
            onAbort={handleAbort}
          />
        )}

        {status === 'CELEBRATION' && (
          <motion.div 
            key="celebration"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="z-30 text-center max-w-2xl px-4"
          >
            <div className="relative mb-8">
               <div className="absolute inset-0 bg-red-500 blur-[80px] opacity-30 animate-pulse"></div>
               <Heart size={120} className="text-red-500 mx-auto fill-red-500/20 drop-shadow-[0_0_20px_rgba(239,68,68,0.8)]" />
               <motion.div 
                 animate={{ scale: [1, 1.2, 1] }} 
                 transition={{ repeat: Infinity, duration: 1.5 }}
                 className="absolute inset-0 flex items-center justify-center"
               >
                 <div className="w-40 h-40 border-2 border-red-400/30 rounded-full animate-spin-slow absolute"></div>
               </motion.div>
            </div>

            <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-500 tracking-widest mb-6">
              PROTOCOLO ACEPTADO
            </h2>
            
            <p className="text-xl md:text-2xl text-cyan-100 mb-8 font-mono leading-relaxed">
              "¿Prueba de que Tony Stark tiene corazón? <br/> No. Prueba de que yo tengo el tuyo."
            </p>

            <motion.button
              onClick={onPropose}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center justify-center gap-3 mx-auto px-8 py-4 bg-green-500/20 border border-green-500/50 rounded-full text-green-400 hover:bg-green-500 hover:text-white transition-all duration-300 uppercase tracking-widest font-bold text-lg"
            >
              <Send size={20} className="group-hover:translate-x-1 transition-transform" />
              CONFIRMAR TRANSMISIÓN
            </motion.button>
            <p className="mt-4 text-xs text-cyan-700 tracking-widest">ESTABLECIDO</p>
          </motion.div>
        )}

      </AnimatePresence>
      
      {/* Prank Modal Overlay */}
      <AnimatePresence>
        {showSelfDestruct && (
            <SelfDestructModal onCancel={handleCancelSelfDestruct} />
        )}
      </AnimatePresence>
    </div>
  );
};