import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Image,
    TouchableOpacity,
    ActivityIndicator

} from 'react-native';
import { Badge, withBadge } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
const URL = 'http://192.168.1.49';

export default class ProductsPage extends Component {
    constructor(props) {
        super(props);

        this.rowDetail = this.rowDetail.bind(this);
        this.state = {
            products: [],
            loadingList: false,
            emtptyList: false,
        };
    }

    componentWillMount() {
        fetch(URL + '/api_react/public/services/products')
            .then((response) => response.json())
            .then((responseJson) => {
                try {
                    this.setState({ loadingList: true })
                    if (responseJson.data.length) {
                        this.setState({ products: responseJson.data })
                    }
                    else {
                        this.setState({ loadingList: true })

                    }
                }
                catch (e) {
                    console.log('error loading');
                }

            })
            .catch((response) => {
                this.setState({ loadingList: true })
            })
    }

    rowDetail(item) {

        this.props.navigation.navigate('ProductDetail', {
            productItem: item
        });
    }


    renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.buttonNav} onPress={() => this.rowDetail(item)}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', padding: 20 }}>
                    <View style={{ flex: 1 }}   >
                        <Image style={{ width: 70, height: 70 }}
                            source={{
                                uri: URL + '/api/public/' +
                                    item.app_path_img_categoria +
                                    item.app_img_articulo
                            }}
                        />

                    </View>
                    <View style={{ flex: 2 }} >
                        <Text style={{ fontSize: 15, color: '#000' }}>
                            {item.nombre_articulo}
                        </Text>
                        <Text style={{ fontSize: 13, paddingTop: 5, color: '#757575' }}>
                            {item.app_descripcion_articulo}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    emptyList = () => {
        return (
            <View style={styles.container}>

                <View style={styles.content}>
                    <Text style={{ textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}>
                        No hay elementos en esta lista
                    </Text>
                </View>
                <View style={styles.footer}>
                    <Text >React Native App</Text>
                </View>

            </View >
        );
    }

    render() {

        if (!this.state.loadingList) {
            return (
                <View style={styles.container}>

                    <View style={styles.content}>
                        <ActivityIndicator size="small" color="#b71c1c" />
                        <Text style={{ textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}>
                            Cargando..
                        </Text>
                    </View>
                    <View style={styles.footer}>
                        <Text style={{ fontWeight: 'bold', color: '#FFF' }}>React Native App</Text>
                    </View>

                </View >
            );

        }
        else {
            return (
                <View style={styles.container}>

                    <View style={styles.content}>
                        <FlatList
                            data={this.state.products}
                            renderItem={this.renderItem}
                            keyExtractor={item => item.id_articulo.toString()}
                            initialNumToRender={5}
                            ListEmptyComponent={this.emptyList}

                        />
                    </View>
                    <View style={styles.footer}>
                        <Text style={{ fontWeight: 'bold', color: '#FFF' }}>React Native App</Text>
                    </View>

                </View >
            );

        }

    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
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
