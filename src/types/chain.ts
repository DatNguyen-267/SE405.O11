import { Address } from 'viem'

export type AddressOfChainType = {
  DEPOSIT_RATE: number
  WUIT: Address
  MARKET: Address
  PUBLIC_ERC721_TOKEN: Address
  COLLECTIONS?: {
    [key: string]: {
      owner: Address
      address: Address
    }
  }
}
