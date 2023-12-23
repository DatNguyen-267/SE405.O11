import { ethers } from 'ethers'
import { useCallback } from 'react'
import { Address } from 'viem'
import { writeContract } from 'wagmi/actions'
import { MARKETPLACE_ABI } from '../abis'
import { AppError, DEFAULT_ADDRESS } from '../constants'
import { useApproveErc20 } from './useErc20'
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

type ViewMarketCollectionParams = {
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

  return useCallback(
    async ({ marketAddress, cursor = 0, size = 10 }: ViewMarketCollectionParams) => {
      try {
        const collectionsResponse: any = await publicClient.readContract({
          abi: MARKETPLACE_ABI,
          address: marketAddress,
          functionName: 'viewCollections',
          args: [cursor, size],
        })

        const collectionDetails = collectionsResponse['collectionDetails'].map(
          (collectionDetail: any) => {
            return {
              status: collectionDetail[0],
              creatorAddress: collectionDetail[1],
              whitelistChecker: collectionDetail[2],
              tradingFee: Number(BigInt(collectionDetail[3]).toString()) / 100,
              creatorFee: Number(BigInt(collectionDetail[4]).toString()) / 100,
            }
          },
        )

        const collectionAddresses = collectionsResponse['collectionAddresses']
        return {
          collectionDetails,
          collectionAddresses,
        }
      } catch (error) {
        throw error
      }
    },
    [publicClient],
  )
}

export type AskInfo = {
  price: BigInt
  seller: string
}
export type TokenIds = BigInt[]
export type AskInfoRaw = [string, BigInt][]
export type ViewAsksByCollectionAndSellerRaw = [TokenIds, AskInfoRaw, BigInt]
export type ViewAsksByCollectionAndSellerResponse = {
  askInfo: AskInfo[]
  tokenIds: TokenIds
  size: BigInt
}[]
/**
 * @notice View ask orders for a given collection and a seller
 * @param collection: address of the collection
 * @param seller: address of the seller
 * @param cursor: cursor
 * @param size: size of the response
 */

type ViewAsksByCollectionAndSellerAddressParams = {
  marketAddress: Address
  collectionAddress: Address
  sellerAddress: Address
  cursor?: number
  size?: number
}

