import { AntDesign } from '@expo/vector-icons'
import React, { useState } from 'react'
import { Image, Modal, ScrollView, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import { Button } from 'react-native-paper'
import Toast from 'react-native-toast-message'
import { onShowToastError, onShowToastSuccess } from 'src/utils/toast'
import styles from './styles'
import { Colors } from 'src/constants/Colors'
import { getAvatarByAddress, getUrlImage, shorterAddress } from 'src/utils'
import { onHideLoading, onShowLoading } from 'src/utils/loading'
import { useDispatch } from 'react-redux'
import { useCancelAskOrder } from 'src/hooks/useMarket'
import { SvgUri } from 'react-native-svg'
import { DEFAULT_ADDRESS } from 'src/constants'

interface IModal {
  item?: any
  index?: number
  isVisible?: boolean
  setIsVisible?: any
  setReload?: any
  reload?: boolean
}
const ModalDelist = ({ item, index, isVisible, setIsVisible, setReload, reload }: IModal) => {
  const { mutate: cancelAskOrder } = useCancelAskOrder()
  const handleDelist = () => {
    if (item) {
      onShowLoading(dispatch)
      cancelAskOrder({
        collectionAddress: item.collectionAddress,
        tokenId: item.tokenId,
      }).then((res) => {
        // onShowToastSuccess("Delist NFT Successfully")
        ToastAndroid.show('Delist NFT Successfully!', ToastAndroid.SHORT)
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

    }
    else {
      // onShowToastError("Not found information NFT!!!")
      ToastAndroid.show("Not found information NFT!!!", ToastAndroid.SHORT)
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
        <View style={styles.modalDelistForm}>
          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            <View style={styles.formContent}>
              <View style={styles.headLine}>
                <Text style={[styles.text, styles.modalDelistTitle]}>Delist NFT</Text>
                <AntDesign
                  name="closecircle"
                  size={24}
                  color={Colors.color_label_200}
                  onPress={() => {
                    setIsVisible(false)
                  }}
                />
              </View>
              <View style={styles.modalDelistNft}>
                <View style={styles.modalDelistNftImg}>
                  {
                    item && item.imageGatewayUrl ?
                      <Image
                        resizeMode="cover"
                        style={{ width: '100%', height: '100%' }}
                        source={{
                          uri: getUrlImage(item.imageGatewayUrl)
                        }}
                      ></Image>
                      : <SvgUri
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
                  style={styles.modalDelistNftImg}
                  source={require('../../assets/images/createBg.jpg')}
                ></Image> */}
                <Text numberOfLines={1} style={[styles.text, styles.modalDelistNftName]}>
                  {item && item.title ? item.title : "..."}
                </Text>
                <Text style={[styles.text, styles.modalDelistNftAdd]}>
                  {item && item.collectionAddress ? shorterAddress(item.collectionAddress, 10) : '...'}
                </Text>
              </View>
              {/* <View style={styles.modalDelistInfo}>
                                <View style={[styles.modalDelistInfoItem, styles.modalDelistPrice]}>
                                    <Text style={[styles.text, styles.modalDelistInfoItemTitle]}>Price</Text>
                                    <View style={[styles.modalDelistInfoItemValue]}>
                                        <TextInput

                                            placeholderTextColor={Colors.color_label_200}
                                            onFocus={() => setIsFocused(true)}
                                            style={[styles.input, isFocused && Platform.OS === 'web' && { outlineStyle: 'none' }]}
                                            placeholder='0'
                                            keyboardType = 'number-pad'
                                        ></TextInput>
                                        <Text style={[styles.text, styles.unit]}>WBNB</Text>
                                    </View>
                                </View>
                                <View style={[styles.modalDelistInfoItem, styles.modalDelistFee]}>
                                    <Text style={[styles.text, styles.modalDelistInfoItemTitle]}>Rarible</Text>
                                    <View style={[styles.modalDelistInfoItemValue]}>
                                        <Text numberOfLines={1} style={[styles.text, styles.number]}>0</Text>
                                        <Text style={[styles.text, styles.unit]}>%</Text>
                                    </View>
                                </View>
                                <View style={[styles.modalDelistInfoItem, styles.modalDelistTotal]}>
                                    <Text style={[styles.text, styles.modalDelistInfoItemTitle]}>Total</Text>
                                    <View style={[styles.modalDelistInfoItemValue]}>
                                        <Text numberOfLines={1} style={[styles.text, styles.number]}>0.02</Text>
                                        <Text style={[styles.text, styles.unit]}>WBNB</Text>
                                    </View>
                                </View>
                            </View> */}
              <Text style={[styles.text, styles.modalQuestion]}>
                Are you want to delist this NFT?
              </Text>
              <View style={styles.modalDelistAction}>
                <Button
                  style={[styles.btn, styles.modalDelistBtnOk]}
                  onPress={() => {
                    handleDelist()
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

export default ModalDelist
