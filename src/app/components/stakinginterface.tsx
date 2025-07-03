// "use client";

// import { useState, useCallback } from "react";
// import { useStaking } from "../context/stakingcontent";
// import { StakingPackage, Coin, LockedStake } from "../types/staking";
// import StakingForm from "./stakingform";
// import LoadingSpinner from "../ui/loading";

// const coins: Coin[] = [
//   { symbol: "ETH", name: "ETH", logo: "/eth-logo.png", apy: 5.6 },
//   { symbol: "BTC", name: "BTC", logo: "/btc-logo.jpg", apy: 7.2 },
//   { symbol: "BNB", name: "BNB", logo: "/bnb-logo.png", apy: 9.8 },
//   { symbol: "SOL", name: "SOL", logo: "/sol-logo.png", apy: 12.5 },
//   { symbol: "DOT", name: "DOT", logo: "/dot-logo.png", apy: 15.0 },
//   { symbol: "AVAX", name: "AVAX", logo: "/avax-logo.svg", apy: 18.2 },
// ];

// const stakingPackage: StakingPackage[] = [
//   {
//     id: "starter",
//     title: "Ethereum",
//     durations: [30, 60, 90],
//     apy: 5.6,
//     minAmount: 0.1,
//     maxAmount: 10,
//     earlyPenalty: 2,
//     authorizedRate: 4.5,
//     coin: coins[0],
//     duration: 0,
//   },
//   {
//     id: "growth",
//     title: "Bitcoin",
//     durations: [30, 60, 90],
//     apy: 7.2,
//     minAmount: 1,
//     maxAmount: 50,
//     earlyPenalty: 3,
//     authorizedRate: 6.0,
//     coin: coins[1],
//     duration: 0,
//   },
//   {
//     id: "premium",
//     title: "Binance Coin",
//     durations: [30, 60, 90],
//     apy: 9.8,
//     minAmount: 5,
//     maxAmount: 100,
//     earlyPenalty: 5,
//     authorizedRate: 8.5,
//     coin: coins[2],
//     duration: 0,
//   },
//   {
//     id: "vip",
//     title: "Solana",
//     durations: [30, 60, 90],
//     apy: 12.5,
//     minAmount: 10,
//     maxAmount: 500,
//     earlyPenalty: 7,
//     authorizedRate: 10.0,
//     coin: coins[3],
//     duration: 0,
//   },
//   {
//     id: "institutional",
//     title: "Polkadot",
//     durations: [30, 60, 90],
//     apy: 15.0,
//     minAmount: 100,
//     maxAmount: 10000,
//     earlyPenalty: 10,
//     authorizedRate: 12.5,
//     coin: coins[4],
//     duration: 0,
//   },
//   {
//     id: "validator",
//     title: "Avalanche",
//     durations: [30, 60, 90],
//     apy: 18.2,
//     minAmount: 500,
//     maxAmount: 50000,
//     earlyPenalty: 15,
//     authorizedRate: 15.0,
//     coin: coins[5],
//     duration: 0,
//   },
// ];

// export default function StakingInterface() {
//   const { stakeTokens } = useStaking();
//   const [selectedPackage, setSelectedPackage] = useState<StakingPackage | null>(null);
//   const [selectedDurations, setSelectedDurations] = useState<Record<string, number | null>>({});
//   const [showStakeForm, setShowStakeForm] = useState(false);
//   const [showConfirmation, setShowConfirmation] = useState(false);
//   const [sortBy, setSortBy] = useState<"high" | "low">("high");
//   const [currentStake, setCurrentStake] = useState<LockedStake | null>(null);
//   const [processingPackageId, setProcessingPackageId] = useState<string | null>(null);

//   const handleDurationSelect = useCallback((pkgId: string, duration: number) => {
//     setSelectedDurations((prev) => ({ ...prev, [pkgId]: duration }));
//   }, []);

//   const handleStakeSubmit = async (amount: number) => {
//     if (!selectedPackage) return;

