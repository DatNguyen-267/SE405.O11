import { Address } from 'viem'

export interface CollectionItem {
  collectionAddress: string
  owner: string
  tradingFee: number
  creatorFee: number
  title: string
  description: string
  totalSupply: string
  name: string
}

export interface AskInfo {
  collectionAddress: Address
  tokenId: string
  price: string
  seller: Address
  size: number
}
