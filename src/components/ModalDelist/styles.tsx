import { StyleSheet } from 'react-native'
import { Colors } from 'src/constants/Colors'

const styles = StyleSheet.create({
  text: {
    fontFamily: 'InterRegular',
  },
  input: {
    maxWidth: 150,
    flex: 1,
    height: 35,
    borderRadius: 8,
    backgroundColor: Colors.color_base_200,
    paddingHorizontal: 10,
    paddingVertical: 4,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'right',
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
  // ============= No modalDelist ================
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
  modalDelistForm: {
    overflow: 'hidden',
    maxHeight: '100%',
    maxWidth: '100%',
    width: 345,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    gap: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.16,
    shadowRadius: 4,
    padding: 20,
    paddingTop: 35,
    paddingBottom: 50,
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
  modalDelistTitle: {
    flex: 1,
    fontSize: 22,
    fontWeight: '700',
  },

  // NFT
  modalDelistNft: {
    width: '100%',
    gap: 10,
    alignItems: 'center',
  },
  modalDelistNftImg: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
    overflow: 'hidden',
    backgroundColor: Colors.color_base_300
  },
  modalDelistNftName: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    color: Colors.color_label_400,
    lineHeight: 24,
  },
  modalDelistNftAdd: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
    color: Colors.color_label_200,
  },

  // Infor
  modalDelistInfo: {
    gap: 25,
    width: '100%',
  },
  modalDelistInfoItem: {
    width: '100%',
    gap: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
  },
  modalDelistInfoItemTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.color_label_400,
    lineHeight: 24,
  },
  modalDelistInfoItemValue: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 8,
  },
  modalDelistTotal: {
    borderTopColor: Colors.color_divider,
    borderTopWidth: 2,
    paddingTop: 15,
  },
  // Question

  modalQuestion: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.color_label_400,
    textAlign: 'center',
    lineHeight: 24,
  },
  // Actions
  modalDelistAction: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 15,
    width: '100%',
  },
  modalDelistBtnOk: {
    backgroundColor: Colors.color_error,
    color: Colors.color_label_100,
  },

  btnTextOk: {
    color: Colors.color_label_100,
  },
})

export default styles
