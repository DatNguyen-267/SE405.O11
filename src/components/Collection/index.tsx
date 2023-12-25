import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './styles'

interface ProfileCardProps {
  item?: any
  index?: number
  navigation?: any
}
const Collection = ({ item, index, navigation }: ProfileCardProps) => {
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Collection', {
          item: item,
        })
      }
    >
      <View style={styles.Collection}>
        <View style={styles.collectionHead}>
          <Image
            resizeMode="cover"
            style={styles.collectionImage}
            source={{
              uri: item
                ? item.img
                : 'https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg',
            }}
          ></Image>
        </View>
        <View style={styles.collectionContent}>
          <View style={styles.collectionInfo}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={[styles.text, styles.collectionName]}
            >
              {item ? item.name : 'NFT Collection'}
            </Text>
            <Text style={[styles.text, styles.collectionAddress]}>0x000...000</Text>
            <View style={styles.collectionOwner}>
              <Image
                  resizeMode='cover'
                  style={styles.collectionOwnerAvatar}
                  source={require('./../../assets/images/avatarDefault.png')} 
              >
              </Image>
              <Text style={[styles.text, styles.collectionOwnerAdd]}>0x000...000</Text>
            </View>
            <View style={styles.collectionAmount}>
              {/* <Image
                resizeMode="cover"
                style={styles.collectionAmountIcon}
                source={require('../../assets/images/nft.png')}
              ></Image> */}
              <Text style={[styles.text, styles.collectionAmountValue]}>NFTs: </Text>
              <Text style={[styles.text, styles.collectionAmountValue]}>34</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default Collection
