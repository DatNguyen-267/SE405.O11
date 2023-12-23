import { StatusBar } from 'expo-status-bar'
import { Platform, Pressable, StyleSheet } from 'react-native'

import { useWeb3Modal, useWeb3ModalState } from '@web3modal/wagmi-react-native'
import { useAccount, useNetwork } from 'wagmi'
import EditScreenInfo from '../components/EditScreenInfo'
import { Text, View } from '../components/Themed'

export default function ModalScreen() {
  const { address } = useAccount()
  const { chain } = useNetwork()
  const { connector } = useAccount()
  const { open: handleOpen } = useWeb3Modal()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Moewqdal</Text>
      <>
        <Pressable onPress={() => handleOpen()}>
          <Text>Open Connect Modal</Text>
        </Pressable>
      </>
      <Text>{address}</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/modal.tsx" />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
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
