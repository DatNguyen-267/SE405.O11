import { useCallback, useState } from 'react'
import { TOKEN_EXCHANGE_ABI } from 'src/abis'
import { ethers } from 'src/utils'
import { TransactionReceipt } from 'viem'
import { writeContract } from 'wagmi/actions'
import useAppAddress from './useAppAddress'
import { useListenerTransactionHash } from './useListenerTransaction'

type ApproveTokenExchangeParams = {
  nftAddressGuy: string
  wad: string
}

export function useApproveErc20() {
  const wrapperTokenAddress = useAppAddress('WUIT')
  const listenerTransactionReceipt = useListenerTransactionHash()

  return useCallback(
    async ({ nftAddressGuy, wad }: ApproveTokenExchangeParams) => {
      try {
        const writeApprove = await writeContract({
          abi: TOKEN_EXCHANGE_ABI,
          address: wrapperTokenAddress,
          functionName: 'approve',
          args: [nftAddressGuy, wad],
        })
        const approveReceipt = await listenerTransactionReceipt(writeApprove.hash)
        console.log({ approveReceipt })
        return approveReceipt
      } catch (error) {
        console.log(error)
        throw error
      }
    },
    [wrapperTokenAddress, listenerTransactionReceipt, writeContract],
  )
}

type DepositParams = {
  value: string
}

export function useDeposit() {
  const wrapperTokenAddress = useAppAddress('WUIT')
  const listenerTransactionReceipt = useListenerTransactionHash()
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<TransactionReceipt>()

  const mutate = useCallback(
    async ({ value }: DepositParams) => {
      try {
        setIsLoading(true)
        const txInfo = await writeContract({
          abi: TOKEN_EXCHANGE_ABI,
          address: wrapperTokenAddress,
          functionName: 'deposit',
          value: BigInt(value),
        })
        const txReceipt = await listenerTransactionReceipt(txInfo.hash)
        setData(txReceipt)
        return txReceipt
      } catch (error) {
        setData(undefined)
        throw error
      } finally {
        setIsLoading(false)
      }
    },
    [wrapperTokenAddress, listenerTransactionReceipt, writeContract],
  )

  return {
    mutate,
    isLoading,
    data,
  }
}
