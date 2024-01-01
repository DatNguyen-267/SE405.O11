import { useCallback } from 'react'
import { writeContract } from 'wagmi/actions'
import useAppAddress from './useAppAddress'
import { usePublicClient } from './usePublicClient'
import { ethers } from 'src/utils'
import { TOKEN_EXCHANGE_ABI } from 'src/abis'

type ApproveTokenExchangeParams = {
  nftAddressGuy: string
  wad: string
}

export function useApproveErc20() {
  const wrapperTokenAddress = useAppAddress('WUIT')

  return useCallback(
    async ({ nftAddressGuy, wad }: ApproveTokenExchangeParams) => {
      try {
        const transactionReceipt = await writeContract({
          abi: TOKEN_EXCHANGE_ABI,
          address: wrapperTokenAddress,
          functionName: 'approve',
          args: [nftAddressGuy, wad],
        })

        return transactionReceipt
      } catch (error) {
        throw error
      }
    },
    [wrapperTokenAddress],
  )
}

type DepositParams = {
  value: string
}

export function useDeposit() {
  const wrapperTokenAddress = useAppAddress('WUIT')

  return useCallback(
    async ({ value }: DepositParams) => {
      try {
        const transactionReceipt = await writeContract({
          abi: TOKEN_EXCHANGE_ABI,
          address: wrapperTokenAddress,
          functionName: 'deposit',
          value: BigInt(ethers.utils.formatEther(value)),
        })

        return transactionReceipt
      } catch (error) {
        throw error
      }
    },
    [wrapperTokenAddress],
  )
}
