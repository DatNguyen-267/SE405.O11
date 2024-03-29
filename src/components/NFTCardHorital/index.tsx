import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './styles'
import { shorterAddress } from 'src/utils/common'
import { SvgUri } from 'react-native-svg'
import { getAvatarByAddress } from 'src/utils/avatar'
import { ethereumAddressRegex } from 'src/utils/regex'
import { useGetNameOfCollection, useGetTokenURI } from 'src/hooks/useMarket'
import { getMetadata, getUrlImage } from 'src/utils'
import { onShowToastInfo } from 'src/utils/toast'
import { DEFAULT_ADDRESS } from 'src/constants'
interface ProfileCardProps {
  item?: any
  index?: number
  setDataNFT?: any
  onShowModal?: any
}

const NFTCardHorital = ({ item, index, setDataNFT, onShowModal }: ProfileCardProps) => {
  const aspectRatio = 230 / 167
  const [metaData, setMetaData] = useState<any>(undefined)
  const { mutate: getTokenURI } = useGetTokenURI()
  const { mutate: handleGetNameOfCollection } = useGetNameOfCollection()
  const [isLoading, setIsLoading] = useState(false)
  const getAvatarByAddress = (address: string) => {
    if (ethereumAddressRegex.test(address)) {
      return `https://effigy.im/a/${address}.svg`
    } else {
      return `https://effigy.im/a/${'0x0000000000000000000000000000000000000000'}.svg`
    }
  }
  const handleClick = () => {
    if (setDataNFT !== undefined) {
      setDataNFT(item)
    }
    onShowModal(true)
  }
  const handleGetMetadata = async () => {
    setIsLoading(true)

    getTokenURI({
      cltAddress: item.collectionAddress,
      tokenId: item.tokenId,
    })
      .then(async (res) => {
        const data = await getMetadata(res)
        if (data) {
          item.title = data.name
          item.imageGatewayUrl = data.image
        }
        setMetaData(data)
        setIsLoading(false)
      })
      .catch(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    if (item && item.collectionAddress) {
      handleGetMetadata()
    }
  }, [item])
  return (
    <TouchableOpacity
      onPress={() => {
        handleClick()
      }}
    >
      <View style={styles.NFTCardHorital}>
        <View style={styles.cardHead}>
          <View style={[styles.cardImage, { aspectRatio: aspectRatio }]}>
            {metaData && metaData.image ? (
              <Image
                resizeMode="cover"
                style={{ width: '100%', height: '100%' }}
                source={{
                  uri: getUrlImage(metaData.image),
                }}
              ></Image>
            ) : (
              <SvgUri
                width={'100%'}
                height={'100%'}
                preserveAspectRatio="none"
                uri={getAvatarByAddress(item && item.seller ? item.seller : DEFAULT_ADDRESS)}
              ></SvgUri>
            )}
          </View>
          {/* <Image
          resizeMode="cover"
          style={styles.cardImage}
          source={{
            uri: item
              ? item.img
              : 'https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg',
          }}
        // source={require('./../../assets/images/nft1.png')}
        ></Image> */}
          <View style={styles.cardHeadLine}>
            <Text style={[styles.text, styles.cardAddress]}>
              {item.collectionAddress ? shorterAddress(item.collectionAddress) : '...'}
            </Text>
            {/* <Text style={[styles.text, styles.cardStatus]}>Not For Sell</Text> */}
            <Text style={[styles.text, styles.cardPrice]}>
              {item && item.price ? item.price : item.status == 'NotForSale' ? '0' : '...'} WUIT
            </Text>
          </View>
        </View>
        <View style={styles.cardContent}>
          <View style={styles.cardInfo}>
            <View style={styles.cardContentName}>
              <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.text, styles.cardName]}>
                {metaData && metaData.name ? metaData.name : '...'}
              </Text>
              <Text style={[styles.text, styles.cardId]}>
                {' '}
                {item.tokenId || item.tokenId == 0 ? '#' + item.tokenId : '#...'}
              </Text>
            </View>
            <View style={styles.cardCollection}>
              <View style={styles.cardAvatar}>
                {item && item.seller ? (
                  <SvgUri
                    width={'100%'}
                    height={'100%'}
                    uri={getAvatarByAddress(item.seller)}
                  ></SvgUri>
                ) : (
                  <SvgUri
                    width={'100%'}
                    height={'100%'}
                    uri={getAvatarByAddress(DEFAULT_ADDRESS)}
                  ></SvgUri>
                )}
              </View>
              {/* <Image
              resizeMode="cover"
              style={styles.cardAvatar}
              source={{
                uri: item
                  ? item.img
                  : 'https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg',
              }}
            ></Image> */}
              <Text style={[styles.text, styles.cardCollectionAddress]}>
                {item.seller ? shorterAddress(item.seller) : '...'}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default NFTCardHorital
