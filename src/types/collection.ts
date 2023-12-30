import { Address } from 'viem'

export interface CollectionItem {
  collectionAddress: Address
  owner: Address
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
