import { motion } from "motion/react";
import { Calendar, Map, Bookmark, Book } from "lucide-react";

interface FloatingTabBarProps {
  activeTab: number;
  onTabChange: (tab: number) => void;
}

export function FloatingTabBar({ activeTab, onTabChange }: FloatingTabBarProps) {
  const tabs = [
    { icon: Calendar, label: "Eventos" },
    { icon: Map, label: "Mapa" },
    { icon: Bookmark, label: "Guardado" },
    { icon: Book, label: "Guía" }
  ];

  return (
    <div className="absolute bottom-4 left-4 right-4 z-50">
      <motion.div 
        className="backdrop-blur-xl bg-white/60 border border-white/40 rounded-[28px] shadow-2xl p-2"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", damping: 20 }}
      >
        <div className="flex items-center justify-around">
          {tabs.map((tab, index) => {
            const isActive = activeTab === index;
            const Icon = tab.icon;
            
            return (
              <motion.button
                key={index}
                className={`relative flex flex-col items-center justify-center py-2 px-4 rounded-[20px] transition-all ${
                  isActive ? 'text-white' : 'text-foreground/60'
                }`}
                onClick={() => onTabChange(index)}
                whileTap={{ scale: 0.95 }}
              >
                {/* Active background */}
                {isActive && (
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-[#FF6B35] to-[#E63946] rounded-[20px]"
                    layoutId="activeTab"
                    transition={{ type: "spring", damping: 20, stiffness: 300 }}
                  />
                )}
                
                {/* Icon */}
                <div className="relative z-10">
                  <Icon className="w-6 h-6 mb-0.5" strokeWidth={isActive ? 2.5 : 2} />
                  <span className="text-[10px] font-medium">{tab.label}</span>
                </div>

                {/* Fire particle effect for active tab */}
                {isActive && (
                  <>
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute top-0 w-1 h-1 bg-[#FFB800] rounded-full"
                        initial={{ 
                          x: 0, 
                          y: 0, 
                          opacity: 1,
                          scale: 1
                        }}
                        animate={{
                          x: [0, (Math.random() - 0.5) * 20],
                          y: [0, -30],
                          opacity: [1, 0],
                          scale: [1, 0.5]
                        }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          delay: i * 0.3,
                          ease: "easeOut"
                        }}
                      />
                    ))}
                  </>
                )}
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
