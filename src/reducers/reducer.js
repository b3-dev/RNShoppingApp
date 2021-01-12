import { combineReducers } from 'redux';

import routeReducer from './routeReducer';
import reducer from './a-reducer';

export default combineReducers({
    route: routeReducer,
    reducer: reducer,
});