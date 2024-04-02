import { combineReducers } from 'redux';
import { pathReducer } from './PathReducer';

const rootReducer = combineReducers({
    path: pathReducer,
});

export default rootReducer;