import { StyleSheet } from 'react-native'
import { Colors } from 'src/constants/Colors'

const styles = StyleSheet.create({
  text: {
    fontFamily: 'InterRegular',
  },
  number: {
    color: Colors.color_label_400,
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    textAlign: 'right',
  },
  unit: {
    color: Colors.color_label_400,
    fontSize: 16,
    fontWeight: '600',
  },
  btn: {
    flex: 1,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.color_grey_500,
  },
  btnText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.color_label_400,
  },
  // ============= No modalBuy ================
  container: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'relative',
  },
  modalOverlay: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  modalBuyForm: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    overflow: 'hidden',
    maxHeight: '100%',
    maxWidth: '100%',
    width: 345,
    gap: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.16,
    shadowRadius: 4,
    borderRadius: 10,
  },

  scrollView: {
    width: '100%',
  },

  formContent: {
    height: '100%',
    width: '100%',
    gap: 25,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 35,
    paddingBottom: 50,
  },

  // heade line
  headLine: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  modalBuyTitle: {
    flex: 1,
    fontSize: 22,
    fontWeight: '700',
  },

  // NFT
  modalBuyNft: {
    width: '100%',
    gap: 10,
    alignItems: 'center',
  },
  modalBuyNftImg: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  modalBuyNftName: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    color: Colors.color_label_400,
  },
  modalBuyNftAdd: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
    color: Colors.color_label_200,
  },

  // Infor
  modalBuyInfo: {
    gap: 25,
    width: '100%',
  },
  modalBuyInfoItem: {
    width: '100%',
    gap: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalBuyInfoItemTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.color_label_400,
    lineHeight: 24,
  },
  modalBuyInfoItemValue: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 8,
  },
  modalBuyTotal: {
    borderTopColor: Colors.color_divider,
    borderTopWidth: 2,
    paddingTop: 15,
  },

  // Actions
  modalBuyAction: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 15,
    width: '100%',
  },
  modalBuyBtnOk: {
    backgroundColor: Colors.color_base_300,
  },
  btnTextOk: {
    color: Colors.color_label_100,
  },
})

export default styles
