export type NftItemStatus = 'Sale' | 'NotForSale'
export interface NftItem {
  tokenId: number
  collectionAddress: string

  title: string
  description: string

  tokenUri: string

  owner: string

  status: NftItemStatus
  imageUri: string
  imageGatewayUrl: string

  price?: string
  seller?: string
}
export const NftItemDefault: NftItem = {
  tokenId: 0,
  collectionAddress: '',

  title: '',
  description: '',

  tokenUri: '',

  owner: '',

  status: 'NotForSale',
  imageUri: '',
  imageGatewayUrl: '',

  price: '',
  seller: '',
}
