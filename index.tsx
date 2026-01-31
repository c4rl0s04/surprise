import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Hub } from './pages/Hub';
import { IronManPage } from './pages/IronManPage';
import { B99Page } from './pages/B99Page';
import { EuroleaguePage } from './pages/EuroleaguePage';
import { Universe } from './shared/types';
import { YOUR_WHATSAPP_NUMBER } from './shared/config';
import { FinalSuccessModal } from './components/shared/FinalSuccessModal';

const App = () => {
  const [universe, setUniverse] = useState<Universe>('HUB');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handlePropose = () => {
    let text = "";

    // NOTE: The \n characters create new lines in the WhatsApp message
    switch (universe) {
      case 'IRONMAN':
        text = "🤖 *JARVIS SYSTEM REPORT*\n\nTarget: Tony Stark (You)\nStatus: LOML detected\n\nProtocolo Eternidad: *ACTIVADO* 💍\n\nTe quiero 3000. ¡SÍ quiero ser tu San Valentín! 💥❤️";
        break;
      case 'B99':
        text = "🚨 *NINE-NINE! NEW CASE FILE* 🚨\n\nDetective: Santiago (Me)\nSuspect: You\nCrime: Stole my heart\n\nVERDICT: *GUILTY* (I accept!)\n\n¡SÍ! 🍩💍👮‍♀️";
        break;
      case 'EUROLEAGUE':
        text = "🏀 *OFFICIAL SCORESHEET* 🏀\n\nMatch: Final Four of Love\nResult: *WINNER*\n\nHe firmado el contrato más importante de mi vida (MVP).\n\n¡Nos vamos a la final! ¡SÍ QUIERO! 🏆❤️📝";
        break;
      default:
        text = "✨ *MULTIVERSE UPDATE* ✨\n\nEntré al Multiverso... ¡y dije que SÍ a ser tu San Valentín! 💍💖";
        break;
    }

    setModalMessage(text);
    setIsModalOpen(true);
  };

  return (
    <div className="antialiased">
      {universe === 'HUB' && <Hub onSelect={setUniverse} />}
      {universe === 'IRONMAN' && <IronManPage onBack={() => setUniverse('HUB')} onPropose={handlePropose} />}
      {universe === 'B99' && <B99Page onBack={() => setUniverse('HUB')} onPropose={handlePropose} />}
      {universe === 'EUROLEAGUE' && <EuroleaguePage onBack={() => setUniverse('HUB')} onPropose={handlePropose} />}

      {/* Global Success Modal */}
      <FinalSuccessModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        message={modalMessage}
        whatsappNumber={YOUR_WHATSAPP_NUMBER}
      />
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);