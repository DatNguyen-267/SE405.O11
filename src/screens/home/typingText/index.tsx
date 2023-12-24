import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import styles from '../styles'

interface ProfileCardProps {
  navigation?: any
}
const TypingText = () => {
  const [text, setText] = useState('SELL NFTs')

  useEffect(() => {
    animationText()
  }, [])

  function animationText() {
    const sentences = ['SELL NFTs', 'CREATE YOUR NFTs']
    let currentIndex = 0
    let offset = 0
    if (!text) return
    let forwards = true
    let skipCount = 0
    const skipDelay = 15
    const speed = 70

    const updateSentence = () => {
      setText(sentences[currentIndex].substring(0, offset))
    }

    const handleAnimation = () => {
      if (forwards) {
        if (offset >= sentences[currentIndex].length) {
          if (++skipCount === skipDelay) {
            forwards = false
            skipCount = 0
          }
        }
      } else if (offset === 0) {
        forwards = true
        currentIndex = (currentIndex + 1) % sentences.length
      }

      if (skipCount === 0) {
        forwards ? offset++ : offset--
      }

      updateSentence()
    }

    setInterval(handleAnimation, speed)
  }

  return (
    <View>
      <Text style={styles.headLineContent}>{text}</Text>
    </View>
  )
}

export default TypingText
