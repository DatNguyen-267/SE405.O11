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
  },
  headLineContent: {
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 35,
  },
  // Search
  search: {
    marginBottom: 18,
    marginTop: 10,
  },

  // Title
  titleContainer: {
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    alignItems: 'center',
  },
  titleIcon: {
    width: 24,
    height: 24,
    display: 'none',
  },

  listContent: {
    flex: 1,
    flexDirection: 'column',
    gap: 10,
  },

  createBtn: {
    paddingVertical: 4,
    paddingHorizontal: 15,
    backgroundColor: Colors.color_primary,
    borderRadius: 8,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.16,
    elevation: 4,
    shadowRadius: 4,
  },
})

export default styles
