import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Trophy, MessageCircle, Star, Users, Shirt, Activity, XCircle, AlertOctagon, AlertTriangle, PlayCircle, Gavel } from 'lucide-react';
import { EuroleagueGame } from '../components/euroleague/EuroleagueGame';

type AppPhase = 'TUNNEL' | 'ROSTER' | 'GAME' | 'PROPOSAL';

interface Player {
  id: string;
  name: string;
  nickname: string;
  teamColor: string;
  stats: {
    threePt: number; // Determines if they take a 3
    dunk: number;    // Determines if they take a dunk
    clutch: number;  // Determines Green Zone Width
  };
}

// Logic: If threePt > dunk, game is a 3-pointer. If dunk > threePt, game is a Dunk.
const PLAYERS: Player[] = [
  { id: 'NUNN', name: 'Kendrick Nunn', nickname: 'K-Nunn', teamColor: 'bg-green-800 text-white border-green-600', stats: { threePt: 97, dunk: 85, clutch: 98 } },
  { id: 'PUNTER', name: 'Kevin Punter', nickname: 'KP7', teamColor: 'bg-black text-white border-slate-700', stats: { threePt: 98, dunk: 60, clutch: 97 } },
  { id: 'TOKO', name: 'Toko Shengelia', nickname: 'El Tanque', teamColor: 'bg-black text-white border-red-800', stats: { threePt: 70, dunk: 98, clutch: 94 } },
  { id: 'JAMES', name: 'Mike James', nickname: 'The Natural', teamColor: 'bg-red-700 text-white border-red-500', stats: { threePt: 95, dunk: 85, clutch: 96 } },
  { id: 'VEZENKOV', name: 'Sasha Vezenkov', nickname: 'The Terminator', teamColor: 'bg-red-700 text-white border-red-600', stats: { threePt: 96, dunk: 70, clutch: 92 } },
  { id: 'TAYLOR', name: 'Kameron Taylor', nickname: 'KT', teamColor: 'bg-green-700 text-purple-200 border-purple-500', stats: { threePt: 85, dunk: 90, clutch: 88 } },
  { id: 'BOLOMBOY', name: 'Joel Bolomboy', nickname: 'El Muro', teamColor: 'bg-red-600 text-white border-red-400', stats: { threePt: 40, dunk: 99, clutch: 85 } },
  { id: 'WRIGHT', name: 'Moses Wright', nickname: 'Mo', teamColor: 'bg-red-700 text-white border-red-500', stats: { threePt: 50, dunk: 97, clutch: 89 } },
];

