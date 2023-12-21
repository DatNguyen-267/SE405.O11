import Toast from 'react-native-toast-message';
import * as actions from '../redux/actions'

export const onShowToastSuccess = (message?:string) => {
    Toast.show({
        type: 'success',
        text1: 'Success',
        text2: message,
    })

}
export const onShowToastError = (message?:string) => {
    Toast.show({
        type: 'error',
        text1: 'Error',
        text2: message,
    })

}

export const onShowToastInfo = (message?:string) => {
    Toast.show({
        type: 'info',
        text1: 'Info',
        text2: message,
    })

}