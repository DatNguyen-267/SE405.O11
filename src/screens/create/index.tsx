import { AntDesign } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import React, { useState } from 'react'
import {
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Clipboard,
  View,
} from 'react-native'
import { Button } from 'react-native-paper'
import { Colors } from 'src/constants/Colors'
import styles from './styles'
import { usePinIPFSAndMintNFT } from 'src/hooks/useMarket'
import { useAccount } from 'wagmi'
import useAppAddress from 'src/hooks/useAppAddress'

const Create = ({}) => {
  const [profile, setProfile] = useState<string | null>(null)
  const [isFocused, setIsFocused] = useState(false)
  const [addressDefault, setAddressDefault] = useState('0x634345357C9eA4B6e52765804d647048bd15e468')
  const { address, isConnected } = useAccount()

  const [imageSelected, setImageSelected] = useState<ImagePicker.ImagePickerResult>()

  const publicCollectionAddress = useAppAddress('PUBLIC_ERC721_TOKEN')

  const handlePinIPFSAndMint = usePinIPFSAndMintNFT()
  const imgPlaceHolder = '../../assets/images/addImage.png'

  const imagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      quality: 1,
    })

    if (!result.canceled) {
      // setProfile(result.uri);
      setProfile(result.assets[0].uri as string)
      setImageSelected(result)
    }
  }

  const clearImage = async () => {
    setProfile(null)
  }

  const copyToClipboard = () => {
    if (addressDefault) {
      Clipboard.setString(addressDefault)
    }
  }

  const handleCreate = async () => {
    if (!isConnected || !address) {
      // TODO: Toast message here
      alert('Please connect wallet')
      return
    }
    if (!imageSelected) return

    try {
      const receipt = await handlePinIPFSAndMint({
        metadata: {
          file: imageSelected?.assets?.[0] as unknown as File,
          title: 'INGENUE',
          description:
            'Beauty is but a vain and doubtful good; a shining gloss that fadeth suddenly; a flower that dies when it begins to bud; a doubtful good, a gloss, a glass, a flower, lost, faded, broken, dead within an hour.',
        },
        addressTo: address,
        cltAddress: publicCollectionAddress,
      })
    } catch (error) {}
  }

  return (
    <View style={styles.createScreen}>
      {/* <Header
                title={"Create NFT"}
                right="more-vertical"
            ></Header> */}
      <ScrollView
        style={styles.createContent}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.container}>
          <View style={styles.headLine}>
            <ImageBackground
              imageStyle={{ borderRadius: 10, opacity: 0.7 }}
              source={require('../../assets/images/createBg.jpg')}
              resizeMode="cover"
              style={styles.headLineBg}
            >
              <Text style={styles.headLineContent}>CREATE NFT</Text>
              <Text style={styles.headLineDes}>
                You can create a new NFT and add it in your collection
              </Text>
            </ImageBackground>
          </View>
          <View style={styles.imgContainer}>
            {/* <Text style={[styles.text, styles.imgTitle]}>Image of NFT</Text> */}
            {/* <View style={styles.imgFrame}>
                           
                        </View> */}

            <TouchableOpacity onPress={imagePick} style={styles.imgFrame}>
              <Image
                style={[
                  profile ? styles.image : styles.iconAdd,
                  Platform.OS !== 'web' && { marginTop: 15 },
                ]}
                source={profile ? { uri: profile } : require(imgPlaceHolder)}
              />
              {profile ? (
                <Text></Text>
              ) : (
                <Text style={styles.imgDes}>Choose a image in your device</Text>
              )}
              {/* <Entypo name="pencil" size={20} color={Colors.green} /> */}
              {profile ? (
                <AntDesign name="closecircle" style={styles.clearImage} onPress={clearImage} />
              ) : (
                <></>
              )}
            </TouchableOpacity>
          </View>
          <View style={[styles.inputContainer, styles.nameContainer]}>
            <Text style={[styles.label]}>Name NFT</Text>
            <TextInput
              placeholderTextColor={Colors.color_label_200}
              onFocus={() => setIsFocused(true)}
              style={[styles.input, isFocused && Platform.OS === 'web' && { outline: 'none' }]}
              placeholder="Ex: Stair Rain"
            ></TextInput>
          </View>
          <View style={[styles.inputContainer]}>
            <Text style={[styles.label]}>Address</Text>
            <TextInput
              placeholderTextColor={Colors.color_label_200}
              onFocus={() => setIsFocused(true)}
              style={[styles.input, isFocused && Platform.OS === 'web' && { outline: 'none' }]}
              placeholder="Ex: 0x000...000"
            ></TextInput>
            <TouchableOpacity style={styles.clipboard} onPress={copyToClipboard}>
              <Text style={[styles.text, styles.inputDes]}>
                Explore the impressive collection address at{' '}
                <Text style={[styles.text, styles.addressDefault]}>
                  {addressDefault ? addressDefault : '0x00000000000000000000000000'}
                </Text>{' '}
                on our platform. If you don't have your own collection yet, kickstart your creative
                journey by using this address.
              </Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.inputContainer]}>
            <Text style={[styles.label]}>Description</Text>
            <TextInput
              placeholderTextColor={Colors.color_label_200}
              onFocus={() => setIsFocused(true)}
              style={[styles.input, isFocused && Platform.OS === 'web' && { outline: 'none' }]}
              placeholder="Ex: It is created at 17/2/2023"
            ></TextInput>
          </View>
          <View style={[styles.createAction]}>
            <Button style={styles.createBtn} onPress={handleCreate}>
              <Text style={[styles.text, styles.createText]}>Create New</Text>
            </Button>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default Create
