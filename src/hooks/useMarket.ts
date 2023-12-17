import { ethers } from 'ethers'
import { useCallback } from 'react'
import { MARKETPLACE_ABI } from '../abis'
import { AppError, DEFAULT_ADDRESS } from '../constants'
import { useApproveErc20 } from './useErc20'
import { useApproveSpenderToAccessNft } from './useNFT'
import { useConnectorProvider, useRPCProvider } from './useProvider'

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

type ViewMarketCollectionprams = {
  marketAddress: string
  cursor?: number
  size?: number
}
/*
 * @notice View addresses and details for all the collections available for trading
 * @param cursor: cursor
 * @param size: size of the response
 */
export function useViewMarketCollections() {
  const provider = useRPCProvider()

  return useCallback(
    async ({ marketAddress, cursor = 0, size = 10 }: ViewMarketCollectionprams) => {
      try {
        if (!provider) {
          throw new Error('Provider is not found')
        }
        const marketContract = new ethers.Contract(marketAddress, MARKETPLACE_ABI, provider)
        const collectionsResponse = await marketContract.viewCollections(cursor, size)
        const collectionDetails = collectionsResponse['collectionDetails'].map(
          (collectionDeital: any) => {
            return {
              status: collectionDeital[0],
              creatorAddress: collectionDeital[1],
              whitelistChecker: collectionDeital[2],
              tradingFee: Number(BigInt(collectionDeital[3]).toString()) / 100,
              creatorFee: Number(BigInt(collectionDeital[4]).toString()) / 100,
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
    [provider],
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
  marktAddress: string
  collectionAddress: string
  sellerAddress: string
  cursor?: number
  size?: number
}

export function useViewAsksByCollectionAndSellerAddress() {
  const provider = useRPCProvider()

  return useCallback(
    async ({
      marktAddress,
      collectionAddress,
      sellerAddress,
      cursor = 0,
      size = 10,
    }: ViewAsksByCollectionAndSellerAddressParams) => {
      try {
        if (!provider) {
          throw new Error(AppError.PROVIDER_IS_NOT_VALID)
        }
        const marketContract = new ethers.Contract(marktAddress, MARKETPLACE_ABI, provider)
        const asks: ViewAsksByCollectionAndSellerRaw =
          await marketContract.viewAsksByCollectionAndSeller(
            collectionAddress,
            sellerAddress,
            cursor,
            size,
          )
        return {
          askInfo: asks[1].map((ask) => {
            return {
              price: ethers.formatEther(ask[1].toString(10)),
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
    [provider],
  )
}

/**
 * @notice Check asks for an array of tokenIds in a collection
 * @param collection: address of the collection
 * @param tokenIds: array of tokenId
 */
type ViewAsksByCollectionParams = {
  marketAddress: string
  collectionAddress: string
  cursor: number
  size: number
}

export function useViewAsksByCollection() {
  const provider = useRPCProvider()

  return useCallback(
    async ({
      marketAddress,
      collectionAddress,
      cursor = 0,
      size = 10,
    }: ViewAsksByCollectionParams) => {
      try {
        if (!provider) {
          throw new Error(AppError.PROVIDER_IS_NOT_VALID)
        }
        const marketContract = new ethers.Contract(marketAddress, MARKETPLACE_ABI, provider)
        const asks: ViewAsksByCollectionAndSellerRaw = await marketContract.viewAsksByCollection(
          collectionAddress,
          cursor,
          size,
        )
        return {
          askInfo: asks[1].map((ask) => {
            return {
              price: ethers.formatEther(ask[1].toString(10)),
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
    [provider],
  )
}

/**
 * @notice Check ask for an array of tokenId in a collection
 * @param collection: address of the collection
 * @param tokenId: array of tokenId
 */

type ViewAskByCollectionAndTokenIdParams = {
  marketAddress: string
  collectionAddress: string
  tokenId: string
}

export function useViewAskByCollectionAndTokenId() {
  const provider = useRPCProvider()

  return useCallback(
    async ({ marketAddress, collectionAddress, tokenId }: ViewAskByCollectionAndTokenIdParams) => {
      try {
        if (!provider) {
          throw new Error(AppError.PROVIDER_IS_NOT_VALID)
        }
        const marketContract = new ethers.Contract(marketAddress, MARKETPLACE_ABI, provider)
        const response = await marketContract.viewAsksByCollectionAndTokenIds(collectionAddress, [
          tokenId,
        ])
        return response
      } catch (error) {
        throw error
      }
    },
    [provider],
  )
}

/**
 * @notice Check ask for an array of tokenId in a collection
 * @param collection: address of the collection
 * @param tokenId: array of tokenId
 */
type ViewAskByCollectionAndTokenIdsParams = {
  marketAddress: string
  collectionAddress: string
  tokenIds: string[]
}

export function useViewAskByCollectionAndTokenIds() {
  const provider = useRPCProvider()

  return useCallback(
    async ({
      marketAddress,
      collectionAddress,
      tokenIds,
    }: ViewAskByCollectionAndTokenIdsParams) => {
      try {
        if (!provider) {
          throw new Error(AppError.PROVIDER_IS_NOT_VALID)
        }
        const marketContract = new ethers.Contract(marketAddress, MARKETPLACE_ABI, provider)
        const response = await marketContract.viewAsksByCollectionAndTokenIds(
          collectionAddress,
          tokenIds,
        )
        return response
      } catch (error) {
        throw error
      }
    },
    [provider],
  )
}

/**
 * @notice Buy token with WUIT by matching the price of an existing ask order
 * @param _collection: contract address of the NFT
 * @param _tokenId: tokenId of the NFT purchased
 * @param _price: price (must be equal to the askPrice set by the seller) unit Ethers
 */

type BuyNFTUsingWrapTokenParams = {
  collectionAddress: string
  tokenId: number
  price: string
  wrapTokenAddress: string
  marketAddress: string
}

export function useBuyNFTUsingWrapToken() {
  const provider = useConnectorProvider()

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
        if (!provider) {
          throw new Error(AppError.PROVIDER_IS_NOT_VALID)
        }
        const marketContract = new ethers.Contract(
          marketAddress,
          MARKETPLACE_ABI,
          provider.getSigner(),
        )
        try {
          const receiptApprove = await approveTokenExchange({
            nftAddressGuy: marketAddress,
            tokenExchangeAddress: wrapTokenAddress,
            wad: ethers.parseEther(price).toString(),
          })
          console.log(receiptApprove)
        } catch (error) {
          console.log(error)
          throw new Error(AppError.APPROVE_TOKEN_EXCHANGE_FAILED)
        }
        const transaction = await marketContract.buyTokenUsingWrapToken(
          collectionAddress,
          tokenId,
          ethers.parseEther(price),
        )
        const transactionReceipt: any = await transaction.wait()
        console.log('buyTokenUsingWrapToken Receipt:', transactionReceipt)
        return transactionReceipt
      } catch (error) {
        console.log(error)
        throw error
      }
    },
    [provider, approveTokenExchange],
  )
}

/**
 * @notice Create ask order
 * @param _collection: contract address of the NFT
 * @param _tokenId: tokenId of the NFT
 * @param _askPrice: price for listing (in wei)
 */

type CreateAskOrderParams = {
  marketAddress: string
  cltAddress: string
  tokenId: number
  price: string
}

export function useCreateAskOrder() {
  const provider = useConnectorProvider()

  const approveSpenderToAccessNft = useApproveSpenderToAccessNft()

  return useCallback(
    async ({ marketAddress, cltAddress, tokenId, price }: CreateAskOrderParams) => {
      try {
        if (!provider) {
          throw new Error(AppError.PROVIDER_IS_NOT_VALID)
        }
        const marketContract = new ethers.Contract(
          marketAddress,
          MARKETPLACE_ABI,
          provider.getSigner(),
        )
        try {
          const receiptApprove = await approveSpenderToAccessNft({
            cltAddress: cltAddress,
            tokenId: tokenId,
            spenderAddress: marketAddress,
          })
          console.log(receiptApprove)
        } catch (error) {
          throw new Error(AppError.APPROVE_SPENDER_TO_ACCESS_NFT_FAILED)
        }

        const transaction = await marketContract.createAskOrder(
          cltAddress,
          tokenId,
          ethers.parseEther(price),
        )
        const transactionReceipt = await transaction.wait()
        console.log('createAskOrder Receipt:', transactionReceipt)
        return transactionReceipt
      } catch (error) {
        throw error
      }
    },
    [provider, approveSpenderToAccessNft],
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
  marketAddress: string
  cltAddress: string
  creatorAddress: string
  tradingFee: number
  creatorFee: number
  whiteListChecker: string
}

export function useImportCollection() {
  const provider = useConnectorProvider()

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
        if (!provider) {
          throw new Error(AppError.PROVIDER_IS_NOT_VALID)
        }
        const marketContract = new ethers.Contract(
          marketAddress,
          MARKETPLACE_ABI,
          provider.getSigner(),
        )
        const addResponse = await marketContract.addCollection(
          cltAddress,
          creatorAddress,
          whiteListChecker,
          tradingFee,
          creatorFee,
        )
        console.log(marketContract)
        return addResponse
      } catch (error) {
        throw error
      }
    },
    [provider],
  )
}

/**
 * @notice Cancel existing ask order
 * @param _collection: contract address of the NFT
 * @param _tokenId: tokenId of the NFT
 */

type CancelAskOrderParams = {
  marketAddress: string
  collectionAddress: string
  tokenId: string
}

export function useCancelAskOrder() {
  const provider = useConnectorProvider()

  return useCallback(
    async ({ marketAddress, collectionAddress, tokenId }: CancelAskOrderParams) => {
      try {
        if (!provider) {
          throw new Error(AppError.PROVIDER_IS_NOT_VALID)
        }
        const marketContract = new ethers.Contract(
          marketAddress,
          MARKETPLACE_ABI,
          provider.getSigner(),
        )
        const response = await marketContract.cancelAskOrder(collectionAddress, tokenId)
        return response
      } catch (error) {
        throw error
      }
    },
    [provider],
  )
}
