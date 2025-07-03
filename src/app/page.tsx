"use client";

import { StakingProvider } from "../app/context/stakingcontent";
import MainContent from "../app/components/maincontent";

export default function Home() {
  return (
    
      <StakingProvider>
        <div className="p-8 min-h-screen space-y-0 bg-white dark:bg-black">
          <div className="dark:bg-primary-dark bg-white">
            <MainContent />
          </div>
        </div>
      </StakingProvider>
    
  );
}
