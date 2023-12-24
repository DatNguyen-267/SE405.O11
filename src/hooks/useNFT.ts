import { useCallback } from 'react'
import { ABI_ERC721, ABI_PUBLIC_COLLECTION } from 'src/abis'
import { ADDRESS_OF_CHAINS } from 'src/constants'
import { Address, useWalletClient } from 'wagmi'
import { readContract, writeContract } from 'wagmi/actions'
import useCurrentChain from './useCurrentChain'
import { usePublicClient } from './usePublicClient'

type ApproveNFTParams = {
  cltAddress: Address
  spenderAddress: Address
  tokenId: number
}
export function useApproveSpenderToAccessNft() {
  const walletClient = useWalletClient()
  return useCallback(
    async ({ cltAddress, spenderAddress, tokenId }: ApproveNFTParams) => {
      try {
        const transactionReceipt = await writeContract({
          abi: ABI_PUBLIC_COLLECTION,
          address: cltAddress,
          functionName: 'approve',
          args: [spenderAddress, tokenId],
        })

        console.log('approve receipt:', transactionReceipt)

        return transactionReceipt
      } catch (error) {
        throw error
      }
    },
    [walletClient],
  )
}

type MintNFTParams = {
  cltAddress: Address
  addressTo: string
  tokenUri: string
}

export function useMintNFT() {
  const currentChain = useCurrentChain()
  return useCallback(
    async ({ cltAddress, addressTo, tokenUri }: MintNFTParams) => {
      try {
        const currentChainId = currentChain.id

        const currentAbi =
          currentChainId && cltAddress === ADDRESS_OF_CHAINS[currentChainId].PUBLIC_ERC721_TOKEN
            ? ABI_PUBLIC_COLLECTION
            : ABI_ERC721

        const transactionReceipt = await writeContract({
          abi: currentAbi,
          address: cltAddress,
          functionName: 'safeMint',
          args: [addressTo, tokenUri],
        })

        console.log('Mint receipt:', transactionReceipt)
        return transactionReceipt
      } catch (error) {
        throw error
      }
    },
    [currentChain],
  )
}

type GetTokenURIParams = {
  cltAddress: Address
  tokenId: number
}

export function useGetTokenURI() {
  const publicClient = usePublicClient()
  return useCallback(
    async ({ cltAddress, tokenId }: GetTokenURIParams) => {
      try {
        const tokenUri = await publicClient.readContract({
          abi: ABI_ERC721,
          address: cltAddress,
          args: [tokenId],
          functionName: 'tokenURI',
        })

        return tokenUri
      } catch (error) {
        throw error
      }
    },
    [publicClient],
  )
}

type GetOwnerParams = {
  cltAddress: Address
  tokenId: number
}

export function useGetOwnerOfNFT() {
  const publicClient = usePublicClient()
  return useCallback(
    async ({ cltAddress, tokenId }: GetOwnerParams) => {
      try {
        const ownerOf = await publicClient.readContract({
          abi: ABI_ERC721,
          address: cltAddress,
          args: [tokenId],
          functionName: 'ownerOf',
        })
        return ownerOf
      } catch (error) {
        throw error
      }
    },
    [publicClient],
  )
}

type GetNFTOfCollectionParams = {
  cltAddress: Address
}
export type GetNFTsOfCollectionResponse = {
  tokenId: string
  owner: Address
}[]

// !!! warning performance
export function useGetNFTsOfCollection() {
  const publicClient = usePublicClient()
  return useCallback(
    async ({ cltAddress }: GetNFTOfCollectionParams) => {
      try {
        let listNFT: GetNFTsOfCollectionResponse = []

        let tokenId = 0

        while (true) {
          try {
            const ownerAddress = await readContract({
              abi: ABI_ERC721,
              address: cltAddress,
              functionName: 'ownerOf',
            })

            listNFT.push({
              owner: ownerAddress as Address,
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
    [publicClient],
  )
}

type GetOwnerOfCollectionParams = {
  cltAddress: Address
}

export function useGetOwnerOfCollection() {
  const publicClient = usePublicClient()
  return useCallback(
    async ({ cltAddress }: GetOwnerOfCollectionParams) => {
      try {
        const addressOwner = await publicClient.readContract({
          abi: ABI_ERC721,
          address: cltAddress,
          functionName: 'owner',
        })

        return addressOwner
      } catch (error) {
        throw error
      }
    },
    [publicClient],
  )
}

type GetNameOfCollectionParams = {
  cltAddress: Address
}

export function useGetNameOfCollection() {
  const publicClient = usePublicClient()
  return useCallback(
    async ({ cltAddress }: GetNameOfCollectionParams) => {
      try {
        const addressOwner = await publicClient.readContract({
          abi: ABI_PUBLIC_COLLECTION,
          address: cltAddress,
          functionName: 'name',
        })
        return addressOwner
      } catch (error) {
        throw error
      }
    },
    [publicClient],
  )
}

type GetTotalSupplyOfCollectionParams = {
  cltAddress: Address
}

export function useGetTotalSupplyOfCollection() {
  const publicClient = usePublicClient()
  return useCallback(
    async ({ cltAddress }: GetTotalSupplyOfCollectionParams) => {
      try {
        const addressOwner = await publicClient.readContract({
          abi: ABI_PUBLIC_COLLECTION,
          address: cltAddress,
          functionName: 'totalSupply',
        })
        return addressOwner
      } catch (error) {
        throw error
      }
    },
    [publicClient],
  )
}