export const EuroleaguePage = ({ onBack, onPropose }: { onBack: () => void, onPropose: () => void }) => {
  const [phase, setPhase] = useState<AppPhase>('TUNNEL');
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [showTechnicalFoul, setShowTechnicalFoul] = useState(false);

  const handlePlayerSelect = (player: Player) => {
    setSelectedPlayer(player);
    setPhase('GAME');
  };

  const handleGameEnd = () => {
    setPhase('PROPOSAL');
  };

  const handleResetToRoster = () => {
    setSelectedPlayer(null);
    setPhase('ROSTER');
    setShowTechnicalFoul(false);
  };

  const handleFakeReject = () => {
    // Instead of moving the button, trigger the "Foul" modal
    setShowTechnicalFoul(true);
  };

  return (
    <div className="min-h-screen bg-slate-900 font-['Teko'] flex flex-col relative overflow-hidden select-none text-white">
      
      {/* Premium Dark Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-800 via-slate-950 to-black z-0"></div>
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 49px, #fff 50px), repeating-linear-gradient(0deg, transparent, transparent 49px, #fff 50px)', backgroundSize: '100px 100px' }}></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-orange-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      {/* --- TUNNEL VIEW --- */}
      {phase === 'TUNNEL' && (
        <div className="absolute inset-0 z-50 bg-black flex flex-col items-center justify-center p-6 text-center">
           <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.5)),url('https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=2069&auto=format&fit=crop')] bg-cover bg-center opacity-50"></div>
           
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="z-10 relative max-w-xl"
           >
             <h1 className="text-7xl md:text-9xl font-bold text-white mb-2 uppercase tracking-tighter drop-shadow-2xl">HORA DEL PARTIDO</h1>
             <p className="text-orange-500 text-3xl font-sans mb-12 font-bold tracking-widest">EL ESTADIO ESPERA</p>
             
             <motion.button
               onClick={() => setPhase('ROSTER')}
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white text-3xl px-12 py-5 rounded uppercase font-bold tracking-widest shadow-[0_0_50px_rgba(234,88,12,0.6)] transition-all border border-orange-400/50"
             >
               ENTRAR A PISTA
             </motion.button>
             
             <button onClick={onBack} className="block w-full mt-8 text-slate-500 font-sans text-sm hover:text-white transition-colors uppercase tracking-widest">
               VOLVER AL HUB
             </button>
           </motion.div>
        </div>
      )}

      {/* --- ROSTER VIEW --- */}
      {phase === 'ROSTER' && (
        <div className="flex-1 flex flex-col items-center justify-center p-6 relative z-40">
           
           <h2 className="text-5xl md:text-6xl text-white font-bold mb-2 uppercase tracking-widest relative z-10 drop-shadow-lg text-center">ELIGE TU LEYENDA</h2>
           <p className="text-slate-400 font-sans mb-8 z-10 uppercase tracking-widest text-sm">Elige sabiamente. Cada jugador tiene su especialidad.</p>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-5xl relative z-10 p-2 overflow-y-auto max-h-[75vh] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
             {PLAYERS.map((player) => (
               <motion.button
                 key={player.id}
                 onClick={() => handlePlayerSelect(player)}
                 whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.1)' }}
                 whileTap={{ scale: 0.98 }}
                 className={`group flex items-center p-4 rounded-xl border border-white/10 shadow-2xl transition-all text-left bg-black/40 backdrop-blur-md relative overflow-hidden`}
               >
                 <div className={`absolute left-0 top-0 bottom-0 w-2 ${player.teamColor.split(' ')[0]}`}></div>
                 
                 <div className="mr-4 bg-slate-800 p-3 rounded-full border border-slate-600 group-hover:border-white transition-colors">
                   <Shirt size={24} className="text-white" />
                 </div>
                 
                 <div className="flex-1">
                   <h3 className="text-3xl font-bold leading-none uppercase text-white group-hover:text-orange-400 transition-colors">{player.name}</h3>
                   <p className="text-lg text-slate-400 font-sans italic mb-2">"{player.nickname}"</p>
                   
                   {/* Stats Bars */}
                   <div className="space-y-1 w-full max-w-[250px]">
                     <div className="flex items-center text-xs font-sans font-bold text-slate-300 gap-2">
                        <span className="w-12">TRIPLE</span>
                        <div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                           <div className="h-full bg-blue-500" style={{ width: `${player.stats.threePt}%` }}></div>
                        </div>
                        <span className="w-6 text-right">{player.stats.threePt}</span>
                     </div>
                     <div className="flex items-center text-xs font-sans font-bold text-slate-300 gap-2">
                        <span className="w-12">MATE</span>
                        <div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                           <div className="h-full bg-red-500" style={{ width: `${player.stats.dunk}%` }}></div>
                        </div>
                        <span className="w-6 text-right">{player.stats.dunk}</span>
                     </div>
                     <div className="flex items-center text-xs font-sans font-bold text-slate-300 gap-2">
                        <span className="w-12 text-yellow-400">CLUTCH</span>
                        <div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                           <div className="h-full bg-yellow-400" style={{ width: `${player.stats.clutch}%` }}></div>
                        </div>
                        <span className="w-6 text-right text-yellow-400">{player.stats.clutch}</span>
                     </div>
                   </div>
                 </div>
               </motion.button>
             ))}
           </div>
           
           <button onClick={() => setPhase('TUNNEL')} className="mt-4 text-slate-500 hover:text-white z-10 font-sans uppercase tracking-widest flex items-center gap-2">
             <ChevronLeft size={16} /> Volver al Túnel
           </button>
        </div>
      )}

      {/* --- GAME & PROPOSAL VIEW --- */}
      {(phase === 'GAME' || phase === 'PROPOSAL') && selectedPlayer && (
        <motion.div 
          className="flex-1 flex flex-col relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="bg-black/80 backdrop-blur-md text-white p-4 flex justify-between items-center z-30 border-b border-white/10">
            <button onClick={handleResetToRoster} className="text-xl flex items-center gap-1 hover:text-orange-500 transition-colors font-sans uppercase font-bold text-slate-400">
              <ChevronLeft /> ROSTER
            </button>
            <div className="flex flex-col items-center">
               <div className="text-4xl font-bold tracking-widest text-orange-500 animate-pulse drop-shadow-[0_0_10px_rgba(234,88,12,0.8)]">FINAL 4</div>
               <div className="text-xs text-slate-400 font-sans tracking-widest">JUGADOR: <span className="text-white">{selectedPlayer.name.toUpperCase()}</span></div>
            </div>
            <div className="text-xl font-sans bg-black px-4 py-1 rounded border border-red-900/50 font-mono text-red-500 shadow-[0_0_10px_rgba(220,38,38,0.4)]">
              {phase === 'PROPOSAL' ? 'FINAL' : '00:03.2'}
            </div>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center p-4 relative z-10">
            
            {phase === 'GAME' && (
                <EuroleagueGame 
                    player={selectedPlayer}
                    onGameEnd={handleGameEnd}
                    onBack={handleResetToRoster}
                />
            )}

            {phase === 'PROPOSAL' && (
                <motion.div 
                   initial={{ opacity: 0, scale: 0.95 }}
                   animate={{ opacity: 1, scale: 1 }}
                   className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 p-4"
                >
                   {/* Reduced Max Width for better fit */}
                   <div className="w-full max-w-lg bg-slate-900 rounded-2xl border-2 border-orange-500 shadow-[0_0_100px_rgba(234,88,12,0.4)] overflow-hidden relative">
                      
                      {/* Ticker Background */}
                      <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(45deg,#000,#000_10px,#111_10px,#111_20px)]"></div>
                      
                      {/* Content */}
                      <div className="relative z-10 p-6 text-center">
                        <div className="inline-block bg-red-600 text-white px-4 py-1 text-lg font-bold uppercase tracking-widest mb-6 animate-pulse shadow-lg transform -rotate-2">
                          ÚLTIMA HORA
                        </div>
                        
                        <div className="flex justify-center mb-6">
                           <div className="relative p-4 bg-gradient-to-b from-slate-800 to-slate-900 rounded-full border border-slate-700 shadow-2xl">
                              <Trophy size={60} className="text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.6)]" />
                              <Star className="absolute top-0 right-0 text-white fill-white animate-spin-slow drop-shadow-lg" size={30} />
                           </div>
                        </div>

                        <h2 className="text-4xl md:text-5xl text-white font-bold mb-4 uppercase leading-none">MVP DE LA TEMPORADA</h2>
                        
                        <div className="bg-white/5 p-4 rounded-xl border border-white/10 backdrop-blur-sm mb-6">
                           <p className="text-xl text-slate-300 font-sans mb-3 leading-relaxed italic">
                             "Ganaste el partido. Ganaste la liga. Y definitivamente ganaste mi corazón."
                           </p>
                           <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-orange-500 to-transparent my-3"></div>
                           <p className="text-orange-400 text-lg font-bold uppercase mb-1 tracking-widest">OFERTA DE CONTRATO</p>
                           <p className="text-3xl md:text-4xl text-white font-bold uppercase tracking-tighter leading-none drop-shadow-md">
                             ¿QUIERES SER MI SAN VALENTÍN?
                           </p>
                        </div>
                        
                        <div className="flex flex-col gap-3 relative">
                            <button 
                              onClick={onPropose}
                              className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white text-2xl py-4 rounded-xl font-bold shadow-[0_0_30px_rgba(34,197,94,0.4)] flex items-center justify-center gap-3 font-sans transition-all transform hover:scale-[1.02]"
                            >
                              <MessageCircle size={28} /> FIRMAR CONTRATO (SÍ)
                            </button>

                            <button 
                                onClick={handleFakeReject}
                                className="w-full bg-slate-800 text-slate-500 text-lg py-3 rounded-xl font-bold uppercase tracking-widest font-sans border border-slate-700 hover:bg-red-900/50 hover:text-red-400 relative z-20"
                            >
                              <span className="flex items-center justify-center gap-2"><XCircle size={20} /> RECHAZAR Y SALIR</span>
                            </button>
                        </div>
                      </div>

                      {/* TECHNICAL FOUL OVERLAY - REDESIGNED */}
                      <AnimatePresence>
                        {showTechnicalFoul && (
                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-md p-4"
                          >
                             <motion.div 
                               initial={{ scale: 0.9, y: 20 }}
                               animate={{ scale: 1, y: 0 }}
                               className="w-full max-w-xl bg-slate-900 border border-red-500/30 rounded-lg shadow-[0_0_50px_rgba(220,38,38,0.3)] overflow-hidden relative flex flex-col"
                             >
                                {/* Broadcast Header */}
                                <div className="bg-red-700/20 border-b border-red-500/30 p-2 flex justify-between items-center relative overflow-hidden">
                                   <div className="absolute inset-0 bg-red-600/10 animate-pulse"></div>
                                   <div className="flex items-center gap-2 z-10">
                                      <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
                                      <span className="text-red-500 font-sans text-[10px] tracking-[0.2em] font-bold uppercase">OFFICIAL REVIEW IN PROGRESS</span>
                                   </div>
                                </div>

                                <div className="p-8 relative">
                                   {/* Main Headline */}
                                   <div className="text-center mb-8">
                                      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-900/20 border-2 border-red-500/50 mb-4 shadow-[0_0_30px_rgba(220,38,38,0.2)]">
                                          <AlertTriangle className="text-red-500 w-10 h-10 animate-pulse" />
                                      </div>
                                      <h2 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 uppercase tracking-tighter leading-none mb-1">
                                        FALTA TÉCNICA
                                      </h2>
                                      <div className="h-1 w-24 bg-gradient-to-r from-transparent via-red-500 to-transparent mx-auto"></div>
                                   </div>
                                   
                                   {/* Info Panels */}
                                   <div className="space-y-4 mb-8">
                                      {/* Violation Panel */}
                                      <div className="bg-black/40 border border-slate-700 rounded p-4 flex gap-4 items-center">
                                         <div className="text-red-500">
                                            <AlertOctagon size={28} strokeWidth={1.5} />
                                         </div>
                                         <div className="text-left border-l border-slate-700 pl-4">
                                            <h4 className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1">INFRACCIÓN</h4>
                                            <p className="text-white text-lg font-sans font-medium leading-tight">
                                               "Intentar rechazar al MVP de tu corazón es ilegal."
                                            </p>
                                         </div>
                                      </div>

                                      {/* Penalty Panel */}
                                      <div className="bg-black/40 border border-slate-700 rounded p-4 flex gap-4 items-center">
                                         <div className="text-orange-500">
                                            <Gavel size={28} strokeWidth={1.5} />
                                         </div>
                                         <div className="text-left border-l border-slate-700 pl-4">
                                            <h4 className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1">DECISIÓN ARBITRAL</h4>
                                            <p className="text-white text-lg font-sans font-medium leading-tight">
                                               "Posesión para el equipo local. Debes firmar el contrato."
                                            </p>
                                         </div>
                                      </div>
                                   </div>

                                   {/* Action Button */}
                                   <button 
                                      onClick={onPropose}
                                      className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white text-2xl py-4 rounded font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(234,88,12,0.4)] flex items-center justify-center gap-3 transition-all border border-white/10"
                                   >
                                      <span className="relative z-10">ACATAR DECISIÓN (SÍ)</span>
                                   </button>
                                </div>
                             </motion.div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                   </div>
                </motion.div>
            )}

          </div>
        </motion.div>
      )}
    </div>
  );
};