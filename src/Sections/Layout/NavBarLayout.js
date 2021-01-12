import React,{Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
   
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux';
import ShoppingCart from '../../src/Sections/Layout/ShoppingCart';
import {connect} from 'react-redux';

class NavBarLayout extends Component{
    constructor(props){
        super(props)
        this.onBackAction = this.onBackAction.bind(this);
    }
    onBackAction() {
        Actions.pop();
    }
    render(){
        return(
            <View style={styles.header}>
                    <View style={styles.contentButtons}>
                        <View style={styles.itemViewHeader}>
                           <TouchableOpacity style={styles.buttonNav} onPress={this.onBackAction}>
                                <Text>
                                    <Icon name="ios-arrow-back" size={30} color="#FFF" />
                                </Text>
                             </TouchableOpacity>
                        </View>
                        <View style={styles.itemViewHeader}>
                            <Text style={styles.itemTextHeader}>{this.props.title}</Text>
                        </View>
                        <View style={styles.itemViewHeader}>
                           <ShoppingCart countItems={this.props.cart.length}/>
                        </View>
                    </View>
                </View>
        );
    }
}

const mapStateToProps=state=> {
    return {
        cart: state.cart
    }
}

export default connect(mapStateToProps)(NavBarLayout);

const styles = StyleSheet.create({
  
    header: {
        flex: 1.3,
        backgroundColor: '#b71c1c',
        height: 100,
    },
    buttonNav:{
        width:80,
        textAlign:'center',
        alignItems: 'center',
        justifyContent: 'center',
        height:50,
    },
    contentButtons: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemViewHeader: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        top: 20
    },
    itemTextHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFF',
    },
    header: {
        flex: 1.3,
        backgroundColor: '#b71c1c',
        height: 100,
    }
});
