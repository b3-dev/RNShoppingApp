import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Image,
    TouchableOpacity

} from 'react-native';
import { connect } from 'react-redux';
import { Badge, withBadge } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux';

class CartItemsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            products: [],
        };
    }
    
    renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={{
                justifyContent: 'center',
                alignItems: 'center'
            }} >
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', padding: 20 }}>
                    <View style={{ flex: 1 }}   >
                        <Text style={{ fontSize: 15, paddingTop: 5, color: '#000', }}>
                            {item.web_nombre_articulo}
                        </Text>
                    </View>
                    <View style={{ flex: 2 }} >

                        <Text style={{ fontSize: 13, paddingTop: 5, color: '#757575' }}>
                            {item.app_descripcion_articulo}
                        </Text>

                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <FlatList
                        data={this.props.cart}
                        renderItem={this.renderItem}
                        keyExtractor={item => item.id_articulo.toString()}
                    />
                    <View style={styles.viewButton} >
                        <TouchableOpacity style={styles.buttonGreen} onPress={() => alert('aca')}>
                            <Text style={styles.textButton} >
                                <Icon name="ios-paper-plane" size={20} color='#FFF' /> Comprar
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.footer}>
                    <Text style={{ fontWeight: 'bold', color: '#FFF' }}>React Native App</Text>
                </View>

            </View >
        );
    }
}
const mapStateToProps = state => {
    return {
        cart: state.cart
    }

}
export default connect(mapStateToProps, null)(CartItemsPage);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#eee',
        backgroundColor: '#FFF',
    },

    content: {
        flex: 8,
        height: 400,
        justifyContent: 'center',
        backgroundColor: '#eee'
    },
    viewButton:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textButton: {
        fontSize: 20,
        color: '#FFF',
    },
    buttonGreen: {
        width: 300,
        height: 50,

        backgroundColor: '#00695c',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#757575'
    }

});
