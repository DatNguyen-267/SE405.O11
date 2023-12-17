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
        fontWeight: '600',
        alignItems: 'center',
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
    // Address
    walletAddress: {
        fontSize: 22,
        fontWeight: '700',
        color: Colors.color_label_400,
    },

    // Status
    walletOwnerContainer: {
        width: '100%',
        marginTop: 25,
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 10,
        flexDirection: 'row',
        
    },
    walletOwnerTitle: {
        textAlign: 'center',
    }, 
    walletOwnerAddress: {
        paddingVertical: 10,
        width: '50%',
        backgroundColor: Colors.color_divider,
        borderRadius: 8,
        fontSize: 16,
        fontWeight: '600',
        color: Colors.color_label_400,
        textAlign: 'center',
    },

    // List 
    nftContent: {
        paddingHorizontal: 15,
        marginTop: 30,
        backgroundColor: Colors.color_base_200,
        paddingTop: 30,
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
        flex: 1,
    }

});

export default styles