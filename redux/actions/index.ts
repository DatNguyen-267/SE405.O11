import * as actions from './actionTypes';

export const showLoading = () => {
    return {
        type: actions.SHOWLOADING,
    }
}
export const hideLoading = () => {
    return {
        type: actions.HIDELOADING,
    }
}

export const showToast = () => {
    return {
        type: actions.SHOWTOAST,
    }
}
export const hideToast = () => {
    return {
        type: actions.HIDETOAST,
    }
}