//     setProcessingPackageId(selectedPackage.id);
//     try {
//       const stake = await stakeTokens(
//         amount,
//         selectedPackage,
//         selectedDurations[selectedPackage.id]!
//       );
//       setCurrentStake(stake);
//       setShowConfirmation(true);
//       setShowStakeForm(false);
//     } finally {
//       setProcessingPackageId(null);
//     }
//   };

//   const ConfirmationModal = ({ stake }: { stake: LockedStake }) => (
//     <div className="fixed inset-0 bg-black flex items-center justify-center p-4 !mt-0">
//       <div className="bg-white dark:bg-black border border-white p-8 rounded-2xl max-w-md w-full shadow-glass">
//         <div className="text-center space-y-6">
//           <div className="mx-auto h-16 w-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
//             <svg className="h-8 w-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//             </svg>
//           </div>
//           <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Staking Confirmed</h3>
//           <div className="space-y-4">
//             <div className="bg-gray-50 dark:bg-[#1E1F21] p-4 rounded-lg">
//               <p className="text-2xl font-semibold text-gray-900 dark:text-white">
//                 {stake.amount} {stake.coin.symbol}
//               </p>
//               <p className="text-sm text-gray-500 dark:text-gray-400">Total Staked</p>
//             </div>
//             <div className="grid grid-cols-2 gap-4 text-sm">
//               <div className="text-left">
//                 <p className="text-gray-500 dark:text-gray-400">Lock Date</p>
//                 <p className="font-medium text-gray-900 dark:text-white">
//                   {new Date(stake.lockDate).toLocaleDateString()}
//                 </p>
//               </div>
//               <div className="text-left">
//                 <p className="text-gray-500 dark:text-gray-400">Redemption Date</p>
//                 <p className="font-medium text-accent">
//                   {new Date(stake.redemptionDate).toLocaleDateString()}
//                 </p>
//               </div>
//             </div>
//           </div>
//           <button
//             onClick={() => setShowConfirmation(false)}
//             className="w-full py-3 bg-gradient-to-r from-[#ffffff] to-[#429DFA] dark:bg-gradient-to-r dark:from-[#000000] dark:to-[#429DFA] border-2 border-transparent bg-clip-padding text-black dark:text-white font-medium rounded-lg transition-all duration-300 cursor-pointer hover:from-[#ffffff] hover:to-[#3B8FF5] dark:hover:from-[#111111] dark:hover:to-[#3B8FF5] dark:hover:border-white">
//             Continue Staking
//           </button>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="space-y-8">
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//         <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Available Staking Packages</h1>
//         <div className="flex gap-3">
//           <div className="bg-gray-100 dark:bg-black p-1 rounded-full">
//             <button
//               onClick={() => setSortBy("high")}
//               className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${sortBy === "high"
//                 ? "bg-[#1E1F21] dark:bg-[#1E1F21] text-white"
//                 : "text-gray-600 dark:bg-[#1E1F21] dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-black"
//                 }`}
//             >
//               High APY
//             </button>
//             <button
//               onClick={() => setSortBy("low")}
//               className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${sortBy === "low"
//                 ? "bg-[#1E1F21] dark:bg-[#1E1F21] text-white"
//                 : "text-gray-600 dark:bg-[#1E1F21] dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-black"
//                 }`}
//             >
//               Low APY
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 dark:bg-black">
//         {stakingPackage
//           .sort((a, b) => (sortBy === "high" ? b.apy - a.apy : a.apy - b.apy))
//           .map((pkg) => (
//             <div
//               key={pkg.id}
//               className="bg-white dark:bg-black p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700/50 
//                          transition-transform duration-300 hover:scale-[1.02]"
//             >
//               <div className="space-y-6">
//                 <div className="flex items-center gap-4 pb-4 border-b border-gray-200 dark:border-gray-700">
//                   <img
//                     src={pkg.coin.logo}
//                     alt={pkg.coin.symbol}
//                     className="w-12 h-12 rounded-full bg-gray-100 p-1.5"
//                   />
//                   <div>
//                     <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{pkg.title}</h2>
//                     <p className="text-sm text-gray-600 dark:text-gray-400">{pkg.coin.name}</p>
//                   </div>
//                 </div>

