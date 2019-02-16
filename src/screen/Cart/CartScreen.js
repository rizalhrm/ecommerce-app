import React, {Component} from 'react';
import {TouchableWithoutFeedback, TouchableOpacity, FlatList, StyleSheet, Alert} from 'react-native';
import { View,
    Container,
    Content,
    Thumbnail,
    Body,
    Text,
    Button,
    Icon,
    Right,
    Footer,
    CardItem, Card
} from 'native-base';
import axios from 'axios';

import ToShop from './components/ToShop';

export default class CartScreen extends Component {

    constructor(){
        super();
        this.state = {
            cart : [],
            product : [],
            price : 0
        }
    }

    componentDidMount() {
        axios({
            method: 'get',
            url: 'http://192.168.0.26:3333/api/v1/orders'
        })
        .then(res => {
            this.setState({
                cart: res.data
            })
        })
        .catch(err => {
            console.log(err);
        })
    }

    delCart = (id, name) => {
        Alert.alert(
            "Delete Product",
            "Are you sure you deleted the product (" + name + ") ?",
            [
                { text: "No" },
                {
                    text: "Yes",
                    style: "cancel",
                    onPress: () => {
                        axios.delete(`http://192.168.0.26:3333/api/v1/order/${id}`)
                        .then(() => {
                            return axios.get(`http://192.168.0.26:3333/api/v1/orders`)
                        })
                        .then(res => {
                            const cart = res.data;
                            this.setState({ cart });
                        })
                    }
                }
            ]
        )
    }

    quantityMinus = (qty, id, price) => () => {

        if (qty === 1) {
            return false;
          } else {

            axios({
                method: 'patch',
                url: `http://192.168.0.26:3333/api/v1/order/${id}`,
                data: {
                    qty: qty - 1,
                    price : (qty - 1) * price
                }
            })
            .then(res =>  {
                
            })
    
            this.setState(prevState => ({
              cart: prevState.cart.map(obj =>
                obj.id === id
                  ? Object.assign(obj, {
                      qty : obj.qty - 1,
                      price: (obj.qty - 1) * price
                    })
                  : obj
              )
            }));
          }
    };

    quantityPlus = (qty, id, price) => () => {

        axios({
            method: 'patch',
            url: `http://192.168.0.26:3333/api/v1/order/${id}`,
            data: {
                qty: qty + 1,
                price : (qty + 1) * price
            }
        })
        .then(res =>  {

        })

        this.setState(prevState => ({
            cart: prevState.cart.map(obj =>
              obj.id === id
                ? Object.assign(obj, {
                    qty: obj.qty + 1,
                    price: (obj.qty + 1) * price
                  })
                : obj
            )
          }));  

    };

    formatNumber = (num) => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    render(){
        let totalItem = this.state.cart.length;
        let totalPrice = 0;
        this.state.cart.map(obj => (totalPrice = totalPrice + obj.price));

        return(
            <Container>
                <Content>
                    <FlatList
                        data={this.state.cart}
                        renderItem={({ item, index }) => (
                        <Card>
                            <CardItem>
                                <Body>
                                <View style={styles.container}>
                                    <View><Thumbnail square source={{ uri: item.product.image }} /></View>
                                    <View style={[styles.col, styles.colCenter]}>
                                        <View><Text style={{fontSize: 17}}>{item.product.name}</Text></View>
                                        <View><Text style={{ color: 'grey' , fontSize: 15 }}>Rp. {this.formatNumber(item.product.price)}</Text></View>
                                    </View>
                                    <View style={[styles.col, styles.colCenter]}>
                                        <View style={styles.row}>
                                            <View style={styles.dempet}>
                                                <TouchableOpacity style={styles.quantitystyling} onPress={this.quantityMinus(item.qty, item.id, item.product.price)}>
                                                    <Icon style={{ color: '#fff', fontSize: 17, top: 4}} name="remove" />
                                                </TouchableOpacity>
                                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                                    <Text>{item.qty}</Text>
                                                </View>
                                                <TouchableOpacity style={styles.quantitystylingvv} onPress={this.quantityPlus(item.qty, item.id, item.product.price)}>
                                                    <Icon style={{ color: '#fff', fontSize: 17, top: 4}} name="add" />
                                                </TouchableOpacity>
                                            </View>
                                            <View style={{alignItems : 'center'}}>
                                                <TouchableWithoutFeedback onPress={() => this.delCart(item.id, item.product.name)}>
                                                    <View>
                                                        <Icon name="trash" style={{color: '#ff0a0a', fontSize : 20, marginTop: 5}}/>
                                                    </View>
                                                </TouchableWithoutFeedback>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                </Body>
                            </CardItem>
                        </Card>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                        />
                    
                </Content>
                <Footer style={{ marginTop: 80, backgroundColor :  'transparent'}}>
                    {this.state.cart.length < 1 ? <ToShop/> : <Card style={{position : 'absolute' , bottom : 10}}>
                <CardItem>
                <Body>
                    <Text>Total Item: {totalItem}</Text>
                    <Text>Total: Rp {isNaN(parseInt(totalPrice)) ? 0 : this.formatNumber(parseInt(totalPrice))}</Text>
                </Body>
                </CardItem>
                <CardItem footer>
                    <Button bordered small
                    style={{ fontSize: 12}}
                    onPress={()=> this.props.navigation.popToTop()}>
                        <Text>Continue Shopping</Text>
                    </Button>
                    <Button small style={{marginLeft : 8, padding : 5}} onPress={() => {
                        this.props.navigation.navigate('Payment', {totalPrice});
                    }}>
                        <Text>CheckOut</Text>
                    </Button>
                </CardItem>
                </Card> }
                </Footer>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row'
    },
    col: {
        flex: 1,
        flexDirection: 'column'
    },
    colCenter: {
        justifyContent: 'center',
        marginLeft : 10
    },
    dempet: {
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent: 'center'
    },
    row: {
        flex: 1,
        flexDirection: 'column'
    },
    quantitystyling: {
        backgroundColor: '#c3c3c3',
        borderRadius: 19,
        width: 25,
        height: 25,
        alignItems: 'center',
        marginLeft : 20,
        alignContent: 'center' 
    },
    quantitystylingvv: {
        backgroundColor: '#c3c3c3',
        borderRadius: 19,
        width: 25,
        height: 25,
        alignItems: 'center',
        marginRight : 20,
        alignContent: 'center'
    }
})