import { AntDesign } from '@expo/vector-icons'
import React, { useState } from 'react'
import { Image, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { Button } from 'react-native-paper'
import Toast from 'react-native-toast-message'
import { onShowToastSuccess } from 'src/utils/toast'
import styles from './styles'
import { Colors } from 'src/constants/Colors'

interface IModal {
  item?: object
  index?: number
  isVisible?: boolean
  setIsVisible?: any
}
const ModalDelist = ({ item, index, isVisible, setIsVisible }: IModal) => {
  const [isFocused, setIsFocused] = useState(false)
  return (
    <Modal transparent={true} visible={isVisible}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            setIsVisible(false)
          }}
          style={styles.modalOverlay}
        ></TouchableOpacity>
        <View style={styles.modalSellForm}>
          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            <View style={styles.formContent}>
              <View style={styles.headLine}>
                <Text style={[styles.text, styles.modalSellTitle]}>Delist NFT</Text>
                <AntDesign
                  name="closecircle"
                  size={24}
                  color={Colors.color_label_200}
                  onPress={() => {
                    setIsVisible(false)
                  }}
                />
              </View>
              <View style={styles.modalSellNft}>
                <Image
                  style={styles.modalSellNftImg}
                  source={require('../../assets/images/createBg.jpg')}
                ></Image>
                <Text numberOfLines={1} style={[styles.text, styles.modalSellNftName]}>
                  NFT Name
                </Text>
                <Text style={[styles.text, styles.modalSellNftAdd]}>0x000 ... 000</Text>
              </View>
              {/* <View style={styles.modalSellInfo}>
                                <View style={[styles.modalSellInfoItem, styles.modalSellPrice]}>
                                    <Text style={[styles.text, styles.modalSellInfoItemTitle]}>Price</Text>
                                    <View style={[styles.modalSellInfoItemValue]}>
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
                                <View style={[styles.modalSellInfoItem, styles.modalSellFee]}>
                                    <Text style={[styles.text, styles.modalSellInfoItemTitle]}>Rarible</Text>
                                    <View style={[styles.modalSellInfoItemValue]}>
                                        <Text numberOfLines={1} style={[styles.text, styles.number]}>0</Text>
                                        <Text style={[styles.text, styles.unit]}>%</Text>
                                    </View>
                                </View>
                                <View style={[styles.modalSellInfoItem, styles.modalSellTotal]}>
                                    <Text style={[styles.text, styles.modalSellInfoItemTitle]}>Total</Text>
                                    <View style={[styles.modalSellInfoItemValue]}>
                                        <Text numberOfLines={1} style={[styles.text, styles.number]}>0.02</Text>
                                        <Text style={[styles.text, styles.unit]}>WBNB</Text>
                                    </View>
                                </View>
                            </View> */}
              <Text style={[styles.text, styles.modalQuestion]}>
                Are you want to delist this NFT?
              </Text>
              <View style={styles.modalSellAction}>
                <Button
                  style={[styles.btn, styles.modalSellBtnOk]}
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

export default ModalDelist
