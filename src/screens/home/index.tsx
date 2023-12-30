import { default as React, useCallback, useEffect, useState } from 'react'
import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch } from 'react-redux'
import ModalBuy from 'src/components/ModalBuy'
import NFTCard from 'src/components/NFTCard'
import NFTCardHorital from 'src/components/NFTCardHorital'
import SearchInput from 'src/components/Search'
import { onHideLoading, onShowLoading } from 'src/utils/loading'
import styles from './styles'
import TypingText from './typingText'
import { ViewMarketCollectionsResponse, useViewAsksByCollection, useViewMarketCollections } from 'src/hooks/useMarket'
import useAppAddress from 'src/hooks/useAppAddress'
import { AskInfo, NftItem } from 'src/types'
import { DEFAULT_NFT_ITEM } from 'src/constants'
import { useIsFocused } from '@react-navigation/native'
import { useFocusEffect } from 'expo-router'
import PageLoading from 'src/components/PageLoading'

interface ProfileCardProps {
  navigation?: any
}
const Home = ({ navigation }: ProfileCardProps) => {
  const isFocused = useIsFocused()
  const dispatch = useDispatch()
  const [isVisible, setIsVisible] = useState(false)
  const [listNFTs, setListNFTs] = useState<AskInfo[]>([])
  const [search, setSearch] = useState('')
  const data = [
    {
      img: 'https://th.bing.com/th/id/OIG.ey_KYrwhZnirAkSgDhmg',
      name: 'fox abc abc abc abc abc abc abc abc abc abc',
      status: 'On Sale',
    },
    {
      img: 'https://png.pngtree.com/background/20230411/original/pngtree-beautiful-moon-background-on-moon-night-picture-image_2392251.jpg',
      name: 'moon',
      status: 'On Sale',
    },
    {
      img: 'https://statusneo.com/wp-content/uploads/2023/02/MicrosoftTeams-image551ad57e01403f080a9df51975ac40b6efba82553c323a742b42b1c71c1e45f1.jpg',
      name: 'childreno',
      status: 'Not For Sale',
    },
    {
      img: 'https://deep-image.ai/blog/content/images/2022/09/underwater-magic-world-8tyxt9yz.jpeg',
      name: 'water',
      status: 'Not For Sale',
    },
  ]
  const [isLoading, setIsLoading] = useState(false)

  const {
    mutate: handleGetAllCollection,
    data: collections,
    isLoading: isLoadingGetCollection,
  } = useViewMarketCollections()

  const marketAddress = useAppAddress('MARKET')

  const {
    mutate: handleGetByCollectionAddress,
    data: asks,
    isLoading: isLoadingGetAsk,
  } = useViewAsksByCollection()

  useFocusEffect(
    useCallback(() => {
      handleLoadNFTs()
    }, [])
  )

  const handleLoading = () => {
    onShowLoading(dispatch)
    setTimeout(() => {
      onHideLoading(dispatch)
    }, 2000)
  }

  const handleLoadNFTs = async () => {
    try {
      setIsLoading(true)
      let listData: AskInfo[] = []
      await handleGetAllCollection({
        marketAddress: marketAddress,
        cursor: 0,
        size: 20,
      }).then(async (res:ViewMarketCollectionsResponse) => {
        console.log("address: ",res.collectionAddresses)
        await Promise.all(
          res.collectionAddresses.map(async(collectionAddress: string)=>{
            try{
                console.log(collectionAddress)
                const newAddress = collectionAddress.slice(2)
                await handleGetByCollectionAddress({
                  marketAddress: marketAddress,
                  collectionAddress: `0x${newAddress}`,
                  cursor: 0,
                  size: 20,
                }).then((item:any) => {
                  if(item){
                    item.forEach((element:AskInfo) => {
                      listData.push(element)
                    });
                  }
                })
            }
            catch(err){

            }
          })
        )
      })
      setListNFTs(listData)
      console.log("loadded")

    }
    catch (err) {
      
      console.log("err: ", err)
    }
    finally{
      setIsLoading(false)
    }
  }
  return (
    <>
      <View style={styles.homeScreen}>
        <ModalBuy isVisible={isVisible} setIsVisible={setIsVisible}></ModalBuy>
        {/* <Loading isVisible={isLoading}></Loading> */}
        <ScrollView
          style={styles.homeContent}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View style={styles.container}>
            <View style={styles.headLine}>
              {/* <TouchableOpacity style={styles.headLineContent} onPress={() => handleLoading()}>
                                <Text>Loading</Text>
                            </TouchableOpacity> */}
              {/* <Text style={styles.headLineContent} id=''>
                                Wellcome To NFT Marketplace
                            </Text> */}
              <Text style={styles.headLineContent}>DISCOVER, COLLECT AND</Text>
              {/* <Text style={styles.headLineContent} id='sentence'></Text> */}
              <TypingText></TypingText>
            </View>
            {/* <View style={styles.search}>
                        <SearchInput />
                    </View> */}
            <View style={styles.titleContainer}>
              <Text style={[styles.text, styles.title]}>Trending NFT</Text>
              <Image
                resizeMode="cover"
                style={styles.titleIcon}
                source={require('../../assets/images/fire.png')}
              ></Image>
            </View>
            <View style={styles.list}>
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <View style={styles.listContent}>
                  {data.map((item, index) => {
                    if (item.status === 'On Sale') {
                      return (
                        <TouchableOpacity
                          onPress={() => {
                            setIsVisible(true)
                          }}
                          key={index}
                        >
                          <NFTCardHorital item={item}></NFTCardHorital>
                        </TouchableOpacity>
                      )
                    }
                  })}
                  {/* <TouchableOpacity onPress={() => { setIsVisible(true) }}>
                                        <NFTCardHorital></NFTCardHorital>
                                    </TouchableOpacity> */}
                  {/* <TouchableOpacity onPress={() => { setIsVisible(true) }}>
                                        <NFTCardHorital></NFTCardHorital>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => { setIsVisible(true) }}>
                                        <NFTCardHorital></NFTCardHorital>
                                    </TouchableOpacity> */}
                </View>
              </ScrollView>
            </View>

            <View style={styles.nftContent}>
              <Text style={[styles.text, styles.title]}>All NFT</Text>

              <View style={styles.search}>
                <SearchInput search={search} setSearch={setSearch} />
              </View>
              <PageLoading isVisible={isLoading}></PageLoading>
              {
                !isLoading &&
                <FlatList
                  columnWrapperStyle={{
                    justifyContent: 'space-between',
                  }}
                  scrollEnabled={false}
                  style={styles.listNft}
                  data={listNFTs}
                  numColumns={2}
                  renderItem={({ item }) => {
                    if (search === '') {
                      return (
                        <View style={styles.nftItem}>
                          <NFTCard item={item} onShowModal={setIsVisible} isBuy={true}></NFTCard>
                        </View>
                      )
                    }
                    // else {
                    //   if (item.name.toLowerCase().includes(search.toLowerCase())) {
                    //     return (
                    //       <View style={styles.nftItem}>
                    //         <NFTCard item={item} onShowModal={setIsVisible} isBuy={true}></NFTCard>
                    //       </View>
                    //     )
                    //   }
                    // }
                    return null
                  }}
                />
              }
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  )
}

export default Home
