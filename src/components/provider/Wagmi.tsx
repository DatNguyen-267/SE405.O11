import '@walletconnect/react-native-compat'
import { Web3Modal, createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi-react-native'
import { ReactNode } from 'react'
import { arbitrum, mainnet, polygon } from 'viem/chains'
import { WagmiConfig } from 'wagmi'

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = '30b4c895f637ba0085b90cdb6d3ca803'

// 2. Create config
const metadata = {
  name: 'SE405 NFT MARKETPLACE',
  description: 'SE405 NFT MARKETPLACE ',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
}

const chains = [mainnet, polygon, arbitrum]

const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
})

// 3. Create modal
createWeb3Modal({
  projectId,
  chains,
  wagmiConfig,
})

export default function WagmiProvider({ children }: { children: ReactNode }) {
  return (
    <WagmiConfig config={wagmiConfig}>
      {children}
      <Web3Modal />
    </WagmiConfig>
  )
}
