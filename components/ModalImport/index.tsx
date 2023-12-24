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
const ModalImport = ({ item, index, isVisible, setIsVisible }: IModal) => {
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
        <View style={styles.modalImportForm}>
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
              <View style={styles.modalImportTitle}>
                <Image
                  style={styles.modalImportTitleImg}
                  source={require('./../../assets/images/address-collection.png')}
                ></Image>
                <Text numberOfLines={1} style={[styles.text, styles.modalImportTitleCont]}>
                  Import Address
                </Text>
                <Text style={[styles.text, styles.modalImportTitleDes]}>
                  Enter address you want to import
                </Text>
              </View>
              <View style={styles.modalImportInfo}>
                <View style={[styles.modalImportInfoItem]}>
                  <Text style={[styles.text, styles.modalImportInfoItemTitle]}>Address</Text>
                  <View style={[styles.modalImportInfoItemValue]}>
                    <TextInput
                      placeholderTextColor={Colors.color_label_200}
                      onFocus={() => setIsFocused(true)}
                      style={[
                        styles.input,
                        isFocused && Platform.OS === 'web' && { outline: 'none' },
                      ]}
                      placeholder="Enter Address"
                    ></TextInput>
                  </View>
                </View>
              </View>

              <View style={styles.modalImportAction}>
                <Button style={[styles.btn, styles.modalImportBtnOk]}>
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

export default ModalImport
