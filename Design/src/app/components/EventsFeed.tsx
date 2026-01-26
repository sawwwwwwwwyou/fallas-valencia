import { motion } from "motion/react";
import { Flame, Clock } from "lucide-react";
import { useState, useEffect } from "react";

export function EventsFeed() {
  const [countdown, setCountdown] = useState("02:45:30");

  useEffect(() => {
    const interval = setInterval(() => {
      // Mock countdown
      const [h, m, s] = countdown.split(":").map(Number);
      let newS = s - 1;
      let newM = m;
      let newH = h;
      
      if (newS < 0) {
        newS = 59;
        newM -= 1;
      }
      if (newM < 0) {
        newM = 59;
        newH -= 1;
      }
      
      setCountdown(`${String(newH).padStart(2, "0")}:${String(newM).padStart(2, "0")}:${String(newS).padStart(2, "0")}`);
    }, 1000);
    
    return () => clearInterval(interval);
  }, [countdown]);

  return (
    <div className="h-full w-full bg-[#FFF8F0] overflow-y-auto pb-20">
      {/* Status Bar */}
      <div className="flex justify-between items-center px-6 pt-3 pb-1">
        <span className="text-xs">9:41</span>
        <div className="flex gap-1 items-center">
          <div className="w-4 h-3 bg-foreground/80 rounded-sm" />
          <div className="w-4 h-3 bg-foreground/60 rounded-sm" />
          <div className="w-4 h-3 bg-foreground/40 rounded-sm" />
        </div>
      </div>

      {/* Header */}
      <div className="px-6 pt-4 pb-6">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-4xl font-serif" style={{ fontFamily: 'Georgia, serif' }}>Fallas 2025</h1>
          <motion.div 
            className="flex items-center gap-1 bg-[#E63946] text-white px-3 py-1 rounded-full"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Flame className="w-3 h-3" />
            <span className="text-xs font-semibold">Live</span>
          </motion.div>
        </div>
        <p className="text-sm text-foreground/60">March 15-19, 2025</p>
      </div>

      {/* Today Section */}
      <div className="px-6 mb-6">
        <h3 className="text-lg mb-3 font-semibold">Today</h3>
        <motion.div 
          className="relative h-48 rounded-3xl overflow-hidden"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1708848462812-8645bf6f264e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXJld29ya3MlMjBuaWdodCUyMGNpdHl8ZW58MXx8fHwxNzY5NDU2NDA1fDA&ixlib=rb-4.1.0&q=80&w=1080)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          
          {/* Glassmorphism overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-5 backdrop-blur-md bg-white/10 border-t border-white/20">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">💥</span>
              <h2 className="text-2xl font-serif text-white" style={{ fontFamily: 'Georgia, serif' }}>Mascletà</h2>
            </div>
            <div className="flex items-center gap-2 text-white/90 text-sm mb-2">
              <Clock className="w-4 h-4" />
              <span>14:00 - Plaza del Ayuntamiento</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-white/70">Starts in</span>
              <span className="text-xl font-mono text-[#FFB800]">{countdown}</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Timeline */}
      <div className="px-6">
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-[#FF6B35]/30" />
          
          {/* Timeline events */}
          {[
            { time: "16:00", title: "Ofrenda de Flores", emoji: "🌺", location: "Plaza de la Virgen" },
            { time: "18:30", title: "Cabalgata del Fuego", emoji: "🔥", location: "Calle Colón" },
            { time: "22:00", title: "Castell de Foc", emoji: "🎆", location: "Jardín del Turia" },
            { time: "01:00", title: "La Cremà", emoji: "🔥", location: "Citywide" }
          ].map((event, i) => (
            <motion.div 
              key={i}
              className="relative flex gap-4 mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              {/* Dot */}
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#FF6B35] flex items-center justify-center text-lg z-10">
                {event.emoji}
              </div>
              
              {/* Card */}
              <div className="flex-1 bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-[#FF6B35]/20 shadow-sm">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-semibold">{event.title}</h4>
                  <span className="text-xs text-foreground/60">{event.time}</span>
                </div>
                <p className="text-sm text-foreground/60">{event.location}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
