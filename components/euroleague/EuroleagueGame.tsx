import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShotMeter } from './ShotMeter';
import { Scoreboard } from './Scoreboard';

interface Player {
  id: string;
  name: string;
  nickname: string;
  teamColor: string;
  stats: {
    threePt: number;
    dunk: number;
    clutch: number;
  };
}

interface EuroleagueGameProps {
  player: Player;
  onGameEnd: () => void;
  onBack: () => void;
}

const PLAYER_SCENARIOS: Record<string, { text: string; action: string }> = {
  'NUNN': {
    text: "Kendrick Nunn aísla a su defensor en el centro. Bota bajo, finta, step-back letal... El OAKA en silencio absoluto. Va a buscar el triple ganador sobre la bocina.",
    action: "STEP-BACK THREE"
  },
  'PUNTER': {
    text: "Kevin Punter pide el aclarado. Es su momento. Un bote, dos botes, mirada al aro. Se levanta desde 8 metros con la mano del defensor en la cara.",
    action: "DEEP THREE"
  },
  'TOKO': {
    text: "Shengelia recibe en el poste bajo. Es una bestia indomable. Empuja a su par, gira sobre el eje con fuerza bruta y se prepara para hundirla con rabia.",
    action: "POWER DUNK"
  },
  'JAMES': {
    text: "Mike James baila con el balón. Crossover asesino, cambio de ritmo. El defensor pierde el equilibrio. Se eleva en suspensión para un tiro imposible.",
    action: "FADE AWAY"
  },
  'VEZENKOV': {
    text: "La jugada de pizarra es para Sasha. Sale de dos bloqueos indirectos como un rayo. Recibe en la esquina, arma el brazo en 0.4 segundos... Es automático.",
    action: "CATCH & SHOOT"
  },
  'TAYLOR': {
    text: "Kameron Taylor ve el pasillo abierto. Corta por la puerta de atrás a máxima velocidad. El pase bombeado va al cielo... ¡Va a intentar cazarlo en el aire!",
    action: "ALLEY-OOP"
  },
  'BOLOMBOY': {
    text: "Balón suelto en la zona tras el rebote. Bolomboy lo captura entre tres rivales. No piensa en bajarla. ¡Va a subir con todo para reventar el tablero!",
    action: "PUTBACK DUNK"
  },
  'WRIGHT': {
    text: "Pick and roll de manual. Moses Wright recibe en carrera hacia el aro. La defensa se aparta. ¡Despega desde lejos para un vuelo sin motor!",
    action: "FLYING DUNK"
  }
};

