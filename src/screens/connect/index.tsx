import { W3mButton } from '@web3modal/wagmi-react-native'

import React, { useEffect } from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { Button } from 'react-native-paper'
import { getMetadata } from 'src/hooks/useIPFS'
import { useGetNameOfCollection, useGetNftsOfAddress, useGetTokenURI } from 'src/hooks/useNFT'
import { useAccount, useChainId, useWalletClient } from 'wagmi'
import styles from './styles'
import { useCreateAskOrder } from 'src/hooks/useMarket'

const Connect = ({ navigation }: { navigation?: any }) => {
  const { address, connector, isConnected } = useAccount()

  const { data: walletClient } = useWalletClient()

  const { mutate: getTokenURI } = useGetTokenURI()
  const chainId = useChainId()

  const { mutate: handleGetNameOfCollection } = useGetNameOfCollection()
  const { mutate: createAskOrder } = useCreateAskOrder()

  const handleGetMetadata = async () => {
    getTokenURI({
      cltAddress: '0x772b21c128f759F75A352568B1F7b4fF331d1162',
      tokenId: 1,
    }).then(async (res) => {
      const metadata = await getMetadata(res).then((res) => res.json())
    })
  }

  const handleGetNameCollection = async () => {
    handleGetNameOfCollection({
      cltAddress: '0x772b21c128f759F75A352568B1F7b4fF331d1162',
    }).then((res) => {})
  }

  const { data: nfts, mutate: getAllNftOfAddress } = useGetNftsOfAddress()

  const handleGetAllNftOfAddress = () => {
    getAllNftOfAddress({
      ownerAddress: '0x454574C8AD9706a8fC22dDA71Ce77Cb1CDd5fEB1',
    })
  }

  const handleCreateAskOrder = () => {
    createAskOrder({
      // The grap - Goerli
      cltAddress: '0x55327442555db09955110428F46B66b902Dee1a4',
      tokenId: 1,
      price: '0.07685',
    })
  }

  return (
    <View style={styles.createScreen}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.containerNoConnect}>
          <W3mButton />
          <Button onPress={handleGetMetadata}>Get metadata NFT</Button>
          <Button onPress={handleGetNameCollection}>Get name collection</Button>
          <Button onPress={handleGetAllNftOfAddress}>Get all nft of address</Button>
          <Button onPress={handleCreateAskOrder}>Create Ask order</Button>
          <Image
            style={styles.connectImage}
            source={require('../../assets/images/wallet.png')}
          ></Image>
          <Text style={[styles.text, styles.connectTitle]}>Connect Your Wallet</Text>
          <Text style={[styles.text, styles.connectDes]}>
            Choose a wallet you want to connect. There are several wallet providers.dasda
          </Text>
          <View style={styles.connectBtn}>
            <Image
              style={styles.connectBtnImage}
              source={require('../../assets/images/metaMask.png')}
            ></Image>
            <TouchableOpacity style={styles.connectBtnContent}>
              <Text style={[styles.text, styles.connectBtnTitle]}>Metamask</Text>
              <Text
                style={[styles.text, styles.connectBtnDes]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                Start exploring blockchain applications in seconds
              </Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.connectAddress]}>
            <Text style={[styles.text, styles.connectAddressTitle]}>Address: </Text>
            <Text
              style={[styles.text, styles.connectAddressValue]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {isConnected ? '0x000...000' : 'No connection'}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
    // <View style={styles.createScreen}>

    //     <View style={styles.containerNoConnect}>
    //         <ImageBackground
    //             imageStyle={{ opacity: 1, flex: 1, justifyContent: "center", alignItems: "center" }}
    //             source={require('./../../assets/images/background.jpg')}
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
    //                             source={require('./../../assets/images/metaMask.png')}
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
