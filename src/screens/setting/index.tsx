import { AntDesign, Entypo, MaterialCommunityIcons } from '@expo/vector-icons'
import React from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import styles from './styles'

const Setting = ({ navigation }: { navigation: any }) => {
  return (
    <View style={styles.homeScreen}>
      <ScrollView
        style={styles.homeContent}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        {/* <Button style={styles.createBtn}onPress={() => navigation.navigate('Collection')} >
                    <Text>Go to Collection</Text>
                </Button> */}
        <View style={styles.container}>
          <View style={styles.headLine}>
            <Text style={styles.headLineContent}>SETTING</Text>
          </View>
          <TouchableOpacity
            style={styles.catergory}
            onPress={() => navigation.navigate('Connect Wallet')}
          >
            <View style={styles.catergoryHead}>
              <MaterialCommunityIcons name="cast-connected" size={24} color="black" />
              <Text style={styles.text}>Connect Wallet</Text>
            </View>
            <AntDesign name="right" size={20} color="black" />
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.catergory} onPress={() => navigation.navigate('Chains')}>
            <View style={styles.catergoryHead}>
              <AntDesign name="swap" size={24} color="black" />
              <Text style={styles.text}>Chains</Text>
            </View>
            <AntDesign name="right" size={20} color="black" />
          </TouchableOpacity> */}
          <TouchableOpacity
            style={styles.catergory}
            onPress={() => navigation.navigate('MyCollection')}
          >
            <View style={styles.catergoryHead}>
              <Entypo name="wallet" size={24} color="black" />
              <Text style={styles.text}>My Collection</Text>
            </View>
            <AntDesign name="right" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* <Button title="Go to Explore" onPress={() => navigation.navigate('Explore')} /> */}
    </View>
  )
}

export default Setting
