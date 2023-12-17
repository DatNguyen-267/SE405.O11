import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, ImageBackground, FlatList, } from 'react-native'
import { Colors } from '../../constants/Colors'
import { useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import styles from './styles'
import { Platform } from 'react-native'
const Chains = ({ navigation }) => {
    const [isConnected, setIsConnected] = useState(false);
    const [isAZOID, setIsAZOID] = useState(false);

    const connectGoerli = () => {
        setIsConnected(true);
        setIsAZOID(false);
    }
    const connectAzoid = () => {
        setIsConnected(true);
        setIsAZOID(true);
    }

    return (
        <View style={styles.createScreen}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}>

                <View style={styles.containerNoConnect}>
                    <Image
                        style={styles.connectImage}
                        source={require('./../../assets/images/chains.png')}
                    ></Image>
                    <Text style={[styles.text, styles.connectTitle]}>Add Chains</Text>
                    <Text style={[styles.text, styles.connectDes]} numberOfLines={3} ellipsizeMode='tail'>Chainlist is a list of EVM networks. Users can use the information to connect their wallets and Web3 middleware providers to the appropriate Chain ID and Network ID to connect to the correct chain.</Text>
                    <View style={[styles.connectBtn, !isAZOID ? styles.connectBtnActive : styles.connectBtnNoActive]}>
                        <Image
                            style={styles.connectBtnImage}
                            source={{
                                uri: "https://assets-global.website-files.com/5f973c97cf5aea614f93a26c/6449630da0da61343b5adba1_ethereum-logo.png"
                            }}
                        >
                        </Image>
                        <TouchableOpacity style={[styles.connectBtnContent]} onPress={() => connectGoerli()}>
                            <Text style={[styles.text, styles.connectBtnTitle, !isAZOID ? styles.connectBtnActive : styles.connectBtnNoActive]}>Goerli Network</Text>
                            <Text style={[styles.text, styles.connectBtnDes]} numberOfLines={1} ellipsizeMode='tail'>
                                Ethereum is the community-run technology powering the cryptocurrency ether (ETH) and thousands of decentralized applications
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.connectBtn, isAZOID ? styles.connectBtnActive : styles.connectBtnNoActive]}>
                        <Image
                            style={styles.connectBtnImage}
                            source={{
                                uri: "https://static.coinpaprika.com/coin/aioz-aioz-network/logo.png?rev=10646575"
                            }}
                        >
                        </Image>
                        <TouchableOpacity style={[styles.connectBtnContent]} onPress={() => connectAzoid()}>
                            <Text style={[styles.text, styles.connectBtnTitle, isAZOID ? styles.connectBtnActive : styles.connectBtnNoActive]}>AZIOD Network</Text>
                            <Text style={[styles.text, styles.connectBtnDes]} numberOfLines={1} ellipsizeMode='tail'>
                                Is a Layer-1 blockchain with full Ethereum and Cosmos interoperability.
                            </Text>
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
        //     {/* <ModalSend></ModalSend> */}
        //     {/* <Header
        //         title={"Create NFT"}
        //         right="more-vertical"
        //     ></Header> */}
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
        //                     <View style={[styles.connectBtn, !isAZOID ? styles.connectBtnActive : ""]}>
        //                         <Image
        //                             style={styles.connectBtnImage}
        //                             source={{
        //                                 uri: "https://assets-global.website-files.com/5f973c97cf5aea614f93a26c/6449630da0da61343b5adba1_ethereum-logo.png"
        //                             }}
        //                         >
        //                         </Image>
        //                         <TouchableOpacity style={[styles.connectBtnContent]} onPress={() => connectGoerli()}>
        //                             <Text style={[styles.text, styles.connectBtnTitle, !isAZOID ? styles.connectBtnActive : "" ]}>Goerli Network</Text>
        //                             <Text style={[styles.text, styles.connectBtnDes]} numberOfLines={1} ellipsizeMode='tail'>
        //                                 Ethereum is the community-run technology powering the cryptocurrency ether (ETH) and thousands of decentralized applications
        //                             </Text>
        //                         </TouchableOpacity>
        //                     </View>

        //                     <View style={[styles.connectBtn,  isAZOID ? styles.connectBtnActive : ""]}>
        //                         <Image
        //                             style={styles.connectBtnImage}
        //                             source={{
        //                                 uri: "https://static.coinpaprika.com/coin/aioz-aioz-network/logo.png?rev=10646575"
        //                             }}
        //                         >
        //                         </Image>
        //                         <TouchableOpacity style={[styles.connectBtnContent]} onPress={() => connectAzoid()}>
        //                             <Text style={[styles.text, styles.connectBtnTitle, isAZOID ? styles.connectBtnActive : ""]}>AZIOD Network</Text>
        //                             <Text style={[styles.text, styles.connectBtnDes]} numberOfLines={1} ellipsizeMode='tail'>
        //                                 Is a Layer-1 blockchain with full Ethereum and Cosmos interoperability.
        //                             </Text>
        //                         </TouchableOpacity>
        //                     </View>

        //                     <View style={[styles.connectAddress]}>
        //                     <Text style={[styles.text, styles.connectAddressTitle]}>Address: </Text>
        //                     <Text style={[styles.text, styles.connectAddressValue]} numberOfLines={1} ellipsizeMode='tail'>
        //                         {isConnected ? "0x000...000":"No connection"}
        //                     </Text>
        //                 </View>
        //                 </ScrollView>
        //             </View>
        //         </ImageBackground>
        //     </View>



        // </View>

    )
}

export default Chains
