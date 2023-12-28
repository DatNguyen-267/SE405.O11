import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './styles'
import { SvgUri } from 'react-native-svg'
import { shorterAddress } from 'src/utils/common'
import { ethereumAddressRegex } from 'src/utils/regex'

interface ProfileCardProps {
  item?: any
  index?: number
  onShowModal?: any
  isDelist?: boolean
  isBuy?: boolean
  isSell?: boolean
  setDataNFT?: any
}
const NFTCard = ({ item, index, onShowModal, isDelist, isBuy, isSell, setDataNFT }: ProfileCardProps) => {

  const getAvatarByAddress = (address: string) => {
    if (ethereumAddressRegex.test(address)) {
      return `https://effigy.im/a/${address}.svg`
    } else {
      return `https://effigy.im/a/${"0x0000000000000000000000000000000000000000"}.svg`
    }
  }

  const handleClick = () =>{
    setDataNFT(item)
    onShowModal(true)

  }

  return (
    <TouchableOpacity>
      <View style={styles.NFTCard}>
        {/* <Image
          resizeMode="cover"
          style={styles.cardImage}
          source={{
            uri: item
              ? item.img
              : 'https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg',
          }}
        ></Image> */}
        <View style={styles.cardHead}>
          <Image
            resizeMode="cover"
            style={styles.cardImage}
            source={{
              uri: item.img
                ? item.img
                : 'https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg',
            }}
          ></Image>
          <View style={styles.cardHeadLine}>
            <Text style={[styles.text, styles.cardAddress]}>{item.collectionAddress? shorterAddress(item.collectionAddress): "0x000...000"}</Text>
            {/* <Text style={[styles.text, styles.cardStatus]}>Not For Sell</Text> */}
          </View>
        </View>
        <View style={styles.cardContent}>
          {/* <View style={styles.cardHeadLine}>
                        <Text style={[styles.text, styles.cardAddress]}>0x000 ... 000</Text>
                        <Text style={[styles.text, styles.cardStatus]}>Not For Sell</Text>
                    </View> */}
          <View style={styles.cardInfo}>
            <View style={styles.cardContentName}>
              <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.text, styles.cardName]}>
                {item.name ? item.name : 'NFT Name'}
              </Text>
              <Text style={[styles.text, styles.cardId]}>{item.tokenId? "#"+item.tokenId: "#0"}</Text>
            </View>
            <View style={styles.cardCollection}>
              <View style={styles.cardAvatar}>
                {
                  item && item.seller ?
                    <SvgUri
                      width={'100%'}
                      height={'100%'}
                      uri={getAvatarByAddress(item.seller)}
                    ></SvgUri>
                    :
                    <Image
                      resizeMode='cover'
                      style={{width: '100%', height: '100%'}}
                      source={require('./../../assets/images/avatarDefault.png')}
                    >
                    </Image>
                }
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
              <Text style={[styles.text, styles.cardCollectionAddress]}>{item.seller? shorterAddress(item.seller): "0x000...000"}</Text>
            </View>
            <Text style={[styles.text, styles.cardPrice]}>{item.price} WUIT</Text>
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
