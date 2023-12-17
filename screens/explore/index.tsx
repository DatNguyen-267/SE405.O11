import { View, Text, FlatList, ScrollView, Image } from 'react-native'
import React from 'react'
import styles from './styles'

import SearchInput from '../../components/Search'
import { Button, Caption, Paragraph, Surface, Title } from 'react-native-paper'
import NFTCardHorital from '../../components/NFTCardHorital'
import Collection from '../../components/Collection'
const Explore = ({navigation}) => {
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
                        <SearchInput />
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
                              <Collection></Collection>
                              <Collection></Collection>
                              <Collection></Collection>
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