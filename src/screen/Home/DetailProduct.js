import React from 'react';
import {View, Text} from 'react-native';
import  {Container, Icon, Content} from 'native-base';
import { Card, Button, Image } from 'react-native-elements';
import axios from 'axios';

export default class DetailProduct extends React.Component {

    constructor(props){
        super(props);

        this.item = this.props.navigation.state.params.item;

        this.state = {
            checkCarts : [],
            detail : []
        }
    }

    componentDidMount() {
        axios({
            method: 'get',
            url: `http://192.168.0.26:3333/api/v1/product/${this.item.id}`
            })
        .then(res => {
            this.setState({
                detail : res.data
            })
        })
        .catch(err => {
            console.log(err);
        })

        axios({
            method: 'get',
            url: 'http://192.168.0.26:3333/api/v1/orders'
        })
        .then(res =>  {
            this.setState({
                checkCarts : res.data
            })
        })
        .catch(err => {
            console.log(err);
        })
    }

    addToCart = () => {

        let exist = false
        let currentQty = 0
        this.state.checkCarts.map(data => {
            if (data.product_id == this.state.detail.id) {
                checkCartId = data.id
                exist = true
                currentQty = data.qty
            }
        })

        if (exist) {
            axios({
                method: 'patch',
                url: `http://192.168.0.26:3333/api/v1/order/${checkCartId}`,
                data: {
                    qty: currentQty + 1
                }
            })
            .then(res =>  {
                this.props.navigation.navigate("Cart");
            })
        }
        else {
            axios({
                method: 'post',
                url: 'http://192.168.0.26:3333/api/v1/order',
                data: {
                    product_id: this.item.id,
                    price: this.state.detail.price,
                    qty: 1
                }
            })
            .then(res =>  {
                this.props.navigation.navigate("Cart");
            })
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
                title={this.state.detail.name} titleStyle={{fontSize: 18}}>
                <Image
                source={{ uri: this.state.detail.image }}
                style={{ width: 300, height:300, alignContent: 'center', resizeMode:'contain', marginBottom: 5 }}
                />
                <View style={{flex: 1}}>
                    <Text style={{color: 'black', marginBottom: 10, fontSize:16, justifyContent: 'space-between', textAlign:"center"}}>
                    Rp {this.formatNumber(parseInt(this.state.detail.price))}
                    </Text>
                    <Text style={{fontWeight: 'bold' , color: 'black'}}>Description : </Text>
                    <Text style={{color: 'black', marginBottom: 10, fontSize:13, alignSelf:"stretch", justifyContent:"center"}}>
                    {this.state.detail.description}
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