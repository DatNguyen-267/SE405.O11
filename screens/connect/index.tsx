import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, ImageBackground, FlatList, } from 'react-native'
import { Button, Caption, Paragraph, Surface, Title } from 'react-native-paper'
import { useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import styles from './styles'
import { Platform } from 'react-native'
const Connect = ({ navigation }:{navigation?:any}) => {
    const [isConnected, setIsConnected] = useState(false);
    const changeConnect = () => {
        setIsConnected(!isConnected);
    }

    return (
        <View style={styles.createScreen}>
            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >

                <View style={styles.containerNoConnect}>


                    <Image
                        style={styles.connectImage}
                        source={require('./../../assets/images/wallet.png')}
                    >
                    </Image>
                    <Text style={[styles.text, styles.connectTitle]}>Connect Your Wallet</Text>
                    <Text style={[styles.text, styles.connectDes]}>Choose a wallet you want to connect. There are several wallet providers.</Text>
                    <View style={styles.connectBtn}>
                        <Image
                            style={styles.connectBtnImage}
                            source={require('./../../assets/images/metaMask.png')}
                        >
                        </Image>
                        <TouchableOpacity style={styles.connectBtnContent} onPress={() => changeConnect()}>
                            <Text style={[styles.text, styles.connectBtnTitle]}>Metamask</Text>
                            <Text style={[styles.text, styles.connectBtnDes]} numberOfLines={1} ellipsizeMode='tail'>Start exploring blockchain applications in seconds</Text>
                        </TouchableOpacity>

                    </View>
                    <View style={[styles.connectAddress]}>
                        <Text style={[styles.text, styles.connectAddressTitle]}>Address: </Text>
                        <Text style={[styles.text, styles.connectAddressValue]} numberOfLines={1} ellipsizeMode='tail'>
                            {isConnected ? "0x000...000" : "No connection"}
                        </Text>
                    </View>
                </View>
            </ScrollView>



        </View>
        // <View style={styles.createScreen}>

        //     <View style={styles.containerNoConnect}>
        //         <ImageBackground
        //             imageStyle={{ opacity: 1, flex: 1, justifyContent: "center", alignItems: "center" }}
        //             source={require('./../../../assets/images/background.jpg')}
        //             style={styles.noConnectBg}
        //             resizeMode='cover'

        //         >
        //             <View style={styles.connectForm}>
        //                 <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}
        //                     showsHorizontalScrollIndicator={false}>
        //                     <Text style={[styles.text, styles.connectTitle]}>Connect Your Wallet</Text>
        //                     <Text style={[styles.text, styles.connectDes]}>Choose a wallet you want to connect. There are several wallet providers.</Text>
        //                     <View style={styles.connectBtn}>
        //                         <Image
        //                             style={styles.connectBtnImage}
        //                             source={require('./../../../assets/images/metaMask.png')}
        //                         >
        //                         </Image>
        //                         <TouchableOpacity style={styles.connectBtnContent} onPress={() => changeConnect()}>
        //                             <Text style={[styles.text, styles.connectBtnTitle]}>Metamask</Text>
        //                             <Text style={[styles.text, styles.connectBtnDes]} numberOfLines={1} ellipsizeMode='tail'>Start exploring blockchain applications in seconds</Text>
        //                         </TouchableOpacity>

        //                     </View>
        //                     <View style={[styles.connectAddress]}>
        //                         <Text style={[styles.text, styles.connectAddressTitle]}>Address: </Text>
        //                         <Text style={[styles.text, styles.connectAddressValue]} numberOfLines={1} ellipsizeMode='tail'>
        //                             {isConnected ? "0x000...000" : "No connection"}
        //                         </Text>
        //                     </View>
        //                 </ScrollView>
        //             </View>
        //         </ImageBackground>
        //     </View>



        // </View>

    )
}

export default Connect
