import { useCallback, useState } from 'react'
import { ABI_ERC721, ABI_PUBLIC_COLLECTION, MARKETPLACE_ABI } from 'src/abis'
import { ADDRESS_OF_CHAINS, AppError, DEFAULT_ADDRESS } from 'src/constants'
import { createMetadata } from 'src/services/createIPFS'
import { AskInfo, CollectionItem, NftItem, NftItemDefault } from 'src/types'
import { ethers } from 'src/utils'
import { Address, TransactionReceipt } from 'viem'
import { useWalletClient } from 'wagmi'
import {
  WriteContractResult,
  multicall,
  prepareWriteContract,
  readContract,
  writeContract,
} from 'wagmi/actions'
import useAppAddress from './useAppAddress'
import useCurrentChain from './useCurrentChain'
import { useApproveErc20 } from './useErc20'
import { useListenerTransactionHash } from './useListenerTransaction'
import { usePublicClient } from './usePublicClient'

export type CollectionDetail = {
  creatorAddress: string
  status: number
  creatorFee: number
  tradingFee: number
  whitelistChecker: string
}

export type ViewMarketCollectionsResponse = {
  collectionDetails: CollectionDetail[]
  collectionAddresses: string[]
}

export type ViewMarketCollectionParams = {
  marketAddress: Address
  cursor?: number
  size?: number
}
/*
 * @notice View addresses and details for all the collections available for trading
 * @param cursor: cursor
 * @param size: size of the response
 */

export function useViewMarketCollections() {
  const publicClient = usePublicClient()
  const [isLoading, setIsLoading] = useState(false)

  const [data, setData] = useState<CollectionItem[]>()

  const mutate = useCallback(
    async ({
      marketAddress,
      cursor = 0,
      size = 10,
    }: ViewMarketCollectionParams): Promise<CollectionItem[]> => {
      try {
        setIsLoading(() => true)
        const collectionsResponse: any = await publicClient.readContract({
          abi: MARKETPLACE_ABI,
          address: marketAddress,
          functionName: 'viewCollections',
          args: [cursor, size],
        })

        const collectionDetails = collectionsResponse[1].map(
          (collectionDetail: any, index: number) => {
            return {
              status: collectionDetail.status,
              creatorAddress: collectionDetail.creatorAddress,
              whitelistChecker: collectionDetail.whitelistChecker,
              tradingFee: Number(BigInt(collectionDetail.tradingFee).toString(10)) / 100,
              creatorFee: Number(BigInt(collectionDetail.creatorFee).toString(10)) / 100,
              collectionAddress: collectionsResponse[0][index],
            }
          },
        )

        setData(collectionDetails)
        setIsLoading(false)
        return collectionDetails
      } catch (error) {
        setIsLoading(false)
        setData(undefined)
        throw error
      }
    },
    [publicClient],
  )

  return {
    isLoading,
    data,
    mutate,
  }
}

export type TokenIds = BigInt[]
export type AskInfoRaw = { seller: string; price: BigInt }[]
export type AsksResponse = [TokenIds, AskInfoRaw, BigInt]

/**
 * @notice View ask orders for a given collection and a seller
 * @param collection: address of the collection
 * @param seller: address of the seller
 * @param cursor: cursor
 * @param size: size of the response
 */

export function useViewAsksByCollectionAndSellerAddress() {
  const publicClient = usePublicClient()
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<AskInfo[]>()

  const mutate = useCallback(
    async ({
      marketAddress,
      collectionAddress,
      sellerAddress,
      cursor = 0,
      size = 10,
    }: {
      marketAddress: Address
      collectionAddress: Address
      sellerAddress: Address
      cursor?: number
      size?: number
    }): Promise<AskInfo[]> => {
      try {
        setIsLoading(true)
        const asksResponse = (await publicClient.readContract({
          abi: MARKETPLACE_ABI,
          address: marketAddress,
          functionName: 'viewAsksByCollectionAndSeller',
          args: [collectionAddress, sellerAddress, cursor, size],
        })) as AsksResponse

        let asksInfo: AskInfo[] = asksResponse[0].map((tokenId) => {
          return {
            tokenId: tokenId.toString(10),
            collectionAddress: collectionAddress,
            price: '',
            seller: '' as Address,
            size: Number(asksResponse[2].toString(10)),
          }
        })
        asksInfo = asksResponse[1].map((askInfo, index) => {
          return {
            ...asksInfo[index],
            price: ethers.utils.formatEther(askInfo['price'].toString(10)),
            seller: askInfo['seller'] as Address,
          }
        })

        setData(asksInfo)
        setIsLoading(false)
        return asksInfo
      } catch (error) {
        setIsLoading(false)
        setData(undefined)
        throw error
      }
    },
    [publicClient],
  )

  return { mutate, data, isLoading }
}

