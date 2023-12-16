import { ethers } from 'ethers'
import { useCallback } from 'react'
import { ABI_ERC721 } from '../abis'
import { AppError } from '../constants'
import { useRPCProvider } from './useProvider'

type GetNFTOfAccountParams = {
  cltAddress: string
  ownerAddress: string
}
export async function useGetNFTsOfCollectionByAddress() {
  const provider = useRPCProvider()
  return useCallback(
    async ({ cltAddress, ownerAddress }: GetNFTOfAccountParams) => {
      try {
        let listTokenId: number[] = []
        if (!provider) {
          throw new Error(AppError.PROVIDER_IS_NOT_VALID)
        }
        const contract = new ethers.Contract(cltAddress, ABI_ERC721, provider)
        let tokenId = 0
        while (true) {
          try {
            const token = await contract.ownerOf(tokenId)
            if (token.toLowerCase() === ownerAddress.toLowerCase()) listTokenId.push(tokenId)
            tokenId++
          } catch (error) {
            break
          }
        }
        return listTokenId
      } catch (error) {
        throw error
      }
    },
    [provider],
  )
}
