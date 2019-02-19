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
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux';
import { getCarts, decreaseQty, increaseQty, deleteCart } from '../../public/redux/actions/carts';
import axios from 'axios';

import ToShop from './components/ToShop';

class CartScreen extends Component {

    constructor(){
        super();
        this.state = {
            product : [],
            price : 0
        }
    }

    componentDidMount() {
        this.getCart();
    }

    getCart = () => {
        this.props.dispatch(getCarts());
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
                    onPress: async () => {
                        const del = await this.props.dispatch(deleteCart(id));
                        if (del) {
                            this.getCart();
                        }
                    }
                }
            ]
        )
    }

    decreaseQty = (qty, id, price) => () => {

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

    increaseQty = (qty, id, price) => () => {

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
        console.log(this.props.carts.carts.data)
        let totalItem = 0;
        let totalPrice = 0;
        return(
            <Container>
                <Content>
                <Spinner
                    visible={this.props.carts.isLoading}
                    textContent={'Loading...'}
                    textStyle={styles.spinnerTextStyle}
                    />
                    <FlatList
                        data={this.props.carts.carts.data}
                        renderItem={({ item, index }) => (
                        <Card>
                            <CardItem>
                                <Body>
                                <View style={styles.container}>
                                    <View><Thumbnail square source={{ uri: item.product.image }} /></View>
                                    <View style={[styles.col, styles.colCenter]}>
                                        <View><Text style={{fontSize: 17}}>{item.product.name}</Text></View>
                                        <View><Text style={{ color: 'black' , fontSize: 14 }}>Rp. {this.formatNumber(item.product.price)}</Text></View>
                                    </View>
                                    <View style={[styles.col, styles.colCenter]}>
                                        <View style={styles.row}>
                                            <View style={styles.dempet}>
                                                <TouchableOpacity style={styles.quantitystyling} onPress={this.decreaseQty(item.qty, item.id, item.product.price)}>
                                                    <Icon style={{ color: '#fff', fontSize: 17, top: 4}} name="remove" />
                                                </TouchableOpacity>
                                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                                    <Text>{item.qty}</Text>
                                                </View>
                                                <TouchableOpacity style={styles.quantitystylingvv} onPress={this.increaseQty(item.qty, item.id, item.product.price)}>
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
                    {this.props.carts.carts.length < 1 ? <ToShop/> : <Card style={{position : 'absolute' , bottom : 10}}>
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

const mapStateToProps = (state) => {
    return {
      carts: state.carts
    }
  }

export default connect(mapStateToProps)(CartScreen)

const styles = StyleSheet.create({
    spinnerTextStyle: {
        color: '#fff'
    },
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