import {createStore, combineReducers} from 'redux';
import reducer from './reducer';
import routeReducer from './routeReducer';

const rootReducer = combineReducers({
    reducer,
    routeReducer
})

export default createStore(rootReducer);