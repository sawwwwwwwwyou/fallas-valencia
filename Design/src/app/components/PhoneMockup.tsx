import { ReactNode } from "react";

interface PhoneMockupProps {
  children: ReactNode;
}

export function PhoneMockup({ children }: PhoneMockupProps) {
  return (
    <div className="relative">
      {/* iPhone 15 Pro Frame */}
      <div className="relative w-[393px] h-[852px] bg-[#1f1f1f] rounded-[55px] p-3 shadow-2xl">
        {/* Dynamic Island */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 w-32 h-9 bg-black rounded-[20px] z-50" />
        
        {/* Screen */}
        <div className="relative w-full h-full bg-white rounded-[45px] overflow-hidden">
          {children}
        </div>
      </div>
      
      {/* Power Button */}
      <div className="absolute right-0 top-40 w-1 h-20 bg-[#1f1f1f] rounded-l-sm" />
      
      {/* Volume Buttons */}
      <div className="absolute left-0 top-32 w-1 h-10 bg-[#1f1f1f] rounded-r-sm" />
      <div className="absolute left-0 top-44 w-1 h-10 bg-[#1f1f1f] rounded-r-sm" />
    </div>
  );
}
