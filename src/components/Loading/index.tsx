import React from 'react'
import { ActivityIndicator, Modal, Text, View } from 'react-native'
import styles from './styles'
import { Colors } from 'src/constants/Colors'

interface ILoading {
  loadText?: string
  isVisible?: boolean
}
const Loading = ({ loadText, isVisible }: ILoading) => {
  // const dispatch = useDispatch();
  return (
    <Modal transparent={true} visible={isVisible}>
      <View style={styles.container}>
        <ActivityIndicator size="large" color={Colors.color_base_100} />
        {/* <TouchableOpacity onPress={()=>onHideLoading(dispatch)}>
            </TouchableOpacity> */}
        <Text style={styles.text}>{loadText ? loadText : 'Loading...'}</Text>
      </View>
    </Modal>
  )
}

export default Loading
