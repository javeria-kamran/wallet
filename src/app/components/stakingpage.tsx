"use client";

import { StakingPackage, LockedStake } from "../types/staking";
import StakingForm from "./stakingform";
import { useRouter } from "next/navigation";

interface StakingFormPageProps {
  selectedPackage: StakingPackage;
  selectedDuration: number;
  onStakeSubmit: (amount: number) => Promise<void>;
  onBack: () => void;
  isLoading: boolean;
}

export default function StakingFormPage({
  selectedPackage,
  selectedDuration,
  onStakeSubmit,
  onBack,
  isLoading,
}: StakingFormPageProps) {
  return (
    <div className="space-y-8">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Packages
      </button>

      <StakingForm
        stakingPackage={selectedPackage}
        duration={selectedDuration}
        onCloseAction={onBack}
        onSubmitAction={onStakeSubmit}
        isLoading={isLoading}
      />
    </div>
  );
}