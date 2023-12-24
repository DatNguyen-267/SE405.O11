import { useDispatch } from 'react-redux'
import * as actions from '../redux/actions'

export const onShowLoading = (dispatch?: any) => {
  dispatch(actions.showLoading())
}
export const onHideLoading = (dispatch?: any) => {
  dispatch(actions.hideLoading())
  console.log('hide loading')
}
