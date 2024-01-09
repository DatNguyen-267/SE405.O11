import { Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Button } from 'react-native-paper'
import { Colors } from 'src/constants/Colors'

interface ProfileCardProps {
  items?: any
  setTab?: any
  reload?: boolean
  setReload?: any
}
const Tabs = ({ items, setTab, reload, setReload }: ProfileCardProps) => {
  const [index, setIndex] = useState(0)
  const handleSetTab = (i: any) => {
    setIndex(i)
    setTab(items[i].title)
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.btn]} onPress={()=>{if(setReload){setReload(!reload)}}}>
        <Ionicons name="reload" size={18} color="black"  />
      </TouchableOpacity>
      <View style={styles.tabs}>
        {items.map((tab?: any, i?: number) => {
          const active = index === i
          return (
            <TouchableOpacity key={i} onPress={() => handleSetTab(i)} style={styles.tab}>
              {active && <Animated.View style={styles.dot} />}
              <Text style={[styles.text, active ? styles.activeTabText : styles.tabText]}>
                {tab.title}
              </Text>
            </TouchableOpacity>
          )
        })}
      </View>
      {/* {items[index].content()} */}
    </View>
  )
}

const styles = StyleSheet.create({
  btn: {
    width: 50,
    height: 30,
    padding: 0,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.color_grey_500,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'InterMedium',
    fontSize: 14,
  },
  container: {
    marginTop: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  tab: {
    marginLeft: 20,
  },
  tabText: {
    color: Colors.color_label_200,
  },
  activeTabText: {
    color: Colors.color_label_400,
    fontWeight: '600',
  },
  dot: {
    position: 'absolute',
    top: 20,
    width: '100%',
    height: 1.2,
    backgroundColor: Colors.color_label_400,
  },
})

export default Tabs
