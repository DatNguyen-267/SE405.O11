import * as actions from "../actions/actionTypes"

//state không thay đổi, chỉ trả về giá trị cuối cùng
const initialState = {
    isShowToast: false,
}
const toast = (state= initialState, action:any) => {
    switch (action.type) {
        case actions.SHOWTOAST:
            return {
                ...state,
                isShowToast: true,
            };
        case actions.HIDETOAST:
            return {
                ...state,
                isShowToast: false,
            };
        default:
            return state;
    }
}

export default toast;