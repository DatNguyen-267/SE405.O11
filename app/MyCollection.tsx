import { StatusBar } from 'expo-status-bar'
import { Platform, StyleSheet } from 'react-native'

import EditScreenInfo from '../src/components/EditScreenInfo'
import { Text, View } from '../src/components/Themed'
import Author from '../src/screens/author'

export default function MyCollectionScreen() {
  return (
   <>
    <Author></Author>
   </>
  )
}

const styles = StyleSheet.create({

})
