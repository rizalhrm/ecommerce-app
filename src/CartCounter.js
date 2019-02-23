import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import axios from 'axios';
import { server } from './data/server';

class CartCounter extends React.Component {

    constructor(){
        super();
        this.state = {
            countOfCart : []
        }
    }

    componentDidMount() {
        axios({
            method: 'get',
            url: `${server.url}api/v1/orders`
        })
        .then(res => {
            this.setState({
                countOfCart: res.data
            })
        })
        .catch(err => {
            console.log(err);
        })
    }



    render(){
        
        return (
            this.state.countOfCart.length === 0 ? null : (<View style={styles.badge}>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize : 15 }}>
                            {this.state.countOfCart.length}
                        </Text>
                    </View>)
            
        )
    }
}

const styles = StyleSheet.create({
    badge : {
        position: 'absolute',
        height: 20,
        width: 20,
        borderRadius: 10,
        backgroundColor: 'rgba(95, 197, 123, 0.8)',
        right: 15,
        bottom: 20,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2000
    }
})

export default CartCounter;