import { ethers } from 'ethers'
import { useAccount, useChainId } from 'wagmi'
import { CHAINS } from '../constants/chains'
import { useWeb3ModalState } from '@web3modal/wagmi-react-native'

export const useConnectorProvider = async () => {
  const { connector } = useAccount()

  console.debug({ connector })

  const provider = await connector?.getProvider()
  return provider
}

export const useRPCProvider = () => {
  const { selectedNetworkId } = useWeb3ModalState()

  console.debug({ selectedNetworkId })

  const targetChain = CHAINS.find((chain) => chain.chainId === selectedNetworkId)

  const provider = targetChain
    ? new ethers.JsonRpcProvider(targetChain.rpcUrl)
    : new ethers.JsonRpcProvider(CHAINS[0].rpcUrl)

  return provider
}
