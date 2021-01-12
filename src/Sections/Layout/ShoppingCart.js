import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    View
} from 'react-native';

import {Badge } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';

//class ShoppingCart extends Component{
const ShoppingCart = (props) =>{ 
    console.log('propsShoppingCart=>'+props.cart)
        return(
            <View>
                <TouchableOpacity onPress={()=>props.navigation.navigate('CartItemsPage')} >
                <Text >
                    <Icon name="ios-cart" size={40} color='#FFF' />
                </Text>
                <Badge status="success" value={props.cart.length}
                    containerStyle={{ position: 'absolute', top: -4, right: -15 }} />
                </TouchableOpacity>
            </View>         
        );
}

const mapStateToProps= state=>{
	return{
		cart:state.cart
	}
}

export default connect(mapStateToProps)(ShoppingCart); 