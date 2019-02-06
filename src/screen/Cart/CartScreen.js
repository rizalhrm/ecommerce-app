import React, {Component} from 'react';
import { View, Container, Content, List } from 'native-base';

import CartList from './components/CartList';
import '../../data/data.js';

import ToNext from './components/ToNext';
import ToShop from './components/ToShop';

export default class CartScreen extends Component {

    constructor(){
        super();
        this.state = {
            cart: cart
        }
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
                                />)
                        }
                    </List>
                        {this.state.cart.length < 1 ? <ToShop/> : <ToNext/> }
                </Content>
            </Container>
        )
    }
}