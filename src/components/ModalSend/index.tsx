import { View, Text, Image, TouchableOpacity, Modal, TextInput, ScrollView } from 'react-native'
import { Button } from 'react-native-paper'
import React, { useState } from 'react'
import styles from './styles'
import { AntDesign } from '@expo/vector-icons'
import { Colors } from 'src/constants/Colors'
import { Platform } from 'react-native'

const ModalSend = ({
  item,
  index,
  isVisible,
  setIsVisible,
}: {
  item: any
  index: number
  isVisible: boolean
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const [isFocused, setIsFocused] = useState(false)
  return (
    <Modal transparent={true} visible={isVisible}>
      <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => {
              setIsVisible(false)
            }}
            style={styles.modalOverlay}
          ></TouchableOpacity>
          <View style={styles.modalSendForm}>
            <ScrollView
              style={styles.scrollView}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            >
              <View style={styles.headLine}>
                <AntDesign
                  name="closecircle"
                  size={24}
                  color={Colors.color_label_200}
                  onPress={() => {
                    setIsVisible(false)
                  }}
                />
              </View>
              <View style={styles.modalSendTitle}>
                <Image
                  style={styles.modalSendTitleImg}
                  source={require('../../assets/images/sendToken.jpg')}
                ></Image>
                <Text numberOfLines={1} style={[styles.text, styles.modalSendTitleCont]}>
                  Send Token
                </Text>
                <Text style={[styles.text, styles.modalSendTitleDes]}>
                  Enter token and address you want to send
                </Text>
              </View>
              <View style={styles.modalSendInfo}>
                <View style={[styles.modalSendInfoItem]}>
                  <Text style={[styles.text, styles.modalSendInfoItemTitle]}>From</Text>
                  <View style={[styles.modalSendInfoItemValue]}>
                    <TextInput
                      id="from"
                      placeholderTextColor={Colors.color_label_200}
                      onFocus={() => setIsFocused(true)}
                      style={[
                        styles.input,
                        isFocused && Platform.OS === 'web' && { outline: 'none' },
                      ]}
                      placeholder="Ex: 0x000...000"
                    ></TextInput>
                  </View>
                </View>
                <View style={[styles.modalSendInfoItem]}>
                  <Text style={[styles.text, styles.modalSendInfoItemTitle]}>To</Text>
                  <View style={[styles.modalSendInfoItemValue]}>
                    <TextInput
                      id="to"
                      placeholderTextColor={Colors.color_label_200}
                      onFocus={() => setIsFocused(true)}
                      style={[
                        styles.input,
                        isFocused && Platform.OS === 'web' && { outline: 'none' },
                      ]}
                      placeholder="Ex: 0x000...000"
                    ></TextInput>
                  </View>
                </View>
                <View style={[styles.modalSendInfoItem]}>
                  <Text style={[styles.text, styles.modalSendInfoItemTitle]}>Address</Text>
                  <View style={[styles.modalSendInfoItemValue]}>
                    <TextInput
                      id="address"
                      placeholderTextColor={Colors.color_label_200}
                      onFocus={() => setIsFocused(true)}
                      style={[
                        styles.input,
                        isFocused && Platform.OS === 'web' && { outline: 'none' },
                      ]}
                      placeholder="Ex: 0x000...000"
                    ></TextInput>
                  </View>
                </View>
              </View>

              <View style={styles.modalSendAction}>
                <Button style={[styles.btn, styles.modalSendBtnOk]}>
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
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </Modal>
  )
}

export default ModalSend
