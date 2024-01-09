import { useCallback, useState } from 'react'
import { MARKETPLACE_ABI } from 'src/abis'
import { AppError, DEFAULT_ADDRESS } from 'src/constants'
import { AskInfo, CollectionItem, NftItem } from 'src/types'
import { ethers } from 'src/utils'
import { Address, TransactionReceipt } from 'viem'
import { WriteContractResult, prepareWriteContract, writeContract } from 'wagmi/actions'
import useAppAddress from './useAppAddress'
import { useApproveErc20 } from './useErc20'
import { useListenerTransactionHash } from './useListenerTransaction'
import { useApproveSpenderToAccessNft } from './useNFT'
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
          console.log(error)
          throw new Error(AppError.APPROVE_TOKEN_EXCHANGE_FAILED)
        }
        const config = await prepareWriteContract({
          abi: MARKETPLACE_ABI,
          address: marketAddress,
          functionName: 'buyTokenUsingWrapToken',
          args: [collectionAddress, tokenId, ethers.utils.parseEther(price).toString()],
        })
        console.log({ config })
        const buyTxInfo = await writeContract(config)
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
  const [data, setData] = useState<WriteContractResult>()
  const marketAddress = useAppAddress('MARKET')
  const listenerTransactionReceipt = useListenerTransactionHash()

  const mutate = useCallback(
    async ({ cltAddress, tokenId, price }: CreateAskOrderParams) => {
      try {
        setIsLoading(true)
        try {
          console.log({ marketAddress })
          const receiptApprove = await approveSpenderToAccessNft({
            cltAddress,
            spenderAddress: marketAddress,
            tokenId,
          })
          console.log({ receiptApprove })

          const approveReceipt = await listenerTransactionReceipt(receiptApprove.hash)
          console.log({ approveReceipt })
        } catch (error) {
          console.log({ error })
          throw error
        }

        const createAskOrderResponse = await writeContract({
          abi: MARKETPLACE_ABI,
          address: marketAddress,
          functionName: 'createAskOrder',
          args: [cltAddress, tokenId, ethers.utils.parseEther(price).toString()],
        })
        console.log({ createAskOrderResponse })
        const createAskOrderReceipt = await listenerTransactionReceipt(createAskOrderResponse.hash)
        console.log({ createAskOrderReceipt })

        setData(createAskOrderResponse)
      } catch (error) {
        console.log({ error })
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
