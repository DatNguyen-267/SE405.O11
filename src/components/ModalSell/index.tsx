import { AntDesign } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import {
  Image,
  Modal,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { Button } from 'react-native-paper'
import Toast from 'react-native-toast-message'
import { Colors } from 'src/constants/Colors'
import { onShowToastError, onShowToastSuccess } from 'src/utils/toast'
import styles from './styles'
import CustomInput from '../CustomInput'
import { useForm } from 'react-hook-form'
import { getAvatarByAddress, getUrlImage, shorterAddress } from 'src/utils'
import { useCreateAskOrder } from 'src/hooks/useMarket'
import { onHideLoading, onShowLoading } from 'src/utils/loading'
import { useDispatch } from 'react-redux'
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
const ModalSell = ({ item, index, isVisible, setIsVisible, setReload, reload }: IModal) => {
  const [isFocused, setIsFocused] = useState(false)
  const [price, setPrice] = useState('')
  const { mutate: createAskOrder } = useCreateAskOrder()
  const dispatch = useDispatch()
  const {
    control,
    handleSubmit,
    formState: { errors }, reset
  } = useForm()
  const onSubmit = (data: any) => {
    if (item) {
      createAskOrder({
        cltAddress: item.collectionAddress,
        tokenId: item.tokenId,
        price: price,
      }).then((res) => {
        onShowToastSuccess("Sell NFT Successfully")
        setIsVisible(false)
      })
        .catch((err) => {
          onShowToastError(err.message)
        })
        .finally(() => {
        })
    }
    else {
      onShowToastError("Not found information NFT!!!")
    }

  }
  useEffect(() => {
    reset()
  }, [isVisible])

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
                <Text style={[styles.text, styles.modalSellTitle]}>Sell NFT</Text>
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
                <View style={styles.modalSellNftImg}>
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
                  style={styles.modalSellNftImg}
                  source={require('../../assets/images/createBg.jpg')}
                ></Image> */}
                <Text numberOfLines={1} style={[styles.text, styles.modalSellNftName]}>
                  {item && item.title ? item.title : "NFT Name"}
                </Text>
                <Text style={[styles.text, styles.modalSellNftAdd]}>
                  {item && item.collectionAddress ? shorterAddress(item.collectionAddress, 10) : '0x000...000'}
                </Text>
              </View>
              <View style={styles.modalSellInfo}>
                <View style={[styles.modalSellInfoItem]}>
                  <Text style={[styles.text, styles.modalSellInfoItemTitle]}>Price</Text>
                  <View style={[styles.modalSellInfoItemValue]}>
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
                      name="price"
                      control={control}
                      placeholder='0'
                      setValue={setPrice}
                      rules={{
                        required: 'This is required',
                        min: {
                          value: 0,
                          message: 'Price is not negative',
                        },

                      }}
                      keyboardType='number-pad'
                    />
                    <Text style={[styles.text, styles.unit]}>WUIT</Text>
                  </View>
                </View>
                <View style={[styles.modalSellInfoItem]}>
                  <Text style={[styles.text, styles.modalSellInfoItemTitle]}>Fee</Text>
                  <View style={[styles.modalSellInfoItemValue]}>
                    <Text numberOfLines={1} style={[styles.text, styles.number]}>
                      0.1
                    </Text>
                    <Text style={[styles.text, styles.unit]}>%</Text>
                  </View>
                </View>
                <View style={[styles.modalSellInfoItem, styles.modalSellTotal]}>
                  <Text style={[styles.text, styles.modalSellInfoItemTitle]}>Total</Text>
                  <View style={[styles.modalSellInfoItemValue]}>
                    <Text numberOfLines={1} style={[styles.text, styles.number]}>
                      {
                        price ? ((-Number(price) * 0.1) / 100 + Number(price)).toFixed(8) : '0'
                      }
                    </Text>
                    <Text style={[styles.text, styles.unit]}>WUIT</Text>
                  </View>
                </View>
              </View>

              <View style={styles.modalSellAction}>
                <Button
                  style={[styles.btn, styles.modalSellBtnOk]}
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
      <Toast></Toast>
    </Modal>
  )
}

export default ModalSell
