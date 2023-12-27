import React from 'react'
import { ActivityIndicator, Modal, Text, View } from 'react-native'
import styles from './styles'
import { Colors } from 'src/constants/Colors'

interface ILoading {
  isVisible?: boolean
}
const PageLoading = ({ isVisible }: ILoading) => {
  return (
    isVisible && 
      <View style={styles.container}>
        <ActivityIndicator size="large" color={Colors.color_base_300} />
      </View>
  )
}

export default PageLoading
