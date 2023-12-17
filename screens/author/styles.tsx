import { StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';

const styles = StyleSheet.create({
    // ===============Base================
    text: {
        fontFamily: 'InterMedium',
        fontSize: 14,
    },
    input: {
        flex: 1,
        height: 50,
        borderRadius: 8,
        backgroundColor: '#FFFFFF',
        borderWidth: 2,
        borderColor: Colors.color_divider,
        paddingHorizontal: 20,
        paddingVertical: 10,
        fontFamily: 'InterMedium',
        fontWeight: '500',
        fontSize: 16,
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
    // ============= No Connect ================
    containerNoConnect: {
        flex: 1,
        height: '100%',
        // paddingHorizontal: 15,
        justifyContent: 'center',
        alignItems: 'center',
       
    },
    noConnectBg: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.color_base_300,
        // borderRadius: 10,
        position: 'relative',
    },
    connectForm: {
        overflow: 'hidden',
        width: 335,
        maxHeight: "100%",
        maxWidth: "100%",
        marginHorizontal: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        gap: 25,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.16,
        elevation: 4,
        shadowRadius: 4,
        padding: 20,
        paddingTop: 35,
        paddingBottom: 50,
        borderRadius: 10,
    },
    connectImage: {
        width: 120,
        height: 120,
    },
    connectTitle: {
        textAlign: 'center',
        fontSize: 22,
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
        backgroundColor: Colors.color_grey_1000,
        borderRadius: 10,
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
        color: Colors.color_label_100,
    },
    connectBtnDes: {
        fontSize: 14,
        fontWeight: '500',
        color: Colors.color_label_200,
    },
    
    // ============= Connected ================
    createContent: {
        backgroundColor: Colors.color_base_100,
        flex: 1,
    },
    container: {
        flex: 1,
        // paddingHorizontal: 15,
        paddingBottom: 60,
    },
    // ==============Head line=============
    headLine: {
        // marginTop: 30,
        // paddingVertical: 20,
        paddingBottom: 20,
    },
    headLineBg: {
        width: '100%',
        height: 150,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: Colors.color_base_300,
        // borderRadius: 10,
        position: 'relative',
    },
    headLineAvatar: {
        position: 'absolute',
        bottom: -60,
        alignSelf: 'center',
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 3,
        borderColor: Colors.color_base_200,

    },
    headLineContent: {
        fontSize: 28,
        fontWeight: '700',
        lineHeight: 35,
        color: Colors.color_label_100,
        marginBottom: 10,
    },
    headLineDes: {
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 24,
        color: Colors.color_label_200,
    },
    // ===========Info Wallet============

    walletInfo: {
        paddingHorizontal: 15,
        marginTop: 55,
        width: '100%',
        gap: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    // avatarFrame: {
    //     width: 120,
    //     height: 120,
    //     borderRadius: '50%',
    //     borderWidth: 3,
    //     borderColor: Colors.color_grey_600,
    //     padding: 3,
    // },
    // walletAvatar: {
    //     width: '100%',
    //     height: '100%',
    //     borderRadius: '50%',
    // },

    // Address
    walletAddress: {
        fontSize: 22,
        fontWeight: '700',
        color: Colors.color_label_400,
    },

    // Status
    walletStatusContainer: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 10,
    },
    walletStatusValue: {
        width: 120,
        fontSize: 16,
        fontWeight: '600',
        borderRadius: 5,
        color: Colors.color_success,
        backgroundColor: 'rgba(44,180,98,0.2)',
        paddingVertical: 7,
        textAlign: 'center',
    },

    // Wallet Action
    walletAction: {
        marginTop: 25,
        paddingBottom: 30,
        borderBottomColor: Colors.color_divider,
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 15,
        width: '100%',
    },
    containerFlexStart: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 8,
    },
    balanceContainer: {
        borderBottomColor: Colors.color_divider,
        borderBottomWidth: 1,
        paddingBottom: 25,
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
    // List 
    nftContent: {
        paddingHorizontal: 15,
        marginTop: 20,
        // backgroundColor: Colors.color_base_200,
    },

    title: {
        fontSize: 18,
        fontWeight: '700',
        alignItems: 'center',
    },
    listNft: {
        marginTop: 10,
        flex: 1,
        width: '100%',
    },

    nftItem: {
        flex: 0.5,
        margin: 1,
        paddingHorizontal: 5,
    }

});

export default styles