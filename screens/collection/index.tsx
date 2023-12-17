import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, ImageBackground, FlatList, } from 'react-native'

import { Button, Caption, Paragraph, Surface, Title } from 'react-native-paper'
import { useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import styles from './styles'
import { Platform } from 'react-native'
import NFTCard from '../../components/NFTCard'

const Collection = ({ navigation }) => {
    const [profile, setProfile] = useState(null)
    const [isFocused, setIsFocused] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const data = [1, 2, 3, 4]


    const changeConnect = () => {
        setIsConnected(!isConnected);
    }

    return (
        <View style={styles.createScreen}>

            <ScrollView
                style={styles.createContent}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >
                <View style={styles.container}>
                    <View style={styles.headLine}>
                        <ImageBackground
                            imageStyle={{ borderRadius: 10, opacity: 0.75, justifyContent: 'center' }}
                            source={require('./../../assets/images/createBg2.jpg')}
                            resizeMode="cover"
                            style={styles.headLineBg}

                        >
                            <Image
                                style={styles.headLineAvatar}
                                source={require('./../../assets/images/avatarDefault.png')}
                            ></Image>
                        </ImageBackground>

                    </View>
                    <View style={[styles.walletInfo]}>
                        <Text style={[styles.text, styles.walletAddress]}>0x000...000</Text>
                        <View style={[styles.walletOwnerContainer]}>
                            <Text style={[styles.walletOwnerTitle, styles.label]}>Owner Of:</Text>
                            <Text style={[styles.text, styles.walletOwnerAddress]}>0x000...000</Text>
                        </View>

                    </View>
                    <View style={styles.nftContent}>
                        <Text style={[styles.text, styles.title]}>All NFT</Text>
                        <FlatList
                            columnWrapperStyle={{
                                justifyContent: 'space-between',
                                gap: 10,
                            }}
                            scrollEnabled={false}
                            style={styles.listNft}
                            data={data}
                            numColumns={2}
                            renderItem={(item) =>
                                <View style={styles.nftItem}>
                                    <NFTCard></NFTCard>
                                </View>
                            }
                        />

                    </View>
                </View>
            </ScrollView>

        </View>

    )
}

export default Collection
