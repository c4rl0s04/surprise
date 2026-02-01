import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Copy, Share2, X, Check, Smartphone } from 'lucide-react';

interface FinalSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  whatsappNumber: string;
}

export const FinalSuccessModal = ({ isOpen, onClose, message, whatsappNumber }: FinalSuccessModalProps) => {
  const [copied, setCopied] = useState(false);

  const handleWhatsApp = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Proposal Response',
          text: message,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback to copy if share not supported
      handleCopy();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-6 border-b border-slate-700 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-white">¡SABÍA QUE DIRÍAS QUE SÍ! 😏</h2>
                <p className="text-xs text-green-400 uppercase tracking-wider mt-1 font-bold">Respuesta: CONFIRMADA ❤️</p>
              </div>
              <button 
                onClick={onClose}
                className="text-slate-500 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-6">
              <p className="text-slate-300 text-lg">
                Venga va, mándame el mensaje y hazme feliz:
              </p>

              {/* Message Preview */}
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 relative group">
                <div className="absolute top-2 right-2 text-[10px] text-slate-600 font-mono uppercase">TU MENSAJE</div>
                <p className="text-slate-300 text-sm font-mono whitespace-pre-wrap leading-relaxed italic">
                  "{message}"
                </p>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <button
                  onClick={handleWhatsApp}
                  className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition-transform hover:scale-[1.02] shadow-lg shadow-green-900/20"
                >
                  <MessageCircle size={20} />
                  Enviar por WhatsApp
                </button>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={handleCopy}
                    className="flex flex-col items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white py-4 rounded-xl border border-slate-700 transition-colors"
                  >
                    {copied ? <Check className="text-green-400" size={24} /> : <Copy size={24} />}
                    <span className="text-xs font-bold uppercase">{copied ? '¡Copiado!' : 'Copiar Texto'}</span>
                  </button>

                  <button
                    onClick={handleShare}
                    className="flex flex-col items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white py-4 rounded-xl border border-slate-700 transition-colors"
                  >
                    {typeof navigator !== 'undefined' && navigator.share ? (
                        <>
                           <Smartphone size={24} />
                           <span className="text-xs font-bold uppercase">Compartir</span>
                        </>
                    ) : (
                        // Fallback visuals if native share isn't supported (acts as copy)
                        <>
                           <Share2 size={24} />
                           <span className="text-xs font-bold uppercase">Compartir</span>
                        </>
                    )}
                  </button>
                </div>
              </div>
            </div>
            
            {/* Footer */}
            <div className="bg-slate-950 p-3 text-center border-t border-slate-800">
                <p className="text-[10px] text-slate-500 uppercase tracking-widest">
                    No te hagas de rogar...
                </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};