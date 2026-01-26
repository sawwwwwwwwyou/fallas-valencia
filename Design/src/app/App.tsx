import { useState } from "react";
import { PhoneMockup } from "@/app/components/PhoneMockup";
import { EventsFeed } from "@/app/components/EventsFeed";
import { InteractiveMap } from "@/app/components/InteractiveMap";
import { SavedFavorites } from "@/app/components/SavedFavorites";
import { Guide } from "@/app/components/Guide";
import { FloatingTabBar } from "@/app/components/FloatingTabBar";

export default function App() {
  const screens = [
    { component: EventsFeed, title: "Events Feed" },
    { component: InteractiveMap, title: "Interactive Map" },
    { component: SavedFavorites, title: "Saved/Favorites" },
    { component: Guide, title: "Guide" }
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#FF6B35]/20 via-[#FFF8F0] to-[#E63946]/20 py-12 px-8 overflow-x-auto">
      {/* Title */}
      <div className="text-center mb-12">
        <h1 className="text-6xl font-serif mb-3" style={{ fontFamily: 'Georgia, serif' }}>
          Fallas Valencia 2025
        </h1>
        <p className="text-xl text-foreground/60">Premium Festival Guide App</p>
        <div className="mt-4 flex items-center justify-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-white/40">
            <div className="w-3 h-3 rounded-full bg-[#FF6B35]" />
            <span className="text-sm">Valencia Orange</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-white/40">
            <div className="w-3 h-3 rounded-full bg-[#E63946]" />
            <span className="text-sm">Flame Red</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-white/40">
            <div className="w-3 h-3 rounded-full bg-[#FFB800]" />
            <span className="text-sm">Gold</span>
          </div>
        </div>
      </div>

      {/* Screens Display */}
      <div className="flex justify-center gap-8 flex-wrap">
        {screens.map((screen, index) => (
          <div key={index} className="flex flex-col items-center">
            <PhoneMockup>
              <PhoneContent index={index} />
            </PhoneMockup>
            <p className="mt-4 text-lg font-semibold text-foreground/80">{screen.title}</p>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="text-center mt-16 text-foreground/60">
        <p className="text-sm">Designed for iPhone 15 Pro • Glassmorphism • Fire & Art Theme</p>
      </div>
    </div>
  );
}

// Component to render each phone's content with its own state
function PhoneContent({ index }: { index: number }) {
  const [activeTab, setActiveTab] = useState(index);

  const renderScreen = () => {
    switch (activeTab) {
      case 0:
        return <EventsFeed />;
      case 1:
        return <InteractiveMap />;
      case 2:
        return <SavedFavorites />;
      case 3:
        return <Guide />;
      default:
        return <EventsFeed />;
    }
  };

  return (
    <div className="relative w-full h-full">
      {renderScreen()}
      <FloatingTabBar activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
