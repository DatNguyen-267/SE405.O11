import { StyleSheet } from 'react-native'
import { Colors } from 'src/constants/Colors'

const styles = StyleSheet.create({
  text: {
    fontFamily: 'InterRegular',
  },
  input: {
    flex: 1,
    height: 44,
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
  // ============= No modalDeposit ================
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
  modalDepositForm: {
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
    paddingTop: 20,
    paddingBottom: 50,
  },
  // heade line
  headLine: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignContent: 'center',
  },
  modalDepositTitle: {
    flex: 1,
    fontSize: 22,
    fontWeight: '700',
    alignItems: 'center',
    gap: 10,
  },

  modalDepositTitleImg: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginBottom: 10,
  },
  modalDepositTitleCont: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '700',
    color: Colors.color_label_400,
    lineHeight: 24,
    marginBottom: 10,
  },
  modalDepositTitleDes: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
    color: Colors.color_label_200,
  },

  // Infor
  modalDepositInfo: {
    gap: 25,
    width: '100%',
  },
  modalDepositInfoItem: {
    width: '100%',
    gap: 15,
    justifyContent: 'space-between',
    position: 'relative',
  },
  modalDepositInfoItemTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.color_label_400,
    lineHeight: 24,
  },
  modalDepositInfoItemValue: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 8,
  },
  modalDepositTotal: {
    borderTopColor: Colors.color_divider,
    borderTopWidth: 2,
    paddingTop: 15,
  },

  modalDepositInfoDes: {
    textAlign: 'justify',
    fontSize: 14,
    fontWeight: '500',
    color: Colors.color_label_200,
  },
  // Actions
  modalDepositAction: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 15,
    width: '100%',
  },
  modalDepositBtnOk: {
    backgroundColor: Colors.color_base_300,
  },
  btnTextOk: {
    color: Colors.color_label_100,
  },
})

export default styles
