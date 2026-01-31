import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface IronManBackgroundProps {
  powerLevel: number; // 0 to 100
  isStable: boolean; // True when interface is active
}

export const IronManBackground = ({ powerLevel, isStable }: IronManBackgroundProps) => {
  // Normalize power level for opacity (0.1 to 1)
  const opacity = Math.max(0.05, powerLevel / 100);
  const bootProgress = powerLevel; 

  // Generate random data for the "overburdened" look
  const randomHex = useMemo(() => Array.from({ length: 20 }, () => Math.floor(Math.random() * 16777215).toString(16).toUpperCase()), []);
  const graphPoints = useMemo(() => Array.from({ length: 30 }, () => Math.random() * 100), []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden bg-black transition-opacity duration-300" style={{ opacity: isStable ? 1 : opacity }}>
      
      {/* --- LAYER 1: GRID & TEXTURE (Base) --- */}
      <div 
        className="absolute inset-0 opacity-20" 
        style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm1 1h38v38H1V1z' fill='%2306b6d4' fill-opacity='0.2' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            backgroundSize: '40px 40px'
        }}
      ></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000_90%)]"></div>

      {/* --- LAYER 2: ROTATING ELEMENTS (The Core) --- */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center">
         {/* Huge slow ring */}
         <motion.div 
            style={{ width: '80vh', height: '80vh' }}
            animate={{ rotate: 360 }}
            transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
            className="border border-cyan-900/30 rounded-full absolute border-dashed"
         />
         {/* Medium faster ring */}
         <motion.div 
            style={{ width: '60vh', height: '60vh' }}
            animate={{ rotate: -360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="border border-cyan-800/40 rounded-full absolute border-t-transparent border-l-transparent"
         />
         {/* Central complex geometry */}
         <motion.div 
             animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }}
             transition={{ duration: 4, repeat: Infinity }}
             className="absolute w-[40vh] h-[40vh] border border-cyan-500/10 rounded-full"
         >
             <div className="absolute inset-0 border border-cyan-500/20 rounded-full transform rotate-45"></div>
             <div className="absolute inset-0 border border-cyan-500/20 rounded-full transform -rotate-45"></div>
         </motion.div>
      </div>

      {/* --- LAYER 3: SIDEBAR WIDGETS (Left) --- */}
      <div className="absolute left-0 top-0 bottom-0 w-64 p-4 flex flex-col justify-between z-0 hidden lg:flex">
          
          {/* Top Left: Satellite View */}
          <div className="border border-cyan-900/50 p-2 bg-black/40 backdrop-blur-sm mb-4">
              <div className="text-[10px] text-cyan-400 font-bold mb-1 tracking-widest">SAT.UPLINK</div>
              <div className="h-24 w-full bg-cyan-900/10 relative overflow-hidden grid grid-cols-4 grid-rows-4 gap-[1px]">
                  {Array.from({length:16}).map((_,i) => (
                      <div key={i} className={`bg-cyan-500/20 ${Math.random() > 0.5 ? 'opacity-50' : 'opacity-10'}`}></div>
                  ))}
                  <motion.div 
                    animate={{ top: ['0%', '100%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    className="absolute left-0 right-0 h-[2px] bg-cyan-400 shadow-[0_0_10px_#22d3ee]"
                  />
              </div>
          </div>

          {/* Middle Left: Scrolling Code */}
          <div className="flex-1 overflow-hidden relative my-4 border-l border-cyan-800 pl-2 opacity-60">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-900/10 to-transparent"></div>
              {randomHex.map((hex, i) => (
                  <motion.div 
                    key={i}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="text-[9px] font-mono text-cyan-700/80 leading-tight"
                  >
                      {`0x${hex} :: MODULE_INIT`}
                  </motion.div>
              ))}
          </div>

          {/* Bottom Left: Waveform */}
          <div className="h-32 border-t border-cyan-800 pt-2">
             <div className="text-[10px] text-cyan-500 font-bold mb-1">AUDIO.FREQ</div>
             <div className="flex items-end justify-between h-20 gap-[1px]">
                 {Array.from({length: 30}).map((_, i) => (
                     <motion.div 
                        key={i}
                        animate={{ height: ['10%', '80%', '30%'] }}
                        transition={{ duration: 0.5 + Math.random(), repeat: Infinity, repeatType: 'reverse' }}
                        className="w-1 bg-cyan-600/50"
                     />
                 ))}
             </div>
          </div>
      </div>

      {/* --- LAYER 4: SIDEBAR WIDGETS (Right) --- */}
      <div className="absolute right-0 top-0 bottom-0 w-64 p-4 flex flex-col justify-start z-0 hidden lg:flex text-right">
          
          {/* Top Right: Compass/Gyro */}
          <div className="mb-6 flex flex-col items-end">
             <div className="w-32 h-32 rounded-full border border-cyan-800 relative flex items-center justify-center">
                 <div className="absolute inset-2 border-2 border-dashed border-cyan-900 rounded-full animate-spin-slow"></div>
                 <div className="w-1 h-4 bg-cyan-500 absolute top-0"></div>
                 <div className="w-1 h-4 bg-cyan-900 absolute bottom-0"></div>
                 <div className="w-4 h-1 bg-cyan-900 absolute left-0"></div>
                 <div className="w-4 h-1 bg-cyan-900 absolute right-0"></div>
                 <div className="text-[10px] text-cyan-400 font-mono">N 42°</div>
             </div>
          </div>

          {/* Middle Right: System Health Bars */}
          <div className="space-y-2">
              <div className="text-[10px] text-cyan-600 font-bold tracking-widest border-b border-cyan-900 pb-1 mb-2">SUIT DIAGNOSTICS</div>
              {['ARMOR', 'THRUST', 'REPULSOR', 'LIFE_SUP'].map((label, i) => (
                  <div key={label} className="flex items-center justify-end gap-2">
                      <span className="text-[9px] text-cyan-700 font-mono">{label}</span>
                      <div className="w-24 h-2 bg-cyan-900/30 border border-cyan-800/50">
                          <motion.div 
                             initial={{ width: 0 }}
                             animate={{ width: isStable ? '100%' : `${powerLevel}%` }}
                             transition={{ delay: i * 0.2 }}
                             className={`h-full ${i === 3 ? 'bg-green-500' : 'bg-cyan-500'}`}
                          />
                      </div>
                  </div>
              ))}
          </div>

          {/* Bottom Right: Wireframe Body (Abstract) */}
          <div className="mt-auto opacity-40">
              <div className="w-full h-48 border border-cyan-800 relative overflow-hidden">
                  <div className="absolute inset-0 grid grid-cols-6 grid-rows-6">
                      {Array.from({length:36}).map((_,i) => (
                          <div key={i} className="border border-cyan-900/20"></div>
                      ))}
                  </div>
                  {/* Scanning bar */}
                  <motion.div 
                     animate={{ top: ['0%', '100%'] }}
                     transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                     className="absolute w-full h-4 bg-cyan-500/20 blur-sm"
                  />
              </div>
          </div>
      </div>

      {/* --- LAYER 5: HEADER & FOOTER (The Frame) --- */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-16 border-b border-cyan-500/30 flex justify-between items-end pb-2 px-10">
          <div className="flex gap-4 items-end">
              <div className="text-4xl font-bold text-cyan-500/20">01</div>
              <div className="text-[10px] text-cyan-600 mb-1">SYS.BOOT.SEQ // {bootProgress}%</div>
          </div>
          <div className="flex gap-1">
              {Array.from({length: 10}).map((_, i) => (
                  <div key={i} className={`w-2 h-4 transform -skew-x-12 ${i < (powerLevel/10) ? 'bg-cyan-400' : 'bg-cyan-900/30'}`}></div>
              ))}
          </div>
      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-16 border-t border-cyan-500/30 flex justify-between items-start pt-2 px-10">
          <div className="text-[9px] text-cyan-800 font-mono max-w-[200px] leading-tight">
             WARNING: UNAUTHORIZED PERSONNEL WILL BE TARGETED BY AUTOMATED DEFENSE SYSTEMS.
          </div>
          <div className="text-right">
             <div className="text-2xl font-bold text-cyan-500">{isStable ? 'ONLINE' : 'OFFLINE'}</div>
             <div className="text-[9px] text-cyan-600">JARVIS.AI</div>
          </div>
      </div>

    </div>
  );
};