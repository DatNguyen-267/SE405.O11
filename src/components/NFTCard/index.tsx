import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './styles'
import { SvgUri } from 'react-native-svg'
import { shorterAddress } from 'src/utils/common'
import { ethereumAddressRegex } from 'src/utils/regex'
import { useGetNameOfCollection, useGetTokenURI } from 'src/hooks/useNFT'
import { getMetadata, getUrlImage } from 'src/utils'
import { DEFAULT_ADDRESS } from 'src/constants'
import { NftItem } from 'src/types'
import { onShowToastInfo } from 'src/utils/toast'

interface ProfileCardProps {
  item?: any
  index?: number
  onShowModal?: any
  isDelist?: boolean
  isBuy?: boolean
  isSell?: boolean
  setDataNFT?: any
}
const NFTCard = ({
  item,
  index,
  onShowModal,
  isDelist,
  isBuy,
  isSell,
  setDataNFT,
}: ProfileCardProps) => {
  const windowWidth = Dimensions.get("window").width;
  const aspectRatio = ((windowWidth/2)-25)/150
  const [metaData, setMetaData] = useState<any>(undefined)
  const [nft, setNft] = useState<any>(item)
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
      setDataNFT(nft)
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
        setNft(item)
        setIsLoading(false)
      })
      .catch(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    if (item && item.collectionAddress) {
      setNft(item)
      handleGetMetadata()
    }
  }, [item])
  return (
    <TouchableOpacity>
      <View style={styles.NFTCard}>
        <View style={styles.cardHead}>
          {/* {
            metaData && metaData.image
              ? <Image
                resizeMode="cover"
                style={styles.cardImage}
                source={{
                  uri: getUrlImage(metaData.image)
                }}
              ></Image>
              : <View style={styles.cardImageDefault}>
                <SvgUri
                  width={300}
                  height={'100%'}
                  uri={getAvatarByAddress(DEFAULT_ADDRESS)}
                ></SvgUri>
              </View>
          } */}
          <View style={[styles.cardImage, {aspectRatio: aspectRatio}]}>
            {
              metaData && metaData.image ?
              <Image
                resizeMode="cover"
                style={{ width: '100%', height: '100%' }}
                source={{
                  uri:getUrlImage(metaData.image)                     
                }}
              ></Image>
              :
              <SvgUri
                width={'100%'}
                height={'100%'}
                preserveAspectRatio="none"
                uri={getAvatarByAddress(item && item.collectionAddress ? item.collectionAddress: DEFAULT_ADDRESS)}
              ></SvgUri>
            }
          </View>
          <View style={styles.cardHeadLine}>
            <Text style={[styles.text, styles.cardAddress]}>
              {item.collectionAddress ? shorterAddress(item.collectionAddress) : '0x000...000'}
            </Text>
          </View>
        </View>
        <View style={styles.cardContent}>
          <View style={styles.cardInfo}>
            <View style={styles.cardContentName}>
              <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.text, styles.cardName]}>
                {metaData && metaData.name ? metaData.name : 'NFT Name'}
              </Text>
              <Text style={[styles.text, styles.cardId]}>
                {item.tokenId ? '#' + item.tokenId : '#0'}
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
                {item.seller ? shorterAddress(item.seller) : '0x000...000'}
              </Text>
            </View>
            <Text style={[styles.text, styles.cardPrice]}>
              {item.price ? item.price : '0'} WUIT
            </Text>
          </View>
        </View>
        <View style={styles.cardAction}>
          {isBuy ? (
            <TouchableOpacity onPress={() => handleClick()} style={styles.cardBtn}>
              <Text style={[styles.text, styles.cardBtnText]}>Buy NFT</Text>
            </TouchableOpacity>
          ) : (
            <></>
          )}
          {isSell ? (
            <TouchableOpacity onPress={() => handleClick()} style={styles.cardBtn}>
              <Text style={[styles.text, styles.cardBtnText]}>Sell NFT</Text>
            </TouchableOpacity>
          ) : (
            <></>
          )}
          {isDelist ? (
            <TouchableOpacity
              onPress={() => handleClick()}
              style={[styles.cardBtn, styles.cardBtnDelist]}
            >
              <Text style={[styles.text, styles.cardBtnText]}>Delist NFT</Text>
            </TouchableOpacity>
          ) : (
            <></>
          )}
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default NFTCard
