import { useCallback, useState } from 'react'
import { ABI_ERC721, ABI_PUBLIC_COLLECTION } from 'src/abis'
import { ADDRESS_OF_CHAINS } from 'src/constants'
import { Address, useWalletClient } from 'wagmi'
import { multicall, readContract, writeContract } from 'wagmi/actions'
import useCurrentChain from './useCurrentChain'
import { usePublicClient } from './usePublicClient'
import { NftItem, NftItemDefault } from 'src/types'
import {
  mappingAsksToNftList,
  useViewAsksByCollectionAndSellerAddress,
  useViewMarketCollections,
} from './useMarket'
import useAppAddress from './useAppAddress'

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
type GetTokenURIsParams = {
  listToken: GetTokenURIParams[]
}
export function useGetTokenURIs() {
  const publicClient = usePublicClient()
  const mutate = useCallback(
    async ({ listToken }: GetTokenURIsParams) => {
      try {
        let contracts: any = []
        listToken.forEach((element) => {
          contracts.push({
            abi: ABI_PUBLIC_COLLECTION,
            address: element.cltAddress,
            args: [element.tokenId],
            functionName: 'tokenURI',
          })
        })

        const data = await multicall({
          contracts: contracts,
        })

        console.log({ data })
        return data
      } catch (error) {
        throw error
      }
    },
    [publicClient],
  )

  return { mutate }
}

export function useGetTokenURI() {
  const publicClient = usePublicClient()

  const mutate = useCallback(
    async ({ cltAddress, tokenId }: GetTokenURIParams) => {
      try {
        const tokenUri = await publicClient.readContract({
          abi: ABI_ERC721,
          address: cltAddress,
          args: [tokenId],
          functionName: 'tokenURI',
        })
        console.log({ tokenUri })

        return tokenUri as string
      } catch (error) {
        throw error
      }
    },
    [publicClient],
  )

  return { mutate }
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
  collectionAddress: Address
}[]

export function useGetNFTsOfCollection() {
  const publicClient = usePublicClient()

  const [data, setData] = useState<NftItem[] | undefined>(undefined)

  const mutate = useCallback(
    async ({ cltAddress }: GetNFTOfCollectionParams) => {
      try {
        let listNFT: NftItem[] = []
        let tokenId = 0
        while (true) {
          try {
            const ownerAddress = await readContract({
              abi: ABI_ERC721,
              address: cltAddress,
              functionName: 'ownerOf',
              args: [tokenId],
            })

            listNFT.push({
              ...NftItemDefault,
              collectionAddress: cltAddress,
              owner: ownerAddress as Address,
              seller: ownerAddress as Address,
              tokenId: tokenId,
              status: 'NotForSale',
            })

            tokenId++
          } catch (error) {
            break
          }
        }
        setData(listNFT)
        return listNFT
      } catch (error) {
        setData([])
        throw error
      }
    },
    [publicClient],
  )

  return { mutate, data }
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

  const mutate = useCallback(
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

  return { mutate }
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
export function useGetNFTsOfCollectionOfOwnerAddress() {
  const publicClient = usePublicClient()

  const [data, setData] = useState<NftItem[] | undefined>(undefined)

  const mutate = useCallback(
    async ({ cltAddress, ownerAddress }: { cltAddress: Address; ownerAddress: Address }) => {
      try {
        let listNFT: NftItem[] = []
        let tokenId = 0
        while (true) {
          try {
            const ownerOfNft = await readContract({
              abi: ABI_ERC721,
              address: cltAddress,
              functionName: 'ownerOf',
              args: [tokenId],
            })

            if (ownerAddress.toLowerCase() === (ownerOfNft as string).toLowerCase()) {
              listNFT.push({
                ...NftItemDefault,
                collectionAddress: cltAddress,
                owner: ownerAddress as Address,
                tokenId: tokenId,
                status: 'NotForSale',
              })
            }

            tokenId++
          } catch (error) {
            break
          }
        }
        setData(listNFT)
        return listNFT
      } catch (error) {
        setData([])
        throw error
      }
    },
    [publicClient],
  )

  return { mutate, data }
}

export function useGetNftsOfAddress() {
  const publicClient = usePublicClient()
  const { mutate: getAllCollecntionOfMarket } = useViewMarketCollections()
  const { mutate: getAllNFTsOfCollectionOfOwnerAddress } = useGetNFTsOfCollectionOfOwnerAddress()
  const { mutate: getAskOfAddress } = useViewAsksByCollectionAndSellerAddress()
  const marketAddress = useAppAddress('MARKET')
  const [data, setData] = useState<NftItem[]>([])

  const mutate = useCallback(
    async ({ ownerAddress }: { ownerAddress: Address }) => {
      try {
        const listCollection = await getAllCollecntionOfMarket({
          marketAddress: marketAddress,
          cursor: 0,
          size: 20,
        })
        console.log({ listCollection: JSON.stringify(listCollection, undefined, 4) })

        const asks = await Promise.all(
          listCollection.map(async (collection) => {
            const nfts = await getAskOfAddress({
              collectionAddress: collection.collectionAddress,
              marketAddress: marketAddress,
              sellerAddress: ownerAddress,
              cursor: 0,
              size: 20,
            })
            return nfts
          }),
        )

        console.log({ asks: JSON.stringify(asks.flat(1), undefined, 4) })

        const allNfts = await Promise.all(
          listCollection.map(async (collection) => {
            const nfts = await getAllNFTsOfCollectionOfOwnerAddress({
              cltAddress: collection.collectionAddress,
              ownerAddress: ownerAddress,
            })
            return nfts
          }),
        )
        console.log({ allNfts: JSON.stringify(allNfts.flat(1), undefined, 4) })

        const res = mappingAsksToNftList(asks.flat(1), allNfts.flat(1))

        console.log({ res: JSON.stringify(res, undefined, 4) })
        console.log({ res: res })
      } catch (error) {
        setData([])
        throw error
      }
    },
    [publicClient],
  )

  return { mutate, data }
}
