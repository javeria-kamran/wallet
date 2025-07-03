"use client";

import { LockedStake } from "../types/staking";

interface ConfirmationModalProps {
  stake: LockedStake;
  onClose: () => void;
}

export default function ConfirmationModal({ stake, onClose }: ConfirmationModalProps) {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center p-4 !mt-0">
      <div className="bg-white dark:bg-black border border-white p-8 rounded-2xl max-w-md w-full shadow-glass">
        <div className="text-center space-y-6">
          <div className="mx-auto h-16 w-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
            <svg className="h-8 w-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Staking Confirmed</h3>
          <div className="space-y-4">
            <div className="bg-gray-50 dark:bg-[#1E1F21] p-4 rounded-lg">
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {stake.amount} {stake.coin.symbol}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Staked</p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-left">
                <p className="text-gray-500 dark:text-gray-400">Lock Date</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {new Date(stake.lockDate).toLocaleDateString()}
                </p>
              </div>
              <div className="text-left">
                <p className="text-gray-500 dark:text-gray-400">Redemption Date</p>
                <p className="font-medium text-accent">
                  {new Date(stake.redemptionDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-full py-3 bg-gradient-to-r from-[#ffffff] to-[#429DFA] dark:bg-gradient-to-r dark:from-[#000000] dark:to-[#429DFA] border-2 border-transparent bg-clip-padding text-black dark:text-white font-medium rounded-lg transition-all duration-300 cursor-pointer hover:from-[#ffffff] hover:to-[#3B8FF5] dark:hover:from-[#111111] dark:hover:to-[#3B8FF5] dark:hover:border-white">
            Continue Staking
          </button>
        </div>
      </div>
    </div>
  );
}