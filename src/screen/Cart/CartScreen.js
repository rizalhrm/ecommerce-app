import React, {Component} from 'react';
import {TextInput, TouchableOpacity, FlatList} from 'react-native';
import { View,
    Container,
    Content,
    List,
    ListItem,
    Left,
    Thumbnail,
    Body,
    Text,
    Button,
    Icon,
    Right
} from 'native-base';

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
  
    deleteItem = id => () => {
        this.setState({
          cart: this.state.cart.splice(id, 1)
        });
      };
    

    render(){
        return(
            <Container>
                <Content>
                    <List>
                    <FlatList
                        data={this.state.cart}
                        renderItem={({ item, index }) => (
                        <ListItem thumbnail>
                            <Left>
                                <Thumbnail square source={{ uri: item.image }} />
                            </Left>
                            <Body>
                                <Text>{item.name}</Text>
                                <Text style={{ color: 'grey' }}>Rp.{item.price}</Text>
                            </Body>
                            <Right>
                                <TouchableOpacity onPress={this.deleteItem(item.id)}>
                                    <View style={{ marginTop: -10, marginBottom: -10 }}>
                                        <Icon name="trash" style={{color: '#ff0a0a'}}/>
                                    </View>
                                </TouchableOpacity>
                                <View style={{marginBottom : -15}}>
                                    <TextInput keyboardType="numeric" maxLength={5} placeholder="Qty"/>
                                </View>
                            </Right>
                        </ListItem>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                        />

                    </List>
                        {this.state.cart.length < 1 ? <ToShop/> : <ToNext/> }
                </Content>
            </Container>
        )
    }
}