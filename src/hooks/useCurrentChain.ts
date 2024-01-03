import { useMemo } from 'react'
import { Chain } from 'viem'
import { useChainId } from 'wagmi'
import { CHAINS, CHAIN_IDS, DEFAULT_CHAIN_ID } from 'src/constants/chains'

const useCurrentChain = () => {
  const chainId = useChainId()

  const currentChainId = useMemo(() => {
    const isSupportedChain = Object.values(CHAIN_IDS).includes(
      chainId as (typeof CHAIN_IDS)[keyof typeof CHAIN_IDS],
    )

    if (isSupportedChain) {
      return chainId
    } else {
      return DEFAULT_CHAIN_ID
    }
  }, [chainId])

  const currentChain = CHAINS.find((chain) => chain.id === currentChainId) as Chain

  return currentChain
}

export default useCurrentChain
