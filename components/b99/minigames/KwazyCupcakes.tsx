import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Heart, Circle, Square, Triangle, Hexagon, RotateCcw, Trophy } from 'lucide-react';

const WIDTH = 6;
const TARGET_SCORE = 300;

const CANDY_TYPES = [
  { color: 'bg-red-500', icon: <Heart className="text-red-900 fill-red-900/50" size={20} />, id: 'red' },
  { color: 'bg-yellow-400', icon: <Star className="text-yellow-900 fill-yellow-900/50" size={20} />, id: 'yellow' },
  { color: 'bg-orange-500', icon: <Circle className="text-orange-900 fill-orange-900/50" size={20} />, id: 'orange' },
  { color: 'bg-purple-500', icon: <Triangle className="text-purple-900 fill-purple-900/50" size={20} />, id: 'purple' },
  { color: 'bg-green-500', icon: <Square className="text-green-900 fill-green-900/50" size={20} />, id: 'green' },
  { color: 'bg-blue-500', icon: <Hexagon className="text-blue-900 fill-blue-900/50" size={20} />, id: 'blue' },
];

interface KwazyCupcakesProps {
  onSuccess: () => void;
  onFailure: () => void;
}

export const KwazyCupcakes: React.FC<KwazyCupcakesProps> = ({ onSuccess, onFailure }) => {
  const [board, setBoard] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(12);
  const [selectedCandy, setSelectedCandy] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [comboMultiplier, setComboMultiplier] = useState(1);
  
  // Ref to track processing state for the useEffect to avoid race conditions
  const isFalling = useRef(false);

  // --- LOGIC: CHECK FOR MATCHES (Reusable) ---
  const getMatches = (currentBoard: string[]) => {
    const matchIndices = new Set<number>();
    // Horizontal
    for (let i = 0; i < WIDTH * WIDTH; i++) {
      if ((i % WIDTH) > (WIDTH - 3)) continue;
      const row = [i, i + 1, i + 2];
      const color = currentBoard[i];
      if (color && currentBoard[i + 1] === color && currentBoard[i + 2] === color) {
        row.forEach(idx => matchIndices.add(idx));
      }
    }
    // Vertical
    for (let i = 0; i < WIDTH * (WIDTH - 2); i++) {
      const col = [i, i + WIDTH, i + WIDTH * 2];
      const color = currentBoard[i];
      if (color && currentBoard[i + WIDTH] === color && currentBoard[i + WIDTH * 2] === color) {
        col.forEach(idx => matchIndices.add(idx));
      }
    }
    return matchIndices;
  };

  // --- INITIALIZATION: NO STARTING MATCHES ---
  const createBoard = useCallback(() => {
    let newBoard: string[] = [];
    let hasMatch = true;

    while (hasMatch) {
      newBoard = [];
      for (let i = 0; i < WIDTH * WIDTH; i++) {
        const randomType = CANDY_TYPES[Math.floor(Math.random() * CANDY_TYPES.length)];
        newBoard.push(randomType.id);
      }
      hasMatch = getMatches(newBoard).size > 0;
    }
    setBoard(newBoard);
    setScore(0);
    setMoves(12);
    setComboMultiplier(1);
  }, []);

  useEffect(() => {
    createBoard();
  }, [createBoard]);

  // --- CORE GAME ENGINE ---
  const processMatches = useCallback(async () => {
    let currentBoard = [...board];
    const matchIndices = getMatches(currentBoard);

    if (matchIndices.size > 0) {
      setIsProcessing(true);
      
      // 1. Calculate Score (Bonus for 4+ matches)
      const points = matchIndices.size * 10 * comboMultiplier;
      setScore(prev => prev + points);
      setComboMultiplier(prev => prev + 1);

      // 2. Clear Board
      matchIndices.forEach(idx => (currentBoard[idx] = ''));
      setBoard([...currentBoard]);

      // 3. Gravity Wait
      setTimeout(() => applyGravity(currentBoard), 400);
    } else {
      setIsProcessing(false);
      setComboMultiplier(1);
    }
  }, [board, comboMultiplier]);

  const applyGravity = (currentBoard: string[]) => {
    const newBoard = [...currentBoard];
    
    for (let col = 0; col < WIDTH; col++) {
      let emptySlots = 0;
      for (let row = WIDTH - 1; row >= 0; row--) {
        const index = row * WIDTH + col;
        if (newBoard[index] === '') {
          emptySlots++;
        } else if (emptySlots > 0) {
          newBoard[index + (emptySlots * WIDTH)] = newBoard[index];
          newBoard[index] = '';
        }
      }
      for (let row = 0; row < emptySlots; row++) {
        const index = row * WIDTH + col;
        newBoard[index] = CANDY_TYPES[Math.floor(Math.random() * CANDY_TYPES.length)].id;
      }
    }
    setBoard(newBoard);
  };

  useEffect(() => {
    if (board.includes('') && !isFalling.current) {
      isFalling.current = true;
    } else if (isProcessing) {
      const timer = setTimeout(() => {
        isFalling.current = false;
        processMatches();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [board, isProcessing, processMatches]);

  // --- USER SWAP LOGIC (SNAP BACK) ---
  const handleCandyClick = async (index: number) => {
    if (isProcessing || moves <= 0) return;

    if (selectedCandy === null) {
      setSelectedCandy(index);
    } else {
      const id1 = selectedCandy;
      const id2 = index;
      const isAdjacent = [id1 - 1, id1 + 1, id1 - WIDTH, id1 + WIDTH].includes(id2);
      const isRowWrap = (id1 % WIDTH === 0 && id2 === id1 - 1) || (id1 % WIDTH === WIDTH - 1 && id2 === id1 + 1);

      if (isAdjacent && !isRowWrap) {
        await executeSwap(id1, id2);
      } else {
        setSelectedCandy(index);
      }
    }
  };

  const executeSwap = (id1: number, id2: number) => {
    setIsProcessing(true);
    const newBoard = [...board];
    const temp = newBoard[id1];
    newBoard[id1] = newBoard[id2];
    newBoard[id2] = temp;
    setBoard([...newBoard]);

    setTimeout(() => {
      const matches = getMatches(newBoard);
      if (matches.size > 0) {
        setMoves(prev => prev - 1);
        setSelectedCandy(null);
        processMatches();
      } else {
        // SNAP BACK
        const revertedBoard = [...newBoard];
        revertedBoard[id2] = revertedBoard[id1];
        revertedBoard[id1] = temp;
        setBoard(revertedBoard);
        setSelectedCandy(null);
        setTimeout(() => setIsProcessing(false), 300);
      }
    }, 400);
  };

  return (
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-indigo-950 p-6 rounded-[3rem] border-[12px] border-purple-500/50 shadow-2xl w-full max-w-sm mx-auto relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-800/20 via-transparent to-transparent pointer-events-none" />

      {/* Scoreboard */}
      <div className="flex justify-between items-center mb-6 relative z-10">
        <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20 min-w-[100px] text-center">
          <p className="text-[10px] font-black text-purple-300 uppercase tracking-tighter">Puntaje</p>
          <p className="text-2xl font-black text-white">{score}<span className="text-sm text-purple-400">/{TARGET_SCORE}</span></p>
        </div>
        <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20 min-w-[100px] text-center">
          <p className="text-[10px] font-black text-purple-300 uppercase tracking-tighter">Movimientos</p>
          <p className={`text-2xl font-black ${moves <= 3 ? 'text-red-400 animate-pulse' : 'text-white'}`}>{moves}</p>
        </div>
      </div>

      <h2 className="text-center text-4xl font-black text-white italic tracking-tighter mb-6 drop-shadow-lg transform -rotate-1">
        KWAZY <span className="text-pink-500">CUPCAKES</span>
      </h2>

      {/* Game Grid */}
      <div className="bg-black/40 p-3 rounded-3xl border-2 border-white/5 backdrop-blur-xl relative z-10">
        <div className="grid grid-cols-6 gap-2">
          {board.map((candyId, index) => {
            const candyType = CANDY_TYPES.find(c => c.id === candyId);
            const isSelected = selectedCandy === index;
            
            return (
              <motion.div
                key={`${index}-${candyId}`}
                layout
                onClick={() => handleCandyClick(index)}
                whileTap={{ scale: 0.8 }}
                className={`
                  aspect-square rounded-xl cursor-pointer relative flex items-center justify-center transition-all duration-300
                  ${candyType?.color || 'bg-transparent'}
                  ${isSelected ? 'ring-4 ring-white z-20 scale-110 rotate-12 shadow-[0_0_20px_rgba(255,255,255,0.5)]' : 'hover:brightness-110 shadow-lg'}
                `}
              >
                {candyType && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-xl" />
                    <div className="relative z-10 filter drop-shadow-md">
                      {candyType.icon}
                    </div>
                  </>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-6 h-3 bg-black/40 rounded-full overflow-hidden border border-white/10">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${Math.min((score / TARGET_SCORE) * 100, 100)}%` }}
          className="h-full bg-gradient-to-r from-pink-500 to-purple-500 shadow-[0_0_15px_rgba(236,72,153,0.5)]"
        />
      </div>

      {/* Game States Overlay */}
      <AnimatePresence>
        {moves === 0 && score < TARGET_SCORE && !isProcessing && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 bg-indigo-950/95 z-50 flex flex-col items-center justify-center p-8 text-center"
          >
            <div className="text-7xl mb-4">🍩</div>
            <h3 className="text-3xl font-black text-white mb-2">¡GAME OVER!</h3>
            <p className="text-indigo-300 mb-8 font-medium">Te has quedado sin dulces movimientos.</p>
            <button
              onClick={createBoard}
              className="bg-white text-indigo-900 font-black py-4 px-10 rounded-full flex items-center gap-3 hover:scale-105 active:scale-95 transition-transform"
            >
              <RotateCcw size={24} /> REINTENTAR
            </button>
          </motion.div>
        )}

        {score >= TARGET_SCORE && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 bg-pink-500/95 z-50 flex flex-col items-center justify-center p-8 text-center"
          >
            <motion.div
              animate={{ rotate: [0, -10, 10, -10, 0], scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Trophy size={80} className="text-white mb-4" />
            </motion.div>
            <h3 className="text-4xl font-black text-white mb-2">¡KWAZY WIN!</h3>
            <p className="text-pink-100 mb-8 font-medium">¡Has alcanzado la meta de azúcar!</p>
            <button
              onClick={onSuccess}
              className="bg-white text-pink-600 font-black py-4 px-10 rounded-full shadow-xl hover:scale-105 transition-transform"
            >
              CONTINUAR
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};