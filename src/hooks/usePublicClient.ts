import { useMemo } from 'react'
import { createPublicClient, http } from 'viem'
import useCurrentChain from './useCurrentChain'

export const usePublicClient = () => {
  const currentChain = useCurrentChain()
  const publicClient = useMemo(() => {
    return createPublicClient({
      chain: currentChain,
      transport: http(),
    })
  }, [currentChain])

  return publicClient
}
