import { motion } from "motion/react";
import { Sparkles, Train, UtensilsCrossed, Book, Clock, MapPin, Info, Flame } from "lucide-react";

export function Guide() {
  const guideCards = [
    {
      title: "Pirotecnia",
      subtitle: "Fireworks Guide",
      icon: Sparkles,
      color: "from-[#E63946] to-[#FF6B35]",
      bgColor: "bg-red-50",
      emoji: "🎆"
    },
    {
      title: "Transport",
      subtitle: "Getting Around",
      icon: Train,
      color: "from-emerald-500 to-green-500",
      bgColor: "bg-green-50",
      emoji: "🚇"
    },
    {
      title: "Food",
      subtitle: "Local Cuisine",
      icon: UtensilsCrossed,
      color: "from-[#FF6B35] to-[#FFB800]",
      bgColor: "bg-orange-50",
      emoji: "🥘"
    },
    {
      title: "Glossary",
      subtitle: "Terms & Words",
      icon: Book,
      color: "from-purple-500 to-violet-500",
      bgColor: "bg-purple-50",
      emoji: "📖"
    },
    {
      title: "Schedule",
      subtitle: "Daily Events",
      icon: Clock,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      emoji: "⏰"
    },
    {
      title: "History",
      subtitle: "Fallas Origins",
      icon: Flame,
      color: "from-amber-500 to-yellow-500",
      bgColor: "bg-amber-50",
      emoji: "🔥"
    },
    {
      title: "Map Zones",
      subtitle: "City Districts",
      icon: MapPin,
      color: "from-teal-500 to-emerald-500",
      bgColor: "bg-teal-50",
      emoji: "🗺️"
    },
    {
      title: "Tips & Info",
      subtitle: "Helpful Advice",
      icon: Info,
      color: "from-pink-500 to-rose-500",
      bgColor: "bg-pink-50",
      emoji: "💡"
    }
  ];

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
        <h1 className="text-4xl font-serif mb-2" style={{ fontFamily: 'Georgia, serif' }}>Guía</h1>
        <p className="text-sm text-foreground/60">Everything you need to know about Fallas</p>
      </div>

      {/* Featured Card */}
      <div className="px-6 mb-6">
        <motion.div 
          className="relative h-40 rounded-3xl overflow-hidden"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1515443961218-a51367888e4b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWVsbGElMjBTcGFuaXNoJTIwZm9vZHxlbnwxfHx8fDE3Njk0NTY0MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5 backdrop-blur-md bg-white/10 border-t border-white/20">
            <h2 className="text-xl font-serif text-white mb-1" style={{ fontFamily: 'Georgia, serif' }}>
              Taste of Valencia
            </h2>
            <p className="text-sm text-white/80">Discover traditional Valencian dishes</p>
          </div>
        </motion.div>
      </div>

      {/* Guide Cards Grid */}
      <div className="px-6">
        <h3 className="text-lg mb-4 font-semibold">Topics</h3>
        <div className="grid grid-cols-2 gap-4">
          {guideCards.map((card, index) => (
            <motion.div
              key={index}
              className="relative aspect-square rounded-3xl overflow-hidden cursor-pointer"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Background with gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-90`} />
              
              {/* Glassmorphism overlay */}
              <div className="absolute inset-0 backdrop-blur-sm bg-white/20 border border-white/30" />
              
              {/* Pattern overlay */}
              <div className="absolute inset-0 opacity-10">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id={`pattern-${index}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                      <circle cx="2" cy="2" r="1" fill="white" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill={`url(#pattern-${index})`} />
                </svg>
              </div>

              {/* Content */}
              <div className="relative h-full p-5 flex flex-col">
                {/* Icon/Emoji */}
                <div className="flex-1 flex items-start justify-between">
                  <span className="text-5xl">{card.emoji}</span>
                  <motion.div 
                    className="w-10 h-10 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <card.icon className="w-5 h-5 text-white" />
                  </motion.div>
                </div>

                {/* Text */}
                <div>
                  <h4 className="text-white font-semibold mb-0.5">{card.title}</h4>
                  <p className="text-white/80 text-xs">{card.subtitle}</p>
                </div>
              </div>

              {/* Shine effect */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: '-100%' }}
                animate={{ x: '200%' }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 5,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom spacing */}
      <div className="h-8" />
    </div>
  );
}
