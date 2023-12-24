import { StyleSheet } from 'react-native'
import { Colors } from 'src/constants/Colors'

const styles = StyleSheet.create({
  container: {
    // paddingTop: 10,
    // paddingBottom: 20,
  },
  inner: {
    flexDirection: 'row',
  },
  search: {
    position: 'absolute',
    top: 15,
    left: 10,
    zIndex: 1,
  },
  field: {
    backgroundColor: Colors.color_grey_200,
    padding: 10,
    paddingLeft: 35,
    borderRadius: 20,
    height: 50,
    flex: 1,
    fontFamily: 'InterMedium',
    fontWeight: '500',
  },

  filter: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
})
export default styles
