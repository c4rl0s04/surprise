import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Unlock, Zap, Mic, Square, ArrowRight, AlertTriangle, Crown, Star } from 'lucide-react';
import { KwazyCupcakes } from './minigames/KwazyCupcakes';

interface HalloweenHeistProps {
  onHeistComplete: () => void;
}

// Stages of the Heist
type HeistStage = 
  'BLACKOUT' | 
  'BACKSTREET' | 
  'TERRY' | 
  'GINA' | 
  'SEXTAPE' | 
  'KWAZY' |    
  'BULLPEN' |  
  'BOYLE' | 
  'SAFE' | 
  'VICTORY';

export const HalloweenHeist: React.FC<HalloweenHeistProps> = ({ onHeistComplete }) => {
  const [stage, setStage] = useState<HeistStage>('BLACKOUT');
  const [errorMsg, setErrorMsg] = useState("");
  
  // --- BLACKOUT STATE ---
  const [blackoutText, setBlackoutText] = useState("");

  // --- BOYLE STATE ---
  const [boyleLevel, setBoyleLevel] = useState(0);
  
  // --- SAFE STATE ---
  const [safeCode, setSafeCode] = useState("");

  // --- BULLPEN STATE ---
  const [bullpenPos, setBullpenPos] = useState(0);
  const [bullpenDirection, setBullpenDirection] = useState(1);
  const [bullpenStatus, setBullpenStatus] = useState<'IDLE' | 'MOVING' | 'SUCCESS' | 'CRASH' | 'SHORT'>('IDLE');
  const [bullpenFeedback, setBullpenFeedback] = useState("");
  const bullpenRef = useRef<any>(null);

  // --- GENERIC HANDLER FOR WRONG ANSWERS ---
  const triggerError = (msg: string, duration = 2000) => {
    setErrorMsg(msg);
    setTimeout(() => setErrorMsg(""), duration);
  };

  // --- EFFECTS ---

  // Blackout Intro Sequence
  useEffect(() => {
    if (stage === 'BLACKOUT') {
      const seq = async () => {
        await new Promise(r => setTimeout(r, 1000));
        setBlackoutText("Se han apagado las luces...");
        await new Promise(r => setTimeout(r, 2000));
        setBlackoutText("El Asalto ha comenzado...");
        await new Promise(r => setTimeout(r, 2000));
        setBlackoutText("HALLOWEEN HEIST");
        await new Promise(r => setTimeout(r, 2000));
        setStage('BACKSTREET');
      };
      seq();
    }
  }, [stage]);

  // Boyle Decay Logic
  useEffect(() => {
    if (stage === 'BOYLE') {
      const interval = setInterval(() => {
        setBoyleLevel(prev => Math.max(0, prev - 1.5)); // Decay speed
      }, 100);
      return () => clearInterval(interval);
    }
  }, [stage]);

  // Bullpen Animation Logic
  useEffect(() => {
    if (stage === 'BULLPEN') {
       if (bullpenStatus === 'MOVING') {
            bullpenRef.current = setInterval(() => {
                setBullpenPos(prev => {
                    let next = prev + (2.5 * bullpenDirection); // Speed
                    if (next >= 100 || next <= 0) {
                        setBullpenDirection(d => d * -1);
                        return prev;
                    }
                    return next;
                });
            }, 16);
       } else {
           clearInterval(bullpenRef.current);
       }
    }
    return () => clearInterval(bullpenRef.current);
  }, [stage, bullpenStatus, bullpenDirection]);


  // --- STAGE HANDLERS ---

  const handleBackstreet = (num: number) => {
    if (num === 5) {
      setTimeout(() => setStage('TERRY'), 500);
    } else {
      triggerError("LITERALMENTE OLVIDASTE ESA PARTE. (ERA EL NÚMERO 5)", 3000);
    }
  };

  const handleTerry = (item: string) => {
    if (item === 'YOGURT') {
      setTimeout(() => setStage('GINA'), 500);
    } else {
      triggerError("¡TERRY ODIA ESO!", 1500);
    }
  };

  const handleGina = (animal: string) => {
    if (animal === 'WOLF') {
      setTimeout(() => setStage('SEXTAPE'), 500);
    } else {
      triggerError("¡ACABAS DE BEBER CEMENTO!", 1500);
    }
  };

  const handleSexTape = (correct: boolean) => {
    if (correct) {
      setTimeout(() => setStage('KWAZY'), 500);
    } else {
      triggerError("NOPE. INTÉNTALO OTRA VEZ.", 1500);
    }
  };

  // --- KWAZY CUPCAKES HANDLERS ---
  const handleKwazySuccess = () => {
    setStage('BULLPEN');
  };

  const handleKwazyFail = () => {
      // Just reset the game component key or trigger a message
      triggerError("GAME OVER. REINICIANDO NIVEL...", 2000);
  };

  // --- BULLPEN HANDLERS ---
  const startBullpen = () => {
      setBullpenStatus('MOVING');
      setBullpenFeedback("");
  };

  const stopBullpen = () => {
      if (bullpenStatus !== 'MOVING') return;
      clearInterval(bullpenRef.current);

      // Target Zone: 75 to 90
      if (bullpenPos > 90) {
          setBullpenStatus('CRASH');
          setBullpenFeedback("¡DEMASIADO FUERTE! TE CHOCASTE CON EL ASCENSOR.");
          resetBullpen();
      } else if (bullpenPos < 75) {
          setBullpenStatus('SHORT');
          setBullpenFeedback("¡MUY CORTO! NO LLEGASTE A LAS BOTELLAS.");
          resetBullpen();
      } else {
          setBullpenStatus('SUCCESS');
          setBullpenFeedback("¡PLENO! ¡BOTELLAS BABA YAGA DERRIBADAS!");
          setTimeout(() => setStage('BOYLE'), 2000);
      }
  };

  const resetBullpen = () => {
      setTimeout(() => {
          setBullpenPos(0);
          setBullpenStatus('IDLE');
          setBullpenFeedback("");
          setBullpenDirection(1);
      }, 2500);
  };

  const handleBoyleMash = () => {
    const newLevel = boyleLevel + 8; // Points per click
    if (newLevel >= 100) {
      setBoyleLevel(100);
      setStage('SAFE');
    } else {
      setBoyleLevel(newLevel);
    }
  };

  const handleSafeInput = (num: string) => {
    const newCode = safeCode + num;
    if (newCode === "99") {
        setSafeCode("99");
        setTimeout(() => setStage('VICTORY'), 500);
    } else if (newCode.length >= 2) {
        setSafeCode("ERROR");
        setTimeout(() => setSafeCode(""), 500);
    } else {
        setSafeCode(newCode);
    }
  };

  // Helper Component for Error Overlay
  const ErrorOverlay = () => (
    <AnimatePresence>
      {errorMsg && (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 rounded-lg backdrop-blur-sm p-6"
        >
            <motion.div 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="text-center"
            >
                <AlertTriangle size={60} className="text-red-500 mx-auto mb-4 animate-bounce" />
                <p className="text-red-500 font-black text-2xl uppercase tracking-widest leading-relaxed border-2 border-red-500 p-4 rounded bg-red-950/30">
                  {errorMsg}
                </p>
            </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Helper to determine container styles
  const isBlackout = stage === 'BLACKOUT';

  return (
    <motion.div 
      layout
      className={`relative w-full max-w-4xl min-h-[80vh] flex flex-col items-center justify-center font-['Special_Elite'] text-white p-4 transition-all duration-700 ${
        isBlackout 
            ? 'bg-transparent border-none shadow-none' 
            : 'bg-slate-900 rounded-xl overflow-hidden shadow-2xl border-4 border-orange-500'
      }`}
    >
      
      {/* Background Halloween Decor - Hide during Blackout */}
      {!isBlackout && stage !== 'VICTORY' && (
        <>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-800 via-slate-950 to-black z-0"></div>
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-500 via-purple-500 to-orange-500 z-10"></div>
        </>
      )}

      <AnimatePresence mode="wait">
        
        {/* --- STAGE 0: BLACKOUT --- */}
        {stage === 'BLACKOUT' && (
          <motion.div 
            key="blackout"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="z-50 absolute inset-0 flex flex-col items-center justify-center text-center p-4"
          >
            <motion.h1 
                key={blackoutText}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.5 }}
                className={`font-black uppercase tracking-widest ${blackoutText.includes('HEIST') ? 'text-5xl md:text-7xl text-orange-500 drop-shadow-[0_0_15px_rgba(249,115,22,0.5)]' : 'text-2xl md:text-3xl text-white'}`}
            >
                {blackoutText}
            </motion.h1>
          </motion.div>
        )}

        {/* --- STAGE 1: BACKSTREET BOYS --- */}
        {stage === 'BACKSTREET' && (
          <motion.div 
            key="backstreet"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            className="z-10 w-full max-w-lg text-center relative"
          >
            <ErrorOverlay />
            
            <h2 className="text-3xl text-purple-400 mb-2 font-bold uppercase">LA RUEDA DE RECONOCIMIENTO</h2>
            <p className="text-sm text-slate-400 mb-6 italic">"Number 1, could you please sing the opening to 'I Want It That Way'?"</p>
            
            <div className="bg-slate-800 p-6 rounded-lg border-2 border-slate-600 mb-6 shadow-xl relative overflow-hidden">
               <div className="text-2xl font-bold mb-4 text-white">¿Quién mató a mi hermano?</div>
               <div className="grid grid-cols-5 gap-2">
                  {[1,2,3,4,5].map(num => (
                     <button
                        key={num}
                        onClick={() => handleBackstreet(num)}
                        className="aspect-[1/2] rounded flex flex-col items-center justify-center gap-2 transition-all bg-slate-700 hover:bg-slate-600 hover:scale-105 active:scale-95"
                     >
                        <div className="w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center text-xs font-bold border border-slate-500">
                           {num}
                        </div>
                        <Mic size={20} className="text-slate-400" />
                     </button>
                  ))}
               </div>
            </div>
          </motion.div>
        )}

        {/* --- STAGE 2: TERRY --- */}
        {stage === 'TERRY' && (
          <motion.div 
            key="terry"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            className="z-10 w-full max-w-lg text-center relative"
          >
             <ErrorOverlay />

             <h2 className="text-4xl text-yellow-400 mb-4 font-black uppercase">TERRY AMA...</h2>
             <div className="grid grid-cols-2 gap-4">
                {['LOS MUROS', 'EL YOGUR', 'LOS ASALTOS', 'SALTARSE PIERNA'].map((item) => (
                    <button 
                        key={item}
                        onClick={() => handleTerry(item === 'EL YOGUR' ? 'YOGURT' : item)}
                        className="h-32 bg-slate-800 border-b-4 border-slate-950 hover:bg-slate-700 hover:scale-105 transition-all rounded flex items-center justify-center p-4"
                    >
                        <span className="text-xl font-bold uppercase">{item}</span>
                    </button>
                ))}
             </div>
          </motion.div>
        )}

        {/* --- STAGE 3: GINA --- */}
        {stage === 'GINA' && (
          <motion.div 
            key="gina"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            className="z-10 w-full max-w-lg text-center relative"
          >
             <ErrorOverlay />

             <h2 className="text-3xl text-pink-500 mb-2 font-black uppercase">LA COLMENA G</h2>
             <p className="text-slate-300 mb-6">¿Cuál es el espíritu animal de Gina Linetti?</p>
             
             <div className="flex flex-col gap-3">
                 <button onClick={() => handleGina('UNICORN')} className="p-4 bg-slate-800 hover:bg-pink-900/20 border border-slate-600 rounded">UNICORNIO</button>
                 <button onClick={() => handleGina('WOLF')} className="p-4 bg-slate-800 hover:bg-pink-900/20 border border-slate-600 rounded">LOBO</button>
                 <button onClick={() => handleGina('EAGLE')} className="p-4 bg-slate-800 hover:bg-pink-900/20 border border-slate-600 rounded">ÁGUILA</button>
             </div>
          </motion.div>
        )}

        {/* --- STAGE 4: SEX TAPE --- */}
        {stage === 'SEXTAPE' && (
          <motion.div 
            key="sextape"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            className="z-10 w-full max-w-lg text-center relative"
          >
             <ErrorOverlay />

             <h2 className="text-3xl text-blue-400 mb-6 font-black uppercase">TEST DE PERALTA</h2>
             
             <div className="bg-slate-100 text-slate-900 p-6 rounded rotate-1 shadow-lg mb-6">
                 <p className="text-xl font-bold mb-2">"No encuentro el agujero, está muy oscuro..."</p>
                 <div className="h-1 w-full bg-slate-300 my-4"></div>
                 <p className="text-sm font-mono uppercase tracking-widest text-slate-500">COMPLETA LA FRASE</p>
             </div>

             <div className="grid grid-cols-1 gap-3">
                 <button onClick={() => handleSexTape(true)} className="p-3 bg-slate-700 hover:bg-slate-600 text-slate-300 font-bold rounded shadow-lg uppercase">
                    TÍTULO DE TU VIDEO PORNO
                 </button>
                 <button onClick={() => handleSexTape(false)} className="p-3 bg-slate-700 hover:bg-slate-600 text-slate-300 font-bold rounded shadow-lg uppercase">
                    ESO DIJO ELLA
                 </button>
                 <button onClick={() => handleSexTape(false)} className="p-3 bg-slate-700 hover:bg-slate-600 text-slate-300 font-bold rounded shadow-lg uppercase">
                    COOL COOL COOL
                 </button>
             </div>
          </motion.div>
        )}

        {/* --- STAGE 5: KWAZY CUPCAKES (Updated) --- */}
        {stage === 'KWAZY' && (
           <motion.div 
             key="kwazy"
             initial={{ scale: 0.8, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             exit={{ x: -100, opacity: 0 }}
             className="z-10 w-full flex justify-center relative"
           >
              <ErrorOverlay />

              {/* Reset key when mounting to ensure fresh game */}
              <KwazyCupcakes 
                  key="kwazy-game"
                  onSuccess={handleKwazySuccess} 
                  onFailure={handleKwazyFail} 
              />
           </motion.div>
        )}

        {/* --- STAGE 6: FULL BULLPEN (Improved) --- */}
        {stage === 'BULLPEN' && (
            <motion.div 
               key="bullpen"
               initial={{ x: 100, opacity: 0 }}
               animate={{ x: 0, opacity: 1 }}
               exit={{ x: -100, opacity: 0 }}
               className="z-10 w-full max-w-lg text-center relative"
            >
               {/* Custom feedback overlay for bullpen specific messages */}
               {bullpenFeedback && (
                 <div className="absolute inset-x-0 -top-16 z-50 flex justify-center pointer-events-none">
                    <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className={`font-bold text-lg px-6 py-2 rounded-full shadow-xl border-2 ${
                            bullpenStatus === 'SUCCESS' 
                                ? 'bg-green-600 border-green-400 text-white' 
                                : 'bg-red-600 border-red-400 text-white'
                        }`}
                      >
                          {bullpenFeedback}
                      </motion.div>
                 </div>
               )}

               <h2 className="text-3xl text-cyan-400 mb-2 font-black uppercase">FULL BULLPEN</h2>
               <p className="text-sm text-slate-300 mb-8">EL SUELO ESTÁ RECIÉN ENCERADO. ¡DESLÍZATE!</p>

               {/* Floor Visual */}
               <div className="w-full h-24 bg-slate-800 rounded-lg border-4 border-slate-600 relative mb-8 overflow-hidden shadow-inner">
                   {/* Floor tiles pattern */}
                   <div className="absolute inset-0 opacity-20 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_25%,rgba(255,255,255,0.1)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.1)_75%,rgba(255,255,255,0.1)_100%)] bg-[size:20px_20px]"></div>
                   
                   {/* Elevator / Success Zone */}
                   <div className="absolute top-0 bottom-0 right-[5%] w-[15%] bg-green-900/50 border-l-4 border-green-500 flex items-center justify-center">
                       <div className="text-[10px] text-green-300 font-bold -rotate-90 whitespace-nowrap">ASCENSOR</div>
                   </div>

                   {/* Jake Slider */}
                   <motion.div 
                     className="absolute top-1/2 -translate-y-1/2 w-12 h-16 bg-blue-600 rounded shadow-xl border-2 border-white z-10 flex items-center justify-center"
                     style={{ left: `calc(${bullpenPos}% - 24px)` }}
                     animate={bullpenStatus === 'CRASH' ? { rotate: [0, 10, -10, 0], x: [0, 5, -5, 0] } : {}}
                   >
                       <span className="text-xs font-bold text-white">JAKE</span>
                       {/* Motion lines */}
                       {bullpenStatus === 'MOVING' && (
                           <motion.div 
                             className="absolute -left-4 top-0 bottom-0 w-4 bg-white/20 blur-sm"
                             animate={{ opacity: [0, 1, 0] }}
                             transition={{ repeat: Infinity, duration: 0.2 }}
                           />
                       )}
                   </motion.div>
               </div>
               
               {bullpenStatus === 'IDLE' ? (
                   <button 
                      onClick={startBullpen}
                      className="bg-cyan-600 hover:bg-cyan-500 text-white text-xl py-4 px-12 rounded-xl font-bold uppercase shadow-lg active:scale-95 transition-transform"
                   >
                       <ArrowRight className="inline mr-2" /> LANZARSE
                   </button>
               ) : (
                   <button 
                      onMouseDown={stopBullpen}
                      onTouchStart={(e) => { e.preventDefault(); stopBullpen(); }}
                      disabled={bullpenStatus !== 'MOVING'}
                      className={`text-white text-xl py-4 px-12 rounded-xl font-bold uppercase shadow-lg transition-transform ${
                          bullpenStatus === 'MOVING' 
                            ? 'bg-red-600 hover:bg-red-500 active:scale-95 cursor-pointer' 
                            : 'bg-slate-700 cursor-not-allowed opacity-50'
                      }`}
                   >
                       <Square fill="white" size={24} className="inline mr-2" /> FRENAR
                   </button>
               )}
            </motion.div>
        )}

        {/* --- STAGE 8: BOYLE --- */}
        {stage === 'BOYLE' && (
          <motion.div 
            key="boyle"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            className="z-10 w-full max-w-lg text-center relative"
          >
             <h2 className="text-3xl text-pink-400 mb-2 font-bold uppercase">MODO BOYLE</h2>
             <p className="text-sm text-slate-300 mb-8">DEMUESTRA TU AMOR INTENSO (SPAM EL BOTÓN)</p>

             {/* Meter */}
             <div className="w-full h-8 bg-slate-800 rounded-full border-2 border-slate-600 overflow-hidden mb-8 relative">
                <div 
                  className="h-full bg-gradient-to-r from-pink-500 to-purple-600 transition-all duration-75"
                  style={{ width: `${boyleLevel}%` }}
                ></div>
                <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white drop-shadow-md">
                   INTENSIDAD: {Math.round(boyleLevel)}%
                </div>
             </div>

             <button 
                onMouseDown={handleBoyleMash}
                onTouchStart={(e) => { e.preventDefault(); handleBoyleMash(); }} 
                className="w-48 h-48 rounded-full bg-pink-600 border-b-8 border-pink-800 active:border-b-0 active:translate-y-2 transition-all shadow-[0_0_30px_rgba(219,39,119,0.5)] flex flex-col items-center justify-center gap-2 group mx-auto cursor-pointer select-none"
             >
                <Zap size={40} className="text-white group-active:scale-110 transition-transform" />
                <span className="text-2xl font-black italic">I LOVE YOU!</span>
             </button>
          </motion.div>
        )}

        {/* --- STAGE 9: SAFE --- */}
        {stage === 'SAFE' && (
           <motion.div 
             key="safe"
             initial={{ x: 100, opacity: 0 }}
             animate={{ x: 0, opacity: 1 }}
             exit={{ x: -100, opacity: 0 }}
             className="z-10 w-full max-w-xs text-center relative"
           >
              <h2 className="text-2xl text-yellow-400 mb-6 font-bold uppercase">LA CAJA FUERTE</h2>
              
              <div className="bg-slate-200 text-slate-900 font-mono text-4xl py-4 rounded mb-6 border-4 border-slate-400 shadow-inner h-20 flex items-center justify-center tracking-widest">
                  {safeCode || "----"}
              </div>

              <div className="text-sm text-slate-400 mb-4 font-bold uppercase">PISTA: NINE-____</div>

              <div className="grid grid-cols-3 gap-3">
                 {[1,2,3,4,5,6,7,8,9].map(num => (
                    <button 
                      key={num}
                      onClick={() => handleSafeInput(num.toString())}
                      className="bg-slate-700 hover:bg-slate-600 text-white text-xl font-bold py-3 rounded shadow-lg active:scale-95 transition-transform border-b-4 border-slate-900 active:border-b-0"
                    >
                      {num}
                    </button>
                 ))}
                 <div className="col-start-2">
                    <button 
                      onClick={() => handleSafeInput("0")}
                      className="w-full bg-slate-700 hover:bg-slate-600 text-white text-xl font-bold py-3 rounded shadow-lg active:scale-95 transition-transform border-b-4 border-slate-900 active:border-b-0"
                    >
                      0
                    </button>
                 </div>
              </div>
           </motion.div>
        )}

        {/* --- STAGE 10: VICTORY (Spectacular) --- */}
        {stage === 'VICTORY' && (
           <motion.div 
             key="victory"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             className="z-50 absolute inset-0 flex flex-col items-center justify-center bg-black/95 p-6 text-center"
           >
              {/* Spectacular Background */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-600/40 via-black to-black animate-pulse-glow"></div>
              
              {/* Confetti Particles */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  {[...Array(30)].map((_, i) => (
                      <motion.div 
                         key={i}
                         className={`absolute w-3 h-3 ${i % 2 === 0 ? 'bg-yellow-400' : 'bg-white'} rounded-sm`}
                         initial={{ y: -20, x: Math.random() * 100 + '%', opacity: 0 }}
                         animate={{ 
                             y: '100vh', 
                             x: (Math.random() - 0.5) * 50 + '%',
                             rotate: 360,
                             opacity: [1, 1, 0] 
                         }}
                         transition={{ 
                             duration: Math.random() * 3 + 2, 
                             repeat: Infinity, 
                             delay: Math.random() * 2 
                         }}
                      />
                  ))}
              </div>

              <div className="relative z-10 w-full max-w-2xl">
                  <motion.div 
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", bounce: 0.5, duration: 1.5 }}
                    className="mb-8 relative inline-block"
                  >
                      {/* The Crown */}
                      <div className="relative">
                          <Crown size={120} className="text-yellow-400 drop-shadow-[0_0_35px_rgba(250,204,21,0.8)] fill-yellow-500/20" />
                          <motion.div 
                             animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8], rotate: 45 }}
                             transition={{ repeat: Infinity, duration: 2 }}
                             className="absolute -top-4 -right-4"
                          >
                             <Star size={40} className="text-white fill-white drop-shadow-lg" />
                          </motion.div>
                          <motion.div 
                             animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8], rotate: -45 }}
                             transition={{ repeat: Infinity, duration: 2.5, delay: 0.5 }}
                             className="absolute -bottom-2 -left-8"
                          >
                             <Star size={30} className="text-white fill-white drop-shadow-lg" />
                          </motion.div>
                      </div>
                      
                      {/* Rotating Ring */}
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-[-50px] border-2 border-dashed border-yellow-500/30 rounded-full"
                      />
                  </motion.div>

                  <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <h2 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 to-yellow-600 uppercase tracking-tighter mb-4 drop-shadow-sm leading-none">
                      ¡HEIST GANADO!
                    </h2>
                  </motion.div>

                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="bg-gradient-to-r from-transparent via-yellow-900/50 to-transparent p-6 mb-8 border-y border-yellow-500/20 backdrop-blur-sm"
                  >
                     <p className="text-xl md:text-3xl text-yellow-100 font-black uppercase tracking-widest font-sans leading-tight shadow-black drop-shadow-lg">
                        ERES LA DETECTIVE / GENIO HUMANA DEFINITIVA
                     </p>
                  </motion.div>

                  <motion.button
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 2 }}
                    onClick={onHeistComplete}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-300 text-black text-xl md:text-2xl font-black py-5 px-12 rounded-full shadow-[0_0_50px_rgba(234,179,8,0.6)] uppercase tracking-widest flex items-center gap-3 mx-auto border-4 border-yellow-200"
                  >
                     <Unlock size={28} className="animate-pulse" /> RECLAMAR VICTORIA
                  </motion.button>
              </div>
           </motion.div>
        )}

      </AnimatePresence>
    </motion.div>
  );
};