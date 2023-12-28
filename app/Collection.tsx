import { StatusBar } from 'expo-status-bar'
import { Platform, StyleSheet } from 'react-native'

import EditScreenInfo from '../src/components/EditScreenInfo'
import { Text, View } from '../src/components/Themed'
import Collection from '../src/screens/collection'

export default function CollectionScreen() {
  return (
   <>
    <Collection></Collection>
   </>
  )
}

const styles = StyleSheet.create({

})
