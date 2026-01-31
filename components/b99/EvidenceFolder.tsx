import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, FolderOpen } from 'lucide-react';

export interface EvidenceFolderProps {
  onCaseClosed: () => void;
}

export const EvidenceFolder: React.FC<EvidenceFolderProps> = ({ onCaseClosed }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [evidenceIndex, setEvidenceIndex] = useState(0);

  const evidence = [
    {
      type: 'photo',
      title: 'SOSPECHOSA IDENTIFICADA',
      content: 'Se busca por: Ser criminalmente hermosa.',
      note: 'Visto por última vez: Robando mis sudaderas.',
      color: 'bg-white',
      rotate: 2
    },
    {
      type: 'sticky',
      title: 'NOTA DEL CAPITÁN',
      content: '"Estoy en un estado de euforia total."',
      note: '- Holt (probablemente)',
      color: 'bg-yellow-200',
      rotate: -3
    },
    {
      type: 'photo',
      title: 'EVIDENCIA C: EL FUTURO',
      content: 'Análisis: Altamente Compatible.',
      note: 'Probabilidad de éxito: 100%',
      color: 'bg-white',
      rotate: 1
    }
  ];

  const handleNextEvidence = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (evidenceIndex < evidence.length) {
      setEvidenceIndex(prev => prev + 1);
    }
  };

  const handleProposalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onCaseClosed();
  };

  // --- CLOSED STATE RENDER ---
  if (!isOpen) {
    return (
      <div className="relative w-full max-w-xl h-[500px] flex items-center justify-center p-4">
        <motion.div 
          onClick={() => setIsOpen(true)}
          initial={{ scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
          className="relative w-full h-full cursor-pointer shadow-2xl transition-transform"
        >
          {/* Back of folder (visual stack) */}
          <div className="absolute inset-0 bg-[#c9aa76] rounded-r-lg transform translate-x-2 translate-y-2 border border-[#a88b5d]"></div>
          
          {/* Front Cover */}
          <div className="absolute inset-0 bg-[#e0c08b] rounded-r-lg border-l-4 border-[#bfa070] flex flex-col items-center justify-center p-10 shadow-xl">
             <div className="absolute top-0 left-0 w-32 h-10 bg-[#e0c08b] rounded-t-lg border-t border-r border-[#c9aa76] transform -translate-y-full translate-x-4 flex items-center justify-center">
                 <span className="text-xs font-bold text-slate-700">CLASIFICADO</span>
             </div>
             
             <div className="border-4 border-slate-800/20 w-full h-full flex flex-col items-center justify-center text-center p-6">
                 <FileText size={80} className="text-slate-800/40 mb-6" />
                 <h1 className="text-5xl font-bold text-slate-800 mb-2 font-['Special_Elite']">TOP SECRET</h1>
                 <p className="text-slate-600 text-xl font-['Special_Elite']">NO ABRIR</p>
                 
                 <div className="mt-12 bg-red-700 text-white px-6 py-2 transform -rotate-3 text-lg font-sans tracking-widest shadow-lg">
                   SOLO TUS OJOS
                 </div>
                 <p className="mt-12 text-sm text-slate-500 animate-bounce">( Click para Abrir )</p>
             </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // --- OPEN STATE RENDER (Simpler DOM for interactivity) ---
  return (
    <div className="relative w-full max-w-4xl min-h-[600px] flex flex-col items-center p-4">
      
      {/* Folder Background */}
      <motion.div 
         initial={{ opacity: 0, scale: 0.95 }}
         animate={{ opacity: 1, scale: 1 }}
         className="absolute inset-0 bg-[#d4b483] rounded-xl shadow-2xl border border-[#bfa070] -z-10"
      />
      
      {/* Folder Tab */}
      <div className="absolute -top-8 left-4 w-40 h-10 bg-[#d4b483] rounded-t-xl border-t border-x border-[#bfa070] -z-10 flex items-center justify-center">
        <span className="font-bold text-slate-700">EVIDENCIA #99</span>
      </div>

      <div className="w-full h-full p-6 md:p-10 flex flex-col items-center justify-center relative min-h-[600px]">
        {/* Inner Paper Background */}
        <div className="absolute inset-4 bg-[#fdfbf7] shadow-inner opacity-90 -z-5 pointer-events-none"></div>
        <div className="absolute inset-8 border-2 border-red-500/10 pointer-events-none"></div>

        {/* Evidence Stack */}
        <AnimatePresence>
          {evidence.map((item, index) => (
             index >= evidenceIndex && (
               <motion.div
                 key={index}
                 initial={{ scale: 1, rotate: item.rotate, opacity: 0 }}
                 animate={{ scale: 1, rotate: item.rotate, opacity: 1 }}
                 exit={{ x: 500, opacity: 0, rotate: 45 }}
                 transition={{ duration: 0.4 }}
                 className={`absolute w-72 md:w-96 h-96 ${item.color} shadow-xl p-6 flex flex-col items-center border border-slate-200 cursor-pointer hover:scale-105 hover:z-50 transition-transform`}
                 style={{ zIndex: 10 - index }}
                 onClick={handleNextEvidence}
               >
                 {item.type === 'photo' && <div className="w-24 h-6 bg-yellow-100/50 absolute -top-3 opacity-60 rotate-2"></div>}
                 <div className="w-full h-48 bg-slate-100 mb-4 flex items-center justify-center overflow-hidden">
                    <div className="text-5xl">{item.type === 'photo' ? '📸' : '📝'}</div>
                 </div>
                 <h3 className="font-bold text-xl mb-2 underline decoration-red-500 font-['Special_Elite']">{item.title}</h3>
                 <p className="text-md text-center mb-4 font-['Special_Elite']">{item.content}</p>
                 <p className="text-xs text-slate-500 mt-auto font-sans italic">{item.note}</p>
                 <div className="absolute bottom-2 right-2 text-xs text-slate-400 font-sans">( Click para siguiente )</div>
               </motion.div>
             )
          ))}
        </AnimatePresence>

        {/* Final Proposal Card (Shows when evidence is gone) */}
        {evidenceIndex >= evidence.length && (
           <motion.div 
             initial={{ opacity: 0, scale: 0.8, y: 20 }}
             animate={{ opacity: 1, scale: 1, y: 0 }}
             className="relative z-20 text-center w-full max-w-lg bg-white p-8 shadow-2xl rotate-1 border border-slate-300"
           >
             <div className="w-full h-4 bg-red-100/50 absolute top-0 left-0"></div>
             
             <h2 className="text-4xl font-bold border-b-4 border-black inline-block mb-6 font-['Special_Elite'] tracking-widest">INFORME FINAL</h2>
             
             <div className="space-y-4 text-xl leading-relaxed mb-8 font-['Special_Elite'] text-left text-slate-800">
               <p><span className="font-bold bg-yellow-200 px-1">OBSERVACIÓN:</span> La agente sospechosa ha sido atrapada con las manos en la masa (siendo increíble).</p>
               <p><span className="font-bold bg-yellow-200 px-1">CONCLUSIÓN:</span> Solo queda una pregunta para cerrar el expediente permanentemente.</p>
               
               <div className="my-8 relative">
                 <div className="border-2 border-dashed border-slate-400 p-4 text-center transform -rotate-1">
                   <p className="text-xs text-slate-400 uppercase tracking-widest mb-2">Pregunta Oficial</p>
                   <p className="font-black text-3xl md:text-4xl text-slate-900 font-['Special_Elite'] uppercase">
                     ¿SÉ MI VALENTÍN?
                   </p>
                 </div>
                 {/* Stamp Effect */}
                 <div className="absolute -right-4 -bottom-4 border-4 border-red-600 text-red-600 rounded-full w-24 h-24 flex items-center justify-center transform -rotate-12 opacity-80 shadow-sm font-black text-xs p-1 text-center bg-white/50 backdrop-blur-sm">
                   URGENTE REQUERIDO
                 </div>
               </div>
             </div>
             
             <p className="text-lg mb-6 italic text-slate-500">"Title of our future?"</p>
             
             <button 
              onClick={handleProposalClick}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black text-xl md:text-2xl px-8 py-4 border-4 border-black font-bold shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all"
             >
               CERRAR CASO: ¡SÍ!
             </button>
           </motion.div>
        )}
      </div>
    </div>
  );
};