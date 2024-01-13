import { AntDesign } from '@expo/vector-icons'
import React, { useEffect } from 'react'
import { Image, Modal, ScrollView, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import { Button } from 'react-native-paper'
import Toast from 'react-native-toast-message'
import { useDispatch } from 'react-redux'
import styles from './styles'
import { Colors } from 'src/constants/Colors'
import { onShowToastError, onShowToastSuccess } from 'src/utils/toast'
import { StatusBar } from 'expo-status-bar'
import { shorterAddress } from 'src/utils/common'
import { getAvatarByAddress, getUrlImage } from 'src/utils'
import { useBuyNFTUsingWrapToken } from 'src/hooks/useMarket'
import { onHideLoading, onShowLoading } from 'src/utils/loading'
import { SvgUri } from 'react-native-svg'
import { DEFAULT_ADDRESS } from 'src/constants'

interface IModalBuy {
  item?: any
  index?: number
  isVisible?: boolean
  setIsVisible?: any
  setReload?: any
  reload?: boolean
}
const ModalBuy = ({ item, index, isVisible, setIsVisible, setReload, reload }: IModalBuy) => {
  const { mutate: buyWithWrapToken } = useBuyNFTUsingWrapToken()
  const handleBuy = () => {
    if (item && item.price) {
      onShowLoading(dispatch)
      buyWithWrapToken({
        collectionAddress: item.collectionAddress,
        tokenId: item.tokenId,
        price: item.price,
      })
        .then((res) => {
          // onShowToastSuccess('Buy NFT Successfully')
          ToastAndroid.show('Buy NFT Successfully!', ToastAndroid.SHORT)
          setIsVisible(false)
          setReload(!reload)
        })
        .catch((err) => {
          // onShowToastError(err.message)
          ToastAndroid.show(err.message, ToastAndroid.SHORT)
        })
        .finally(() => {
          onHideLoading(dispatch)
        })
    } else {
      // onShowToastError('Not found information NFT!!!')
      ToastAndroid.show('Not found information NFT!!!', ToastAndroid.SHORT)
    }
  }
  const dispatch = useDispatch()
  return (
    <Modal transparent={true} visible={isVisible}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            setIsVisible(false)
          }}
          style={styles.modalOverlay}
        ></TouchableOpacity>
        <View style={styles.modalBuyForm}>
          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            <View style={styles.formContent}>
              <View style={styles.headLine}>
                <Text style={[styles.text, styles.modalBuyTitle]}>Buy NFT</Text>
                <AntDesign
                  name="closecircle"
                  size={24}
                  color={Colors.color_label_200}
                  onPress={() => {
                    setIsVisible(false)
                  }}
                />
              </View>
              <View style={styles.modalBuyNft}>
                {/* <Image style={styles.modalBuyNftImg}></Image> */}
                <View style={styles.modalBuyNftImg}>
                  {
                    item && item.imageGatewayUrl ?
                    <Image
                      resizeMode="cover"
                      style={{ width: '100%', height: '100%' }}
                      source={{
                        uri:getUrlImage(item.imageGatewayUrl)                     
                      }}
                    ></Image>
                    :<SvgUri
                      width={'100%'}
                      height={'100%'}
                      uri={getAvatarByAddress(item && item.collectionAddress ? item.collectionAddress: DEFAULT_ADDRESS)}
                    ></SvgUri>
                  }
                  {/* <Image
                    resizeMode="cover"
                    style={{ width: '100%', height: '100%' }}
                    source={{
                      uri:
                        item && item.imageGatewayUrl
                          ? getUrlImage(item.imageGatewayUrl)
                          : 'https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg',
                    }}
                  ></Image> */}
                </View>
                {/* <Image
                  style={styles.modalBuyNftImg}
                  source={require('../../assets/images/createBg.jpg')}
                >
                </Image> */}
                <Text numberOfLines={1} style={[styles.text, styles.modalBuyNftName]}>
                  {item && item.title ? item.title : '...'}
                </Text>
                <Text style={[styles.text, styles.modalBuyNftAdd]}>
                  {item && item.collectionAddress
                    ? shorterAddress(item.collectionAddress, 10)
                    : '...'}
                </Text>
              </View>
              <View style={styles.modalBuyInfo}>
                <View style={[styles.modalBuyInfoItem]}>
                  <Text style={[styles.text, styles.modalBuyInfoItemTitle]}>Price</Text>
                  <View style={[styles.modalBuyInfoItemValue]}>
                    <Text numberOfLines={1} style={[styles.text, styles.number]}>
                      {item && item.price ? item.price : '...'}
                    </Text>
                    <Text style={[styles.text, styles.unit]}>WUIT</Text>
                  </View>
                </View>
                <View style={[styles.modalBuyInfoItem]}>
                  <Text style={[styles.text, styles.modalBuyInfoItemTitle]}>Fee</Text>
                  <View style={[styles.modalBuyInfoItemValue]}>
                    <Text numberOfLines={1} style={[styles.text, styles.number]}>
                      0.1
                    </Text>
                    <Text style={[styles.text, styles.unit]}>%</Text>
                  </View>
                </View>
                <View style={[styles.modalBuyInfoItem, styles.modalBuyTotal]}>
                  <Text style={[styles.text, styles.modalBuyInfoItemTitle]}>Total</Text>
                  <View style={[styles.modalBuyInfoItemValue]}>
                    <Text numberOfLines={1} style={[styles.text, styles.number]}>
                      {item && item.price
                        ? ((Number(item.price) * 0.1) / 100 + Number(item.price)).toFixed(8)
                        : '...'}
                    </Text>
                    <Text style={[styles.text, styles.unit]}>WUIT</Text>
                  </View>
                </View>
              </View>

              <View style={styles.modalBuyAction}>
                <Button
                  style={[styles.btn, styles.modalBuyBtnOk]}
                  onPress={() => {
                    handleBuy()
                  }}
                >
                  <Text style={[styles.btnText, styles.btnTextOk]}>OK</Text>
                </Button>
                <Button
                  style={[styles.btn]}
                  onPress={() => {
                    setIsVisible(false)
                  }}
                >
                  <Text style={styles.btnText}>Canncel</Text>
                </Button>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
      <Toast></Toast>
    </Modal>
  )
}

export default ModalBuy
