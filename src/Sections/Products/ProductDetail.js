import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    Alert,
    TouchableOpacity,
} from 'react-native';

import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import RNPickerSelect from 'react-native-picker-select';
const URL = 'http://192.168.1.49';

class ProductDetail extends Component {
    constructor(props) {
        super(props);
        this.addToCard = this.addToCard.bind(this);
        this.state = {
            product: undefined,
            sizes: [],
            selectedValue: 1,
            priceItem:0

        };
    }
    componentWillMount() {

        //getParam..
        let productItemDetail = this.props.navigation.state.params.productItem;
        this.setState({ product: productItemDetail });
        console.log('PRODUCT=>' + this.props.navigation.state.params.productItem);
        let arraySizes = [];
        let rowPrices = [];
        rowPrices = [];
        fetch(URL + '/api_react/public/services/product/getSizes/'
            + this.props.navigation.state.params.productItem.id_articulo)
            .then((response) => response.json())
            .then((responseJson) => {
                responseJson.data.sizes.map(function (size, index, array) {
                    arraySizes.push({ 'label': size.descripcion_tamano_articulo, 'value': size.id_tamano_articulo, 'price': size.precio_articulo_tamano })
                });
                //  console.log('prices=>'+JSON.stringify(arraySizes));
                if (arraySizes.length)
                    this.setState({ sizes: arraySizes })
            }).catch((error) => {
                console.error(error);
            });
    }

    addToCard() {
        
        if (!this.state.selectedValue) {
            Alert.alert(
                'Advertencia',
                'Debes elegir un tamaño',
                [

                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false }
            )
        }
        else {
            //addToCart
            if (this.props.addItemToCard(this.state.product)){
                Alert.alert(
                    'Producto agregado',
                    'Producto agregado al carrito ',
                    [
                        { text: 'OK', onPress: () => this.props.navigation.goBack(null) },
                    ],
                    { cancelable: false }
                )
            }
        }
    }

    render() {
        const placeholder = {
            label: 'Elige un tamaño',
            value: null,
            color: '#9EA0A4',
        };

        return (

            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={{
                        flex: 1, justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#FFF',
                        borderBottomColor: '#e0e0e0',
                        borderBottomWidth: 1
                    }}>

                       <Image resizeMode={'cover'} style={{ width: 250, height: 250 }}
                            source={{
                                uri: URL+'/api/public/' +
                                this.state.product.app_path_img_categoria +
                                this.state.product.app_img_articulo
                            }}
                        />
                    </View>
                    <View style={{ flex: 1, backgroundColor: '#FFF' }}>
                    
                        <Text style={styles.textDetail}>{this.state.product.app_descripcion_articulo}</Text>

                        <View style={{ flex: 0, backgroundColor: '#FFF', alignItems: 'center', paddingTop: 20, }}>
                            <RNPickerSelect
                                placeholder={placeholder}
                                items={this.state.sizes}
                                onValueChange={(value) => {
                                    this.setState({
                                        selectedValue: value,
                                    });
                                    
                                    const itemPrice=  this.state.sizes.find(x => x.value === value)
                                    console.log('precio encontrado'+JSON.stringify(itemPrice.price))
                                    this.setState({
                                        priceItem: itemPrice.price,
                                    });
                                }}

                                style={{
                                    ...pickerSelectStyles,
                                    iconContainer: {
                                        top: 15,
                                        right: 12,
                                    },
                                }}
                                value={this.state.selectedValue}
                                useNativeAndroidPickerStyle={false}
                                textInputProps={{ underlineColor: 'yellow' }}
                                Icon={() => {
                                    return <Icon name="ios-arrow-down" size={25} color="gray" />;
                                }}
                            />
                            </View >
                        <View >
                            <Text >Precio $ {this.state.priceItem}</Text>
                        </View>

                         <View style={{ flex: 0, backgroundColor: '#FFF', alignItems: 'center', paddingTop: 30 }}>
                            
                           <TouchableOpacity style={styles.button} onPress={this.addToCard} >
                                <Text style={styles.textButton} >Agregar al carrito</Text>
                        </TouchableOpacity> 
                        </View>
                    </View>
                </View>
                <View style={styles.footer}>
                    <Text style={{ fontWeight: 'bold', color: '#FFF' }}>React Native App</Text>
                </View>
            </View >
        );
    }
}

const mapStateToProps=state=> {
    return {
        cart: state.cart
    }
   
}

const mapDispatchToProps = dispatch => {
    return {
        addItemToCard: (product) => dispatch({
            type: 'ADD_TO_CART', product: product
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    textButton: {
        fontSize: 20,
        color: '#FFF',
    },
    button: {
        width: 300,
        height: 50,

        backgroundColor: '#b71c1c',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textDetail: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 30,
        color: '#757575',
        fontWeight: 'bold',
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        fontSize: 15
    },
  
    
    contentButtons: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    
    content: {
        flex: 8,
        height: 400,
        justifyContent: 'center',
        backgroundColor: '#eee'
    },
    footer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#757575'
    }

});
const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        padding: 30,

        paddingVertical: 15,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#c0c0c0',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: '#c0c0c0',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
});