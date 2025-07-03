"use client";

import { useState } from "react";
import StakingInterface from "./stakinginterface";
import ActiveStakes from "./activestakes";
import { useStaking } from "../context/stakingcontent";
import Header from "./header";

export default function MainContent() {
  const [activeTab, setActiveTab] = useState<"stake" | "active">("stake");
  const { lockedStakes } = useStaking();

  return (
    <div className="px-4 sm:px-6 lg:px-8 bg-white dark:bg-black">
      <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
        <div className="flex items-center gap-4 sm:gap-6">
          <Header />
        </div>
      </div>

      {/* Balance Section */}
      <div className="bg-gradient-to-r from-[#ffffff] to-[#429DFA] dark:bg-gradient-to-r dark:from-[#000000] dark:to-[#429DFA] rounded-2xl p-6 sm:p-8 mb-6 text-black dark:text-white">
        <h2 className="text-xl sm:text-2xl mb-2">Total Staked Balance</h2>
        <p className="text-3xl sm:text-4xl font-bold">$42,560.00</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-8">
        <StatCard title="APY" value="5.6%" change="+0.2%" />
        <StatCard title="Total Rewards" value="$2,450" change="+12.4%" />
        <StatCard title="Active Stakes" value="4" change="+1" />
      </div>

      {/* Tabs Navigation */}
      <div className="flex gap-4 border-b dark:border-gray-700 pb-4 mb-8">
        <button
          onClick={() => setActiveTab("stake")}
          className={`px-4 py-2 font-medium cursor-pointer ${activeTab === "stake"
            ? "border-b-2 border-black dark:border-white text-black dark:text-white"
            : "text-black dark:text-gray-400 "
            }`}
        >
          Stake Assets
        </button>
        <button
          onClick={() => setActiveTab("active")}
          className={`px-4 py-2 font-medium cursor-pointer ${activeTab === "active"
            ? "border-b-2 border-black dark:border-white text-black dark:text-white"
            : "text-black dark:text-gray-400 "
            }`}
        >
          Active Stakes
        </button>
      </div>

      {/* Content Section */}
      <div className="space-y-8">
        {activeTab === "stake" ? (
          <StakingInterface />
        ) : (
          // Modified section: Add conditional rendering
          lockedStakes.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                No active stakes, stake packages to see active stakes
              </p>
            </div>
          ) : (
            <ActiveStakes onRedirectToDashboard={() => setActiveTab("stake")} />
          )
        )}
      </div>
    </div>
  );
}

function StatCard({ title, value, change }: { title: string; value: string; change: string }) {
  return (
    <div className="dark:bg-secondary-dark p-4 sm:p-6 rounded-xl">
      <h4 className="dark:text-gray-400 text-gray-600 text-xs sm:text-sm mb-2">{title}</h4>
      <div className="flex items-baseline gap-2 sm:gap-3">
        <p className="text-lg sm:text-2xl dark:text-white text-black font-bold">{value}</p>
        <span className="text-green-400 text-xs sm:text-sm">{change}</span>
      </div>
    </div>
  );
}