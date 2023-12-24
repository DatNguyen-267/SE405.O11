import { W3mButton } from '@web3modal/wagmi-react-native'

import React from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { Button } from 'react-native-paper'
import { useAccount, useChainId, useWalletClient } from 'wagmi'
import styles from './styles'

const Connect = ({ navigation }: { navigation?: any }) => {
  const { address, connector, isConnected } = useAccount()

  const { data: walletClient } = useWalletClient()

  const chainId = useChainId()

  const handleClick = async () => {
    console.warn({ chainId })
    console.warn({ address, connector, isConnected })

    // const contract: any = await readContract({
    //   address: `0x${"13724882900FaaC30151419E6D8Cd6a96069Aec4"}`,
    //   abi: ABI_WRAP_TOKEN,
    //   functionName: "balanceOf",
    //   args: [address],
    // });

    // const balance = BigInt(contract).toString(10);

    // console.log({
    //   balance,
    // });

    // console.log(ethers.utils.formatEther(balance));
    // const publicContract = await publicClient.readContract({
    //   abi: ABI_WRAP_TOKEN,
    //   address: WUIAddress,
    //   functionName: 'balanceOf',
    //   args: ['0x454574C8AD9706a8fC22dDA71Ce77Cb1CDd5fEB1'],
    // })
    // 0x454574C8AD9706a8fC22dDA71Ce77Cb1CDd5fEB1
    // console.log({ publicContract })
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
          <Button onPress={handleClick}>Click me</Button>
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
