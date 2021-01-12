import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Alert,
    AsyncStorage

} from 'react-native';

class MainPage extends Component {

    constructor(props) {
        super(props)
        this.onPressButton = this.onPressButton.bind(this);
        this.state = {
            email: '',
            password: '',
            isLogged: false
        }

    }

    onPressButton() {
        fetch('http://192.168.1.49/api_react/public/services/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,

            })

        })
            .then((response) => response.json())
            .then((res) => {
                if (res.data.length > 0 && res.status === 'OK') {
                    if (res.token) {
                        //GUARDAR TOKEN.. 
                        let items = [
                            ['userId', res.data[0].id_cliente],
                            ['clientName', res.data[0].nombre_cliente],
                            ['token', res.token]
                        ]

                        AsyncStorage.setItem("AccessKey", JSON.stringify(items), () => {
                            this.setState({ isLogin: true })
                            this.props.navigation.navigate('ProductsPage');
                        })
                    }
                }
                else {
                    Alert.alert(
                        'Advertencia',
                        'Datos de acceso incorrectos',
                        [

                            { text: 'OK', onPress: () => console.log('OK Pressed') },
                        ],
                        { cancelable: false }
                    )
                }
            })
            .catch((response) => {
                console.log(response)
            })
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.welcomeView}>
                    <Text style={styles.welcomeText}>¡Bienvenido! {this.state.isLogged} </Text>

                </View>
                <ScrollView style={styles.welcomeText}>
                    <KeyboardAvoidingView behavior="padding" enabled>

                        <View style={styles.welcomeText}>
                            <TextInput
                                style={{ width: 300, height: 40, borderColor: '#FFF', borderBottomColor: '#757575', borderWidth: 1 }}
                                placeholder="email"
                                keyboardType='email-address'
                                onChangeText={(text) => this.setState({ email: text })}
                                returnKeyType={(Platform.OS === 'ios') ? 'done' : 'next'}
                            />
                        </View>
                        <View style={styles.welcomeText}>
                            <TextInput
                                style={{ width: 300, height: 40, borderColor: '#FFF', borderBottomColor: '#757575', borderWidth: 1 }}
                                placeholder="password" secureTextEntry={true}
                                onChangeText={(text) => this.setState({ password: text })}
                                returnKeyType={(Platform.OS === 'ios') ? 'done' : 'next'}
                            />
                        </View>
                        <View style={styles.welcomeText}>
                            <TouchableOpacity style={styles.button} onPress={this.onPressButton}>
                                <Text style={styles.textButton} >Entrar</Text>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
            </View>
        );
    }
}
export default MainPage;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',

    },
    welcomeView: {
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    welcomeText: {

        paddingVertical: 10,
        color: '#000',
        fontSize: 20,
        fontWeight: 'bold',
    },

    welcomeText2: {
        color: '#757575',
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

    header: {
        backgroundColor: '#000',
    }
});
