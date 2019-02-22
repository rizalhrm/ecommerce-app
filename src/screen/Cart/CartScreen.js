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
import { connect } from 'react-redux';
import { getCarts, updateQty, deleteCart } from '../../public/redux/actions/carts';

import ToShop from './components/ToShop';

class CartScreen extends Component {

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
                        await this.props.dispatch(deleteCart(id));
                        this.getCart();
                    }
                }
            ]
        )
    }

    decreaseQty = (item) => {
        if (item.qty == 1) {
            item.qty = 1
        } else {
            item.qty -= 1
        }
        
        let qty = item.qty
        let id = item.id
        let price = item.price * item.qty
        this.updateQty(id, qty, price)
    };

    increaseQty = (item) => {
        if (item.qty == 5) {
            item.qty = 5
        } else {
            item.qty += 1
        }

        let qty = item.qty
        let id = item.id
        let price = item.price * item.qty
        this.updateQty(id, qty, price)
    };

    updateQty(id, qty, price) {
        this.props.dispatch(updateQty(id, {qty:qty, price:price}))
    }

    formatNumber = (num) => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    }

    render(){
        let totalItem = this.props.carts.length;
        let totalPrice = 0;
        if ( this.props.carts.carts.data) {
        this.props.carts.carts.data.forEach(function(item) {
            totalPrice += item.price * item.qty
        });
        }

        return(
            <Container>
                <Content>
                    <FlatList
                        data={this.props.carts.carts.data}
                        renderItem={({ item, index }) => (
                        <Card style={{borderRadius: 6, marginRight: 8, marginLeft:8}}>
                            <CardItem>
                                <Body>
                                <View style={styles.container}>
                                    <View><Thumbnail square source={{ uri: item.product.image }} /></View>
                                    <View style={[styles.col, styles.colCenter]}>
                                        <View><Text numberOfLines={1} style={{fontSize: 17}}>{item.product.name}</Text></View>
                                        <View><Text style={{ color: 'black' , fontSize: 14 }}>Rp. {this.formatNumber(item.product.price)}</Text></View>
                                    </View>
                                    <View style={[styles.col, styles.colCenter]}>
                                        <View style={styles.row}>
                                            <View style={styles.dempet}>
                                                <TouchableOpacity style={styles.quantitystyling} onPress={() => this.decreaseQty(item)}>
                                                    <Icon style={{ color: '#000', fontSize: 17, top: 4}} name="remove" />
                                                </TouchableOpacity>
                                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                                    <Text>{item.qty}</Text>
                                                </View>
                                                <TouchableOpacity style={styles.quantitystylingvv} onPress={() => this.increaseQty(item)}>
                                                    <Icon style={{ color: '#000', fontSize: 17, top: 4}} name="add" />
                                                </TouchableOpacity>
                                                <TouchableWithoutFeedback onPress={() => this.delCart(item.id, item.product.name)}>
                                                    <Icon name="trash" style={{color: '#ff0a0a', fontSize : 20, marginTop: 5}}/>
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
                        refreshing={this.props.carts.isLoading}
                        onRefresh={this.getCart}
                        />
                    
                </Content>
                <Footer style={{ marginTop: 80, backgroundColor :  'transparent'}}>
                    {this.props.carts.length < 1 ? <ToShop/> : <Card style={{position : 'absolute' , bottom : 10, borderRadius: 6}}>
                <CardItem>
                <Body>
                    <Text>Total Item: {totalItem}</Text>
                    <Text>Total: Rp {isNaN(parseInt(totalPrice)) ? 0 : this.formatNumber(parseInt(totalPrice))}</Text>
                </Body>
                </CardItem>
                <CardItem footer>
                    <Button bordered small
                    style={{ fontSize: 12, borderColor: '#0086cb'}}
                    onPress={()=> this.props.navigation.popToTop()}>
                        <Text style={{color: '#0086cb'}}>Continue Shopping</Text>
                    </Button>
                    <Button small style={{marginLeft : 8, padding : 5, backgroundColor: '#0086cb'}} onPress={() => {
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
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    row: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    quantitystyling: {
        backgroundColor: '#fff',
        borderRadius: 19,
        width: 25,
        height: 25,
        alignItems: 'center',
        marginLeft : 20,
        alignContent: 'center' 
    },
    quantitystylingvv: {
        backgroundColor: '#fff',
        borderRadius: 19,
        width: 25,
        height: 25,
        alignItems: 'center',
        marginRight : 20,
        alignContent: 'center'
    }
})