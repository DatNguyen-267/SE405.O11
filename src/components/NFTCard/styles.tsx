import { StyleSheet } from 'react-native'
import { Colors } from 'src/constants/Colors'

const styles = StyleSheet.create({
  text: {
    fontFamily: 'InterMedium',
    color: Colors.color_label_400,
  },
  NFTCard: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    paddingBottom: 10,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.16,
    elevation: 2,
    shadowRadius: 4,
    marginVertical: 10,
    borderRadius: 8,
    backgroundColor: Colors.color_base_100,
  },
  // cardImage: {
  //     height: 150,
  //     width: '100%',
  //     borderTopRightRadius: 8,
  //     borderTopLeftRadius: 8,
  // },

  cardHead: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    position: 'relative',
  },
  cardImage: {
    height: '100%',
    width: '100%',
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
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
  },

  // ===== Content =====
  cardContent: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    paddingHorizontal: 5,
  },
  // cardHeadLine: {
  //     width: '100%',
  //     flexDirection: 'row',
  //     justifyContent: 'space-between',
  //     alignItems: 'center',
  //     gap: 10,
  // },

  // address
  cardAddress: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.color_label_100,
  },
  cardStatus: {
    fontSize: 10,
    fontWeight: '500',
    color: '#E88F21',
    backgroundColor: 'rgba(254, 218, 3, 0.2)',
    paddingHorizontal: 3,
    borderRadius: 3,
    paddingVertical: 3,
  },

  // information
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

  // Price
  cardPrice: {
    fontWeight: '600',
  },

  // ===== Action =======
  cardAction: {
    width: '100%',
    marginTop: 7,
    // marginBottom: 5,
    paddingHorizontal: 5,
  },

  cardBtn: {
    width: '100%',
    height: 28,
    backgroundColor: Colors.color_base_300,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  cardBtnDelist: {
    backgroundColor: Colors.color_error,
  },
  cardBtnText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.color_label_100,
  },
})

export default styles
