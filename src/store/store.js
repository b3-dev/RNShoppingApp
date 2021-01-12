import {createStore, combineReducers} from 'redux';
import cartItems from '../reducers/cartItems';


const rootReducer  = combineReducers({
	cart:cartItems, //funciones de card reducer
	
})

const store = createStore (
	rootReducer
)

export default store