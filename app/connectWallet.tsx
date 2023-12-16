import { StatusBar } from 'expo-status-bar'
import { Platform, StyleSheet } from 'react-native'

import { useProvider } from '../src/hooks/useProvider'
import { useAccount, useNetwork } from 'wagmi'
import EditScreenInfo from '../components/EditScreenInfo'
import { Text, View } from '../components/Themed'
import WagmiProvider from '../src/components/provider/Wagmi'

export default function ConnectWalletScreen() {
  const provider = useProvider()
  const { chain } = useNetwork()
  const accounts = useAccount()

  console.warn({ chain, provider })
  console.warn({ accounts })

  return (
    <WagmiProvider>
      <View style={styles.container}>
        <Text style={styles.title}>Connect Wallet Screennnn</Text>
        {/* <W3mButton /> */}
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <EditScreenInfo path="app/modal.tsx" />

        {/* Use a light status bar on iOS to account for the black space above the modal */}
        <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      </View>
    </WagmiProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
})
