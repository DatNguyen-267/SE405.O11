import { useFocusEffect } from 'expo-router'
import React, { useCallback, useState } from 'react'
import { Image, ScrollView, Text, View } from 'react-native'
import Collection from 'src/components/Collection'
import PageLoading from 'src/components/PageLoading'
import SearchInput from 'src/components/Search'
import useAppAddress from 'src/hooks/useAppAddress'
import { useViewMarketCollections } from 'src/hooks/useMarket'
import styles from './styles'

const Explore = ({ navigation }: { navigation: any }) => {
  const [search, setSearch] = useState('')

  const {
    mutate: handleGetAllCollection,
    data: collections,
    isLoading: isLoadingGetCollection,
  } = useViewMarketCollections()

  const marketAddress = useAppAddress('MARKET')

  const listCollection = collections

  useFocusEffect(
    useCallback(() => {
      handleGetAllCollection({
        marketAddress: marketAddress,
        cursor: 0,
        size: 20,
      })
    }, []),
  )

  return (
    <View style={styles.homeScreen}>
      <ScrollView
        style={styles.homeContent}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.container}>
          <View style={styles.headLine}>
            <Text style={styles.headLineContent}>EXPLORE COLLECTIONS</Text>
            {/* {isLoadingGetCollection && (
              <Text style={styles.headLineContent}>Loading get collections</Text>
            )}
            <Button style={styles.createBtn} onPress={handleTestFunction}>
              <Text>Get asks</Text>
              {isLoadingGetAsk && <Text style={styles.headLineContent}>Loading get ask</Text>}
            </Button> */}
          </View>
          <View style={styles.search}>
            <SearchInput search={search} setSearch={setSearch} />
          </View>
          <View style={styles.titleContainer}>
            <Text style={[styles.text, styles.title]}>All Collecitons</Text>
            <Image
              resizeMode="cover"
              style={styles.titleIcon}
              source={require('../../assets/images/collection.png')}
            ></Image>
          </View>
          <PageLoading isVisible={isLoadingGetCollection}></PageLoading>
          {!isLoadingGetCollection && (
            <View>
              <ScrollView
                horizontal={false}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
              >
                <View style={styles.listContent}>
                  {listCollection &&
                    listCollection.map((item, index) => {
                      return (
                        <Collection
                          key={index}
                          navigation={navigation}
                          item={item}
                          address={item.collectionAddress}
                          search={search}
                        ></Collection>
                      )
                    })}

                  {/* <Collection navigation={navigation}></Collection>
                              <Collection navigation={navigation}></Collection> */}
                </View>
              </ScrollView>
            </View>
          )}
        </View>
      </ScrollView>

      {/* <Button title="Go to Explore" onPress={() => navigation.navigate('Explore')} /> */}
    </View>
  )
}

export default Explore