//                 <div className=" p-4 rounded-lg">
//                   <div className="flex justify-between items-center">
//                     <span className="text-sm font-medium text-gray-600 dark:text-gray-300">APY</span>
//                     <span className="text-2xl font-bold text-black dark:text-white">{pkg.apy}%</span>
//                   </div>
//                 </div>

//                 <div className="space-y-4">
//                   <div className="grid grid-cols-3 gap-2">
//                     {pkg.durations.map((duration) => (
//                       <button
//                         key={duration}
//                         onClick={() => handleDurationSelect(pkg.id, duration)}
//                         className={`text-sm font-medium py-2 rounded-lg transition-colors cursor-pointer border ${selectedDurations[pkg.id] === duration
//                             ? "border-black dark:border-white bg-gray-100 dark:bg-[#1E1F21]"
//                             : "border-transparent bg-gray-100 dark:bg-[#1E1F21] hover:border-black dark:hover:border-white"
//                           } text-gray-600 dark:text-gray-300`}
//                       >
//                         {duration}d
//                       </button>
//                     ))}
//                   </div>

//                   <button
//                     onClick={() => {
//                       setSelectedPackage(pkg);
//                       setShowStakeForm(true);
//                     }}
//                     disabled={!selectedDurations[pkg.id] || processingPackageId === pkg.id}
//                     className="w-full py-3 bg-gradient-to-r from-[#ffffff] to-[#429DFA] dark:bg-gradient-to-r dark:from-[#000000] dark:to-[#429DFA] disabled:opacity-50 disabled:cursor-not-allowed text-black dark:text-white font-medium rounded-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer border-2 border-transparent bg-clip-padding hover:enabled:from-[#ffffff] hover:enabled:to-[#3B8FF5] dark:hover:enabled:from-[#000000] dark:hover:enabled:to-[#3B8FF5]"
//                   >
//                     {processingPackageId === pkg.id ? (
//                       <>
//                         <LoadingSpinner className="text-white" />
//                         Processing...
//                       </>
//                     ) : (
//                       "Stake Now"
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//       </div>

//       {showStakeForm && selectedPackage && selectedDurations[selectedPackage.id] && (
//         <StakingForm
//           stakingPackage={selectedPackage}
//           duration={selectedDurations[selectedPackage.id]!}
//           onCloseAction={() => setShowStakeForm(false)}
//           onSubmitAction={handleStakeSubmit}
//           isLoading={processingPackageId === selectedPackage.id}
//         />
//       )}

//       {showConfirmation && currentStake && <ConfirmationModal stake={currentStake} />}
//     </div>
//   );
// }

"use client";

import { useState, useCallback } from "react";
import { useStaking } from "../context/stakingcontent";
import { StakingPackage, Coin, LockedStake } from "../types/staking";
import StakingPackagesList from "./stakingpackagelist";
import StakingFormPage from "./stakingpage";
import ConfirmationModal from "./confirmationmodal"; // You'll need to extract this too

const coins: Coin[] = [
  { symbol: "ETH", name: "ETH", logo: "/eth-logo.png", apy: 5.6 },
  { symbol: "BTC", name: "BTC", logo: "/btc-logo.jpg", apy: 7.2 },
  { symbol: "BNB", name: "BNB", logo: "/bnb-logo.png", apy: 9.8 },
  { symbol: "SOL", name: "SOL", logo: "/sol-logo.png", apy: 12.5 },
  { symbol: "DOT", name: "DOT", logo: "/dot-logo.png", apy: 15.0 },
  { symbol: "AVAX", name: "AVAX", logo: "/avax-logo.svg", apy: 18.2 },
];

