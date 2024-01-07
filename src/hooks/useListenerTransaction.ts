import { ethers } from 'ethers'
import { useCallback } from 'react'
import { usePublicClient } from 'src/hooks/usePublicClient'
import { Hash } from 'viem'

export const useListenerTransactionHash = () => {
  const publicClient = usePublicClient()

  return useCallback(
    async (txHash: Hash) => {
      try {
        const transaction = await publicClient.waitForTransactionReceipt({
          hash: txHash,
          pollingInterval: 3000,
        })

        return transaction
      } catch (error) {
        console.log(error)
      }
    },
    [publicClient],
  )
}
