import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import  {Container, Icon, Content} from 'native-base';
import { Card, Image, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { saveProductDetail } from '../../public/redux/actions/products';
import { getCarts, checkCart, addToCart } from '../../public/redux/actions/carts';

class DetailProduct extends React.Component {

    componentDidMount() {
        this.getDetail();
        this.getCart()
    }

    getDetail = () => {
        this.props.dispatch(saveProductDetail());
    }

    getCart = () => {
        this.props.dispatch(getCarts());
    }

    addToCart = () => {
        let exist = false
        let currentQty = 0
        let checkCartId = 0
        let currentPrice = 0
        this.props.carts.carts.data.map(data => {
            if (data.product_id == this.props.products.productDetails.id) {
                checkCartId = data.id
                exist = true
                currentQty = data.qty
                currentPrice = data.price
            }
        })

        if (exist) {
            this.props.dispatch(checkCart(checkCartId, currentQty, currentPrice, this.props.products.productDetails.price))
            this.getCart()
            this.props.navigation.navigate("Cart");
        }
        else {
            this.props.dispatch(addToCart(this.props.products.productDetails.id, this.props.products.productDetails.price))
            this.getCart()
            this.props.navigation.navigate("Cart");
        }

    }

    formatNumber = (num) => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    }
    
    render(){
        console.log(this.props.carts.carts.data)
        return (
        <Container>
            <Content>
            
                <Card containerStyle={{borderRadius: 13, marginBottom: 15}}
                title={this.props.products.productDetails.name} titleStyle={{fontSize: 18}}>
                <Image
                source={{ uri: this.props.products.productDetails.image }}
                style={{ width: 300, height:300, alignItems: "center", alignSelf: "center", resizeMode:'contain', marginBottom: 5 }}
                />
                <View style={{flex: 1}}>
                    <Text style={{color: 'black', marginBottom: 10, fontSize:16, justifyContent: 'space-between', textAlign:"center"}}>
                    Rp {this.formatNumber(parseInt(this.props.products.productDetails.price))}
                    </Text>
                    <Button
                    icon={<Icon name='cart' style={{color: 'white'}}/>}
                    buttonStyle={{borderRadius: 6, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor:'#0086cb'}}
                    title='Add to Cart' onPress={this.addToCart}/>
                </View>
                </Card>
                <Card containerStyle={{borderRadius: 13, marginTop: -6, marginBottom: 15}}>
                    <Text style={{fontWeight: 'bold', fontSize:15, color: 'black'}}>Description : </Text>
                    <Text style={{color: 'black', marginBottom: 10, fontSize:14, alignSelf:"stretch", justifyContent:"center"}}>
                    {this.props.products.productDetails.description}
                    </Text>
                </Card>
            </Content>
        </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      products: state.productDetails,
      carts: state.carts,
      checkCart: state.checkCart
    }
  }

export default connect(mapStateToProps)(DetailProduct)

const styles = StyleSheet.create({
    spinnerTextStyle: {
        color: '#fff'
    }
})