export function useViewAsksByCollectionAndSellerAddress() {
  const publicClient = usePublicClient()

  return useCallback(
    async ({
      marketAddress,
      collectionAddress,
      sellerAddress,
      cursor = 0,
      size = 10,
    }: ViewAsksByCollectionAndSellerAddressParams) => {
      try {
        const asks = (await publicClient.readContract({
          abi: MARKETPLACE_ABI,
          address: marketAddress,
          functionName: 'viewAsksByCollectionAndSeller',
          args: [collectionAddress, sellerAddress, cursor, size],
        })) as ViewAsksByCollectionAndSellerRaw

        return {
          askInfo: asks[1].map((ask) => {
            return {
              price: ethers.utils.formatEther(ask[1].toString(10)),
              seller: ask[0],
            }
          }),
          tokenIds: asks[0].map((tokenId) => {
            return Number(tokenId.toString(10))
          }),
          size: Number(asks[2].toString(10)),
        }
      } catch (error) {
        throw error
      }
    },
    [publicClient],
  )
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

export function useViewAsksByCollection() {
  const publicClient = usePublicClient()

  return useCallback(
    async ({
      marketAddress,
      collectionAddress,
      cursor = 0,
      size = 10,
    }: ViewAsksByCollectionParams) => {
      try {
        const asks = (await publicClient.readContract({
          abi: MARKETPLACE_ABI,
          address: marketAddress,
          functionName: 'viewAsksByCollection',
          args: [collectionAddress, cursor, size],
        })) as ViewAsksByCollectionAndSellerRaw

        return {
          askInfo: asks[1].map((ask) => {
            return {
              price: ethers.utils.formatEther(ask[1].toString(10)),
              seller: ask[0],
            }
          }),
          tokenIds: asks[0].map((tokenId) => {
            return Number(tokenId.toString(10))
          }),
          size: Number(asks[2].toString(10)),
        }
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
  wrapTokenAddress: Address
  marketAddress: Address
}

export function useBuyNFTUsingWrapToken() {
  const approveTokenExchange = useApproveErc20()
  return useCallback(
    async ({
      collectionAddress,
      tokenId,
      price,
      marketAddress,
      wrapTokenAddress,
    }: BuyNFTUsingWrapTokenParams) => {
      try {
        try {
          const receiptApprove = await approveTokenExchange({
            nftAddressGuy: marketAddress,
            wad: ethers.utils.parseEther(price).toString(),
          })
          console.log(receiptApprove)
        } catch (error) {
          console.log(error)
          throw new Error(AppError.APPROVE_TOKEN_EXCHANGE_FAILED)
        }

        const buyTokenUsingWrapTokenReceipt = await writeContract({
          abi: MARKETPLACE_ABI,
          address: wrapTokenAddress,
          functionName: 'buyTokenUsingWrapToken',
          args: [collectionAddress, tokenId, ethers.utils.parseEther(price)],
        })

        console.log('buyTokenUsingWrapToken Receipt:', buyTokenUsingWrapTokenReceipt)
        return buyTokenUsingWrapTokenReceipt
      } catch (error) {
        console.log(error)
        throw error
      }
    },
    [approveTokenExchange],
  )
}

/**
 * @notice Create ask order
 * @param _collection: contract address of the NFT
 * @param _tokenId: tokenId of the NFT
 * @param _askPrice: price for listing (in wei)
 */

type CreateAskOrderParams = {
  marketAddress: Address
  cltAddress: Address
  tokenId: number
  price: string
}

export function useCreateAskOrder() {
  const approveSpenderToAccessNft = useApproveSpenderToAccessNft()

  return useCallback(
    async ({ marketAddress, cltAddress, tokenId, price }: CreateAskOrderParams) => {
      try {
        try {
          const receiptApprove = await approveSpenderToAccessNft({
            cltAddress,
            spenderAddress: marketAddress,
            tokenId,
          })
          console.log(receiptApprove)
        } catch (error) {
          throw new Error(AppError.APPROVE_SPENDER_TO_ACCESS_NFT_FAILED)
        }

        // const transaction = await marketContract.createAskOrder(
        //   cltAddress,
        //   tokenId,
        //   ethers.parseEther(price),
        // )

        const createAskOrderReceipt = await writeContract({
          abi: MARKETPLACE_ABI,
          address: marketAddress,
          functionName: 'createAskOrder',
          args: [cltAddress, tokenId, ethers.utils.parseEther(price)],
        })

        console.log('createAskOrder Receipt:', createAskOrderReceipt)
        return createAskOrderReceipt
      } catch (error) {
        throw error
      }
    },
    [approveSpenderToAccessNft],
  )
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
  marketAddress: Address
  cltAddress: Address
  creatorAddress: Address
  tradingFee: number
  creatorFee: number
  whiteListChecker: Address
}

export function useImportCollection() {
  return useCallback(
    async ({
      marketAddress,
      cltAddress,
      creatorAddress,
      tradingFee = 100,
      creatorFee = 100,
      whiteListChecker = DEFAULT_ADDRESS,
    }: ImportCollectionParams) => {
      try {
        const addResponse = await writeContract({
          abi: MARKETPLACE_ABI,
          address: marketAddress,
          functionName: 'addCollection',
          args: [cltAddress, creatorAddress, whiteListChecker, tradingFee, creatorFee],
        })

        console.log(addResponse)
        return addResponse
      } catch (error) {
        throw error
      }
    },
    [],
  )
}

/**
 * @notice Cancel existing ask order
 * @param _collection: contract address of the NFT
 * @param _tokenId: tokenId of the NFT
 */

type CancelAskOrderParams = {
  marketAddress: Address
  collectionAddress: Address
  tokenId: string
}

export function useCancelAskOrder() {
  return useCallback(
    async ({ marketAddress, collectionAddress, tokenId }: CancelAskOrderParams) => {
      try {
        const transaction = await writeContract({
          abi: MARKETPLACE_ABI,
          address: marketAddress,
          functionName: 'cancelAskOrder',
          args: [collectionAddress, tokenId],
        })

        return transaction
      } catch (error) {
        throw error
      }
    },
    [],
  )
}
