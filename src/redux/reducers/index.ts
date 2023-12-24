import { combineReducers } from 'redux';
import loading from './Loading';
import toast from './Toast';

const allReducers = combineReducers({
    loading,
    toast,
});
export default allReducers;