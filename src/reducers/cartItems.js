
const cartItems = (state=[],action)=>{
    //console.log('cartItems'+action.product);
    switch(action.type){
       
        case 'ADD_TO_CART':
            return [ ...state,action.product];
            //console.log(state);
        case 'REMOVE_TO_CART':
            return 0;
        default:
            return state;
    }
}

export default cartItems;