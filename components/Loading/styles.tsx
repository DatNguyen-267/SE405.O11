import { StyleSheet } from 'react-native'
import { Colors } from '../../constants/Colors'

const styles = StyleSheet.create({
  text: {
    fontFamily: 'InterRegular',
    color: Colors.color_base_100,
    fontSize: 18,
    marginTop: 12,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'relative',
  },
})

export default styles
