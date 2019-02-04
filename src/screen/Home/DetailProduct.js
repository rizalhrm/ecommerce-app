import React from 'react';
import {View, Text} from 'react-native';
import  {Container, Icon, Content} from 'native-base';
import { Card, Button, Image } from 'react-native-elements';

import '../../data/data.js';

export default class DetailProduct extends React.Component {

    render(){
        const {product} = this.props.navigation.state.params;
        return (
        <Container>
            <Content>
                <Card
                title={product.name}>
                <Image
                source={{ uri: product.image }}
                style={{ width: 300, height:300, alignContent: 'center' }}
                />
                <View style={{flex: 1}}>
                    <Text style={{color: 'black', marginBottom: 10, fontSize:16, justifyContent: 'space-between', textAlign:"center"}}>
                    Rp {product.price}
                    </Text>
                    <Text style={{color: 'black', marginBottom: 10, fontSize:13, justifyContent: 'space-around', textAlign:"center"}}>
                    {product.description}
                    </Text>
                    <Button
                    icon={<Icon name='cart' style={{color: 'white'}}/>}
                    backgroundColor='#03A9F4'
                    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                    title='Add to Cart' />
                </View>
                </Card>
            </Content>
        </Container>
        )
    }
}