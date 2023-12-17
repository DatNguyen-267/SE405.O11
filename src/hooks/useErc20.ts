import { ethers } from 'ethers'
import { useCallback } from 'react'
import { TOKEN_EXCHANGE_ABI } from '../abis'
import { AppError } from '../constants'
import { useConnectorProvider } from './useProvider'

type ApproveTokenExchangeParams = {
  nftAddressGuy: string
  tokenExchangeAddress: string
  wad: string
}

export function useApproveErc20() {
  const provider = useConnectorProvider()
  return useCallback(
    async ({ nftAddressGuy, tokenExchangeAddress, wad }: ApproveTokenExchangeParams) => {
      try {
        if (!provider) {
          throw new Error(AppError.PROVIDER_IS_NOT_VALID)
        }
        const tokenContract = new ethers.Contract(
          tokenExchangeAddress,
          TOKEN_EXCHANGE_ABI,
          provider.getSigner(),
        )
        const transaction = await tokenContract.approve(nftAddressGuy, wad)
        const transactionReceipt: any = await transaction.wait()
        console.log('approve receipt:', transactionReceipt)

        return transactionReceipt
      } catch (error) {
        throw error
      }
    },
    [provider],
  )
}

type DepositParams = {
  tokenAddress: string
  value: string
}

export function useDeposit() {
  const provider = useConnectorProvider()
  return useCallback(
    async ({ tokenAddress, value }: DepositParams) => {
      try {
        if (!provider) {
          throw new Error(AppError.PROVIDER_IS_NOT_VALID)
        }
        const tokenContract = new ethers.Contract(
          tokenAddress,
          TOKEN_EXCHANGE_ABI,
          provider.getSigner(),
        )
        const transaction = await tokenContract.deposit({
          value: ethers.parseEther(value),
        })
        const transactionReceipt: any = await transaction.wait()
        console.log('deposit receipt:', transactionReceipt)
        return transactionReceipt
      } catch (error) {
        throw error
      }
    },
    [provider],
  )
}
