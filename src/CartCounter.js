import React from 'react';
import {Text} from 'react-native';
import axios from 'axios';

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
            url: `http://192.168.0.26:3333/api/v1/orders`
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
        console.log(this.state.countOfCart.length)
        return (
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize : 15 }}>
                {this.state.countOfCart.length === 0 ? 0 : this.state.countOfCart.length }
            </Text>
        )
    }
}

export default CartCounter;