import React, {Component} from 'react';
import { View, Image } from 'react-native';
import { Container, Content, Text, Button, List, ListItem, Left, Body, Right } from 'native-base';

import '../../data/data.js'
import CartList from './components/CartList';

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
                        {this.state.cart.map((carts, key) => <CartList key={key} cart={carts} />)}
                    </List>
                    <List>
                        <ListItem>
                            <Left>
                                <Button small rounded style={{ marginLeft: 30}}>
                                    <Text>CheckOut</Text>
                                </Button>
                            </Left>
                            <Body>
                                <Button small block rounded style={{ backgroundColor: 'royalblue'}}>
                                    <Text style={{fontSize: 12}}>Lanjut Belanja</Text>
                                </Button>
                            </Body>
                            <Right/>
                        </ListItem>
                    </List>
                </Content>
            </Container>
        )
    }
}