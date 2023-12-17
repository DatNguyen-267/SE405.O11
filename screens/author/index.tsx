import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, ImageBackground, FlatList, } from 'react-native'
import { Colors } from '../../constants/Colors'

import { Button, Caption, Paragraph, Surface, Title } from 'react-native-paper'
import { useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import styles from './styles'
import { Platform } from 'react-native'
import NFTCard from '../../components/NFTCard'
// import ModalDeposit from '../../components/ModalDeposit'
// import ModalImport from '../../components/ModalImport'
// import ModalSend from '../../components/ModalSend'
import Tabs from '../../components/Tabs'
// import ModalDelist from '../../components/ModalDelist'
// import ModalSell from '../../components/ModalSell'
const Author = ({ navigation }) => {
    const [isDeposit, setIsDeposit] = useState(false)
    const [isImport, setIsImport] = useState(false)
    const [isDelist, setIsDelist] = useState(false)
    const [isSell, setIsSell] = useState(false)
    const [isConnected, setIsConnected] = useState(true);
    const [tab, setTab] = useState("All");
    
    const data = [
        {
            img: "https://th.bing.com/th/id/OIG.ey_KYrwhZnirAkSgDhmg",
            name: 'fox abc abc abc abc abc abc abc abc abc abc',
            status: 'On Sale',
        },
        {
            img: "https://png.pngtree.com/background/20230411/original/pngtree-beautiful-moon-background-on-moon-night-picture-image_2392251.jpg",
            name: 'moon',
            status: 'On Sale',
        },
        {
            img: "https://statusneo.com/wp-content/uploads/2023/02/MicrosoftTeams-image551ad57e01403f080a9df51975ac40b6efba82553c323a742b42b1c71c1e45f1.jpg",
            name: 'childreno',
            status: 'Not For Sale',
        },
        {
            img: "https://deep-image.ai/blog/content/images/2022/09/underwater-magic-world-8tyxt9yz.jpeg",
            name: 'water',
            status: 'Not For Sale',
        },
    ]
    const tabs = [
        {
          title: 'All',
         
        },
        {
          title: 'On Sale',
          
        },
        {
          title: 'Not For Sale',
          
        },
      ];

    const changeConnect = () =>{
        setIsConnected(!isConnected);
    }

    return (
        <View style={styles.createScreen}>
            {/* <ModalDeposit isVisible={isDeposit} setIsVisible={setIsDeposit}></ModalDeposit>
            <ModalImport isVisible={isImport} setIsVisible={setIsImport}></ModalImport>
            <ModalDelist  isVisible={isDelist} setIsVisible={setIsDelist}></ModalDelist>
            <ModalSell  isVisible={isSell} setIsVisible={setIsSell}></ModalSell> */}
            {/* <ModalSend></ModalSend> */}
            {/* <Header
                title={"Create NFT"}
                right="more-vertical"
            ></Header> */}
            {
                !isConnected ?
                    <View style={styles.containerNoConnect}>
                       <ImageBackground
                            imageStyle={{ opacity: 1, flex: 1, justifyContent: "center", alignItems: "center" }}
                            source={require('./../../assets/images/background.jpg')}
                            style={styles.noConnectBg}
                            resizeMode='cover'
                          
                       >
                       <View style={styles.connectForm}>
                            <Image
                                style={styles.connectImage}
                                source={{
                                    uri: "https://cdni.iconscout.com/illustration/premium/thumb/no-internet-connection-8316263-6632283.png"
                                }}
                            ></Image>
                            <Text style={[styles.text, styles.connectTitle]}>No Connect</Text>
                            <Text style={[styles.text, styles.connectDes]}>Please choose a wallet you want to connect. There are several wallet providers.</Text>
                            {/* <View style={styles.connectBtn}>
                                <Image
                                    style={styles.connectBtnImage}
                                    source={require('./../../../assets/images/metaMask.png')}
                                >
                                </Image>
                                <TouchableOpacity 
                                    style={styles.connectBtnContent} 
                                    onPress={()=>changeConnect()}
                                    // onPress={() => navigation.navigate('Connect Wallet')}
                                >
                                    <Text style={[styles.text, styles.connectBtnTitle]}>Metamask</Text>
                                    <Text style={[styles.text, styles.connectBtnDes]} numberOfLines={1} ellipsizeMode='tail'>Start exploring blockchain applications in seconds</Text>
                                </TouchableOpacity>
                            </View> */}
                        </View>
                       </ImageBackground>
                    </View>
                    :
                    <ScrollView
                        style={styles.createContent}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                    >
                        <View style={styles.container}>
                            <View style={styles.headLine}>
                                <ImageBackground
                                    imageStyle={{ borderRadius: 10, opacity: 0.75, justifyContent: 'center' }}
                                    source={require('./../../assets/images/createBg2.jpg')}
                                    resizeMode="cover"
                                    style={styles.headLineBg}

                                >
                                    <Image
                                        style={styles.headLineAvatar}
                                        source={require('./../../assets/images/avatarDefault.png')}
                                    ></Image>
                                </ImageBackground>

                            </View>
                            <View style={[styles.walletInfo]}>
                                {/* <View style={styles.avatarFrame}>
                                    <Image
                                        style={styles.walletAvatar}
                                        source={require('./../../../assets/images/avatarDefault.png')}
                                    ></Image>
                                </View> */}
                                <Text style={[styles.text, styles.walletAddress]}>0x000...000</Text>
                                {/* <View style={[styles.walletStatusContainer]}>
                                    <Text style={[styles.walletStatusTitle, styles.label]}>Status</Text>
                                    <Text style={[styles.walletStatusValue]}>Connected</Text>
                                </View> */}
                                <View style={styles.walletAction}>
                                    <Button style={[styles.btn]} onPress={()=>setIsDeposit(true)}>
                                        <Text style={styles.btnText}>Deposit</Text>
                                    </Button>
                                    <Button style={[styles.btn]} onPress={()=>setIsImport(true)}>

                                        <Text style={styles.btnText} numberOfLines={1} ellipsizeMode='tail'>Import Collection</Text>
                                    </Button>
                                    {/* <View style={[styles.walletDepositContainer, styles.containerFlexStart]}>
                                        <Text style={[styles.walletDepositTitle, styles.label]}>Deposit</Text>
                                        <Button style={[styles.btn, styles.walletDepositBtn]}>
                                            <Text style={styles.btnText}>Deposit</Text>
                                        </Button>
                                    </View>
                                    <View style={[styles.walletImportContainer, styles.containerFlexStart]}>
                                        <Text style={[styles.walletImportTitle, styles.label]}>Import</Text>
                                        <Button style={[styles.btn, styles.walletImportBtn]}>
        
                                            <Text style={styles.btnText} numberOfLines={1} ellipsizeMode='tail'>Import Collection</Text>
                                        </Button>
                                    </View> */}
                                </View>
                                <View style={[styles.balanceContainer]}>
                                    <Text style={[ styles.label]}>Balance</Text>
                                    <Text style={[styles.text, styles.balanceAZ]}>192.193139212329 AZIOD</Text>
                                    <Text style={[styles.text, styles.balanceWB]}>192.193139212329 WBNB</Text>
                                </View>
                            </View>
                            <View style={styles.nftContent}>
                                {/* <Text style={[styles.text, styles.title]}>All NFT</Text> */}
                                <Tabs items={tabs} setTab={setTab}/>
                                <FlatList
                                columnWrapperStyle={{
                                    justifyContent: 'space-between',
                                }}
                                scrollEnabled={false}
                                style={styles.listNft}
                                data={data}
                                numColumns={2}
                                renderItem={({ item }) => {
                                    if (tab.toLowerCase() === tabs[0].title.toLowerCase()) {
                                        if (item.status.toLowerCase() === tabs[1].title.toLowerCase() ) {
                                            return (
                                                <View style={styles.nftItem}>
                                                    <NFTCard item={item} isDelist={true} onShowModal={setIsDelist} ></NFTCard>
                                                </View>
                                                )
                                        }
                                        if (item.status.toLowerCase() ===  tabs[2].title.toLowerCase() ) {
                                            return (
                                                <View style={styles.nftItem}>
                                                    <NFTCard item={item} isSell={true}  onShowModal={setIsSell}></NFTCard>
                                                </View>
                                                )
                                        }
                                    }
                                    else {
                                        if (item.status.toLowerCase() === tab.toLowerCase() && tab.toLowerCase() === tabs[1].title.toLowerCase() ) {
                                            return (
                                                <View style={styles.nftItem}>
                                                    <NFTCard item={item} isDelist={true}  onShowModal={setIsDelist}></NFTCard>
                                                </View>
                                                )
                                        }
                                        if (item.status.toLowerCase() === tab.toLowerCase() && tab.toLowerCase() === tabs[2].title.toLowerCase() ) {
                                            return (
                                                <View style={styles.nftItem}>
                                                    <NFTCard item={item} isSell={true}  onShowModal={setIsSell}></NFTCard>
                                                </View>
                                                )
                                        }
                                    }
                                }
                                }
                            />


                            </View>
                        </View>
                    </ScrollView>
            }


        </View>

    )
}

export default Author
