export interface StakingPackage {
  id: string
  title: string
  durations: number[]
  apy: number
  minAmount: number
  maxAmount: number
  earlyPenalty: number
  authorizedRate: number
  coin: Coin
  duration: number
}

export interface Coin {
  symbol: string
  name: string
  logo: string
  apy: number
}

export interface LockedStake {
  id: string
  amount: number
  lockDate: Date
  redemptionDate: Date
  interest: number
  coin: Coin
  package: StakingPackage
}