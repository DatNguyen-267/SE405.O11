import { View, Text, FlatList, ScrollView, Image } from 'react-native'
import React from 'react'
import styles from './styles'
import { useState } from 'react'
import SearchInput from '../../components/Search'
import { Button, Caption, Paragraph, Surface, Title } from 'react-native-paper'
import NFTCardHorital from '../../components/NFTCardHorital'
import Collection from '../../components/Collection'
const Explore = ({navigation}) => {
    const [search, setSearch] = useState('')
    const data = [
        {
            img: "https://th.bing.com/th/id/OIG.ey_KYrwhZnirAkSgDhmg",
            name: 'fox abc abc abc abc abc abc abc abc abc abc',
            status: 'On Sale',
        },
        {
            img: "https://png.pngtree.com/background/20230411/original/pngtree-beautiful-moon-background-on-moon-night-picture-image_2392251.jpg",
            name: 'moon',
            status: 'On Sale',
        },
        {
            img: "https://statusneo.com/wp-content/uploads/2023/02/MicrosoftTeams-image551ad57e01403f080a9df51975ac40b6efba82553c323a742b42b1c71c1e45f1.jpg",
            name: 'childreno',
            status: 'Not For Sale',
        },
        {
            img: "https://deep-image.ai/blog/content/images/2022/09/underwater-magic-world-8tyxt9yz.jpeg",
            name: 'water',
            status: 'Not For Sale',
        },
    ]

    return (
        <View style={styles.homeScreen}>
            <ScrollView
                style={styles.homeContent}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >
                <View style={styles.container}>
                    <View style={styles.headLine}>
                        {/* <Button style={styles.createBtn}onPress={() => navigation.navigate('Collection')} >
                            <Text>Go to Collection</Text>
                        </Button> */}
                        <Text style={styles.headLineContent}>
                            Explore Collections
                        </Text>
                    </View>
                    <View style={styles.search}>
                        <SearchInput search={search} setSearch={setSearch} />
                    </View>
                    <View style={styles.titleContainer}>
                        <Text style={[styles.text, styles.title]}>All Collecitons</Text>
                        <Image
                            resizeMode='cover'
                            style={styles.titleIcon}
                            source={require('./../../assets/images/collection.png')}
                        ></Image>
                    </View>
                    <View>
                        <ScrollView
                            horizontal={false}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                        >
                            <View style={styles.listContent}>
                                {
                                    data.map((item, index) =>{
                                        if (search === "") {
                                            return (
                                                <Collection key={index} navigation={navigation} item={item}></Collection>
                                            )
    
                                        }
                                        else {
                                            if (item.name.toLowerCase().includes(search.toLowerCase())) {
                                                return (
                                                    <Collection key={index} navigation={navigation} item={item}></Collection>
                                                )
                                            }
                                        }
                                      
                                    })
                                }
                             
                              {/* <Collection navigation={navigation}></Collection>
                              <Collection navigation={navigation}></Collection> */}
                              
                            </View>
                        </ScrollView>
                    </View>

                </View>
            </ScrollView>


            {/* <Button title="Go to Explore" onPress={() => navigation.navigate('Explore')} /> */}
        </View>
    )
}

export default Explore