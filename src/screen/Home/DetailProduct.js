import React from 'react';
import {View, Text} from 'react-native';
import  {Container, Icon, Content} from 'native-base';
import { Card, Button, Image } from 'react-native-elements';
import axios from 'axios';

export default class DetailProduct extends React.Component {

    constructor(props){
        super(props);

        this.item = props.navigation.state.params.item;

        this.state = {
            id : this.item.id,
            name : this.item.name,
            image : this.item.image,
            price : this.item.price,
            description : this.item.description

        }
    }

    componentWillMount() {
        axios({
            method: 'get',
            url: `http://192.168.0.26:3333/api/v1/products/${this.state.id}`
            })
            .then(res => {
                this.setState({
                    name: res.name,
                    image: res.image,
                    price: res.price,
                    description: res.description
                })
            })
            .catch(err => {
                console.log(err);
            })
    }

    addToCart = () => {
        let newProduct = {
            id: this.state.id,
            name: this.state.name,
            price: this.state.price,
            image: this.state.image,
            qty: 1
          };

        let ifExist = false;

        cart.map(data => {
            if (data.id == this.state.id) {
                ifExist = true;
            }
        });

        if (ifExist) {
            cart.map(data => {
            if (data.id == this.state.id) {
                Object.assign(data, {
                    qty: data.qty + 1
                });
                this.props.navigation.navigate("Cart");
            }
        });
        } else {
            cart.push(newProduct);
            this.props.navigation.navigate("Cart", { cart });
        }
    }

    formatNumber = (num) => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
    
    render(){
        return (
        <Container>
            <Content>
                <Card
                title={this.state.name} titleStyle={{fontSize: 18}}>
                <Image
                source={{ uri: this.state.image }}
                style={{ width: 300, height:300, alignContent: 'center', resizeMode:'contain', marginBottom: 5 }}
                />
                <View style={{flex: 1}}>
                    <Text style={{color: 'black', marginBottom: 10, fontSize:16, justifyContent: 'space-between', textAlign:"center"}}>
                    Rp {this.formatNumber(this.state.price)}
                    </Text>
                    <Text style={{fontWeight: 'bold' , color: 'black'}}>Description : </Text>
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