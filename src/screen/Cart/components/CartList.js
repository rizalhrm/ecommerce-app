import React, { Component } from 'react';
import { ListItem, Left, Thumbnail, Body, Text, Button, Icon } from 'native-base';

import '../../../data/data.js';

export default class CartList extends Component{

    render(){

        const { cart } = this.props;

        return(
            <ListItem thumbnail>
                <Left>
                    <Thumbnail square source={{ uri: cart.image }} />
                </Left>
                <Body>
                    <Text>{cart.name}</Text>
                    <Text>Rp.{cart.price}</Text>
                    <Button iconLeft danger small style={{ marginTop: 10 }}>
                        <Icon name="trash" />
                        <Text>Delete</Text>
                    </Button>
                </Body>
            </ListItem>

        )
    }
}
