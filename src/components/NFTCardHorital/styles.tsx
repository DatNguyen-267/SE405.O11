import { StyleSheet } from 'react-native'
import { Colors } from 'src/constants/Colors'

const styles = StyleSheet.create({
  text: {
    fontFamily: 'InterRegular',
  },
  NFTCardHorital: {
    width: 230,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    paddingBottom: 10,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 1},
    // shadowOpacity: 0.16,
    // elevation: 4,
    // shadowRadius: 4,
    marginVertical: 10,
    marginHorizontal: 2,
    borderRadius: 8,
  },
  cardHead: {
    width: '100%',
    height: 167,
    borderRadius: 8,
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  cardHeadLine: {
    position: 'absolute',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    bottom: 0,
    paddingHorizontal: 5,
    paddingVertical: 8,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
  },

  cardAddress: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.color_base_100,
  },
  cardStatus: {
    fontSize: 10,
    fontWeight: '500',
    color: Colors.color_primary,
    backgroundColor: 'rgba(254, 218, 3, 0.2)',
    paddingHorizontal: 5,
    borderRadius: 3,
    paddingVertical: 3,
  },

  cardContent: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    paddingHorizontal: 5,
  },

  cardInfo: {
    width: '100%',
    gap: 8,
    alignItems: 'flex-start',
  },

  cardContentName: {
    width: '100%',
    gap: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  cardName: {
    fontWeight: '600',
    fontSize: 16,
    maxWidth: '70%',
  },
  cardId: {
    fontWeight: '600',
    fontSize: 16,
  },

  // Collection
  cardCollection: {
    width: '100%',
    gap: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  cardAvatar: {
    width: 25,
    height: 25,
    borderRadius: 13,
    borderWidth: 2,
    borderColor: Colors.color_base_200,
  },
  cardCollectionAddress: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.color_label_200,
  },

  cardPrice: {
    fontWeight: '500',
    color: Colors.color_label_100,
    fontSize: 14,
  },
})

export default styles
