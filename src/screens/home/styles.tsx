import { StyleSheet } from 'react-native'
import { Colors } from 'src/constants/Colors'

const styles = StyleSheet.create({
  text: {
    fontFamily: 'InterMedium',
    fontSize: 14,
  },
  homeScreen: {
    backgroundColor: Colors.color_base_100,
    flex: 1,
  },
  homeContent: {
    backgroundColor: Colors.color_base_100,
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingBottom: 60,
  },
  // Head line
  headLine: {
    marginTop: 30,
    paddingVertical: 20,
    marginBottom: 20,
  },
  headLineContent: {
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 40,
  },
  // Search
  search: {
    // marginBottom: 8,
    // marginTop: 5,
    marginBottom: 10,
    marginTop: 20,
  },

  // Title
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    alignItems: 'center',
  },
  titleIcon: {
    width: 24,
    height: 24,
  },

  list: {
    marginTop: 10,
    flexDirection: 'row',
  },

  listContent: {
    flex: 1,
    flexDirection: 'row',
    gap: 8,
  },

  nftContent: {
    marginTop: 20,
  },

  listNft: {
    // marginTop: 10,
    flex: 1,
    width: '100%',
  },

  nftItem: {
    paddingHorizontal: 5,
    flex: 1,
    maxWidth: '50%',
  },
})

export default styles
