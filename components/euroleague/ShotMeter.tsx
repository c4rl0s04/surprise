import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface ShotMeterProps {
  onShootResult: (result: 'SCORE' | 'MISS') => void;
  gamePhase: string;
  greenZoneWidth?: number; // Percentage width (or height for vertical)
  meterType?: 'HORIZONTAL' | 'VERTICAL'; // New prop for visual style
}

const TRIPLE_PHRASES = [
  "¡CHOF!", "¡MANDARINA!", "¡DESDE SU CASA!", "SPLASH 💦", 
  "¡DESDE EL LOGO!", "¡TRIPLE IMPOSIBLE!", "¡BANG!"
];

const DUNK_PHRASES = [
  "¡MATE SALVAJE!", "¡ROMPE AROS!", "¡POSTER!", "¡VAYA VUELO!", 
  "¡MARTILLAZO!", "¡SÍSMICO!", "¡GODZILLA!"
];

const MISS_PHRASES = [
  "AIRBALL 💨", "LADRILLO", "¡CHAPA!", "SHAQTIN'", "AGUA", "HIERRO"
];

export const ShotMeter = ({ onShootResult, gamePhase, greenZoneWidth = 10, meterType = 'HORIZONTAL' }: ShotMeterProps) => {
  const [meterPosition, setMeterPosition] = useState(0);
  const [resultText, setResultText] = useState("");
  const animationRef = useRef<any>(null);

  // Animation Loop
  useEffect(() => {
    if (gamePhase === 'SHOOTING') {
      const startTime = Date.now();
      animationRef.current = setInterval(() => {
        // Increased speed for difficulty: Lower divisor = faster speed
        // Vertical (Dunk): Very fast explosive movement
        // Horizontal (3PT): Fast oscillation
        const time = (Date.now() - startTime) / (meterType === 'VERTICAL' ? 250 : 350); 
        
        if (meterType === 'VERTICAL') {
          // 0 to 100 bounce (Power meter style)
          const val = Math.abs(Math.sin(time) * 100);
          setMeterPosition(val);
        } else {
          // 0 to 100 oscillating center focus
          const val = Math.sin(time) * 50 + 50;
          setMeterPosition(val);
        }
      }, 16);
    } else {
      clearInterval(animationRef.current);
    }
    return () => clearInterval(animationRef.current);
  }, [gamePhase, meterType]);

  const handleRelease = () => {
    if (gamePhase !== 'SHOOTING') return;
    
    let isHit = false;

    if (meterType === 'VERTICAL') {
      // For Dunks: Target is the very top.
      // Green Zone is fixed at the top (100%)
      // Hit range: [100 - greenZoneWidth, 100]
      const hitStart = 100 - greenZoneWidth; 
      
      if (meterPosition >= hitStart && meterPosition <= 100) {
        isHit = true;
      }
    } else {
      // For Triples: Target is centered (50)
      const TARGET_CENTER = 50;
      const half = greenZoneWidth / 2;
      if (meterPosition >= (TARGET_CENTER - half) && meterPosition <= (TARGET_CENTER + half)) {
        isHit = true;
      }
    }

    if (isHit) {
      const phrases = meterType === 'HORIZONTAL' ? TRIPLE_PHRASES : DUNK_PHRASES;
      const phrase = phrases[Math.floor(Math.random() * phrases.length)];
      setResultText(phrase);
      onShootResult('SCORE');
    } else {
      const phrase = MISS_PHRASES[Math.floor(Math.random() * MISS_PHRASES.length)];
      setResultText(phrase);
      onShootResult('MISS');
    }
  };

  // --- RENDERERS ---

  const renderHorizontalMeter = () => {
    const greenZoneLeft = 50 - (greenZoneWidth / 2);
    return (
      // Compact horizontal meter
      <div className="w-full max-w-2xl h-16 bg-slate-900 rounded-full border-4 border-slate-700 relative overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.8)]">
        {/* Grid */}
        <div className="absolute inset-0 flex justify-between px-2 opacity-20 pointer-events-none">
            {[...Array(20)].map((_,i) => <div key={i} className="w-[1px] h-full bg-white"></div>)}
        </div>
        {/* Green Zone (Center) */}
        <div 
          className="absolute top-0 bottom-0 bg-green-500 shadow-[0_0_25px_#22c55e]"
          style={{ left: `${greenZoneLeft}%`, width: `${greenZoneWidth}%` }}
        ></div>
        {/* Marker */}
        <div 
          className="absolute top-0 bottom-0 w-3 bg-white border-x-2 border-slate-400 shadow-[0_0_15px_white] z-10"
          style={{ left: `${meterPosition}%`, transition: 'none' }} 
        ></div>
        {/* Center Line Indicator */}
        <div className="absolute top-0 bottom-0 left-1/2 w-[2px] bg-red-500/80 z-0"></div>
      </div>
    );
  };

  const renderVerticalMeter = () => {
    // Green zone at the very top.
    const greenZoneBottom = 100 - greenZoneWidth;
    
    return (
      // Compact vertical meter
      <div className="h-80 w-24 bg-slate-900 rounded-xl border-4 border-slate-700 relative overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.8)] flex flex-col justify-end">
         {/* Background pattern */}
         <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(0deg, transparent 50%, rgba(255,255,255,0.1) 50%)', backgroundSize: '10px 10px' }}></div>
         
         {/* Green Zone (Top - NO GAP) */}
         <div 
           className="absolute left-0 right-0 bg-gradient-to-b from-green-400 to-green-600 shadow-[0_0_30px_#22c55e] z-0"
           style={{ bottom: `${greenZoneBottom}%`, height: `${greenZoneWidth}%` }}
         >
           <div className="absolute inset-0 animate-pulse bg-white/20"></div>
           <span className="absolute right-1 top-1 text-[10px] text-black font-black opacity-60">CRUSH</span>
         </div>

         {/* Power Fill */}
         <div 
            className="w-full bg-gradient-to-t from-orange-600 via-red-500 to-yellow-400 transition-none relative z-10 opacity-90"
            style={{ height: `${meterPosition}%` }}
         >
            <div className="absolute top-0 left-0 right-0 h-[4px] bg-white shadow-[0_0_15px_white]"></div>
         </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center w-full relative z-20">
       
       {meterType === 'HORIZONTAL' ? renderHorizontalMeter() : renderVerticalMeter()}

       {gamePhase === 'SHOOTING' ? (
         <button 
           onMouseDown={handleRelease}
           onTouchStart={handleRelease}
           className="mt-6 bg-orange-600 hover:bg-orange-500 text-white text-3xl px-12 py-4 rounded-xl font-bold shadow-[0_6px_0_rgb(154,52,18)] active:shadow-none active:translate-y-[6px] transition-all select-none uppercase tracking-wider flex items-center gap-4 border-b-4 border-orange-800 cursor-pointer"
         >
           {meterType === 'VERTICAL' ? '¡SALTAR!' : '¡TIRAR!'}
         </button>
       ) : (
         // INVISIBLE PLACEHOLDER to prevent layout shift
         <div className="mt-6 text-3xl px-12 py-4 border-b-4 border-transparent opacity-0 pointer-events-none select-none flex items-center gap-4 font-bold">
            {meterType === 'VERTICAL' ? '¡SALTAR!' : '¡TIRAR!'}
         </div>
       )}
       
       {/* Result Text Overlay */}
       {(gamePhase === 'SCORE' || gamePhase === 'MISS') && (
         <motion.div 
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1.2, rotate: 0 }}
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 font-black text-5xl md:text-7xl whitespace-nowrap drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)] stroke-black ${gamePhase === 'SCORE' ? 'text-green-500' : 'text-red-600'}`}
         >
           {resultText}
         </motion.div>
       )}
    </div>
  );
};