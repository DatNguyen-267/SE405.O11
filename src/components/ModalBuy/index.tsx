import { AntDesign } from '@expo/vector-icons'
import React from 'react'
import { Image, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { Button } from 'react-native-paper'
import Toast from 'react-native-toast-message'
import { useDispatch } from 'react-redux'
import styles from './styles'
import { Colors } from 'src/constants/Colors'
import { onShowToastSuccess } from 'src/utils/toast'
import { StatusBar } from 'expo-status-bar'
import { shorterAddress } from 'src/utils/common'

interface IModalBuy {
  item?: any
  index?: number
  isVisible?: boolean
  setIsVisible?: any
}
const ModalBuy = ({ item, index, isVisible, setIsVisible }: IModalBuy) => {

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
                <Image
                  style={styles.modalBuyNftImg}
                  source={require('../../assets/images/createBg.jpg')}
                >
                </Image>
                <Text numberOfLines={1} style={[styles.text, styles.modalBuyNftName]}>
                  {item && item.name ? item.name : "Undefined"}
                </Text>
                <Text style={[styles.text, styles.modalBuyNftAdd]}>{item && item.creatorAddress ? shorterAddress(item.collectionAddress, 10) : '0x000...000'}</Text>
              </View>
              <View style={styles.modalBuyInfo}>
                <View style={[styles.modalBuyInfoItem]}>
                  <Text style={[styles.text, styles.modalBuyInfoItemTitle]}>Price</Text>
                  <View style={[styles.modalBuyInfoItemValue]}>
                    <Text numberOfLines={1} style={[styles.text, styles.number]}>
                      {item && item.price ? item.price : "Undefined"}
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
                      {item && item.price ?   ((Number(item.price) * 0.1) / 100 +Number(item.price)).toFixed(8) : "Undefined"}
                    </Text>
                    <Text style={[styles.text, styles.unit]}>WUIT</Text>
                  </View>
                </View>
              </View>

              <View style={styles.modalBuyAction}>
                <Button
                  style={[styles.btn, styles.modalBuyBtnOk]}
                  onPress={() => {
                    onShowToastSuccess('Congratulation for you!!!')
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
