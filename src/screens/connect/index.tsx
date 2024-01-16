import { W3mButton, useWeb3Modal } from '@web3modal/wagmi-react-native'

import React, { useEffect } from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { Button } from 'react-native-paper'
import { getMetadata } from 'src/hooks/useIPFS'
import { useGetNameOfCollection, useGetNftsOfAddress, useGetTokenURI } from 'src/hooks/useMarket'
import {
  Chain,
  sepolia,
  useAccount,
  useBalance,
  useChainId,
  useConnect,
  useSwitchNetwork,
  useWalletClient,
} from 'wagmi'
import styles from './styles'
import {
  useBuyNFTUsingWrapToken,
  useCancelAskOrder,
  useCreateAskOrder,
  useViewAllAsk,
} from 'src/hooks/useMarket'
import { ethers } from 'ethers'
import { toDisplayDenomAmount } from 'src/utils/big'
import useAppAddress from 'src/hooks/useAppAddress'
import { CHAINS, aiozChain } from 'src/constants'
import { useToken } from 'wagmi'
import { shorterAddress } from 'src/utils'

const Connect = ({ navigation }: { navigation?: any }) => {
  const { connect, connectors } = useConnect()
  const { address, connector, isConnected } = useAccount()
  const { chains, error, isLoading, pendingChainId, switchNetwork } = useSwitchNetwork()
  const { data: walletClient } = useWalletClient()
  const { mutate: getTokenURI } = useGetTokenURI()
  const chainId = useChainId()
  console.log({ chainId })
  const chainName = CHAINS.find((chain) => chain.id === chainId)?.name
  const { mutate: handleGetNameOfCollection } = useGetNameOfCollection()
  const { mutate: createAskOrder } = useCreateAskOrder()
  const { mutate: buyWithWrapToken } = useBuyNFTUsingWrapToken()
  const { mutate: cancelAskOrder } = useCancelAskOrder()

  // Get Native balance
  const { data: nativeBalanceData } = useBalance({ address })
  const amount = nativeBalanceData?.formatted
  // display denom is unit (AIOZ, ETH, BNB, ...)
  const displayDenom = nativeBalanceData?.symbol

  // Get Token Exchange balance (WUIT)
  const ExchangeTokenAddress = useAppAddress('WUIT')
  const { data: tokenExchangeBalanceData } = useBalance({
    address,
    token: ExchangeTokenAddress,
  })
  const tokenExchangeAmount = tokenExchangeBalanceData?.formatted
  const tokenExchangeDisplay = tokenExchangeBalanceData?.symbol

  // useEffect(() => {
  //   console.log({ connectors })
  //   connect({
  //     chainId: sepolia.id,
  //     connector: connectors[2],
  //   })
  // }, [])
  // const handleGetMetadata = async () => {
  //   getTokenURI({
  //     cltAddress: '0x772b21c128f759F75A352568B1F7b4fF331d1162',
  //     tokenId: 1,
  //   }).then(async (res) => {
  //     const metadata = await getMetadata(res).then((res) => res.json())
  //   })
  // }

  // const handleGetNameCollection = async () => {
  //   handleGetNameOfCollection({
  //     cltAddress: '0x772b21c128f759F75A352568B1F7b4fF331d1162',
  //   }).then((res) => {})
  // }

  // const { data: nfts, mutate: getAllNftOfAddress } = useGetNftsOfAddress()
  // const { mutate: viewAllAsk } = useViewAllAsk()
  // const handleGetAllNftOfAddress = () => {
  //   getAllNftOfAddress({
  //     ownerAddress: '0x454574C8AD9706a8fC22dDA71Ce77Cb1CDd5fEB1',
  //   })
  // }

  // const handleCreateAskOrder = () => {
  //   createAskOrder({
  //     // The grap - Goerli
  //     cltAddress: '0x993Ee67F5262c1B4c775d21EbD5bb85733AB3eFE',
  //     tokenId: 5,
  //     price: '0.07685',
  //   })
  // }

  // const handleBuy = () => {
  //   buyWithWrapToken({
  //     collectionAddress: '0x55327442555db09955110428F46B66b902Dee1a4',
  //     tokenId: 4,
  //     price: '0.0055',
  //   })
  // }

  // const handleCancelAskOrder = () => {
  //   cancelAskOrder({
  //     collectionAddress: '0x55327442555db09955110428F46B66b902Dee1a4',
  //     tokenId: 4,
  //   })
  // }
  // const handleViewAllAsk = () => {
  //   viewAllAsk()
  // }

  // const handleAddChain = async () => {
  //   switchNetwork?.(aiozChain.id)
  // }

  // const wuitAddress = useAppAddress('WUIT')
  // const handleAddWUIT = async ()=> {
  //   const success = await walletClient?.watchAsset({
  //     type: 'ERC20',
  //     options: {
  //       address: wuitAddress,
  //       decimals: 18,
  //       symbol: 'WUIT',
  //     },
  //   })
  // }
  return (
    <View style={styles.createScreen}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.containerNoConnect}>
          {/* <Button onPress={handleGetMetadata}>Get metadata NFT</Button>
          <Button onPress={handleGetNameCollection}>Get name collection</Button>
          <Button onPress={handleGetAllNftOfAddress}>Get all nft of address</Button>
          <Button onPress={handleCreateAskOrder}>Create Ask order</Button>
          <Button onPress={handleBuy}>Buy nft</Button>
          <Button onPress={handleCancelAskOrder}>Cancel ask order</Button>
          <Button onPress={handleViewAllAsk}>Get all asks</Button>
          <Button onPress={handleAddChain}>handle add chain</Button>
          <Button onPress={handleAddWUIT}>handle add WUIT</Button> */}

          {!isConnected && (
            <>
              <Image
                style={styles.connectImage}
                source={require('../../assets/images/wallet.png')}
              ></Image>
              <Text style={[styles.text, styles.connectTitle]}>Connect Your Wallet</Text>
              <Text style={[styles.text, styles.connectDes]}>
                Choose a wallet you want to connect. There are several wallet providers.dasda
              </Text>
            </>
          )}
          <View style={styles.connectBtn}>
            <W3mButton connectStyle={styles.connectStyle} />
          </View>
          {isConnected && (
            <>
              <View style={styles.information}>
                <Text style={[styles.text, styles.label]}>Information</Text>
                <View style={styles.content}>
                  <View style={[styles.connectAddress]}>
                    <Text style={[styles.text, styles.connectAddressTitle]}>Address: </Text>
                    <Text
                      style={[styles.text, styles.connectAddressValue]}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {isConnected && address ? shorterAddress(address) : 'No connection'}
                    </Text>
                  </View>
                  <View style={[styles.connectAddress]}>
                    <Text style={[styles.text, styles.connectAddressTitle]}>Chain: </Text>
                    <Text
                      style={[styles.text, styles.connectAddressValue]}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {isConnected && chainName ? chainName : 'No Chain'}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={[styles.balanceContainer]}>
                <Text style={[styles.label]}>Balance</Text>
                <Text style={[styles.text, styles.balanceAZ]}>
                  {amount && displayDenom ? `${amount} ${displayDenom}` : '...'}
                </Text>
                <Text style={[styles.text, styles.balanceWB]}>
                  {tokenExchangeAmount && tokenExchangeDisplay
                    ? `${tokenExchangeAmount} ${tokenExchangeDisplay}`
                    : '...'}
                </Text>
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </View>
  )
}

export default Connect
