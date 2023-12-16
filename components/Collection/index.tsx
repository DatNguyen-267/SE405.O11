import { View, Text, Image } from 'react-native'
import React from 'react'
import styles from './styles'

interface ProfileCardProps{ 
    item?: any; 
    index?: any; 
  }
const Collection = ({ item, index }: ProfileCardProps) => {
    return (
        <View style={styles.Collection}>
            <View style={styles.collectionHead}>
                <Image
                    resizeMode='cover'
                    style={styles.collectionImage}
                    source={{
                        uri: 'https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg'
                    }}
                >

                </Image>
            </View>
            <View style={styles.collectionContent}>
                <View style={styles.collectionInfo}>
                    <Text numberOfLines={1} ellipsizeMode='tail' style={[styles.text, styles.collectionName]}>NFT Name ab abc abc abacb abcba acbbaba abcab cabc</Text>
                    <Text style={[styles.text, styles.collectionAddress]}>0x000...000</Text>
                    <View style={styles.collectionOwner}>
                        <Image
                            resizeMode='cover'
                            style={styles.collectionOwnerAvatar}
                            source={require('./../../assets/images/avatarDefault.png')} 
                        >
                        </Image>
                        <Text style={[styles.text, styles.collectionOwnerAdd]}>0x000...000</Text>
                    </View>
                    <View style={styles.collectionAmount}>
                        {/* <Image
                            resizeMode='cover'
                            style={styles.collectionAmountIcon}
                            source={require('./../../../assets/images/nft.png')} 
                        >
                        </Image> */}
                        <Text style={[styles.text, styles.collectionAmountValue]}>NFTs: </Text>
                        <Text style={[styles.text, styles.collectionAmountValue]}>34</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default Collection