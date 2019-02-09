import React, {Component} from 'react';
import {TouchableOpacity, FlatList, StyleSheet} from 'react-native';
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
    Right,
    Footer,
    CardItem, Card
} from 'native-base';

import '../../data/cart.js';
import ToShop from './components/ToShop';

export default class CartScreen extends Component {

    constructor(){
        super();
        this.state = {
            cart: cart
        }
    }

    delCart = (id) => {
        let prod = this.state.cart;
        let index = cart.indexOf(id);
        prod.splice(index, 1);
        this.props.navigation.navigate('Cart', {
            Refresh: () => this.forceUpdate()
        });
    }

    _quantityMinus = (qty, id) => () => {
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

    _quantityPlus = (qty, id) => () => {
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
        let totalItem = this.state.cart.length;
        let totalPrice = 0;
        this.state.cart.map(obj => (totalPrice = totalPrice + obj.subtotal));

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
                                    <View><Thumbnail square source={{ uri: item.image }} /></View>
                                    <View style={[styles.col, styles.colCenter]}>
                                        <View><Text style={{fontSize: 15}}>{item.name}</Text></View>
                                        <View><Text style={{ color: 'grey' , fontSize: 14 }}>Rp.{item.price}</Text></View>
                                    </View>
                                    <View style={[styles.col, styles.colCenter]}>
                                        <View style={styles.row}>
                                            <View style={styles.dempet}>
                                                <Button style={{backgroundColor: 'royalblue'}} small onPress={this._quantityMinus(item.qty, item.id)}>
                                                    <Icon style={{ color: '#fff'}} name="remove" />
                                                </Button>
                                                <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center', marginRight: -10, marginLeft: -10, backgroundColor: '#d9d5d5' }}>
                                                    <Text>{item.qty}</Text>
                                                </View>
                                                <Button style={{backgroundColor: 'royalblue'}} onPress={this._quantityPlus(item.qty, item.id)} small>
                                                    <Icon style={{ color: '#fff'}}  name="add" />
                                                </Button>
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
                    <Text>Total: Rp {totalPrice}</Text>
                </Body>
                </CardItem>
                <CardItem footer>
                    <Button small style={{padding : 5}} onPress={() => {
                        this.props.navigation.navigate('Payment', {totalPrice});
                    }}>
                        <Text>CheckOut</Text>
                    </Button>
                    
                    <Button small
                    style={{ backgroundColor: 'royalblue', marginLeft : 8}}
                    onPress={()=> this.props.navigation.popToTop()}>
                        <Text style={{fontSize: 12}}>Lanjut Belanja</Text>
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
        borderStyle : 'solid',
        borderColor: 'blue',
        borderWidth:  1
    },
    row: {
        flex: 1,
        flexDirection: 'column'
    }
})