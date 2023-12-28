import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './styles'
import { getAvatarByAddress, shorterAddress } from 'src/utils'
import { SvgUri } from 'react-native-svg'
interface ProfileCardProps {
item?: any
index?: number
navigation?: any
address?: string
}
const Collection = ({ item, index, navigation, address }: ProfileCardProps) => {
return (
  <TouchableOpacity
    onPress={() =>
      navigation.navigate('Collection', {
        item: item,
        address: address,
      })
    }
  >
    <View style={styles.Collection}>
      <View style={styles.collectionHead}>
        {
          address ?
            <SvgUri
              width={'100%'}
              height={'100%'}
              uri={getAvatarByAddress(address)}
            ></SvgUri>
            : <Image
              resizeMode='cover'
              style={styles.collectionImage}
              source={{
                uri: 'https://img.freepik.com/free-vector/gradient-nft-concept_23-2148964595.jpg'
              }}
            >
            </Image>
        }

      </View>
      <View style={styles.collectionContent}>
        <View style={styles.collectionInfo}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={[styles.text, styles.collectionName]}
          >
            {address ? shorterAddress(address, 10) : '0x000...000'}
          </Text>
          {/* <Text style={[styles.text, styles.collectionAddress]}>{address? shorterAddress(address, 7): '0x000...000'}</Text> */}
          <View style={styles.collectionOwner}>
            <View style={styles.collectionOwnerAvatar}>
              {
                item && item.creatorAddress ?
                  <SvgUri
                    width={'100%'}
                    height={'100%'}
                    uri={getAvatarByAddress(item.creatorAddress)}
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
            <Text style={[styles.text, styles.collectionOwnerAdd]}>{item && item.creatorAddress ? shorterAddress(item.creatorAddress, 10) : '0x000...000'}</Text>
          </View>
          <View style={styles.collectionAmount}>
            {/* <Image
              resizeMode="cover"
              style={styles.collectionAmountIcon}
              source={require('../../assets/images/nft.png')}
            ></Image> */}
            <Text style={[styles.text, styles.collectionAmountValue]}>NFTs: </Text>
            <Text style={[styles.text, styles.collectionAmountValue]}>undefine</Text>
          </View>
        </View>
      </View>
    </View>
  </TouchableOpacity>
)
}

export default Collection
