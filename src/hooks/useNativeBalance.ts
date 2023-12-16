import { ethers } from 'ethers'
import { useAccount, useChainId } from 'wagmi'
import { CHAINS } from '../constants/chains'
import { useRPCProvider } from './useProvider'

export const useNativeBalance = () => {
  const provider = useRPCProvider()

  return provider
}
