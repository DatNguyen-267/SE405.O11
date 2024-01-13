import { AntDesign } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import {
  Image,
  Modal,
  Platform,
  ScrollView,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native'
import { Button } from 'react-native-paper'
import { Colors } from 'src/constants/Colors'
import styles from './styles'
import CustomInput from '../CustomInput'
import { useForm } from 'react-hook-form'
import { useDeposit } from 'src/hooks/useErc20'
import { divide, toBaseDenomAmount } from 'src/utils/big'
import { onHideLoading, onShowLoading } from 'src/utils/loading'
import { useDispatch } from 'react-redux'
import { onShowToastError } from 'src/utils/toast'

interface IModal {
  item?: object
  index?: number
  isVisible?: boolean
  setIsVisible?: any
}
const ModalDeposit = ({ item, index, isVisible, setIsVisible }: IModal) => {
  const [isFocused, setIsFocused] = useState(false)
  const { mutate: deposit, isLoading: isDepositPending } = useDeposit()
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  const onSubmit = (data: any) => {
    console.log(toBaseDenomAmount(divide(data.token, 100000), 18))
    onShowLoading(dispatch)
    deposit({
      value: toBaseDenomAmount(divide(data.token, 100000), 18),
    }).then(()=>{
      ToastAndroid.show('Deposit Token Successfully!', ToastAndroid.SHORT)
    })
    .catch((err)=>{
      ToastAndroid.show(err.message, ToastAndroid.SHORT)
    })
    .finally(()=>{
      onHideLoading(dispatch)
    })
  }

  useEffect(() => {
    reset()
  }, [isVisible])

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
                  source={require('../../assets/images/deposit.png')}
                ></Image>
                <Text numberOfLines={1} style={[styles.text, styles.modalDepositTitleCont]}>
                  Deposit
                </Text>
                <Text style={[styles.text, styles.modalDepositTitleDes]}>
                  Deposit your WUIT (Wrapped UIT Coin) tokens to the AIOZ Network effortlessly
                </Text>
              </View>
              <View style={styles.modalDepositInfo}>
                <View style={[styles.modalDepositInfoItem]}>
                  <Text style={[styles.text, styles.modalDepositInfoItemTitle]}>
                    Amount token (WUIT)
                  </Text>
                  <View style={[styles.modalDepositInfoItemValue]}>
                    {/* <TextInput
                      placeholderTextColor={Colors.color_label_200}
                      onFocus={() => setIsFocused(true)}
                      style={[
                        styles.input,
                        isFocused && Platform.OS === 'web' && { outline: 'none' },
                      ]}
                      placeholder="0"
                      keyboardType="number-pad"
                    ></TextInput> */}
                    <CustomInput
                      styleInput={styles.input}
                      name="token"
                      control={control}
                      placeholder="0"
                      rules={{
                        required: 'This is required',
                        min: {
                          value: 0,
                          message: 'Price is not negative',
                        },
                      }}
                      keyboardType="number-pad"
                    ></CustomInput>
                  </View>
                  <Text style={[styles.text, styles.modalDepositInfoDes]}>
                    The conversion is straightforward: 1 AIOZ equals 100000 WUIT. Input your desired
                    WUIT amount, confirm, and you're done! Simple, transparent, and hassle-free.
                  </Text>
                </View>
              </View>

              <View style={styles.modalDepositAction}>
                <Button
                  style={[styles.btn, styles.modalDepositBtnOk]}
                  onPress={handleSubmit(onSubmit)}
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
    </Modal>
  )
}

export default ModalDeposit
