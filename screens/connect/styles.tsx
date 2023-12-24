import { StyleSheet } from 'react-native'
import { Colors } from '../../constants/Colors'

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
    marginTop: 15,
    width: '100%',
    gap: 15,
    flexDirection: 'row',
    padding: 10,
    backgroundColor: Colors.color_base_200,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.color_grey_500,
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

  // address
  connectAddress: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 20,
    paddingTop: 25,
    borderTopWidth: 1,
    borderTopColor: Colors.color_divider,
    justifyContent: 'space-between',
    gap: 15,
  },
  connectAddressTitle: {
    color: Colors.color_label_400,
    fontSize: 18,
    fontWeight: '600',
  },
  connectAddressValue: {
    color: Colors.color_label_400,
    fontSize: 18,
    fontWeight: '600',
  },
})
// const styles = StyleSheet.create({
//     // ===============Base================
//     text: {
//         fontFamily: 'InterMedium',
//         fontSize: 14,
//     },
//     input: {
//         flex: 1,
//         height: 50,
//         borderRadius: 8,
//         backgroundColor: '#FFFFFF',
//         borderWidth: 2,
//         borderColor: Colors.color_divider,
//         paddingHorizontal: 20,
//         paddingVertical: 10,
//         fontFamily: 'InterMedium',
//         fontWeight: '500',
//         fontSize: 16,
//     },
//     label: {
//         fontSize: 18,
//         fontWeight: '700',
//         alignItems: 'center',
//         marginBottom: 5,
//         color: Colors.color_label_200,
//     },
//     btn: {
//         flex: 1,
//         borderRadius: 8,
//         borderWidth: 1,
//         borderColor: Colors.color_grey_500,

//     },
//     btnText: {
//         fontSize: 14,
//         fontWeight: '600',
//         color: Colors.color_label_400,
//     },

//     // ============= Screen ================
//     createScreen: {
//         backgroundColor: Colors.color_base_100,
//         flex: 1,
//     },
//     // ============= No Connect ================
//     containerNoConnect: {
//         flex: 1,
//         height: '100%',
//         // paddingHorizontal: 15,
//         justifyContent: 'center',
//         alignItems: 'center',

//     },
//     noConnectBg: {
//         width: '100%',
//         height: '100%',
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: Colors.color_base_300,
//         // borderRadius: 10,
//         position: 'relative',
//         paddingHorizontal: 20,
//         paddingTop: 50,
//         paddingBottom: 80,
//     },
//     connectForm: {
//         overflow:  'hidden',
//         maxHeight: '100%',
//         maxWidth: '100%',
//         width: 335,
//         backgroundColor: 'rgba(255, 255, 255, 0.75)',
//         gap: 25,
//         justifyContent: 'center',
//         alignItems: 'center',
//         shadowColor: '#000000',
//         shadowOffset: {width: 0, height: 1},
//         shadowOpacity: 0.16,
//         elevation: 4,
//         shadowRadius: 4,
//         borderRadius: 10,
//     },
//     scrollView: {
//         width: "100%",
//         padding: 20,
//         paddingTop: 35,
//         paddingBottom: 50,
//     },

//     connectTitle: {
//         textAlign: 'center',
//         fontSize: 22,
//         fontWeight: '700',
//     },
//     connectDes: {
//         textAlign: 'center',
//         fontSize: 16,
//         fontWeight: '400',
//         color: Colors.color_label_200,
//         lineHeight: 24,
//     },

//     connectBtn: {
//         marginTop: 15,
//         width: '100%',
//         gap: 15,
//         flexDirection: 'row',
//         padding: 10,
//         backgroundColor: Colors.color_grey_1000,
//         borderRadius: 10,
//     },
//     connectBtnImage: {
//         width: 60,
//         height: 60,
//     },
//     connectBtnContent: {
//         flex: 1,
//         gap: 10,
//         justifyContent: 'center',
//     },
//     connectBtnTitle: {
//         fontSize: 16,
//         fontWeight: '700',
//         color: Colors.color_label_100,
//     },
//     connectBtnDes: {
//         fontSize: 14,
//         fontWeight: '500',
//         color: Colors.color_label_200,
//     },

//     // address
//     connectAddress: {
//         flexDirection: 'row',
//         width: '100%',
//         width: '100%',
//         marginTop: 25,
//         paddingTop: 25,
//         borderTopWidth: 1,
//         borderTopColor: Colors.color_grey_700,
//         justifyContent: 'space-between',
//         gap: 15,
//     },
//     connectAddressTitle: {
//         color: Colors.color_label_400,
//         fontSize: 18,
//         fontWeight: '600',
//     },
//     connectAddressValue: {
//         color: Colors.color_label_400,
//         fontSize: 18,
//         fontWeight: '600',
//     },

// });

export default styles
