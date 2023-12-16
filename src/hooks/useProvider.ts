import { ethers } from 'ethers'
import { useAccount, useChainId } from 'wagmi'
import { CHAINS } from '../constants/chains'

export const useConnectorProvider = () => {
  const { connector } = useAccount()
  const provider = connector?.getProvider()
  return provider
}

export const useRPCProvider = () => {
  const currentChainId = useChainId()
  const targetChain = CHAINS.find((chain) => chain.chainId === currentChainId)

  const provider = targetChain
    ? new ethers.JsonRpcProvider(targetChain.rpcUrl)
    : new ethers.JsonRpcProvider(CHAINS[0].rpcUrl)

  return provider
}
