import { defineChain } from 'viem'
import { goerli, sepolia } from 'viem/chains'

export const CHAIN_IDS = {
  AIOZ: 4102,
  GOERLI: goerli.id,
  SEPOLIA: sepolia.id,
}
export const DEFAULT_CHAIN_ID = CHAIN_IDS.GOERLI
export const DEFAULT_WRAP_TOKEN_SYMBOL = 'WUIT'

export const aiozChain = defineChain({
  id: 4102,
  network: 'AIOZ Testnet',
  name: 'AIOZ Testnet',
  nativeCurrency: {
    name: 'AIOZ',
    symbol: 'AIOZ',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://eth-ds.testnet.aioz.network'],
    },
    public: {
      http: ['https://eth-ds.testnet.aioz.network'],
    },
  },
  blockExplorers: {
    etherscan: {
      name: 'AiozExplorer',
      url: 'https://testnet.explorer.aioz.network',
    },
    default: {
      name: 'AiozExplorer',
      url: 'https://testnet.explorer.aioz.network',
    },
  },
})

export const CHAINS = [aiozChain, goerli]
