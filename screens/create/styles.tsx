import { StyleSheet } from 'react-native';
import { Colors} from '../../constants/Colors';

const styles = StyleSheet.create({
    // Base
    text: {
        fontFamily: 'InterMedium',
        fontSize: 14,
    },
    input: {
        width: '100%',
        height: 70,
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
    inputContainer: {
        flex: 1,
        marginBottom: 25,
    },
    label: {
        fontSize: 18,
        fontWeight: '700',
        alignItems: 'center',
        marginBottom: 10,
        marginLeft: 3,
    },
    //  Screen
    createScreen: {
        backgroundColor: Colors.color_base_100,
        flex: 1,
    },
    createContent: {
        backgroundColor: Colors.color_base_100,
        flex: 1,
    },
    container: {
        flex: 1,
        paddingHorizontal: 15,
        paddingBottom: 60,
    },
    // Head line
    headLine: {
        marginTop: 30,
        paddingVertical: 20,
    },
    headLineBg: {
        height: 150,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: Colors.color_base_300,
        borderRadius: 10,
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

    // Image
    imgContainer: {
        marginTop: 20,
        width: '100%',
        justifyContent: 'flex-start',
        position: 'relative',
    },

    clearImage: {
        position: 'absolute',
        right: 8,
        top: 8,
        color: Colors.color_label_200,
        fontSize: 22,
        backgroundColor: Colors.color_label_100,
        borderRadius: 11,
    },

    imgTitle: {
        fontSize: 18,
        fontWeight: '700',
        alignItems: 'center',
        marginBottom: 15,
    },

    imgFrame: {
        width: '100%',
        height: 200,
        borderRadius: 20,
        borderColor: Colors.color_grey_700,
        borderWidth: 3,
        borderStyle: 'dashed',
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imgDes: {
        fontSize: 14,
        fontWeight: '500',
        color: Colors.color_label_300,
        marginTop: 15,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    iconAdd: {
        width: 40,
        height: 40,
    },
    // Name
    nameContainer: {
        marginTop: 30,
    }, 
    // Des
    // Address
    // Actions
    createAction: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 15,
    },
    createBtn: {
        paddingVertical: 4,
        paddingHorizontal: 15,
        backgroundColor: Colors.color_base_300,
        borderRadius: 8,
        shadowColor: '#000000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.16,
        elevation: 4,
        shadowRadius: 4,
    },
    createText: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.color_label_100,
    }

});

export default styles