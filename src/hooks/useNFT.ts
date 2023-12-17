import { ethers } from 'ethers'
import { useCallback } from 'react'
import { useNetwork } from 'wagmi'
import { ABI_ERC721, ABI_PUBLIC_COLLECTION } from '../abis'
import { ADDRESS_OF_CHAINS, AppError } from '../constants'
import { useConnectorProvider, useRPCProvider } from './useProvider'

type ApproveNFTParams = {
  cltAddress: string
  spenderAddress: string
  tokenId: number
}
export function useApproveSpenderToAccessNft() {
  const provider = useConnectorProvider()

  return useCallback(
    async ({ cltAddress, spenderAddress, tokenId }: ApproveNFTParams) => {
      try {
        if (!provider) {
          throw new Error(AppError.PROVIDER_IS_NOT_VALID)
        }
        const tokenContract = new ethers.Contract(cltAddress, ABI_ERC721, provider.getSigner())
        const transaction: any = await tokenContract.approve(spenderAddress, tokenId)
        const transactionReceipt: any = await transaction.wait()
        console.log('approve receipt:', transactionReceipt)
      } catch (error) {
        throw error
      }
    },
    [provider],
  )
}

type MintNFTParams = {
  cltAddress: string
  addressTo: string
  tokenUri: string
}

export function useMintNFT() {
  const provider = useConnectorProvider()
  const { chain } = useNetwork()
  return useCallback(
    async ({ cltAddress, addressTo, tokenUri }: MintNFTParams) => {
      try {
        if (!provider) {
          throw new Error(AppError.PROVIDER_IS_NOT_VALID)
        }
        const currentChainId = chain?.id

        const currentAbi =
          currentChainId && cltAddress === ADDRESS_OF_CHAINS[currentChainId].PUBLIC_ERC721_TOKEN
            ? ABI_PUBLIC_COLLECTION
            : ABI_ERC721

        const nftContract = new ethers.Contract(cltAddress, currentAbi, provider?.getSigner())
        const transaction = await nftContract.safeMint(addressTo, tokenUri)
        const transactionReceipt: any = await transaction.wait()

        console.log('Mint receipt:', transactionReceipt)
        return transactionReceipt
      } catch (error) {
        throw error
      }
    },
    [provider],
  )
}

type GetTokenURIParams = {
  cltAddress: string
  tokenId: number
}

export function useGetTokenURI() {
  const provider = useRPCProvider()
  return useCallback(
    async ({ cltAddress, tokenId }: GetTokenURIParams) => {
      try {
        if (!provider) {
          throw new Error(AppError.PROVIDER_IS_NOT_VALID)
        }
        const contract = new ethers.Contract(cltAddress, ABI_ERC721, provider)
        const tokenUri: string = await contract.tokenURI(tokenId)
        return tokenUri
      } catch (error) {
        throw error
      }
    },
    [provider],
  )
}

type GetOwnerParams = {
  cltAddress: string
  tokenId: number
}

export function useGetOwnerOfNFT() {
  const provider = useRPCProvider()
  return useCallback(
    async ({ cltAddress, tokenId }: GetOwnerParams) => {
      try {
        if (!provider) {
          throw new Error(AppError.PROVIDER_IS_NOT_VALID)
        }
        const contract = new ethers.Contract(cltAddress, ABI_ERC721, provider)
        const addressOwner = contract.ownerOf(tokenId)
        return addressOwner
      } catch (error) {
        throw error
      }
    },
    [provider],
  )
}

type GetNFTOfCollectionParams = {
  cltAddress: string
}
export type GetNFTsOfCollectionResponse = {
  tokenId: string
  owner: string
}[]
// !!! warning performance
export function useGetNFTsOfCollection() {
  const provider = useRPCProvider()
  return useCallback(
    async ({ cltAddress }: GetNFTOfCollectionParams) => {
      try {
        let listNFT: GetNFTsOfCollectionResponse = []
        if (!provider) {
          throw new Error(AppError.PROVIDER_IS_NOT_VALID)
        }
        const contract = new ethers.Contract(cltAddress, ABI_ERC721, provider)
        let tokenId = 0
        while (true) {
          try {
            const owner = await contract.ownerOf(tokenId)
            listNFT.push({
              owner: owner,
              tokenId: tokenId.toString(),
            })
            tokenId++
          } catch (error) {
            break
          }
        }
        return listNFT
      } catch (error) {
        throw error
      }
    },
    [provider],
  )
}

//  /**
//  * @notice
//  * @param from: address of sender
//  * @param to: address of receiver
//  * @param tokenId: array of tokenId
//  */
type TransferNFTParams = {
  cltAddress: string
  from: string
  to: string
  tokenId: string
}
export function useTransferNFT() {
  const provider = useConnectorProvider()
  return useCallback(
    async ({ cltAddress, from, to, tokenId }: TransferNFTParams) => {
      try {
        if (!provider) {
          throw new Error(AppError.PROVIDER_IS_NOT_VALID)
        }
        const nftContract = new ethers.Contract(cltAddress, ABI_ERC721, provider.getSigner())
        const response = await nftContract.transferFrom(from, to, tokenId)
        return response
      } catch (error) {
        throw error
      }
    },
    [provider],
  )
}

type GetOwnerOfCollectionParams = {
  cltAddress: string
}

export function useGetOwnerOfCollection() {
  const provider = useRPCProvider()
  return useCallback(
    async ({ cltAddress }: GetOwnerOfCollectionParams) => {
      try {
        if (!provider) {
          throw new Error(AppError.PROVIDER_IS_NOT_VALID)
        }
        const contract = new ethers.Contract(cltAddress, ABI_ERC721, provider)
        const addressOwner = contract.owner()
        return addressOwner
      } catch (error) {
        throw error
      }
    },
    [provider],
  )
}

type GetNameOfCollectionParams = {
  cltAddress: string
}

export function useGetNameOfCollection() {
  const provider = useRPCProvider()
  return useCallback(
    async ({ cltAddress }: GetNameOfCollectionParams) => {
      try {
        if (!provider) {
          throw new Error(AppError.PROVIDER_IS_NOT_VALID)
        }
        const contract = new ethers.Contract(cltAddress, ABI_ERC721, provider)
        const addressOwner = contract.name()
        return addressOwner
      } catch (error) {
        throw error
      }
    },
    [provider],
  )
}

type GetTotalSupplyOfCollectionParams = {
  cltAddress: string
}

export function useGetTotalSupplyOfCollection() {
  const provider = useRPCProvider()
  return useCallback(
    async ({ cltAddress }: GetTotalSupplyOfCollectionParams) => {
      try {
        if (!provider) {
          throw new Error(AppError.PROVIDER_IS_NOT_VALID)
        }
        const contract = new ethers.Contract(cltAddress, ABI_ERC721, provider)
        const addressOwner = contract.totalSupply()
        return addressOwner
      } catch (error) {
        throw error
      }
    },
    [provider],
  )
}
