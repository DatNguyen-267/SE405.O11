import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { Animated } from 'react-native'
import { Colors } from '../../constants/Colors'
import { Easing } from 'react-native'

interface ProfileCardProps {
  items?: any
  setTab?: any
}
const Tabs = ({ items, setTab }: ProfileCardProps) => {
  const [index, setIndex] = useState(0)
  const handleSetTab = (i) => {
    setIndex(i)
    setTab(items[i].title)
  }

  return (
    <View style={styles.container}>
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
  text: {
    fontFamily: 'InterMedium',
    fontSize: 14,
  },
  container: {
    marginTop: 10,
    width: '100%',
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
