import { StyleSheet } from 'react-native'
import { Colors } from 'src/constants/Colors'

const styles = StyleSheet.create({
  text: {
    fontFamily: 'InterRegular',
    color: Colors.color_base_100,
    fontSize: 18,
    marginTop: 12,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'relative',
  },
  modalBuyBtnOk: {
    height: 40,
    backgroundColor: Colors.color_base_300,
  },
  btnTextOk: {
    height: 40,
    color: Colors.color_label_100,
  },
  btn: {
    marginTop: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.color_grey_500,
  },
  btnText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.color_label_400,
  },
})

export default styles
