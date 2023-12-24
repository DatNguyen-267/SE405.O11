import { View, Text, Image, TouchableOpacity, Modal, TextInput, ScrollView } from 'react-native'
import { Button } from 'react-native-paper'
import React, { useState } from 'react'
import styles from './styles'
import { AntDesign } from '@expo/vector-icons'
import { Colors } from '../../constants/Colors'
import { Platform } from 'react-native'

interface IModal {
  item?: object
  index?: number
  isVisible?: boolean
  setIsVisible?: any
}
const ModalDeposit = ({ item, index, isVisible, setIsVisible }: IModal) => {
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
        <View style={styles.modalDepositForm}>
          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            <View style={styles.formContent}>
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
              <View style={styles.modalDepositTitle}>
                <Image
                  style={styles.modalDepositTitleImg}
                  source={require('./../../assets/images/deposit.png')}
                ></Image>
                <Text numberOfLines={1} style={[styles.text, styles.modalDepositTitleCont]}>
                  Deposit WBNB
                </Text>
                <Text style={[styles.text, styles.modalDepositTitleDes]}>
                  Enter value you want to deposit
                </Text>
              </View>
              <View style={styles.modalDepositInfo}>
                <View style={[styles.modalDepositInfoItem]}>
                  <Text style={[styles.text, styles.modalDepositInfoItemTitle]}>Price</Text>
                  <View style={[styles.modalDepositInfoItemValue]}>
                    <TextInput
                      placeholderTextColor={Colors.color_label_200}
                      onFocus={() => setIsFocused(true)}
                      style={[
                        styles.input,
                        isFocused && Platform.OS === 'web' && { outline: 'none' },
                      ]}
                      placeholder="0"
                      keyboardType="number-pad"
                    ></TextInput>
                  </View>
                </View>
              </View>

              <View style={styles.modalDepositAction}>
                <Button style={[styles.btn, styles.modalDepositBtnOk]}>
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
    </Modal>
  )
}

export default ModalDeposit
