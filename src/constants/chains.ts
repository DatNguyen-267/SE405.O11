import { defineChain } from 'viem'
import { goerli } from 'viem/chains'

export const aiozChain = defineChain({
  id: 4102,
  network: 'AIOZ Network',
  name: 'AIOZ Network',
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
  testnet: true,
})

export const sepolia = defineChain({
  id: 11155111,
  network: 'sepolia',
  name: 'Sepolia',
  nativeCurrency: { name: 'Sepolia Ether', symbol: 'SEP', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://rpc.sepolia.org'],
    },
    public: {
      http: ['https://rpc.sepolia.org'],
    },
  },
  blockExplorers: {
    etherscan: {
      name: 'Etherscan',
      url: 'https://sepolia.etherscan.io',
    },
    default: {
      name: 'Etherscan',
      url: 'https://sepolia.etherscan.io',
    },
  },

  testnet: true,
})

export const CHAINS = [aiozChain, goerli, sepolia]

export const CHAIN_IDS = {
  AIOZ: aiozChain.id,
  GOERLI: goerli.id,
  SEPOLIA: sepolia.id,
} as const
export const DEFAULT_CHAIN_ID = CHAIN_IDS.SEPOLIA
export const DEFAULT_WRAP_TOKEN_SYMBOL = 'WUIT'
