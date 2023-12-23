import { ethers } from 'ethers'
import { useCallback } from 'react'
import { TOKEN_EXCHANGE_ABI } from '../abis'
import useAppAddress from './useAppAddress'
import { usePublicClient } from './usePublicClient'
import { useWalletClient } from 'wagmi'
import { writeContract } from 'wagmi/actions'
type ApproveTokenExchangeParams = {
  nftAddressGuy: string
  wad: string
}

export function useApproveErc20() {
  const publicClient = usePublicClient()

  const wrapperTokenAddress = useAppAddress('WUIT')

  return useCallback(
    async ({ nftAddressGuy, wad }: ApproveTokenExchangeParams) => {
      try {
        const transactionReceipt = await publicClient.readContract({
          abi: TOKEN_EXCHANGE_ABI,
          address: wrapperTokenAddress,
          args: [nftAddressGuy, wad],
          functionName: 'approve',
        })

        console.log('approve receipt:', transactionReceipt)

        return transactionReceipt
      } catch (error) {
        throw error
      }
    },
    [publicClient, wrapperTokenAddress],
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

        console.log('deposit receipt:', transactionReceipt)
        return transactionReceipt
      } catch (error) {
        throw error
      }
    },
    [wrapperTokenAddress],
  )
}
