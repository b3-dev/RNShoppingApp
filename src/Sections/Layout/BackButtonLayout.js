import React,{Component} from 'react';
import {
    StyleSheet,
    Text,


} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class BackButtonLayout extends Component{
    render(){
        return(
            <View >
                <Icon name="ios-arrow-back" size={30} color="#000" />
            </View>
            
        );
    }
}
export default BackButtonLayout;