/**
 * @notice View ask orders for a given collection
 * @param collection: address of the collection
 * @param cursor: cursor
 * @param size: size of the response
 * @dev This function is used for the marketplace page
 *
 */
type ViewAsksByCollectionParams = {
  marketAddress: Address
  collectionAddress: Address
  cursor: number
  size: number
}

export const mappingAsksToNftList = (asksResponse: AskInfo[], nfts: NftItem[]) => {
  let flattenAsks: NftItem[] = []
  asksResponse.forEach((ask, index) => {
    flattenAsks.push({
      collectionAddress: ask.collectionAddress,
      tokenId: Number(ask.tokenId),
      price: ask.price,
      seller: ask.seller,
      status: 'Sale',
      title: '',
      description: '',
      tokenUri: '',
      owner: ask.seller,
      imageUri: '',
      imageGatewayUrl: '',
    })
  })

  return [...flattenAsks, ...nfts]
}

export function useViewAsksByCollection() {
  const publicClient = usePublicClient()
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<AskInfo[]>()

  const mutate = useCallback(
    async ({
      marketAddress,
      collectionAddress,
      cursor = 0,
      size = 10,
    }: ViewAsksByCollectionParams): Promise<AskInfo[]> => {
      try {
        setIsLoading(true)
        const asksResponse = (await publicClient.readContract({
          abi: MARKETPLACE_ABI,
          address: marketAddress,
          functionName: 'viewAsksByCollection',
          args: [collectionAddress, cursor, size],
        })) as AsksResponse

        let asksInfo: AskInfo[] = asksResponse[0].map((tokenId) => {
          return {
            tokenId: tokenId.toString(10),
            collectionAddress: collectionAddress,
            price: '',
            seller: '' as Address,
            size: Number(asksResponse[2].toString(10)),
          }
        })
        asksInfo = asksResponse[1].map((askInfo, index) => {
          return {
            ...asksInfo[index],
            price: ethers.utils.formatEther(askInfo['price'].toString(10)),
            seller: askInfo['seller'] as Address,
          }
        })

        setData(asksInfo)
        setIsLoading(false)
        return asksInfo
      } catch (error) {
        setIsLoading(false)
        setData(undefined)
        throw error
      }
    },
    [publicClient],
  )

  return { mutate, data, isLoading }
}

/**
 * @notice Check ask for an array of tokenId in a collection
 * @param collection: address of the collection
 * @param tokenId: array of tokenId
 */

type ViewAskByCollectionAndTokenIdParams = {
  marketAddress: Address
  collectionAddress: Address
  tokenId: string
}

export function useViewAskByCollectionAndTokenId() {
  const publicClient = usePublicClient()

  return useCallback(
    async ({ marketAddress, collectionAddress, tokenId }: ViewAskByCollectionAndTokenIdParams) => {
      try {
        const response = await publicClient.readContract({
          abi: MARKETPLACE_ABI,
          address: marketAddress,
          functionName: 'viewAskByCollectionAndTokenId',
          args: [collectionAddress, tokenId],
        })

        return response
      } catch (error) {
        throw error
      }
    },
    [publicClient],
  )
}

/**
 * @notice Check ask for an array of tokenId in a collection
 * @param collection: address of the collection
 * @param tokenId: array of tokenId
 */
type ViewAskByCollectionAndTokenIdsParams = {
  marketAddress: Address
  collectionAddress: Address
  tokenIds: string[]
}

export function useViewAskByCollectionAndTokenIds() {
  const publicClient = usePublicClient()

  return useCallback(
    async ({
      marketAddress,
      collectionAddress,
      tokenIds,
    }: ViewAskByCollectionAndTokenIdsParams) => {
      try {
        const response = await publicClient.readContract({
          abi: MARKETPLACE_ABI,
          address: marketAddress,
          functionName: 'viewAskByCollectionAndTokenIds',
          args: [collectionAddress, tokenIds],
        })

        return response
      } catch (error) {
        throw error
      }
    },
    [publicClient],
  )
}

/**
 * @notice Buy token with WUIT by matching the price of an existing ask order
 * @param _collection: contract address of the NFT
 * @param _tokenId: tokenId of the NFT purchased
 * @param _price: price (must be equal to the askPrice set by the seller) unit Ethers
 */

type BuyNFTUsingWrapTokenParams = {
  collectionAddress: Address
  tokenId: number
  price: string
}

