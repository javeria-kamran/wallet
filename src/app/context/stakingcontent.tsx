"use client"

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { StakingPackage, LockedStake, Coin } from '../types/staking'

type StakingContextType = {
  lockedStakes: LockedStake[]
  stakeTokens: (amount: number, pkg: StakingPackage, duration: number) => Promise<LockedStake>
  redeemStake: (stakeId: string) => Promise<void>
  selectedPackage: StakingPackage | null
  setSelectedPackage: (pkg: StakingPackage | null) => void
  isStaking: boolean
  isRedeeming: boolean
}

const StakingContext = createContext<StakingContextType>({
  lockedStakes: [],
  stakeTokens: async () => ({
    id: '',
    amount: 0,
    lockDate: new Date(),
    redemptionDate: new Date(),
    interest: 0,
    coin: {} as Coin,
    package: {} as StakingPackage
  }),
  redeemStake: async () => { },
  selectedPackage: null,
  setSelectedPackage: () => { },
  isStaking: false,
  isRedeeming: false
})

export function StakingProvider({ children }: { children: ReactNode }) {
  const [lockedStakes, setLockedStakes] = useState<LockedStake[]>([])
  const [selectedPackage, setSelectedPackage] = useState<StakingPackage | null>(null)
  const [isStaking, setIsStaking] = useState(false)
  const [isRedeeming, setIsRedeeming] = useState(false)

  const stakeTokens = useCallback(async (amount: number, pkg: StakingPackage, duration: number) => {
    setIsStaking(true)
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))

      const newStake: LockedStake = {
        id: Math.random().toString(36).substr(2, 9),
        amount,
        lockDate: new Date(),
        redemptionDate: new Date(Date.now() + duration * 24 * 60 * 60 * 1000),
        interest: amount * (pkg.apy / 100) * (duration / 365),
        coin: pkg.coin,
        package: pkg
      }
      setLockedStakes(prev => [...prev, newStake])
      return newStake
    } finally {
      setIsStaking(false)
    }
  }, [])

  const redeemStake = useCallback(async (stakeId: string) => {
    setIsRedeeming(true)
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      setLockedStakes(prev => prev.filter(stake => stake.id !== stakeId))
    } finally {
      setIsRedeeming(false)
    }
  }, [])

  return (
    <StakingContext.Provider value={{
      lockedStakes,
      stakeTokens,
      redeemStake,
      selectedPackage,
      setSelectedPackage,
      isStaking,
      isRedeeming
    }}>
      {children}
    </StakingContext.Provider>
  )
}

export const useStaking = () => useContext(StakingContext)