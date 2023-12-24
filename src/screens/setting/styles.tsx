import { StyleSheet } from 'react-native'
import { Colors } from 'src/constants/Colors'

const styles = StyleSheet.create({
  text: {
    fontFamily: 'InterMedium',
    fontSize: 16,
    fontWeight: '500',
    color: Colors.color_text,
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
    marginBottom: 20,
    paddingVertical: 20,
  },
  headLineContent: {
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 35,
  },

  // Catergory
  catergory: {
    flexDirection: 'row',
    flex: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    paddingVertical: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.color_divider,
    borderRadius: 8,
  },
  catergoryHead: {
    flexDirection: 'row',
    flex: 1,
    gap: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
})

export default styles
