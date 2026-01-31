import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { EvidenceFolder } from '../components/b99/EvidenceFolder';
import { B99Celebration } from '../components/b99/B99Celebration';

export const B99Page = ({ onBack, onPropose }: { onBack: () => void, onPropose: () => void }) => {
  const [view, setView] = useState<'FILE' | 'CELEBRATION'>('FILE');

  return (
    <div className="min-h-screen bg-[#e6dcc3] text-slate-800 font-['Special_Elite'] relative flex flex-col items-center justify-center py-10 overflow-hidden">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
      </div>

      <button onClick={onBack} className="absolute top-6 left-6 z-50 flex items-center gap-2 bg-slate-800 text-white px-4 py-2 rounded shadow-lg hover:bg-slate-700 transition-colors font-sans font-bold">
        <ArrowLeft size={16} /> PRECINCT
      </button>

      <AnimatePresence mode="wait">
        {view === 'FILE' ? (
          <EvidenceFolder key="file" onCaseClosed={() => setView('CELEBRATION')} />
        ) : (
          <B99Celebration key="celebration" onPropose={onPropose} />
        )}
      </AnimatePresence>
    </div>
  );
};