export function useBuyNFTUsingWrapToken() {
  const approveTokenExchange = useApproveErc20()
  const listenerTransactionReceipt = useListenerTransactionHash()

  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<TransactionReceipt>()

  const marketAddress = useAppAddress('MARKET')
  const wrapTokenAddress = useAppAddress('WUIT')

  const mutate = useCallback(
    async ({ collectionAddress, tokenId, price }: BuyNFTUsingWrapTokenParams) => {
      try {
        setIsLoading(true)
        try {
          const writeApprove = await approveTokenExchange({
            nftAddressGuy: marketAddress,
            wad: ethers.utils.parseEther(price).toString(),
          })
          console.log({ writeApprove })
        } catch (error) {
          throw new Error(AppError.APPROVE_TOKEN_EXCHANGE_FAILED)
        }
        const config = await prepareWriteContract({
          abi: MARKETPLACE_ABI,
          address: marketAddress,
          functionName: 'buyTokenUsingWrapToken',
          args: [collectionAddress, tokenId, ethers.utils.parseEther(price).toString()],
        })
        const buyTxInfo = await writeContract(config)
        console.log({ buyTxInfo })

        const buyReceipt = await listenerTransactionReceipt(buyTxInfo.hash)

        console.log({ buyReceipt })

        setData(buyReceipt)

        return buyReceipt
      } catch (error) {
        setData(undefined)
        throw error
      } finally {
        setIsLoading(false)
      }
    },
    [
      approveTokenExchange,
      marketAddress,
      setData,
      setIsLoading,
      listenerTransactionReceipt,
      writeContract,
      wrapTokenAddress,
    ],
  )

  return {
    data,
    isLoading,
    mutate,
  }
}

/**
 * @notice Create ask order
 * @param _collection: contract address of the NFT
 * @param _tokenId: tokenId of the NFT
 * @param _askPrice: price for listing (in wei)
 */

type CreateAskOrderParams = {
  cltAddress: Address
  tokenId: number
  price: string
}

export function useCreateAskOrder() {
  const approveSpenderToAccessNft = useApproveSpenderToAccessNft()
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<TransactionReceipt>()
  const marketAddress = useAppAddress('MARKET')
  const listenerTransactionReceipt = useListenerTransactionHash()

  const mutate = useCallback(
    async ({ cltAddress, tokenId, price }: CreateAskOrderParams) => {
      try {
        setIsLoading(true)
        try {
          const receiptApprove = await approveSpenderToAccessNft({
            cltAddress,
            spenderAddress: marketAddress,
            tokenId,
          })

          const approveReceipt = await listenerTransactionReceipt(receiptApprove.hash)
        } catch (error) {
          throw error
        }

        const createAskOrderResponse = await writeContract({
          abi: MARKETPLACE_ABI,
          address: marketAddress,
          functionName: 'createAskOrder',
          args: [cltAddress, tokenId, ethers.utils.parseEther(price).toString()],
        })
        const createAskOrderReceipt = await listenerTransactionReceipt(createAskOrderResponse.hash)

        setData(createAskOrderReceipt)
      } catch (error) {
        setData(undefined)
        throw error
      } finally {
        setIsLoading(false)
      }
    },
    [
      approveSpenderToAccessNft,
      marketAddress,
      setData,
      setIsLoading,
      listenerTransactionReceipt,
      writeContract,
    ],
  )

  return {
    data,
    isLoading,
    mutate,
  }
}
/**
 * @notice Add a new collection
 * @param _collection: collection address
 * @param _creator: creator address (must be 0x00 if none)
 * @param _whitelistChecker: whitelist checker (for additional restrictions, must be 0x00 if none)
 * @param _tradingFee: trading fee (100 = 1%, 500 = 5%, 5 = 0.05%)
 * @param _creatorFee: creator fee (100 = 1%, 500 = 5%, 5 = 0.05%, 0 if creator is 0x00)
 * @dev Callable by admin
 */

type ImportCollectionParams = {
  cltAddress: Address
  creatorAddress: Address
  tradingFee: number
  creatorFee: number
  whiteListChecker: Address
}

export function useImportCollection() {
  const marketAddress = useAppAddress('MARKET')

  const [data, setData] = useState<TransactionReceipt>()
  const [isLoading, setIsLoading] = useState(false)
  const listenerTransactionReceipt = useListenerTransactionHash()
  const mutate = useCallback(
    async ({
      cltAddress,
      creatorAddress,
      tradingFee = 100,
      creatorFee = 100,
      whiteListChecker = DEFAULT_ADDRESS,
    }: ImportCollectionParams) => {
      try {
        setIsLoading(true)

        const txInfo = await writeContract({
          abi: MARKETPLACE_ABI,
          address: marketAddress,
          functionName: 'addCollection',
          args: [cltAddress, creatorAddress, whiteListChecker, tradingFee, creatorFee],
        })

        const txReceipt = await listenerTransactionReceipt(txInfo.hash)
        return txReceipt
      } catch (error) {
        throw error
      } finally {
        setIsLoading(false)
      }
    },
    [marketAddress, listenerTransactionReceipt, writeContract],
  )

  return {
    mutate,
    isLoading,
    data,
  }
}

