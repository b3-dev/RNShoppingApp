import React,{Component} from 'react';
//import {Router,Stack, Scene} from 'react-native-router-flux';
import {createStackNavigator,createAppContainer} from 'react-navigation';

import ProductsPage from './Sections/Products/ProductsPage';
import ProductDetail from './Sections/Products/ProductDetail';
import MainPage from './Sections/Main/MainPage';
import CartItemsPage from './Sections/Cart/CartItemsPage';
import ShoppingCart from './Sections/Layout/ShoppingCart';


export default class Routes extends Component{
    constructor(props){
        super(props)
        this.state={
            isLogged:false
        }
    }
     
    render() {
        return (
            <AppStackNavigator />
        );
    }
}
const AppStackNavigator = createAppContainer(createStackNavigator(
    {
        MainPage:{
            screen:MainPage,
            navigationOptions: () => ({
                title: 'Login',
                headerBackTitle: null
            }),
        } ,
        ProductsPage:{
            screen:ProductsPage,
            navigationOptions: (props) => ({
                title: 'Productos',
                //headerBackTitle: null
            }),
        },

        ProductDetail:{
            screen:ProductDetail,
            navigationOptions: () => ({
                title: 'Detalle',
                //headerBackTitle: null
            }),
        },
        CartItemsPage:{
            screen:CartItemsPage,
            navigationOptions: () => ({
                title: 'Carrito',
                //headerBackTitle: null
            }),
        },

    },
    {
        defaultNavigationOptions:(props)=> {
            const {navigation} = props;
            return({
                headerTintColor: '#FFF',
                headerRight:(<ShoppingCart navigation={navigation}/>),
                headerLeftContainerStyle:{
                    paddingLeft:20
                },
                headerRightContainerStyle:{
                    paddingRight:30
                },
                headerStyle: {
                    backgroundColor: '#b71c1c',
                }
            })
           
        }
    }
));

