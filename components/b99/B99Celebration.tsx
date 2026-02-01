import React from 'react';
import { motion } from 'framer-motion';
import { BadgeCheck, MessageCircle } from 'lucide-react';

export interface B99CelebrationProps {
  onPropose: () => void;
}

export const B99Celebration: React.FC<B99CelebrationProps> = ({ onPropose }) => {
  return (
    <motion.div 
       key="celebration"
       initial={{ opacity: 0, scale: 0.9 }}
       animate={{ opacity: 1, scale: 1 }}
       className="flex flex-col items-center justify-center text-center max-w-2xl px-4 z-50 relative"
    >
       <div className="relative mb-6">
          <BadgeCheck size={100} className="text-blue-600 fill-blue-100" />
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.5 }}
            className="absolute -top-2 -right-2 bg-yellow-400 text-black font-bold px-3 py-1 rounded-full border-2 border-black transform rotate-12 shadow-lg"
          >
            NINE-NINE!
          </motion.div>
       </div>
       
       <h1 className="text-5xl md:text-6xl font-bold mb-4 text-slate-900 drop-shadow-sm">
         ¡DIJO QUE SÍ!
       </h1>
       
       <div className="bg-white p-6 rotate-1 shadow-lg border border-slate-200 mb-8 max-w-lg">
         <p className="text-xl md:text-2xl leading-relaxed font-['Special_Elite']">
           "Te quiero más de lo que Jake ama a Die Hard."
           <br />
           <span className="text-sm text-slate-500 mt-2 block font-sans italic">- Yo (Peralta style)</span>
         </p>
       </div>
       
       <button 
          onClick={onPropose}
          className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white text-xl px-8 py-4 rounded shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all font-sans font-bold cursor-pointer relative z-50"
       >
         <MessageCircle /> Avisar al Escuadrón
       </button>

       {/* Confetti */}
       <div className="absolute inset-0 pointer-events-none -z-10 w-[200%] h-[200%] -translate-x-1/2 -translate-y-1/2">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="absolute w-3 h-3 rounded-full bg-yellow-400" 
                 style={{ 
                   top: Math.random() * 100 + '%', 
                   left: Math.random() * 100 + '%', 
                   animation: `spin-slow ${Math.random() * 2 + 1}s infinite` 
                 }} 
            />
          ))}
       </div>
    </motion.div>
  );
};