const stakingPackage: StakingPackage[] = [
  {
    id: "starter",
    title: "Ethereum",
    durations: [30, 60, 90],
    apy: 5.6,
    minAmount: 0.1,
    maxAmount: 10,
    earlyPenalty: 2,
    authorizedRate: 4.5,
    coin: coins[0],
    duration: 0,
  },
  {
    id: "growth",
    title: "Bitcoin",
    durations: [30, 60, 90],
    apy: 7.2,
    minAmount: 1,
    maxAmount: 50,
    earlyPenalty: 3,
    authorizedRate: 6.0,
    coin: coins[1],
    duration: 0,
  },
  {
    id: "premium",
    title: "Binance Coin",
    durations: [30, 60, 90],
    apy: 9.8,
    minAmount: 5,
    maxAmount: 100,
    earlyPenalty: 5,
    authorizedRate: 8.5,
    coin: coins[2],
    duration: 0,
  },
  {
    id: "vip",
    title: "Solana",
    durations: [30, 60, 90],
    apy: 12.5,
    minAmount: 10,
    maxAmount: 500,
    earlyPenalty: 7,
    authorizedRate: 10.0,
    coin: coins[3],
    duration: 0,
  },
  {
    id: "institutional",
    title: "Polkadot",
    durations: [30, 60, 90],
    apy: 15.0,
    minAmount: 100,
    maxAmount: 10000,
    earlyPenalty: 10,
    authorizedRate: 12.5,
    coin: coins[4],
    duration: 0,
  },
  {
    id: "validator",
    title: "Avalanche",
    durations: [30, 60, 90],
    apy: 18.2,
    minAmount: 500,
    maxAmount: 50000,
    earlyPenalty: 15,
    authorizedRate: 15.0,
    coin: coins[5],
    duration: 0,
  },
];


export default function StakingInterface() {
  const { stakeTokens } = useStaking();
  const [selectedPackage, setSelectedPackage] = useState<StakingPackage | null>(null);
  const [selectedDurations, setSelectedDurations] = useState<Record<string, number | null>>({});
  const [currentPage, setCurrentPage] = useState<"list" | "form">("list");
  const [sortBy, setSortBy] = useState<"high" | "low">("high");
  const [currentStake, setCurrentStake] = useState<LockedStake | null>(null);
  const [processingPackageId, setProcessingPackageId] = useState<string | null>(null);

  const handleDurationSelect = useCallback((pkgId: string, duration: number) => {
    setSelectedDurations((prev) => ({ ...prev, [pkgId]: duration }));
  }, []);

  const handlePackageSelect = (pkg: StakingPackage) => {
    setSelectedPackage(pkg);
    setCurrentPage("form");
  };

  const handleBackToList = () => {
    setCurrentPage("list");
  };

  const handleStakeSubmit = async (amount: number) => {
    if (!selectedPackage) return;

    setProcessingPackageId(selectedPackage.id);
    try {
      const stake = await stakeTokens(
        amount,
        selectedPackage,
        selectedDurations[selectedPackage.id]!
      );
      setCurrentStake(stake);
      setCurrentPage("list"); // Return to list after successful stake
    } finally {
      setProcessingPackageId(null);
    }
  };

  return (
    <div className="space-y-8">
      {currentPage === "list" ? (
        <StakingPackagesList
          stakingPackage={stakingPackage}
          sortBy={sortBy}
          selectedDurations={selectedDurations}
          processingPackageId={processingPackageId}
          onSortChange={setSortBy}
          onDurationSelect={handleDurationSelect}
          onPackageSelect={handlePackageSelect}
        />
      ) : selectedPackage && selectedDurations[selectedPackage.id] ? (
        <StakingFormPage
          selectedPackage={selectedPackage}
          selectedDuration={selectedDurations[selectedPackage.id]!}
          onStakeSubmit={handleStakeSubmit}
          onBack={handleBackToList}
          isLoading={processingPackageId === selectedPackage.id}
        />
      ) : null}

      {/* You should also extract the ConfirmationModal to a separate component */}
      {currentStake && (
        <ConfirmationModal 
          stake={currentStake} 
          onClose={() => setCurrentStake(null)} 
        />
      )}
    </div>
  );
}