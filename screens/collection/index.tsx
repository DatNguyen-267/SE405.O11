import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ImageBackground,
  FlatList,
} from 'react-native'

import { Button, Caption, Paragraph, Surface, Title } from 'react-native-paper'
import { useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import styles from './styles'
import { Platform } from 'react-native'
import NFTCard from '../../components/NFTCard'
import ModalBuy from '../../components/ModalBuy'

const Collection = ({ navigation, route }) => {
  const [profile, setProfile] = useState(null)
  const [isFocused, setIsFocused] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const item = route.params.item
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

  const changeConnect = () => {
    setIsConnected(!isConnected)
  }

  return (
    <View style={styles.createScreen}>
      <ModalBuy isVisible={isVisible} setIsVisible={setIsVisible}></ModalBuy>
      <ScrollView
        style={styles.createContent}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.container}>
          <View style={styles.headLine}>
            <ImageBackground
              imageStyle={{ borderRadius: 10, opacity: 0.75, justifyContent: 'center' }}
              source={require('./../../assets/images/createBg2.jpg')}
              resizeMode="cover"
              style={styles.headLineBg}
            >
              <Image
                style={styles.headLineAvatar}
                source={{
                  uri: item
                    ? item.img
                    : 'https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg',
                }}
              ></Image>
            </ImageBackground>
          </View>
          <View style={[styles.walletInfo]}>
            <Text style={[styles.text, styles.walletAddress]}>0x000...000</Text>
            <View style={[styles.walletOwnerContainer]}>
              <Text style={[styles.walletOwnerTitle, styles.label]}>Owner Of:</Text>
              <Text style={[styles.text, styles.walletOwnerAddress]}>0x000...000</Text>
            </View>
          </View>
          <View style={styles.nftContent}>
            <Text style={[styles.text, styles.title]}>All NFT</Text>
            <FlatList
              columnWrapperStyle={{
                justifyContent: 'space-between',
              }}
              scrollEnabled={false}
              style={styles.listNft}
              data={data}
              numColumns={2}
              renderItem={({ item }) => {
                if (item.status.toLowerCase() === 'on sale') {
                  return (
                    <View style={styles.nftItem}>
                      <NFTCard item={item} onShowModal={setIsVisible} isBuy={true}></NFTCard>
                    </View>
                  )
                } else {
                  return (
                    <View style={styles.nftItem}>
                      <NFTCard item={item}></NFTCard>
                    </View>
                  )
                }
              }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default Collection
