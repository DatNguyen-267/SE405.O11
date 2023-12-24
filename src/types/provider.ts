import { ethers } from 'src/utils'

export interface ProviderOptions {
  provider: ethers.providers.JsonRpcProvider | ethers.providers.Web3Provider
}
