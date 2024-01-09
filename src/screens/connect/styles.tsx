import { StyleSheet } from 'react-native'
import { Colors } from 'src/constants/Colors'

const styles = StyleSheet.create({
  // ===============Base================
  text: {
    fontFamily: 'InterMedium',
    fontSize: 14,
  },
  label: {
    fontSize: 18,
    fontWeight: '700',
    alignItems: 'center',
    marginBottom: 5,
    color: Colors.color_label_200,
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
  connectStyle: {
    borderRadius: 8,
    minWidth: 150,
  },
  // ============= Screen ================
  createScreen: {
    backgroundColor: Colors.color_base_100,
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  // ============= No Connect ================
  containerNoConnect: {
    flex: 1,
    // paddingHorizontal: 15,
    alignItems: 'center',
    paddingHorizontal: 25,
    gap: 25,
    paddingBottom: 80,
  },

  connectImage: {
    width: 180,
    height: 180,
  },
  connectTitle: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '700',
  },
  connectDes: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '400',
    color: Colors.color_label_200,
    lineHeight: 24,
  },

  connectBtn: {
    marginTop: 30,
  },
  connectBtnImage: {
    width: 60,
    height: 60,
  },
  connectBtnContent: {
    flex: 1,
    gap: 10,
    justifyContent: 'center',
  },
  connectBtnTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.color_label_400,
  },
  connectBtnDes: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.color_label_200,
  },

  // information
  information: {
    marginTop: 40,
    gap: 15,
    width: "100%"
  }, 
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.color_label_200,
  },

  content: {
    backgroundColor: Colors.color_base_200,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 25,
    gap: 30,
    borderRadius: 8
  }, 

  // address
  connectAddress: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    gap: 15,
  },
  connectAddressTitle: {
    color: Colors.color_label_400,
    fontSize: 16,
    fontWeight: '700',
  },
  connectAddressValue: {
    color: Colors.color_label_400,
    fontSize: 16,
    fontWeight: '600',
  },

  //Balance
  balanceContainer: {
    marginTop: 30,
    width: '100%',
    justifyContent: 'space-between',
    gap: 15,
  },
  balanceAZ: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.color_label_400,
  },
  balanceWB: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.color_label_400,
  },
})

export default styles
