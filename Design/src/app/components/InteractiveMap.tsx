import { motion } from "motion/react";
import { MapPin, Navigation, Star } from "lucide-react";
import { useState } from "react";

export function InteractiveMap() {
  const [selectedMonument, setSelectedMonument] = useState(0);

  const monuments = [
    { name: "Falla de la Sección Especial", district: "Plaza del Ayuntamiento", type: "special", image: "https://images.unsplash.com/photo-1647693680958-e2bd830cdbfb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxWYWxlbmNpYSUyMEZhbGxhcyUyMGZlc3RpdmFsfGVufDF8fHx8MTc2OTQ1NjQwNHww&ixlib=rb-4.1.0&q=80&w=1080" },
    { name: "Falla Convento Jerusalén", district: "Ruzafa", type: "special", image: "https://images.unsplash.com/photo-1760121002397-70751ea3c113?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxTcGFuaXNoJTIwZmVzdGl2YWwlMjBtb251bWVudHxlbnwxfHx8fDE3Njk0NTY0MDV8MA&ixlib=rb-4.1.0&q=80&w=1080" },
    { name: "Falla Antiga de Campanar", district: "Campanar", type: "standard", image: "https://images.unsplash.com/photo-1671639045782-93f73d559236?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxWYWxlbmNpYSUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3Njk0NTY0MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080" }
  ];

  return (
    <div className="h-full w-full bg-[#FFF8F0] relative overflow-hidden">
      {/* Status Bar */}
      <div className="absolute top-0 left-0 right-0 z-50 flex justify-between items-center px-6 pt-3 pb-1">
        <span className="text-xs">9:41</span>
        <div className="flex gap-1 items-center">
          <div className="w-4 h-3 bg-foreground/80 rounded-sm" />
          <div className="w-4 h-3 bg-foreground/60 rounded-sm" />
          <div className="w-4 h-3 bg-foreground/40 rounded-sm" />
        </div>
      </div>

      {/* Map Background */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #FFE8D6 0%, #FFDCC1 50%, #FFE5CD 100%)' }}>
        {/* Stylized map elements */}
        <svg className="w-full h-full opacity-20" viewBox="0 0 400 800">
          {/* Streets */}
          <line x1="50" y1="0" x2="50" y2="800" stroke="#FF6B35" strokeWidth="2" />
          <line x1="150" y1="0" x2="150" y2="800" stroke="#FF6B35" strokeWidth="2" />
          <line x1="250" y1="0" x2="250" y2="800" stroke="#FF6B35" strokeWidth="2" />
          <line x1="350" y1="0" x2="350" y2="800" stroke="#FF6B35" strokeWidth="2" />
          <line x1="0" y1="150" x2="400" y2="150" stroke="#FF6B35" strokeWidth="2" />
          <line x1="0" y1="300" x2="400" y2="300" stroke="#FF6B35" strokeWidth="2" />
          <line x1="0" y1="450" x2="400" y2="450" stroke="#FF6B35" strokeWidth="2" />
          <line x1="0" y1="600" x2="400" y2="600" stroke="#FF6B35" strokeWidth="2" />
          
          {/* Buildings */}
          <rect x="60" y="160" width="80" height="60" fill="#FFD4B8" rx="4" />
          <rect x="170" y="100" width="70" height="80" fill="#FFD4B8" rx="4" />
          <rect x="270" y="180" width="60" height="50" fill="#FFD4B8" rx="4" />
          <rect x="80" y="320" width="90" height="70" fill="#FFD4B8" rx="4" />
          <rect x="200" y="350" width="70" height="60" fill="#FFD4B8" rx="4" />
          <rect x="300" y="300" width="80" height="90" fill="#FFD4B8" rx="4" />
          <rect x="100" y="480" width="60" height="70" fill="#FFD4B8" rx="4" />
          <rect x="250" y="500" width="70" height="60" fill="#FFD4B8" rx="4" />
        </svg>

        {/* Markers */}
        {/* Special markers with gold border */}
        <motion.div 
          className="absolute top-[25%] left-[40%] cursor-pointer"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          onClick={() => setSelectedMonument(0)}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-[#FFB800] rounded-full blur-md opacity-50" />
            <div className="relative w-10 h-10 bg-gradient-to-br from-[#FF6B35] to-[#E63946] rounded-full flex items-center justify-center border-2 border-[#FFB800] shadow-lg">
              <span className="text-lg">🔥</span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="absolute top-[45%] left-[60%] cursor-pointer"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
          onClick={() => setSelectedMonument(1)}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-[#FFB800] rounded-full blur-md opacity-50" />
            <div className="relative w-10 h-10 bg-gradient-to-br from-[#FF6B35] to-[#E63946] rounded-full flex items-center justify-center border-2 border-[#FFB800] shadow-lg">
              <span className="text-lg">🔥</span>
            </div>
          </div>
        </motion.div>

        {/* Standard markers */}
        {[
          { top: '35%', left: '25%' },
          { top: '55%', left: '35%' },
          { top: '65%', left: '70%' },
          { top: '75%', left: '45%' },
        ].map((pos, i) => (
          <motion.div 
            key={i}
            className="absolute cursor-pointer"
            style={{ top: pos.top, left: pos.left }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
          >
            <div className="w-6 h-6 bg-[#FF6B35] rounded-full flex items-center justify-center shadow-md">
              <span className="text-xs">🔥</span>
            </div>
          </motion.div>
        ))}

        {/* User location - pulsing blue dot */}
        <motion.div 
          className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2"
        >
          <motion.div 
            className="w-16 h-16 bg-blue-400/30 rounded-full absolute -translate-x-1/2 -translate-y-1/2"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg" />
        </motion.div>
      </div>

      {/* Filter Pills */}
      <div className="absolute top-16 left-0 right-0 z-40 px-6">
        <div className="flex gap-2">
          <motion.button 
            className="px-4 py-2 rounded-full backdrop-blur-xl bg-white/60 border border-white/40 shadow-lg text-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex items-center gap-2">
              <Navigation className="w-4 h-4 text-[#FF6B35]" />
              <span>Near Me</span>
            </div>
          </motion.button>
          <motion.button 
            className="px-4 py-2 rounded-full backdrop-blur-xl bg-white/60 border border-white/40 shadow-lg text-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-[#FFB800]" fill="#FFB800" />
              <span>Especial</span>
            </div>
          </motion.button>
        </div>
      </div>

      {/* Bottom Card Preview */}
      <div className="absolute bottom-20 left-0 right-0 z-40 px-6">
        <motion.div 
          className="backdrop-blur-xl bg-white/80 border border-white/40 rounded-3xl shadow-2xl overflow-hidden"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", damping: 20 }}
        >
          <div className="flex gap-4 p-4">
            <div 
              className="w-24 h-24 rounded-2xl bg-cover bg-center flex-shrink-0"
              style={{ backgroundImage: `url(${monuments[selectedMonument].image})` }}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-1">
                <h3 className="font-semibold text-base leading-tight">{monuments[selectedMonument].name}</h3>
                {monuments[selectedMonument].type === 'special' && (
                  <Star className="w-5 h-5 text-[#FFB800] flex-shrink-0" fill="#FFB800" />
                )}
              </div>
              <div className="flex items-center gap-1 text-sm text-foreground/60 mb-2">
                <MapPin className="w-3 h-3" />
                <span>{monuments[selectedMonument].district}</span>
              </div>
              <button className="bg-[#FF6B35] text-white px-4 py-1.5 rounded-full text-sm">
                Get Directions
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
