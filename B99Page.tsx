import React from 'react';

export const B99Page = ({ onBack, onPropose }: { onBack: () => void, onPropose: () => void }) => {
  return (
    <div className="min-h-screen bg-[#f3e5ab] text-slate-800 font-['Special_Elite'] relative flex flex-col items-center py-10">
      {/* Background Texture Effect (CSS Pattern) */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), repeating-linear-gradient(45deg, #000 25%, #f3e5ab 25%, #f3e5ab 75%, #000 75%, #000)', backgroundPosition: '0 0, 10px 10px', backgroundSize: '20px 20px' }}></div>

      <div className="z-10 w-full max-w-3xl px-4">
        <div className="bg-white p-1 shadow-lg transform rotate-1 mb-8">
            <button onClick={onBack} className="bg-slate-800 text-white px-4 py-2 text-sm font-sans hover:bg-slate-700">← Back to Precinct</button>
        </div>

        <div className="bg-[#fdfbf7] p-8 md:p-12 shadow-2xl relative border-l-8 border-l-amber-300">
           {/* Paperclip */}
           <div className="absolute -top-4 right-12 text-6xl text-gray-400 rotate-12">📎</div>
           
           <h1 className="text-4xl md:text-5xl font-bold mb-2 text-center underline decoration-wavy decoration-red-500">CONFIDENTIAL</h1>
           <h2 className="text-xl text-center mb-8 text-gray-500">EVIDENCE FILE #14-02</h2>

           <div className="space-y-6 text-lg">
             <div className="bg-slate-100 p-4 rotate-1 shadow-sm border border-slate-200">
               <strong className="block text-red-600 text-xl mb-1">EXHIBIT A:</strong>
               <p>Subject makes my heart go "NOICE" and "TOIT".</p>
             </div>
             
             <div className="bg-slate-100 p-4 -rotate-1 shadow-sm border border-slate-200">
               <strong className="block text-red-600 text-xl mb-1">EXHIBIT B:</strong>
               <p>Life without you is like a heist without a plan. Boring and sad.</p>
             </div>

             <div className="py-6 text-center">
               <p className="text-2xl font-bold mb-6">"Title of your sex tape? No. Title of our future."</p>
               
               <button 
                onClick={onPropose}
                className="bg-yellow-400 hover:bg-yellow-500 text-black text-2xl px-8 py-4 border-4 border-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all"
               >
                 I CHOOSE YOU
               </button>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};