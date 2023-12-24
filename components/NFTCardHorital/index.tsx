import { View, Text, Image } from 'react-native'
import React from 'react'
import styles from './styles'

interface ProfileCardProps{ 
    item?: any; 
    index?: number; 
  }

const NFTCardHorital = ({ item, index }: ProfileCardProps) =>{
    return (
        <View style={styles.NFTCardHorital}>
            <View style={styles.cardHead}>
                <Image
                    resizeMode='cover'
                    style={styles.cardImage}
                    source={{
                        uri: item ? item.img : 'https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg'
                    }}
                    // source={require('./../../../assets/images/nft1.png')}
                >

                </Image>
                <View style={styles.cardHeadLine}>
                    <Text style={[styles.text, styles.cardAddress]}>0x000 ... 000</Text>
                    {/* <Text style={[styles.text, styles.cardStatus]}>Not For Sell</Text> */}
                    <Text style={[styles.text, styles.cardPrice]}>0.002 WUIT</Text>
                </View>
            </View>
            <View style={styles.cardContent}>
                <View style={styles.cardInfo}>
                    <View style={styles.cardContentName}>
                        <Text numberOfLines={1} ellipsizeMode='tail' style={[styles.text, styles.cardName]}>{item ? item.name : "NFT Name"}</Text>
                        <Text style={[styles.text, styles.cardId]}>#10</Text>
                    </View>
                    <View style={styles.cardCollection}>
                        <Image
                            resizeMode='cover'
                            style={styles.cardAvatar}
                            source={{
                                uri: item ? item.img : 'https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg'
                            }}
                        >
                        </Image>
                        <Text style={[styles.text, styles.cardCollectionAddress]}>0x000...000</Text>
                    </View>
                   
                </View>
            </View>
        </View>
    )
}

export default NFTCardHorital