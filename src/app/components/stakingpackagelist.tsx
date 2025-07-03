"use client";

import { Coin, StakingPackage } from "../types/staking";
import LoadingSpinner from "../ui/loading";

interface StakingPackagesListProps {
  stakingPackage: StakingPackage[];
  sortBy: "high" | "low";
  selectedDurations: Record<string, number | null>;
  processingPackageId: string | null;
  onSortChange: (sortBy: "high" | "low") => void;
  onDurationSelect: (pkgId: string, duration: number) => void;
  onPackageSelect: (pkg: StakingPackage) => void;
}

export default function StakingPackagesList({
  stakingPackage,
  sortBy,
  selectedDurations,
  processingPackageId,
  onSortChange,
  onDurationSelect,
  onPackageSelect,
}: StakingPackagesListProps) {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Available Staking Packages</h1>
        <div className="flex gap-3">
          <div className="bg-gray-100 dark:bg-black p-1 rounded-full">
            <button
              onClick={() => onSortChange("high")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                sortBy === "high"
                  ? "bg-[#1E1F21] dark:bg-[#1E1F21] text-white"
                  : "text-gray-600 dark:bg-[#1E1F21] dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-black"
              }`}
            >
              High APY
            </button>
            <button
              onClick={() => onSortChange("low")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                sortBy === "low"
                  ? "bg-[#1E1F21] dark:bg-[#1E1F21] text-white"
                  : "text-gray-600 dark:bg-[#1E1F21] dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-black"
              }`}
            >
              Low APY
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 dark:bg-black">
        {stakingPackage
          .sort((a, b) => (sortBy === "high" ? b.apy - a.apy : a.apy - b.apy))
          .map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white dark:bg-black p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700/50 
                         transition-transform duration-300 hover:scale-[1.02]"
            >
              <div className="space-y-6">
                <div className="flex items-center gap-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                  <img
                    src={pkg.coin.logo}
                    alt={pkg.coin.symbol}
                    className="w-12 h-12 rounded-full bg-gray-100 p-1.5"
                  />
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{pkg.title}</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{pkg.coin.name}</p>
                  </div>
                </div>

                <div className=" p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">APY</span>
                    <span className="text-2xl font-bold text-black dark:text-white">{pkg.apy}%</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-2">
                    {pkg.durations.map((duration) => (
                      <button
                        key={duration}
                        onClick={() => onDurationSelect(pkg.id, duration)}
                        className={`text-sm font-medium py-2 rounded-lg transition-colors cursor-pointer border ${
                          selectedDurations[pkg.id] === duration
                            ? "border-black dark:border-white bg-gray-100 dark:bg-[#1E1F21]"
                            : "border-transparent bg-gray-100 dark:bg-[#1E1F21] hover:border-black dark:hover:border-white"
                        } text-gray-600 dark:text-gray-300`}
                      >
                        {duration}d
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => onPackageSelect(pkg)}
                    disabled={!selectedDurations[pkg.id] || processingPackageId === pkg.id}
                    className="w-full py-3 bg-gradient-to-r from-[#ffffff] to-[#429DFA] dark:bg-gradient-to-r dark:from-[#000000] dark:to-[#429DFA] disabled:opacity-50 disabled:cursor-not-allowed text-black dark:text-white font-medium rounded-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer border-2 border-transparent bg-clip-padding hover:enabled:from-[#ffffff] hover:enabled:to-[#3B8FF5] dark:hover:enabled:from-[#000000] dark:hover:enabled:to-[#3B8FF5]"
                  >
                    {processingPackageId === pkg.id ? (
                      <>
                        <LoadingSpinner className="text-white" />
                        Processing...
                      </>
                    ) : (
                      "Stake Now"
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}