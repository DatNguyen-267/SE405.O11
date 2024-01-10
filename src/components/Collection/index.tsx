import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './styles'
import { getAvatarByAddress, shorterAddress } from 'src/utils'
import { SvgUri } from 'react-native-svg'
import { useGetNameOfCollection } from 'src/hooks/useNFT'
import { Address } from 'viem'
import { DEFAULT_ADDRESS } from 'src/constants'
interface ProfileCardProps {
  item?: any
  index?: number
  navigation?: any
  address?: string
  search?: string
}
const Collection = ({ item, index, navigation, address, search }: ProfileCardProps) => {
  const [name, setName] = useState<string>('')
  const { mutate: handleGetNameOfCollection } = useGetNameOfCollection()

  useEffect(() => {
    if (item && address) {
      handleGetNameCollection(`0x${address.slice(2)}`)
    }
  }, [])

  const handleGetNameCollection = async (address: Address) => {
    handleGetNameOfCollection({
      cltAddress: address,
    }).then((res) => {
      if (res) {
        setName(res.toString())
      }
    })
  }

  return (
    <TouchableOpacity
      style={
        search === '' || (search && name.toLowerCase().includes(search.toLowerCase()))
          ? { display: 'flex' }
          : { display: 'none' }
      }
      onPress={() =>
        navigation.navigate('Collection', {
          item: item,
          address: address,
        })
      }
    >
      <View style={styles.Collection}>
        <View style={styles.collectionHead}>
          {address ? (
            <SvgUri width={'100%'} height={'100%'} uri={getAvatarByAddress(address)}></SvgUri>
          ) : (
            <SvgUri width={'100%'} height={'100%'} uri={getAvatarByAddress(DEFAULT_ADDRESS)}></SvgUri>
          )}
        </View>
        <View style={styles.collectionContent}>
          <View style={styles.collectionInfo}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={[styles.text, styles.collectionName]}
            >
              {name ? name : <>...</>}
            </Text>

            <Text style={[styles.text, styles.collectionAddress]}>
              {address ? shorterAddress(address, 10) : ''}
            </Text>
            <View style={styles.collectionOwner}>
              <View style={styles.collectionOwnerAvatar}>
                {item && item.creatorAddress ? (
                  <SvgUri
                    width={'100%'}
                    height={'100%'}
                    uri={getAvatarByAddress(item.creatorAddress)}
                  ></SvgUri>
                ) : (
                  <SvgUri
                  width={'100%'}
                  height={'100%'}
                  uri={getAvatarByAddress(DEFAULT_ADDRESS)}
                ></SvgUri>
                )}
              </View>
              <Text style={[styles.text, styles.collectionOwnerAdd]}>
                {item && item.creatorAddress ? shorterAddress(item.creatorAddress, 10) : ''}
              </Text>
            </View>
            <View style={styles.collectionAmount}>
              {/* <Image
              resizeMode="cover"
              style={styles.collectionAmountIcon}
              source={require('../../assets/images/nft.png')}
            ></Image> */}
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default Collection
