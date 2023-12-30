import React, { useEffect } from 'react'
import { FlatList, Image, ImageBackground, ScrollView, Text, View } from 'react-native'

import { useState } from 'react'
import ModalBuy from 'src/components/ModalBuy'
import NFTCard from 'src/components/NFTCard'
import styles from './styles'
import { getAvatarByAddress } from 'src/utils/avatar'
import { shorterAddress } from 'src/utils/common'
import { useLocalSearchParams } from 'expo-router'
import { useViewAsksByCollection } from 'src/hooks/useMarket'
import useAppAddress from 'src/hooks/useAppAddress'
import { SvgUri } from 'react-native-svg'
import PageLoading from 'src/components/PageLoading'
import { DEFAULT_ADDRESS } from 'src/constants'

const Collection = ({ navigation, route }: { navigation?: any; route?: any }) => {
  const [profile, setProfile] = useState(null)
  const [isFocused, setIsFocused] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [dataNFT, setDataNFT] = useState(undefined)
  // const item = route.params.item
  const params = useLocalSearchParams<{ address: string; item: any }>()
  const collectionAddress = params.address
  const collectionDetail = params.item
  const data = [
    {
      img: 'https://th.bing.com/th/id/OIG.ey_KYrwhZnirAkSgDhmg',
      name: 'fox abc abc abc abc abc abc abc abc abc abc',
      status: 'On Sale',
    },
    {
      img: 'https://png.pngtree.com/background/20230411/original/pngtree-beautiful-moon-background-on-moon-night-picture-image_2392251.jpg',
      name: 'moon',
      status: 'On Sale',
    },
    {
      img: 'https://statusneo.com/wp-content/uploads/2023/02/MicrosoftTeams-image551ad57e01403f080a9df51975ac40b6efba82553c323a742b42b1c71c1e45f1.jpg',
      name: 'childreno',
      status: 'Not For Sale',
    },
    {
      img: 'https://deep-image.ai/blog/content/images/2022/09/underwater-magic-world-8tyxt9yz.jpeg',
      name: 'water',
      status: 'Not For Sale',
    },
  ]
  const marketAddress = useAppAddress('MARKET')
  const {
    mutate: handleGetByCollectionAddress,
    data: asks,
    isLoading: isLoadingGetAsk,
  } = useViewAsksByCollection()

  useEffect(() => {
    const newAddress = collectionAddress.slice(2)

    handleGetByCollectionAddress({
      marketAddress: marketAddress,
      collectionAddress: `0x${newAddress}`,
      cursor: 0,
      size: 20,
    })
  }, [])
  const changeConnect = () => {
    setIsConnected(!isConnected)
  }

  return (
    <View style={styles.createScreen}>
      <ModalBuy isVisible={isVisible} setIsVisible={setIsVisible} item={dataNFT}></ModalBuy>
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
                data={asks}
                numColumns={2}
                renderItem={({ item }) => {
                  return (
                    <View style={styles.nftItem}>
                      <NFTCard
                        item={item}
                        onShowModal={setIsVisible}
                        isBuy={true}
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
