"use client";

import { useState } from "react";
import { LockedStake } from "../types/staking";
import { useStaking } from "../context/stakingcontent";
import LoadingSpinner from "../ui/loading";

interface ActiveStakesProps {
  onRedirectToDashboard: () => void;
}

export default function ActiveStakes({ onRedirectToDashboard }: ActiveStakesProps) {
  const { lockedStakes, redeemStake } = useStaking();
  const [redeemingStake, setRedeemingStake] = useState<LockedStake | null>(null);
  const [showRedeemConfirm, setShowRedeemConfirm] = useState(false);
  const [showRedeemComplete, setShowRedeemComplete] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleRedeem = async () => {
    if (!redeemingStake) return;

    try {
      setIsRedeeming(true);
      await redeemStake(redeemingStake.id);
      setShowRedeemConfirm(false);
      setShowRedeemComplete(true);
    } finally {
      setIsRedeeming(false);
    }
  };

  const StakeActions = ({ stake }: { stake: LockedStake }) => {
    const daysLeft = Math.ceil(
      (stake.redemptionDate.getTime() - Date.now()) / (1000 * 3600 * 24)
    );

    return (
      <div className="flex flex-col items-end gap-1 mt-2 sm:mt-0">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setRedeemingStake(stake);
            setShowRedeemConfirm(true);
          }}
          className="px-2 sm:px-3 mt-1 border border-white py-1 bg-zinc-100 dark:bg-[#1E1F21] hover:bg-accent-hover dark:text-white text-black cursor-pointer rounded-lg text-sm flex items-center transition-colors w-full sm:w-auto justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 sm:h-5 sm:w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          <span className="ml-1 sm:ml-2">Redeem</span>
        </button>
        {daysLeft > 0 && (
          <span className="text-xs text-red-500 dark:text-red-400 mt-2 text-right">
            Early redemption penalty: {stake.package.earlyPenalty}%
          </span>
        )}
      </div>
    );
  };

  const RedeemConfirmation = ({ stake }: { stake: LockedStake }) => {
    const daysLeft = Math.ceil(
      (stake.redemptionDate.getTime() - Date.now()) / (1000 * 3600 * 24)
    );
    const penalty = daysLeft > 0 ? stake.amount * (stake.package.earlyPenalty / 100) : 0;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 !mt-0">
        <div className="bg-white dark:bg-black p-6 sm:p-8 rounded-2xl max-w-md w-full space-y-6 shadow-glass border dark:border-white mx-2 sm:mx-0 overflow-y-auto">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
            Confirm Redemption
          </h3>
          <div className="space-y-4">
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
              <p className="text-sm sm:text-base text-yellow-700 dark:text-yellow-300">
                ⚠️ Redemption processing is irreversible. {daysLeft > 0 &&
                  "Early redemption penalties will be deducted from your total amount."}
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-[#1E1F21] p-4 rounded-lg">
              <p className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                {stake.amount} {stake.coin.symbol}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Total Amount
              </p>
            </div>

            <div className="space-y-2 text-sm sm:text-base">
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">
                  Earned Interest
                </span>
                <span className="font-medium text-black dark:text-white">
                  {stake.interest} {stake.coin.symbol}
                </span>
              </div>
              {daysLeft > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">
                    Early Penalty
                  </span>
                  <span className="font-medium text-red-600">
                    {penalty.toFixed(4)} {stake.coin.symbol}
                  </span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-start gap-3">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="h-4 w-4 text-accent border-gray-300 rounded focus:ring-accent mt-1 flex-shrink-0"
                disabled={isRedeeming}
              />
              <span className="text-sm text-gray-600 dark:text-gray-300 flex-1">
                I agree to the{" "}
                <span className="text-accent hover:underline cursor-pointer text-blue-400">
                  Cryptofleet Terms of Service
                </span>
              </span>
            </div>
          </div>

          <div className="flex gap-4 flex-wrap sm:flex-nowrap">
            <button
              onClick={() => setShowRedeemConfirm(false)}
              className="flex-1 py-3 bg-gray-100 dark:bg-[#1E1F21] border cursor-pointer border-transparent hover:border-black dark:hover:border-white text-gray-700 dark:text-gray-300 rounded-lg transition-colors min-w-[120px]"
              disabled={isRedeeming}
            >
              Cancel
              </button>
              <button
                onClick={handleRedeem}
                disabled={!agreed || isRedeeming}
                className="flex-1 py-3 bg-gradient-to-r from-[#ffffff] to-[#429DFA] dark:bg-gradient-to-r dark:from-[#000000] dark:to-[#429DFA] border border-transparent bg-clip-padding disabled:cursor-not-allowed cursor-pointer hover:enabled:from-[#ffffff] hover:enabled:to-[#3B8FF5] dark:hover:enabled:from-[#111111] dark:hover:enabled:to-[#3B8FF5] dark:hover:enabled:border-white disabled:opacity-50 text-black dark:text-white rounded-lg transition-all duration-300 min-w-[120px] flex items-center justify-center gap-2"
              >
                {isRedeeming ? (
                  <>
                    <LoadingSpinner className="h-4 w-4 text-white" />
                    Processing...
                  </>
                ) : (
                  "Confirm"
                )}
              </button>
          </div>
        </div>
      </div>
    );
  };

  const RedeemComplete = ({ stake }: { stake: LockedStake }) => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 !mt-0">
      <div className="bg-white dark:bg-black border dark:border-white p-6 sm:p-8 rounded-2xl max-w-md w-full text-center space-y-6 shadow-glass">
        <div className="mx-auto h-14 w-14 sm:h-16 sm:w-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
          <svg
            className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 dark:text-green-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
          Redemption Complete
        </h3>
        <div className="space-y-4">
          <div className="bg-gray-50 dark:bg-[#1E1F21] p-4 rounded-lg">
            <p className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
              {stake.amount} {stake.coin.symbol}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Redeemed Amount
            </p>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 px-2 sm:px-0">
            Funds will be available in your wallet within 2-3 business days
          </p>
        </div>
        <button
          onClick={async () => {
            setIsRedirecting(true);
            await new Promise(resolve => setTimeout(resolve, 50));
            onRedirectToDashboard();
          }}
          className="w-full py-3 bg-gradient-to-r from-[#ffffff] to-[#429DFA] dark:bg-gradient-to-r dark:from-[#000000] dark:to-[#429DFA] border border-transparent bg-clip-padding text-black dark:text-white rounded-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer hover:from-[#ffffff] hover:to-[#3B8FF5] dark:hover:from-[#111111] dark:hover:to-[#3B8FF5]  dark:hover:border-white"
          disabled={isRedirecting}>
          {isRedirecting ? (
            <>
              <LoadingSpinner className="h-4 w-4 text-black dark:text-white" />
              Redirecting...
            </>
          ) : (
            "Back to Dashboard"
          )}
        </button>
      </div>
    </div>
  );

  return (
    <>
      <div className="mt-4 sm:mt-6">
        <div className="grid grid-cols-1 gap-3 sm:gap-4">
          {lockedStakes.map((stake) => (
            <div
              key={stake.id}
              className="bg-white dark:bg-[#1E1F21] p-4 sm:p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700/50"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                <div className="flex items-center gap-3 sm:gap-4">
                  <img
                    src={stake.coin.logo}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-100 p-1.5"
                    alt={stake.coin.symbol}
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white text-base sm:text-lg">
                      {stake.amount} {stake.coin.symbol}
                    </h3>
                    <p className="text-gray-500 text-sm sm:text-base">
                      {stake.package.title} Plan
                    </p>
                  </div>
                </div>
                <div className="text-right w-full sm:w-auto">
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    Redeem by
                  </p>
                  <p className="font-medium text-green-600 text-sm sm:text-base">
                    {new Date(stake.redemptionDate).toLocaleDateString()}
                  </p>
                  <StakeActions stake={stake} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showRedeemConfirm && redeemingStake && (
        <RedeemConfirmation stake={redeemingStake} />
      )}
      {showRedeemComplete && redeemingStake && (
        <RedeemComplete stake={redeemingStake} />
      )}
    </>
  );
}