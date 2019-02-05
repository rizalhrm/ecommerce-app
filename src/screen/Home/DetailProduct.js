import React from 'react';
import {View, Text} from 'react-native';
import  {Container, Icon, Content} from 'native-base';
import { Card, Button, Image } from 'react-native-elements';

import '../../data/data.js';
import '../../data/cart.js';

export default class DetailProduct extends React.Component {

    constructor(props){
        super(props);

        const {product} = props.navigation.state.params;

        this.state = {
            name: product.name,
            image: product.image,
            price: product.price,
            description: product.description
        }
    }

    addToCart = () => {
        cart.push(this.state);
        this.props.navigation.navigate('Cart');
    }
    
    render(){
        return (
        <Container>
            <Content>
                <Card
                title={this.state.name}>
                <Image
                source={{ uri: this.state.image }}
                style={{ width: 300, height:300, alignContent: 'center' }}
                />
                <View style={{flex: 1}}>
                    <Text style={{color: 'red', marginBottom: 10, fontSize:16, justifyContent: 'space-between', textAlign:"center"}}>
                    Rp {this.state.price}
                    </Text>
                    <Text style={{fontWeight: 'bold'}}>Description : </Text>
                    <Text style={{color: 'black', marginBottom: 10, fontSize:13, alignSelf:"stretch", justifyContent:"center"}}>
                    {this.state.description}
                    </Text>
                    <Button
                    icon={<Icon name='cart' style={{color: 'white'}}/>}
                    backgroundColor='#03A9F4'
                    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                    title='Add to Cart' onPress={this.addToCart}/>
                </View>
                </Card>
            </Content>
        </Container>
        )
    }
}