import React, { useCallback, useEffect } from 'react'
import { FlatList, Image, ImageBackground, ScrollView, Text, View } from 'react-native'

import { useState } from 'react'
import { Button } from 'react-native-paper'
import ModalDeposit from 'src/components/ModalDeposit'
import ModalImport from 'src/components/ModalImport'
import ModalSell from 'src/components/ModalSell'
import NFTCard from 'src/components/NFTCard'
import Tabs from 'src/components/Tabs'
import styles from './styles'
import ModalDelist from 'src/components/ModalDelist'
import { DEFAULT_ADDRESS } from 'src/constants'
import { useGetNftsOfAddress } from 'src/hooks/useNFT'
import { useFocusEffect } from 'expo-router'
import { useAccount, useBalance } from 'wagmi'
import { getAvatarByAddress, shorterAddress } from 'src/utils'
import PageLoading from 'src/components/PageLoading'
import useAppAddress from 'src/hooks/useAppAddress'
import { SvgUri } from 'react-native-svg'
import Toast from 'react-native-toast-message'

const Author = ({ navigation }: { navigation?: any }) => {
  const { address, connector, isConnected } = useAccount()
  const [isDeposit, setIsDeposit] = useState(false)
  const [isImport, setIsImport] = useState(false)
  const [isDelist, setIsDelist] = useState(false)
  const [isSell, setIsSell] = useState(false)
  const [dataNFT, setDataNFT] = useState(undefined)
  const [isLoading, setIsLoading] = useState(false)
  const [reload, setReLoad] = useState(true)
  const [tab, setTab] = useState('All')
  const { data: nfts, mutate: getAllNftOfAddress } = useGetNftsOfAddress()
  console.log({ nfts })
  console.log({ isLoading })
  const tabs = [
    {
      title: 'All',
    },
    {
      title: 'Sale',
    },
    {
      title: 'NotForSale',
    },
  ]

  const handleGetAllNftOfAddress = () => {
    if (address) {
      setIsLoading(true)
      getAllNftOfAddress({
        ownerAddress: address,
      })
        .then((res) => {})
        .catch((err) => {})
        .finally(() => {
          setIsLoading(false)
        })
    }
  }
  // Get Native balance
  const { data: nativeBalanceData } = useBalance({ address })
  const amount = nativeBalanceData?.formatted
  // display denom is unit (AIOZ, ETH, BNB, ...)
  const displayDenom = nativeBalanceData?.symbol

  // Get Token Exchange balance (WUIT)
  const ExchangeTokenAddress = useAppAddress('WUIT')
  const { data: tokenExchangeBalanceData } = useBalance({
    address,
    token: ExchangeTokenAddress,
  })
  const tokenExchangeAmount = tokenExchangeBalanceData?.formatted
  const tokenExchangeDisplay = tokenExchangeBalanceData?.symbol

  useEffect(() => {
    if (isConnected) {
      handleGetAllNftOfAddress()
    }
  }, [reload, isConnected])

  return (
    <>
      <View style={styles.createScreen}>
        <ModalDeposit isVisible={isDeposit} setIsVisible={setIsDeposit}></ModalDeposit>
        <ModalImport isVisible={isImport} setIsVisible={setIsImport}></ModalImport>
        <ModalDelist isVisible={isDelist} setIsVisible={setIsDelist} item={dataNFT}></ModalDelist>
        <ModalSell isVisible={isSell} setIsVisible={setIsSell} item={dataNFT}></ModalSell>
        {/* <ModalSend></ModalSend> */}
        {/* <Header
                title={"Create NFT"}
                right="more-vertical"
            ></Header> */}
        {!isConnected ? (
          <View style={styles.containerNoConnect}>
            <ImageBackground
              imageStyle={{ opacity: 1, flex: 1, justifyContent: 'center', alignItems: 'center' }}
              source={require('../../assets/images/background.jpg')}
              style={styles.noConnectBg}
              resizeMode="cover"
            >
              <View style={styles.connectForm}>
                <Image
                  style={styles.connectImage}
                  source={{
                    uri: 'https://cdni.iconscout.com/illustration/premium/thumb/no-internet-connection-8316263-6632283.png',
                  }}
                ></Image>
                <Text style={[styles.text, styles.connectTitle]}>No Connect</Text>
                <Text style={[styles.text, styles.connectDes]}>
                  Please choose a wallet you want to connect. There are several wallet providers.
                </Text>
              </View>
            </ImageBackground>
          </View>
        ) : (
          <ScrollView
            style={styles.createContent}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            <View style={styles.container}>
              <View style={styles.headLine}>
                <ImageBackground
                  imageStyle={{ borderRadius: 10, opacity: 0.75, justifyContent: 'center' }}
                  source={require('../../assets/images/createBg2.jpg')}
                  resizeMode="cover"
                  style={styles.headLineBg}
                >
                  <View style={styles.headLineAvatar}>
                    <SvgUri
                      width={'100%'}
                      height={'100%'}
                      uri={getAvatarByAddress(address ? address : DEFAULT_ADDRESS)}
                    ></SvgUri>
                  </View>
                  {/* <Image
                  style={styles.headLineAvatar}
                  source={require('../../assets/images/avatarDefault.png')}
                ></Image> */}
                </ImageBackground>
              </View>
              <View style={[styles.walletInfo]}>
                <Text style={[styles.text, styles.walletAddress]}>
                  {address && shorterAddress(address.toString())}
                </Text>
                {/* <View style={[styles.walletStatusContainer]}>
                                    <Text style={[styles.walletStatusTitle, styles.label]}>Status</Text>
                                    <Text style={[styles.walletStatusValue]}>Connected</Text>
                                </View> */}
                <View style={styles.walletAction}>
                  <Button style={[styles.btn]} onPress={() => setIsDeposit(true)}>
                    <Text style={styles.btnText}>Deposit</Text>
                  </Button>
                  <Button style={[styles.btn]} onPress={() => setIsImport(true)}>
                    <Text style={styles.btnText} numberOfLines={1} ellipsizeMode="tail">
                      Import Collection
                    </Text>
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
                  <Text style={[styles.label]}>Balance</Text>
                  <Text style={[styles.text, styles.balanceAZ]}>{`${amount} ${displayDenom}`}</Text>
                  <Text
                    style={[styles.text, styles.balanceWB]}
                  >{`${tokenExchangeAmount} ${tokenExchangeDisplay}`}</Text>
                </View>
              </View>
              <View style={styles.nftContent}>
                <Tabs items={tabs} setTab={setTab} reload={reload} setReload={setReLoad} />
                <PageLoading isVisible={isLoading}></PageLoading>
                {isLoading == false && (
                  <FlatList
                    columnWrapperStyle={{
                      justifyContent: 'space-between',
                    }}
                    scrollEnabled={false}
                    style={styles.listNft}
                    data={nfts?.filter(
                      (item) =>
                        tab.toLowerCase() === tabs[0].title.toLowerCase() ||
                        item.status.toLowerCase() === tab.toLowerCase(),
                    )}
                    numColumns={2}
                    renderItem={({ item }) => {
                      if (tab.toLowerCase() === tabs[0].title.toLowerCase()) {
                        return (
                          <View style={styles.nftItem}>
                            <NFTCard
                              item={item}
                              isDelist={item.status === 'Sale'}
                              isSell={item.status !== 'Sale'}
                              onShowModal={item.status === 'Sale' ? setIsDelist : setIsSell}
                              setDataNFT={setDataNFT}
                            ></NFTCard>
                          </View>
                        )
                      } else {
                        if (
                          item.status.toLowerCase() === tab.toLowerCase() &&
                          tab.toLowerCase() === tabs[1].title.toLowerCase()
                        ) {
                          return (
                            <View style={styles.nftItem}>
                              <NFTCard
                                item={item}
                                isDelist={true}
                                onShowModal={setIsDelist}
                                setDataNFT={setDataNFT}
                              ></NFTCard>
                            </View>
                          )
                        }
                        if (
                          item.status.toLowerCase() === tab.toLowerCase() &&
                          tab.toLowerCase() === tabs[2].title.toLowerCase()
                        ) {
                          return (
                            <View style={styles.nftItem}>
                              <NFTCard
                                item={item}
                                isSell={true}
                                onShowModal={setIsSell}
                                setDataNFT={setDataNFT}
                              ></NFTCard>
                            </View>
                          )
                        }
                      }
                      return null
                    }}
                  />
                )}
              </View>
            </View>
          </ScrollView>
        )}
      </View>
      <Toast></Toast>
    </>
  )
}

export default Author
