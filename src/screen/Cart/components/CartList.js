import React, { Component } from 'react';
import { View, TextInput, TouchableNativeFeedback } from 'react-native';
import { ListItem, Left, Thumbnail, Body, Text, Button, Icon, Right } from 'native-base';

import '../../../data/cart.js';

export default class CartList extends Component{

    constructor(props){
        super(props);
        this.state = {
            idproduct : cart
        }
    }

    render(){

        const { cart } = this.props;

        return(
            <ListItem thumbnail>
                <Left>
                    <Thumbnail square source={{ uri: cart.image }} />
                </Left>
                <Body>
                    <Text>{cart.name}</Text>
                    <Text style={{ color: 'grey' }}>Rp.{cart.price}</Text>
                </Body>
                <Right>
                    <TouchableNativeFeedback onPress={this.props.onPressDel}>
						<View style={{ marginTop: -10, marginBottom: -10 }}>
                            <Icon name="trash" style={{color: '#ff0a0a'}}/>
						</View>
					</TouchableNativeFeedback>
                    <View style={{marginBottom : -15}}>
                        <TextInput keyboardType="numeric" maxLength={5} placeholder="Qty"/>
                    </View>
                </Right>
            </ListItem>

        )
    }
}