export const EuroleagueGame = ({ player, onGameEnd, onBack }: EuroleagueGameProps) => {
  const [gamePhase, setGamePhase] = useState<'READY' | 'SHOOTING' | 'SCORE' | 'MISS' | 'CELEBRATE'>('READY');
  const [score, setScore] = useState(99);

  // Determine Shot Type and Difficulty based on player stats
  const shotType = player.stats.threePt >= player.stats.dunk ? '3PT' : 'DUNK';
  
  // Difficulty Calculation (Harder Mode)
  const getDifficulty = () => {
    const stat = shotType === '3PT' ? player.stats.threePt : player.stats.dunk;
    
    // Stats are 0-100.
    // Base calc: (Stat - 50) * 0.15
    const base = (stat - 50) * 0.15;
    
    // Clutch bonus: (Clutch - 80) * 0.1
    const clutchBonus = (player.stats.clutch - 80) * 0.1;
    
    // Min width 4%, Max width around 12%
    return Math.min(12, Math.max(4, base + clutchBonus));
  };

  const greenZoneSize = getDifficulty();

  const handleShootResult = (result: 'SCORE' | 'MISS') => {
    setGamePhase(result);
    
    if (result === 'SCORE') {
      const points = shotType === '3PT' ? 3 : 2;
      setScore(99 + points);
      setTimeout(() => {
        setGamePhase('CELEBRATE');
        // Wait a bit in celebrate mode then trigger parent end
        setTimeout(onGameEnd, 2000);
      }, 1500);
    } else {
      // Miss logic: Wait 1.5s then restart shooting immediately
      setTimeout(() => {
        setGamePhase('SHOOTING');
      }, 1500);
    }
  };
  
  const scenario = PLAYER_SCENARIOS[player.id] || {
      text: "El balón está en tus manos. El reloj se agota. La defensa presiona. Es el momento de convertirte en leyenda con un tiro final.",
      action: shotType === '3PT' ? 'TIRO FINAL' : 'MATE FINAL'
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-start p-2 w-full max-w-4xl mx-auto relative z-10">
      
      {/* Background Decor depending on Shot Type */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
         {shotType === '3PT' ? (
             <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] h-[300px] border-t-8 border-x-8 border-white rounded-t-full"></div>
         ) : (
             <div className="absolute top-10 left-1/2 -translate-x-1/2 w-32 h-32 border-4 border-orange-500 rounded-full">
                 <div className="absolute inset-0 flex items-center justify-center">
                     <div className="w-24 h-24 border-dashed border-2 border-white/50 rounded-full"></div>
                 </div>
             </div>
         )}
      </div>

      <Scoreboard homeScore={score} visitorScore={99} />

      <div className="flex-1 w-full flex flex-col items-center justify-center min-h-[350px]">
        
        {/* PHASE: READY - DRAMATIC CONTEXT */}
        {gamePhase === 'READY' && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center w-full max-w-md px-4"
          >
            <div className="bg-slate-900/90 p-1 rounded-2xl border-2 border-orange-500/30 backdrop-blur-md shadow-2xl relative overflow-hidden">
              
              {/* Dramatic Context Header */}
              <div className="bg-black/50 p-6 pb-4 relative">
                 <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
                 <div className="inline-block bg-red-600 text-white text-[10px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded mb-3 animate-pulse shadow-[0_0_10px_#dc2626]">
                    MOMENTO DECISIVO
                 </div>
                 <h2 className="text-3xl md:text-4xl text-white font-black uppercase italic leading-none mb-1 drop-shadow-lg">
                    GRAN FINAL
                 </h2>
                 <p className="text-orange-500 font-bold tracking-widest text-sm uppercase">NOSOTROS vs EL MUNDO</p>
              </div>

              {/* Narrative Box */}
              <div className="p-6 pt-4">
                 <div className="bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700 p-4 rounded-lg mb-6 shadow-inner relative">
                    {/* Quotation marks deco */}
                    <div className="absolute top-2 left-2 text-slate-600 text-4xl font-serif leading-none opacity-20">“</div>
                    <p className="text-lg text-slate-200 font-sans leading-relaxed relative z-10 text-left">
                       <span className="text-orange-400 font-bold uppercase tracking-wider text-xs block mb-2">{player.nickname} EN ESCENA:</span>
                       {scenario.text}
                    </p>
                 </div>

                 {/* Strategy Stats */}
                 <div className="grid grid-cols-2 gap-4 mb-8 text-left">
                    <div className="bg-black/30 p-3 rounded border border-white/5">
                       <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">JUGADA</div>
                       <div className="text-white font-bold text-lg leading-none uppercase">{scenario.action}</div>
                    </div>
                    <div className="bg-black/30 p-3 rounded border border-white/5">
                       <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">PROBABILIDAD</div>
                       <div className={`${greenZoneSize > 8 ? 'text-green-400' : 'text-red-400'} font-bold text-lg leading-none uppercase`}>
                           {greenZoneSize > 8 ? 'ALTA' : 'EXTREMA'}
                       </div>
                    </div>
                 </div>

                 <button 
                    onClick={() => setGamePhase('SHOOTING')}
                    className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white text-2xl py-4 rounded-xl font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(234,88,12,0.4)] hover:shadow-[0_0_30px_rgba(234,88,12,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group border border-white/10"
                  >
                    <span>PEDIR BALÓN</span>
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* PHASE: PLAYING (SHOOTING / SCORE / MISS) */}
        {(gamePhase === 'SHOOTING' || gamePhase === 'SCORE' || gamePhase === 'MISS') && (
           <div className="flex flex-col items-center w-full">
              <div className="mb-4 text-center">
                 <h3 className="text-3xl text-white uppercase tracking-[0.2em] mb-1 font-bold drop-shadow-md">
                    {shotType === '3PT' ? '¡¡ TIRA AHORA !!' : '¡¡ MACHACA !!'}
                 </h3>
                 <p className="text-sm text-orange-400 font-mono">
                    {shotType === '3PT' ? '[ DETÉN LA BARRA EN EL CENTRO ]' : '[ SUELTA EN EL TOPE ]'}
                 </p>
              </div>

              <ShotMeter 
                gamePhase={gamePhase}
                onShootResult={handleShootResult}
                greenZoneWidth={greenZoneSize}
                meterType={shotType === '3PT' ? 'HORIZONTAL' : 'VERTICAL'}
              />
           </div>
        )}

        {/* PHASE: CELEBRATE */}
        {gamePhase === 'CELEBRATE' && (
           <motion.div 
             initial={{ opacity: 0, scale: 0.8 }}
             animate={{ opacity: 1, scale: 1 }}
             className="text-center z-50"
           >
              <h2 className="text-7xl font-bold text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.8)]">
                {shotType === '3PT' ? '+3' : '+2'}
              </h2>
              <p className="text-4xl text-orange-500 font-bold uppercase mt-2">¡VICTORIA!</p>
           </motion.div>
        )}

      </div>
    </div>
  );
};