import * as actions from "../actions/actionTypes"

//state không thay đổi, chỉ trả về giá trị cuối cùng
const initialState = {
    isLoading: false,
}
const loading = (state= initialState, action:any) => {
    switch (action.type) {
        case actions.SHOWLOADING:
            return {
                ...state,
                isLoading: true,
            };
        case actions.HIDELOADING:
            return {
                ...state,
                isLoading: false,
            };
        default:
            return state;
    }
}

export default loading;