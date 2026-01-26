import { motion } from "motion/react";
import { Check, MapPin, Star } from "lucide-react";
import { useState } from "react";

export function SavedFavorites() {
  const [visited, setVisited] = useState<number[]>([0, 2]);

  const savedItems = [
    { 
      name: "Falla Plaza del Ayuntamiento",
      district: "Centro",
      category: "Especial",
      image: "https://images.unsplash.com/photo-1647693680958-e2bd830cdbfb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxWYWxlbmNpYSUyMEZhbGxhcyUyMGZlc3RpdmFsfGVufDF8fHx8MTc2OTQ1NjQwNHww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    { 
      name: "Falla Convento Jerusalén",
      district: "Ruzafa",
      category: "Especial",
      image: "https://images.unsplash.com/photo-1760121002397-70751ea3c113?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxTcGFuaXNoJTIwZmVzdGl2YWwlMjBtb251bWVudHxlbnwxfHx8fDE3Njk0NTY0MDV8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    { 
      name: "Falla Sueca-Literato Azorín",
      district: "Russafa",
      category: "Primera A",
      image: "https://images.unsplash.com/photo-1671639045782-93f73d559236?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxWYWxlbmNpYSUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3Njk0NTY0MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    { 
      name: "Falla Cuba-Literato Azorín",
      district: "Benimaclet",
      category: "Primera A",
      image: "https://images.unsplash.com/photo-1744103228491-e98529ca0388?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMFNwYW5pc2glMjBhcnR8ZW58MXx8fHwxNzY5NDU2NDA2fDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
  ];

  const totalFallas = 50;
  const visitedCount = visited.length;
  const progress = (visitedCount / totalFallas) * 100;

  const toggleVisited = (index: number) => {
    if (visited.includes(index)) {
      setVisited(visited.filter(i => i !== index));
    } else {
      setVisited([...visited, index]);
    }
  };

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
      <div className="px-6 pt-4 pb-2">
        <h1 className="text-4xl font-serif mb-2" style={{ fontFamily: 'Georgia, serif' }}>Guardado</h1>
        <p className="text-sm text-foreground/60">Your personal festival journey</p>
      </div>

      {/* Progress Section */}
      <div className="px-6 py-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-5 border border-[#FF6B35]/20 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm text-foreground/60 mb-1">Progress</p>
              <p className="text-2xl">
                <span className="font-semibold text-[#FF6B35]">{visitedCount}</span>
                <span className="text-foreground/40">/{totalFallas}</span>
                <span className="text-sm text-foreground/60 ml-2">Fallas Visited</span>
              </p>
            </div>
            <div className="text-4xl">🔥</div>
          </div>
          <div className="h-3 bg-[#FFF8F0] rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-[#FF6B35] to-[#E63946] rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>

      {/* Saved Items List */}
      <div className="px-6">
        <h3 className="text-lg mb-3 font-semibold">Saved Fallas</h3>
        <div className="space-y-4">
          {savedItems.map((item, index) => {
            const isVisited = visited.includes(index);
            return (
              <motion.div
                key={index}
                className={`bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden border shadow-sm transition-all ${
                  isVisited 
                    ? 'border-[#FFB800] opacity-70' 
                    : 'border-[#FF6B35]/20'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex gap-4 p-4 relative">
                  {/* Image */}
                  <div 
                    className="w-24 h-24 rounded-2xl bg-cover bg-center flex-shrink-0 relative"
                    style={{ backgroundImage: `url(${item.image})` }}
                  >
                    {isVisited && (
                      <div className="absolute inset-0 bg-black/40 rounded-2xl flex items-center justify-center">
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          className="w-10 h-10 bg-[#FFB800] rounded-full flex items-center justify-center"
                        >
                          <Check className="w-6 h-6 text-white" strokeWidth={3} />
                        </motion.div>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <h4 className="font-semibold text-base leading-tight">{item.name}</h4>
                      {item.category === "Especial" && (
                        <Star className="w-5 h-5 text-[#FFB800] flex-shrink-0 ml-2" fill="#FFB800" />
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-foreground/60 mb-1">
                      <MapPin className="w-3 h-3" />
                      <span>{item.district}</span>
                    </div>
                    <span className="inline-block text-xs px-2 py-0.5 rounded-full bg-[#FF6B35]/10 text-[#FF6B35]">
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Action Button */}
                <div className="px-4 pb-4">
                  <motion.button
                    className={`w-full py-2.5 rounded-2xl transition-all ${
                      isVisited
                        ? 'bg-[#FFB800] text-white'
                        : 'bg-[#FF6B35] text-white'
                    }`}
                    onClick={() => toggleVisited(index)}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isVisited ? (
                      <div className="flex items-center justify-center gap-2">
                        <Check className="w-4 h-4" />
                        <span>Visited</span>
                      </div>
                    ) : (
                      'Mark as Visited'
                    )}
                  </motion.button>
                </div>

                {/* Burnt stamp for visited items */}
                {isVisited && (
                  <motion.div 
                    className="absolute top-4 right-4 transform rotate-12"
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 12 }}
                  >
                    <div className="px-3 py-1 border-2 border-[#FFB800] rounded-lg">
                      <span className="text-xs font-bold text-[#FFB800]">BURNT</span>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
