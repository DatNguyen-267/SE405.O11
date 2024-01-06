import React, { useEffect, useMemo } from 'react'
import { FlatList, Image, ImageBackground, ScrollView, Text, View } from 'react-native'

import { useState } from 'react'
import ModalBuy from 'src/components/ModalBuy'
import NFTCard from 'src/components/NFTCard'
import styles from './styles'
import { getAvatarByAddress } from 'src/utils/avatar'
import { shorterAddress } from 'src/utils/common'
import { useLocalSearchParams } from 'expo-router'
import { mappingAsksToNftList, useViewAsksByCollection } from 'src/hooks/useMarket'
import useAppAddress from 'src/hooks/useAppAddress'
import { SvgUri } from 'react-native-svg'
import PageLoading from 'src/components/PageLoading'
import { DEFAULT_ADDRESS } from 'src/constants'
import { useGetNFTsOfCollection } from 'src/hooks/useNFT'

const Collection = ({ navigation, route }: { navigation?: any; route?: any }) => {
  const [profile, setProfile] = useState(null)
  const [isFocused, setIsFocused] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [dataNFT, setDataNFT] = useState(undefined)
  const [reload, setReLoad] = useState(true)
  // const item = route.params.item
  const params = useLocalSearchParams<{ address: string; item: any }>()
  const collectionAddress = params.address
  const collectionDetail = params.item

  const marketAddress = useAppAddress('MARKET')
  const { mutate: handleGetByCollectionAddress, data: asks } = useViewAsksByCollection()

  const { mutate: handleGetAllNftOfCollection, data: nfts } = useGetNFTsOfCollection()

  const mappingList = useMemo(() => {
    if (nfts && asks) {
      const res = mappingAsksToNftList(asks, nfts)
      return res
    } else return undefined
  }, [nfts, asks])
  console.log({asks})

  const isLoadingGetAsk = !!!mappingList

  useEffect(() => {
    const newAddress = collectionAddress.slice(2)

    handleGetByCollectionAddress({
      marketAddress: marketAddress,
      collectionAddress: `0x${newAddress}`,
      cursor: 0,
      size: 20,
    })

    handleGetAllNftOfCollection({
      cltAddress: `0x${newAddress}`,
    })
  }, [reload])

  const changeConnect = () => {
    setIsConnected(!isConnected)
  }

  return (
    <View style={styles.createScreen}>
      <ModalBuy isVisible={isVisible} setIsVisible={setIsVisible} item={dataNFT} reload={reload} setReload={setReLoad}></ModalBuy>
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
                {collectionAddress ? (
                  <SvgUri
                    width={'100%'}
                    height={'100%'}
                    uri={getAvatarByAddress(collectionAddress)}
                  ></SvgUri>
                ) : (
                  <Image
                    resizeMode="cover"
                    style={{ width: '100%', height: '100%' }}
                    source={require('./../../assets/images/avatarDefault.png')}
                  ></Image>
                )}
              </View>
              {/* <Image
                style={styles.headLineAvatar}
                source={{
                  uri: item
                    ? item.img
                    : 'https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg',
                }}
              ></Image> */}
            </ImageBackground>
          </View>
          <View style={[styles.walletInfo]}>
            <Text style={[styles.text, styles.walletAddress]}>
              {collectionAddress ? shorterAddress(collectionAddress.toString(), 10) : '0x000...000'}
            </Text>
            <View style={[styles.walletOwnerContainer]}>
              <Text style={[styles.walletOwnerTitle, styles.label]}>Owner Of:</Text>
              <Text style={[styles.text, styles.walletOwnerAddress]}>
                {collectionDetail
                  ? shorterAddress(collectionDetail.creatorAddress, 10)
                  : '0x000...000'}
              </Text>
            </View>
          </View>
          <View style={styles.nftContent}>
            <Text style={[styles.text, styles.title]}>All NFT</Text>
            <PageLoading isVisible={isLoadingGetAsk}></PageLoading>
            {!isLoadingGetAsk && (
              <FlatList
                columnWrapperStyle={{
                  justifyContent: 'space-between',
                }}
                scrollEnabled={false}
                style={styles.listNft}
                data={mappingList}
                numColumns={2}
                renderItem={({ item }) => {
                  return (
                    <View style={styles.nftItem}>
                      <NFTCard
                        item={item}
                        onShowModal={setIsVisible}
                        isBuy={item.status === 'Sale'}
                        setDataNFT={setDataNFT}
                      ></NFTCard>
                    </View>
                  )
                  // if (item.status.toLowerCase() === 'on sale') {
                  //   return (
                  //     <View style={styles.nftItem}>
                  //       <NFTCard item={item} onShowModal={setIsVisible} isBuy={true}></NFTCard>
                  //     </View>
                  //   )
                  // } else {
                  //   return (
                  //     <View style={styles.nftItem}>
                  //       <NFTCard item={item}></NFTCard>
                  //     </View>
                  //   )
                  // }
                }}
              />
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default Collection
