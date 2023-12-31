import { StyleSheet } from 'react-native'
import { Colors } from 'src/constants/Colors'

const styles = StyleSheet.create({
  text: {
    fontFamily: 'InterRegular',
  },
  Collection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
    marginVertical: 10,
    marginHorizontal: 2,
    borderRadius: 8,
  },
  collectionHead: {
    width: 110,
    height: 110,
    borderRadius: 8,
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: Colors.color_base_300
  },
  collectionImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },

  collectionContent: {
    flex: 1,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 15,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },

  collectionAddress: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.color_label_200,
  },
  collectionInfo: {
    flex: 1,
    gap: 5,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  collectionName: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.color_label_400,
  },
  collectionOwner: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  collectionOwnerAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: Colors.color_base_300
  },
  collectionOwnerAdd: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.color_label_400,
  },
  collectionAmount: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  collectionAmountIcon: {
    width: 20,
    height: 20,
  },
  collectionAmountValue: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.color_label_400,
  },
})

export default styles
