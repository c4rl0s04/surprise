import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Search, Camera, Gavel, AlertCircle, Fingerprint, Users, ChevronRight, ChevronLeft, ArrowRight } from 'lucide-react';
import { TARGET_NAME } from '../../shared/config';

// --- IMAGE CONFIGURATION ---
// NOTE: Ensure these files exist in an 'images' folder at the project root
const MUGSHOT_URL = `${import.meta.env.BASE_URL}images/profile-mugshot.jpg`; 
const EVIDENCE_1_URL = `${import.meta.env.BASE_URL}images/evidence-smile.jpg`; 
const EVIDENCE_2_URL = `${import.meta.env.BASE_URL}images/evidence-eyes.jpg`; 

// --- HELPER COMPONENTS ---

const NavButton = ({ 
  active, 
  onClick, 
  icon, 
  label, 
  color, 
  isImportant = false 
}: { 
  active: boolean; 
  onClick: () => void; 
  icon: React.ReactNode; 
  label: string; 
  color: string; 
  isImportant?: boolean; 
}) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-200 border-l-4 text-left group relative overflow-hidden font-sans ${
      active 
        ? `${color} border-slate-800 shadow-inner translate-x-1` 
        : 'bg-white/50 border-transparent hover:bg-white hover:pl-5 shadow-sm'
    } ${isImportant ? 'mt-4 border-l-red-500 hover:bg-red-50' : ''}`}
  >
    <span className={`relative z-10 transition-colors ${active ? 'text-slate-900' : 'text-slate-400 group-hover:text-slate-600'}`}>
        {icon}
    </span>
    <span className={`relative z-10 font-bold text-xs md:text-sm tracking-widest uppercase ${active ? 'text-slate-900' : 'text-slate-500 group-hover:text-slate-700'}`}>
        {label}
    </span>
  </button>
);

const Header = ({ title }: { title: string }) => (
  <div className="border-b-4 border-slate-800 pb-2 mb-2 flex items-center gap-2">
    <div className="bg-slate-800 text-[#fdfbf7] px-2 py-1 font-bold text-lg md:text-xl tracking-widest transform -skew-x-12 shadow-md">
      {title}
    </div>
    <div className="flex-1 h-1 bg-slate-800 opacity-20"></div>
  </div>
);

const Field = ({ label, value }: { label: string, value: string }) => (
  <div className="flex flex-col md:flex-row md:items-baseline border-b border-slate-400/30 py-2 border-dashed hover:bg-yellow-50/50 transition-colors px-1">
    <span className="font-bold text-slate-500 text-xs md:text-sm w-40 shrink-0 uppercase tracking-widest font-sans flex items-center gap-1">
      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full"></span>
      {label}:
    </span>
    <span className="font-bold text-slate-800 text-base md:text-lg leading-tight font-['Special_Elite']">{value}</span>
  </div>
);

export interface EvidenceFolderProps {
  onCaseClosed: () => void;
}

type Tab = 'PROFILE' | 'CRIME' | 'EVIDENCE' | 'WITNESSES' | 'VERDICT';

export const EvidenceFolder: React.FC<EvidenceFolderProps> = ({ onCaseClosed }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('PROFILE');
  const [witnessPage, setWitnessPage] = useState(0);

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    setWitnessPage(0); // Reset page on tab change
  };

  const nextPage = () => setWitnessPage(1);
  const prevPage = () => setWitnessPage(0);

  // --- CLOSED STATE (The Cover) ---
  if (!isOpen) {
    return (
      <div className="flex items-center justify-center w-full h-full p-4 perspective-1000">
        <motion.div 
          onClick={() => setIsOpen(true)}
          initial={{ scale: 0.9, rotateX: 20 }}
          whileHover={{ scale: 1.05, rotateX: 0 }}
          className="relative w-full max-w-md aspect-[3/4] cursor-pointer shadow-2xl transition-all duration-500 transform-style-3d group"
        >
          {/* Folder Back */}
          <div className="absolute inset-0 bg-[#c9aa76] rounded-r-xl transform translate-x-3 translate-y-3 border border-[#a88b5d]"></div>
          
          {/* Folder Front */}
          <div className="absolute inset-0 bg-[#e0c08b] rounded-r-xl border-l-8 border-[#bfa070] flex flex-col items-center justify-between p-8 shadow-xl">
             
             {/* Tab */}
             <div className="absolute top-0 left-0 w-40 h-12 bg-[#e0c08b] rounded-t-lg border-t border-r border-[#c9aa76] transform -translate-y-full translate-x-0 flex items-center justify-center shadow-sm">
                 <span className="text-xs font-bold text-slate-700 tracking-widest">CONFIDENCIAL</span>
             </div>

             {/* Top Stamps */}
             <div className="w-full flex justify-between items-start opacity-70">
                <div className="border-2 border-slate-800 p-2 font-black text-xs uppercase">NYPD - 99TH</div>
                <div className="text-red-700 font-black text-xl border-4 border-red-700 px-2 py-1 transform -rotate-12 opacity-80">
                    TOP SECRET
                </div>
             </div>
             
             {/* Center Title */}
             <div className="text-center space-y-4">
                 <div className="w-24 h-24 mx-auto bg-slate-800/10 rounded-full flex items-center justify-center border-2 border-slate-800/20 mb-4">
                    <Fingerprint size={60} className="text-slate-800/40" />
                 </div>
                 <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-2 font-['Special_Elite'] uppercase leading-none">
                    EXPEDIENTE
                 </h1>
                 <div className="bg-slate-900 text-white text-xl font-['Special_Elite'] px-4 py-1 inline-block transform rotate-1">
                    {TARGET_NAME}
                 </div>
                 <p className="text-slate-600 text-lg font-['Special_Elite'] mt-2">CASO: GRAN ROBO</p>
             </div>

             {/* Bottom Hint */}
             <div className="mt-8 text-center w-full">
                 <p className="text-sm text-slate-500 animate-bounce font-sans font-bold uppercase tracking-widest text-red-600">
                    ( CLICK PARA ABRIR )
                 </p>
                 <div className="w-full h-1 bg-gradient-to-r from-transparent via-slate-400 to-transparent mt-2"></div>
             </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // --- OPEN STATE (The Dashboard) ---
  return (
    <motion.div 
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="relative w-full max-w-5xl h-[85vh] bg-[#fdfbf7] rounded-lg shadow-2xl overflow-hidden flex flex-col md:flex-row border-8 border-[#d4b483]"
    >
        {/* Background Texture */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#a88b5d 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

        {/* LEFT SIDEBAR (Mugshot & Nav) - NO SCROLL */}
        <div className="w-full md:w-1/3 bg-[#e6dcc3] border-r-4 border-[#c9aa76] p-6 flex flex-col gap-6 relative z-10 overflow-hidden">
            
            {/* Mugshot Area */}
            <div className="bg-white p-3 shadow-md rotate-1 transform transition-transform hover:rotate-0 shrink-0">
                <div className="w-full aspect-[3/4] bg-slate-200 flex items-center justify-center border border-slate-300 relative overflow-hidden group">
                    {MUGSHOT_URL ? (
                      <img src={MUGSHOT_URL} alt="Mugshot" className="w-full h-full object-cover grayscale-[20%] contrast-125 sepia-[.2]" />
                    ) : (
                      <User size={80} className="text-slate-400" />
                    )}
                    
                    {/* Badge Overlay */}
                    <div className="absolute bottom-2 w-full text-center">
                        <div className="bg-slate-800 text-white text-xs px-2 py-1 inline-block font-mono shadow-md border border-slate-600">NYPD 98441</div>
                    </div>
                </div>
                <div className="mt-2 text-center font-['Special_Elite']">
                    <h2 className="text-xl font-bold uppercase truncate">{TARGET_NAME}</h2>
                    <p className="text-xs text-red-600 font-bold uppercase">SOSPECHOSA #1</p>
                </div>
            </div>

            {/* Navigation Tabs */}
            <nav className="flex-1 flex flex-col gap-2 min-h-0 justify-between">
                <div className="flex flex-col gap-2">
                    <NavButton 
                        active={activeTab === 'PROFILE'} 
                        onClick={() => handleTabChange('PROFILE')}
                        icon={<User size={18}/>}
                        label="PERFIL"
                        color="bg-blue-100"
                    />
                    <NavButton 
                        active={activeTab === 'CRIME'} 
                        onClick={() => handleTabChange('CRIME')}
                        icon={<Search size={18}/>}
                        label="EL CRIMEN"
                        color="bg-yellow-100"
                    />
                    <NavButton 
                        active={activeTab === 'EVIDENCE'} 
                        onClick={() => handleTabChange('EVIDENCE')}
                        icon={<Camera size={18}/>}
                        label="EVIDENCIA"
                        color="bg-green-100"
                    />
                    <NavButton 
                        active={activeTab === 'WITNESSES'} 
                        onClick={() => handleTabChange('WITNESSES')}
                        icon={<Users size={18}/>}
                        label="TESTIGOS"
                        color="bg-purple-100"
                    />
                </div>
                <div>
                    <NavButton 
                        active={activeTab === 'VERDICT'} 
                        onClick={() => handleTabChange('VERDICT')}
                        icon={<Gavel size={18}/>}
                        label="VEREDICTO"
                        color="bg-red-100"
                        isImportant
                    />
                </div>
            </nav>
        </div>

        {/* RIGHT CONTENT AREA - NO SCROLL, PAGINATED */}
        <div className="flex-1 p-6 md:p-10 relative overflow-hidden bg-[#fdfbf7] flex flex-col">
            <AnimatePresence mode="wait">
                
                {activeTab === 'PROFILE' && (
                    <motion.div 
                        key="profile"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6 font-['Special_Elite'] h-full flex flex-col"
                    >
                        <Header title="DATOS DEL SUJETO" />
                        <div className="grid grid-cols-1 gap-4 text-lg flex-1">
                            <Field label="NOMBRE" value={TARGET_NAME} />
                            <Field label="ALIAS" value="AMOR DE MI VIDA / CERDA" />
                            <Field label="PELIGROSIDAD" value="EXTREMA (Robó mi corazón sin permiso)" />
                            <Field label="HABILIDADES" value="Inteligencia superior, Sonrisa letal, Extrema Belleza, Fuerza Superdesarrollada." />
                            <Field label="PUNTOS DÉBILES" value="Adora la comida rica y ama su cama (modo oso perezoso: ACTIVADO)." />
                            <Field label="VÍCTIMA" value="Yo (El propietario del corazón sustraído)" />
                        </div>
                        <div className="mt-auto p-4 bg-yellow-50 border-l-4 border-yellow-400 text-sm text-slate-600 italic">
                            "La sospechosa fue vista por última vez siendo absolutamente increíble en la vecindad del corazón de la víctima." - Informe del Det. Peralta
                        </div>
                    </motion.div>
                )}

                {activeTab === 'CRIME' && (
                    <motion.div 
                        key="crime"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6 font-['Special_Elite'] h-full flex flex-col"
                    >
                        <Header title="DETALLES DEL INCIDENTE" />
                        
                        <div className="bg-white p-6 shadow-sm border border-slate-200 rotate-1 flex-1 flex flex-col">
                            <h3 className="font-bold text-xl mb-4 underline decoration-red-500">REPORTE OFICIAL #99</h3>
                            <div className="space-y-4 text-lg">
                                <p className="leading-relaxed">
                                    El oficial a cargo reporta que la sospechosa ingresó a las instalaciones (mi vida) y procedió a cometer un 
                                    <span className="font-bold bg-yellow-200 px-1 mx-1">GRAN ROBO DE CORAZÓN</span> 
                                    en primer grado.
                                </p>
                                <p className="leading-relaxed">
                                    No hubo resistencia. La víctima colaboró activamente en el robo y parece estar disfrutando de la situación. Se encontraron huellas dactilares de la sospechosa por toda mi alma.
                                </p>
                            </div>
                            <div className="mt-auto pt-6 border-t border-slate-200 flex items-center gap-2 text-red-600 font-bold">
                                <AlertCircle /> ESTADO: CASO ABIERTO
                            </div>
                        </div>
                    </motion.div>
                )}

                {activeTab === 'EVIDENCE' && (
                    <motion.div 
                        key="evidence"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-4 h-full flex flex-col"
                    >
                        <Header title="EVIDENCIA FOTOGRÁFICA" />
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 items-start">
                            <div className="bg-white p-2 md:p-3 shadow-md rotate-2 border border-slate-200 hover:rotate-0 hover:z-10 hover:scale-105 transition-all duration-300">
                                <div className="bg-slate-100 h-40 md:h-48 flex items-center justify-center mb-2 overflow-hidden border border-slate-300">
                                    {EVIDENCE_1_URL ? (
                                       <img src={EVIDENCE_1_URL} alt="Evidence 1" className="w-full h-full object-cover" />
                                    ) : (
                                       <span className="text-4xl">🥰</span>
                                    )}
                                </div>
                                <p className="font-['Special_Elite'] text-center text-xs md:text-sm bg-black text-white py-1 transform -rotate-1 inline-block px-2">EVIDENCIA A: Esa Sonrisa</p>
                            </div>

                            <div className="bg-white p-2 md:p-3 shadow-md -rotate-1 border border-slate-200 hover:rotate-0 hover:z-10 hover:scale-105 transition-all duration-300">
                                <div className="bg-slate-100 h-40 md:h-48 flex items-center justify-center mb-2 overflow-hidden border border-slate-300">
                                    {EVIDENCE_2_URL ? (
                                       <img src={EVIDENCE_2_URL} alt="Evidence 2" className="w-full h-full object-cover" />
                                    ) : (
                                       <span className="text-4xl">✨</span>
                                    )}
                                </div>
                                <p className="font-['Special_Elite'] text-center text-xs md:text-sm bg-black text-white py-1 transform rotate-1 inline-block px-2">EVIDENCIA B: Sus Ojos</p>
                            </div>
                        </div>

                        {/* Forensic Report - Compact */}
                        <div className="bg-[#fefce8] p-3 border border-[#b45309] shadow-md transform rotate-[0.5deg] relative mt-auto">
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-yellow-200/80 transform -rotate-2"></div>
                            <h3 className="text-amber-900 font-bold border-b-2 border-amber-900/20 mb-1 pb-1 flex justify-between text-sm">
                                <span>LAB. FORENSE</span>
                                <span className="text-xs opacity-50">REF: L-99</span>
                            </h3>
                            <div className="font-mono text-xs space-y-1 text-slate-800">
                                <p><span className="font-bold">RESULTADO:</span> Niveles "Toit" fuera de escala.</p>
                                <p><span className="font-bold">COMPATIBILIDAD:</span> 100% (Cool, cool, cool).</p>
                                <p className="pt-1 border-t border-dashed border-amber-900/30">
                                    <span className="font-bold bg-amber-900 text-white px-1">CONCLUSIÓN:</span> ELLA ES LA ELEGIDA.
                                </p>
                            </div>
                            <div className="absolute bottom-1 right-2 border-2 border-green-600 text-green-600 font-black text-sm px-1 transform -rotate-12 opacity-60">
                                MATCH
                            </div>
                        </div>
                    </motion.div>
                )}

                {activeTab === 'WITNESSES' && (
                    <div className="h-full flex flex-col">
                        <Header title="DECLARACIONES" />
                        
                        <div className="relative flex-1 bg-transparent overflow-hidden">
                            <AnimatePresence mode="wait" custom={witnessPage}>
                                {witnessPage === 0 ? (
                                    <motion.div 
                                        key="page0"
                                        initial={{ x: -50, opacity: 0, rotateY: 90 }}
                                        animate={{ x: 0, opacity: 1, rotateY: 0 }}
                                        exit={{ x: -50, opacity: 0, rotateY: -90 }}
                                        transition={{ duration: 0.4 }}
                                        className="space-y-4 font-['Special_Elite'] absolute inset-0 px-2"
                                    >
                                        {/* Captain Holt */}
                                        <div className="bg-white p-3 border-l-4 border-slate-800 shadow-sm">
                                            <div className="flex items-center gap-2 mb-1">
                                                <div className="bg-slate-800 text-white text-[10px] px-2 py-0.5 font-bold rounded">CAPT. HOLT</div>
                                            </div>
                                            <p className="text-slate-700 italic text-sm">
                                                "La eficiencia romántica de esta pareja es... satisfactoria. He analizado los datos y su felicidad futura tiene una probabilidad estadística del 100%."
                                            </p>
                                        </div>

                                        {/* Jake Peralta */}
                                        <div className="bg-blue-50 p-3 border-l-4 border-blue-600 shadow-sm transform rotate-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <div className="bg-blue-600 text-white text-[10px] px-2 py-0.5 font-bold rounded">DET. PERALTA</div>
                                            </div>
                                            <p className="text-slate-700 italic text-sm font-bold">
                                                "Cool, cool, cool, cool, cool. Sin duda, sin duda. Sois la definición de 'Toit Nups'. He apostado 50 pavos con Amy a que duráis para siempre."
                                            </p>
                                        </div>

                                        {/* Charles Boyle */}
                                        <div className="bg-white p-3 border-l-4 border-yellow-500 shadow-sm">
                                            <div className="flex items-center gap-2 mb-1">
                                                <div className="bg-yellow-100 text-yellow-800 text-[10px] px-2 py-0.5 font-bold rounded border border-yellow-200">BOYLE</div>
                                            </div>
                                            <p className="text-slate-700 italic text-sm">
                                                "¡Oh Dios mío! ¡Lo sabía! ¡Voy a lavarles el pelo a los dos para la boda! ¡Tengo el champú perfecto!"
                                            </p>
                                        </div>

                                        {/* Rosa Diaz */}
                                        <div className="bg-white p-3 border-l-4 border-purple-600 shadow-sm transform -rotate-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <div className="bg-purple-600 text-white text-[10px] px-2 py-0.5 font-bold rounded shadow-sm">ROSA</div>
                                            </div>
                                            <p className="text-slate-700 italic font-bold text-sm">
                                                "Ella me cae bien. Tú... tienes suerte. Si le haces daño, haré que parezca un accidente. Felicidades."
                                            </p>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div 
                                        key="page1"
                                        initial={{ x: 50, opacity: 0, rotateY: -90 }}
                                        animate={{ x: 0, opacity: 1, rotateY: 0 }}
                                        exit={{ x: 50, opacity: 0, rotateY: 90 }}
                                        transition={{ duration: 0.4 }}
                                        className="space-y-4 font-['Special_Elite'] absolute inset-0 px-2"
                                    >
                                        {/* Terry Jeffords */}
                                        <div className="bg-white p-3 border-l-4 border-orange-500 shadow-sm">
                                            <div className="flex items-center gap-2 mb-1">
                                                <div className="bg-orange-100 text-orange-800 text-[10px] px-2 py-0.5 font-bold rounded border border-orange-200">SGT. JEFFORDS</div>
                                            </div>
                                            <p className="text-slate-700 italic text-sm">
                                                "¡A Terry le encanta el amor! ¡Sois más fuertes juntos que yo levantando pesas después de comerme un yogur! ¡Id a por todas!"
                                            </p>
                                        </div>
                                        
                                        {/* Gina Linetti */}
                                        <div className="bg-pink-50 p-3 border-l-4 border-pink-500 shadow-sm transform rotate-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <div className="bg-pink-200 text-pink-800 text-[10px] px-2 py-0.5 font-bold rounded border border-pink-300">GINA</div>
                                            </div>
                                            <p className="text-slate-700 italic text-sm">
                                                "Obviamente sois la pareja del momento. De nada, porque seguro que es gracias a mi influencia espiritual. Sois la Beyoncé de las parejas."
                                            </p>
                                        </div>

                                        {/* Scully & Hitchcock */}
                                        <div className="bg-yellow-50/50 p-3 border-l-4 border-red-800 shadow-sm border border-yellow-200">
                                            <div className="flex items-center gap-2 mb-1">
                                                <div className="bg-red-800 text-white text-[10px] px-2 py-0.5 font-bold rounded">SCULLY & HITCHCOCK</div>
                                            </div>
                                            <p className="text-slate-700 italic text-sm">
                                                "Oye... espera un momento. Si os casáis... ¿eso significa que habrá tarta? Nosotros damos nuestra bendición si hay tarta. ¿Te vas a comer eso?"
                                            </p>
                                            <div className="text-xs text-red-500 mt-1 font-bold">*Manchas de salsa en el informe*</div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Pagination Controls */}
                        <div className="mt-auto pt-4 flex justify-between items-center border-t border-slate-300">
                            <button 
                                onClick={prevPage}
                                disabled={witnessPage === 0}
                                className={`flex items-center text-sm font-bold ${witnessPage === 0 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-700 hover:text-red-600'}`}
                            >
                                <ChevronLeft size={16} /> ANTERIOR
                            </button>
                            <span className="text-xs font-mono text-slate-400">PÁGINA {witnessPage + 1} DE 2</span>
                            <button 
                                onClick={nextPage}
                                disabled={witnessPage === 1}
                                className={`flex items-center text-sm font-bold ${witnessPage === 1 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-700 hover:text-red-600'}`}
                            >
                                SIGUIENTE <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                )}

                {activeTab === 'VERDICT' && (
                    <motion.div 
                        key="verdict"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="flex flex-col items-center justify-center h-full text-center font-['Special_Elite'] py-6"
                    >
                        <div className="mb-4 relative">
                            <Gavel size={50} className="text-slate-800" />
                            <motion.div 
                                animate={{ rotate: [0, -10, 10, 0] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="absolute -top-2 -right-2 text-red-600 text-4xl font-black"
                            >
                                !
                            </motion.div>
                        </div>

                        <h2 className="text-2xl md:text-3xl font-bold mb-4">SENTENCIA FINAL</h2>
                        
                        <div className="mb-6 space-y-4 max-w-lg">
                            <p className="text-lg leading-relaxed">
                                Dada la abrumadora evidencia de que eres increíble, este tribunal te encuentra...
                            </p>
                            <div className="py-2">
                                <span className="text-3xl md:text-4xl font-black bg-red-600 text-white px-6 py-2 transform -rotate-2 inline-block shadow-lg border-2 border-white">
                                    ¡CULPABLE!
                                </span>
                            </div>
                        </div>

                        <p className="text-lg mb-8 text-slate-600 font-bold">
                            Sentencia: Ser mi San Valentín<br/>(Cadena Perpetua sin fianza).
                        </p>

                        <button 
                            onClick={onCaseClosed}
                            className="bg-yellow-400 hover:bg-yellow-500 text-slate-900 text-lg md:text-xl font-bold py-3 px-8 border-4 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center gap-3 animate-pulse"
                        >
                            <Gavel size={24} /> CERRAR CASO (SÍ)
                        </button>
                    </motion.div>
                )}

            </AnimatePresence>
        </div>
    </motion.div>
  );
};