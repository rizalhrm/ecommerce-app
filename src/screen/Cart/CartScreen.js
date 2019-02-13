import React, {Component} from 'react';
import {TouchableOpacity, FlatList, StyleSheet} from 'react-native';
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
            product : []
        }
    }

    componentWillMount() {
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

    delCart = (id) => {

        axios.delete(`http://192.168.0.26:3333/api/v1/order/${id}`)
        .then(() => {
            return axios.get(`http://192.168.0.26:3333/api/v1/orders`)
        })
        .then(res => {
            const cart = res.data;
            this.setState({ cart });
        })
        
    }

    quantityMinus = (qty, id) => () => {
        if (qty === 1) {
          return false;
        } else {
          this.setState(prevState => ({
            cart: prevState.cart.map(obj =>
              obj.id === id
                ? Object.assign(obj, {
                    qty: obj.qty - 1,
                    subtotal: (obj.qty - 1) * obj.price
                  })
                : obj
            )
          }));
        }
    };

    quantityPlus = (qty, id) => () => {
        this.setState(prevState => ({
          cart: prevState.cart.map(obj =>
            obj.id === id
              ? Object.assign(obj, {
                  qty: obj.qty + 1,
                  subtotal: (obj.qty + 1) * obj.price
                })
              : obj
          )
        }));
    };

    formatNumber = (num) => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    render(){
        let totalItem = 0;
        let totalPrice = 0;

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
                                        <View><Text style={{ color: 'grey' , fontSize: 15 }}>Rp. {this.formatNumber(item.price)}</Text></View>
                                    </View>
                                    <View style={[styles.col, styles.colCenter]}>
                                        <View style={styles.row}>
                                            <View style={styles.dempet}>
                                                <TouchableOpacity style={{backgroundColor: 'grey', borderRadius: 19, width: 25, height: 25, alignItems: 'center', justifyCenter: 'center', marginLeft : 20, alignContent: 'center' }} onPress={this.quantityMinus(item.qty, item.id)}>
                                                    <Icon style={{ color: '#fff', fontSize: 17, top: 4}} name="remove" />
                                                </TouchableOpacity>
                                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                                    <Text>{item.qty}</Text>
                                                </View>
                                                <TouchableOpacity style={{backgroundColor: 'grey', borderRadius: 19, width: 25, height: 25, alignItems: 'center', justifyCenter: 'center', marginRight : 20, alignContent: 'center'}} onPress={this.quantityPlus(item.qty, item.id)}>
                                                    <Icon style={{ color: '#fff', fontSize: 17, top: 4}} name="add" />
                                                </TouchableOpacity>
                                            </View>
                                            <View style={{alignItems : 'center'}}>
                                                <TouchableOpacity onPress={() => this.delCart(item.id)}>
                                                    <View>
                                                        <Icon name="trash" style={{color: '#ff0a0a', fontSize : 20, marginTop: 5}}/>
                                                    </View>
                                                </TouchableOpacity>
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
                <Footer style={{backgroundColor :  'transparent'}}>
                    {this.state.cart.length < 1 ? <ToShop/> : <Card style={{position : 'absolute' , bottom : 10}}>
                <CardItem>
                <Body>
                    <Text>Total Item: {totalItem}</Text>
                    <Text>Total: Rp {isNaN(parseInt(totalPrice)) ? 0 : this.formatNumber(parseInt(totalPrice))}</Text>
                </Body>
                </CardItem>
                <CardItem footer>
                    <Button small style={{padding : 5}} onPress={() => {
                        this.props.navigation.navigate('Payment', {totalPrice});
                    }}>
                        <Text>CheckOut</Text>
                    </Button>
                    
                    <Button bordered small
                    style={{ marginLeft : 8, fontSize: 12}}
                    onPress={()=> this.props.navigation.popToTop()}>
                        <Text>Continue Shopping</Text>
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
    }
})