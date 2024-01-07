import { default as React, useCallback, useEffect, useMemo, useState } from 'react'
import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch } from 'react-redux'
import ModalBuy from 'src/components/ModalBuy'
import NFTCard from 'src/components/NFTCard'
import NFTCardHorital from 'src/components/NFTCardHorital'
import SearchInput from 'src/components/Search'
import { onHideLoading, onShowLoading } from 'src/utils/loading'
import styles from './styles'
import TypingText from './typingText'
import { useGetNftsOfAddress } from 'src/hooks/useNFT'
import ModalSell from 'src/components/ModalSell'
import ModalDeposit from 'src/components/ModalDeposit'
import ModalImport from 'src/components/ModalImport'
import { mappingAsksToNftList, useViewAllAsk } from 'src/hooks/useMarket'
import { useFocusEffect } from 'expo-router'
import { NftItem } from 'src/types'
import PageLoading from 'src/components/PageLoading'
import useCurrentChain from 'src/hooks/useCurrentChain'

interface ProfileCardProps {
  navigation?: any
}
const Home = ({ navigation }: ProfileCardProps) => {
  const dispatch = useDispatch()
  const [isVisible, setIsVisible] = useState(false)
  const [dataNFT, setDataNFT] = useState(undefined)
  const [search, setSearch] = useState('')
  const [reload, setReLoad] = useState(true)
  const { mutate: viewAllAsk, data: asks, isLoading } = useViewAllAsk()

  const currentChain = useCurrentChain()
  const [nftList, setNftList] = useState<NftItem[] | undefined>(undefined)

  const mappingList = useMemo(() => nftList, [nftList])

  useEffect(() => {
    let stale = false
    viewAllAsk().then((asks) => {
      if (stale) return
      if (asks) {
        const res = mappingAsksToNftList(asks, [])
        setNftList(res)
      } else {
        setNftList(undefined)
      }
    })

    return () => {
      stale = true
    }
  }, [currentChain.id])

  useFocusEffect(
    useCallback(() => {
      viewAllAsk()
    }, [reload]),
  )

  const handleLoading = () => {
    onShowLoading(dispatch)
    setTimeout(() => {
      onHideLoading(dispatch)
    }, 2000)
  }

  return (
    <>
      <View style={styles.homeScreen}>
        {/* <ModalImport isVisible={isVisible} setIsVisible={setIsVisible}></ModalImport> */}
        {/* <ModalDeposit isVisible={isVisible} setIsVisible={setIsVisible}></ModalDeposit> */}
        {/* <ModalSell isVisible={isVisible} setIsVisible={setIsVisible}></ModalSell> */}
        <ModalBuy
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          item={dataNFT}
          setReload={setReLoad}
          reload={reload}
        ></ModalBuy>
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
            <PageLoading isVisible={isLoading}></PageLoading>
            <View style={styles.list}>
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                {!isLoading && (
                  <View style={styles.listContent}>
                    {mappingList &&
                      mappingList.map((item, index) => {
                        if (index < 5) {
                          return (
                            <NFTCardHorital
                              item={item}
                              key={index}
                              onShowModal={setIsVisible}
                              setDataNFT={setDataNFT}
                            ></NFTCardHorital>
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
                )}
              </ScrollView>
            </View>

            <View style={styles.nftContent}>
              <Text style={[styles.text, styles.title]}>All NFT</Text>

              <View style={styles.search}>
                <SearchInput search={search} setSearch={setSearch} />
              </View>
              <PageLoading isVisible={isLoading}></PageLoading>
              {!isLoading && (
                <FlatList
                  columnWrapperStyle={{
                    justifyContent: 'space-between',
                  }}
                  scrollEnabled={false}
                  style={styles.listNft}
                  data={mappingList}
                  numColumns={2}
                  renderItem={({ item }) => {
                    if (search === '') {
                      return (
                        <View style={styles.nftItem}>
                          <NFTCard
                            item={item}
                            onShowModal={setIsVisible}
                            isBuy={true}
                            setDataNFT={setDataNFT}
                          ></NFTCard>
                        </View>
                      )
                    } else {
                      if (item.title.toLowerCase().includes(search.toLowerCase())) {
                        return (
                          <View style={styles.nftItem}>
                            <NFTCard
                              item={item}
                              onShowModal={setIsVisible}
                              isBuy={true}
                              setDataNFT={setDataNFT}
                            ></NFTCard>
                          </View>
                        )
                      }
                    }
                    return null
                  }}
                />
              )}
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  )
}

export default Home
