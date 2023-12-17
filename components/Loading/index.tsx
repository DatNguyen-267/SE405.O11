import { View, Text, Image, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import styles from './styles'
import { Modal } from 'react-native'
import { Colors } from '../../constants/Colors'
import { onHideLoading } from '../../utils'
import { useDispatch } from 'react-redux'

interface ILoading {
    loadText?: string;
    isVisible?: boolean;
}
const Loading = ({ loadText, isVisible }:ILoading) => {
    
    // const dispatch = useDispatch();
    return (
        <Modal transparent={true} visible={isVisible}>
           <View style={styles.container}>
           <ActivityIndicator size="large" color={Colors.color_base_100}/>
            {/* <TouchableOpacity onPress={()=>onHideLoading(dispatch)}>
            </TouchableOpacity> */}
            <Text style={styles.text}>{loadText? loadText: 'Loading...'}</Text>
           </View>
        </Modal>
    )
}

export default Loading