import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { EvidenceFolder } from '../components/b99/EvidenceFolder';
import { B99Celebration } from '../components/b99/B99Celebration';
import { HalloweenHeist } from '../components/b99/HalloweenHeist';

export const B99Page = ({ onBack, onPropose }: { onBack: () => void, onPropose: () => void }) => {
  const [view, setView] = useState<'FILE' | 'HEIST' | 'CELEBRATION'>('FILE');

  const isHeist = view === 'HEIST';

  return (
    <div className={`min-h-screen transition-colors duration-1000 ${isHeist ? 'bg-black' : 'bg-[#e6dcc3]'} text-slate-800 font-['Special_Elite'] relative flex flex-col items-center justify-center py-10 overflow-hidden`}>
      
      {/* Background Pattern - Hide during Heist */}
      {!isHeist && (
        <div className="absolute inset-0 opacity-5 pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
        </div>
      )}

      {/* Back Button - Dim during Heist */}
      <button 
        onClick={onBack} 
        className={`absolute top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 rounded shadow-lg transition-all font-sans font-bold ${isHeist ? 'bg-slate-900 text-slate-500 hover:text-white border border-slate-700' : 'bg-slate-800 text-white hover:bg-slate-700'}`}
      >
        <ArrowLeft size={16} /> PRECINCT
      </button>

      <AnimatePresence mode="wait">
        {view === 'FILE' && (
          <EvidenceFolder key="file" onCaseClosed={() => setView('HEIST')} />
        )}
        {view === 'HEIST' && (
          <div className="relative z-40 w-full flex justify-center px-4">
             <HalloweenHeist key="heist" onHeistComplete={() => setView('CELEBRATION')} />
          </div>
        )}
        {view === 'CELEBRATION' && (
          <B99Celebration key="celebration" onPropose={onPropose} />
        )}
      </AnimatePresence>
    </div>
  );
};