/**
 * @notice Cancel existing ask order
 * @param _collection: contract address of the NFT
 * @param _tokenId: tokenId of the NFT
 */

type CancelAskOrderParams = {
  collectionAddress: Address
  tokenId: number
}

export function useCancelAskOrder() {
  const marketAddress = useAppAddress('MARKET')
  const [data, setData] = useState<TransactionReceipt>()
  const [isLoading, setIsLoading] = useState(false)
  const listenerTransactionReceipt = useListenerTransactionHash()

  const mutate = useCallback(
    async ({ collectionAddress, tokenId }: CancelAskOrderParams) => {
      setIsLoading(true)
      try {
        const txInfo = await writeContract({
          abi: MARKETPLACE_ABI,
          address: marketAddress,
          functionName: 'cancelAskOrder',
          args: [collectionAddress, tokenId],
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
    [marketAddress, setIsLoading, setData, listenerTransactionReceipt, writeContract],
  )

  return { mutate, isLoading, data }
}

export function useViewAllAsk() {
  const publicClient = usePublicClient()
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<AskInfo[]>()
  const { mutate: getAllCollectionOfMarket } = useViewMarketCollections()
  const { mutate: getAskByCollection } = useViewAsksByCollection()

  const marketAddress = useAppAddress('MARKET')
  const mutate = useCallback(async (): Promise<AskInfo[]> => {
    try {
      setIsLoading(true)
      const listCollection = await getAllCollectionOfMarket({
        marketAddress: marketAddress,
        cursor: 0,
        size: 20,
      })

      const asks = await Promise.all(
        listCollection.map(async (collection) => {
          const nfts = await getAskByCollection({
            collectionAddress: collection.collectionAddress,
            marketAddress: marketAddress,
            cursor: 0,
            size: 20,
          })
          return nfts
        }),
      )
      const res = asks.flat(1)

      setData(res)
      setIsLoading(false)
      return res
    } catch (error) {
      setIsLoading(false)
      setData(undefined)
      throw error
    }
  }, [
    publicClient,
    marketAddress,
    getAskByCollection,
    getAllCollectionOfMarket,
    setIsLoading,
    setData,
  ])

  return { mutate, data, isLoading }
}

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

export function usePinIPFSAndMintNFT() {
  const handleMintNFT = useMintNFT()
  const handleGetOwnerCollection = useGetOwnerOfCollection()

  return useCallback(
    async ({
      cltAddress,
      addressTo,
      metadata,
    }: {
      cltAddress: Address
      addressTo: Address
      metadata: {
        file: any
        title: string
        description: string
      }
    }) => {
      const { file, title, description } = metadata

      try {
        const owner = await handleGetOwnerCollection({ cltAddress: cltAddress })
        if ((owner as string).toLowerCase() !== addressTo.toLowerCase()) {
          throw new Error('You are not owner of collection')
        }

        const tokenUri = await createMetadata(file, title, description)
      } catch (error) {
        throw error
      }
    },
    [handleMintNFT, handleGetOwnerCollection],
  )
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
    [publicClient, setData],
  )

  return { mutate, data }
}

export function useGetNftsOfAddress() {
  const publicClient = usePublicClient()
  const { mutate: getAllCollectionOfMarket } = useViewMarketCollections()
  const { mutate: getAllNFTsOfCollectionOfOwnerAddress } = useGetNFTsOfCollectionOfOwnerAddress()
  const { mutate: getAskOfAddress } = useViewAsksByCollectionAndSellerAddress()

  const marketAddress = useAppAddress('MARKET')
  const [data, setData] = useState<NftItem[]>()
  const [isLoading, setLoading] = useState(false)

  const mutate = useCallback(
    async ({ ownerAddress }: { ownerAddress: Address }) => {
      setLoading(true)
      try {
        const listCollection = await getAllCollectionOfMarket({
          marketAddress: marketAddress,
          cursor: 0,
          size: 20,
        })

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

        const allNfts = await Promise.all(
          listCollection.map(async (collection) => {
            const nfts = await getAllNFTsOfCollectionOfOwnerAddress({
              cltAddress: collection.collectionAddress,
              ownerAddress: ownerAddress,
            })
            return nfts
          }),
        )

        const res = mappingAsksToNftList(asks.flat(1), allNfts.flat(1))
        setData(res)
      } catch (error) {
        setLoading(false)
        setData(undefined)
        throw error
      }
    },
    [
      publicClient,
      marketAddress,
      setData,
      setLoading,
      getAllCollectionOfMarket,
      getAllNFTsOfCollectionOfOwnerAddress,
      getAskOfAddress,
    ],
  )

  return { mutate, data, isLoading }
}
