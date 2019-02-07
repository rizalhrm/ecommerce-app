import React, {Component} from 'react';
import {Alert} from 'react-native';
import { View, Container, Content, List } from 'native-base';

import CartList from './components/CartList';

import '../../data/cart.js';

import ToNext from './components/ToNext';
import ToShop from './components/ToShop';

export default class CartScreen extends Component {

    constructor(){
        super();
        this.state = {
            cart: cart
        }
    }

    removeCartItem({item, index}){
        Alert.alert('Alert', `Apakah Anda Yakin Menghapus Barang Terpilih ${cart.name} ?`,[
            {text: 'Tidak'},
            {text: 'Ya', style:'cancel', onPress: ()=>this.setState({cartItems:this.state.cartItems.filter((data, i)=> i != index)})}
        ]);
    }
  

    render(){
        return(
            <Container>
                <Content>
                    <List>
                        {cart.map((carts, key) => 
                                <CartList
                                    key={key} 
                                    cart={carts}
                                    onPressDel={()=>this.removeCartItem({carts, key})} 
                                />)
                        }
                    </List>
                        {this.state.cart.length < 1 ? <ToShop/> : <ToNext/> }
                </Content>
            </Container>
        )
    }
}