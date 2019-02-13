import React, {Component} from 'react';
import {View, StyleSheet, FlatList, Alert} from 'react-native';
import { Card, CardItem, Body, Button, Text, Container, Content, Form, Item, Input, Label, Picker, Right, Left } from 'native-base';

import '../data/cart';
import '../data/kurir';

export default class PaymentScreen extends Component {

    constructor(){
        super();
        this.state = {
            cart:cart,
            kurirs:kurir,
            chosenKurir : '0',
            indexCourier: ''
        }
        this.arrayKurir=()=>{
            let items = [<Picker.Item key='0' label='pilih kurir' value={0}/>];
            this.state.kurirs.forEach((item) => {
                items.push(
                    <Picker.Item key={item.id} label={item.jasa} value={item.harga}/>
                );
            })
            return items
        }
    }

    formatNumber = (num) => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    finish = () => {
        Alert.alert(
            'Zona Gadget Says',
            'Pesanan Anda Telah diterima',
            [
              {
                text: 'Cancel',
                onPress: () => {this.props.navigation.navigate('Payment')},
                style: 'cancel',
              },
              {text: 'OK', onPress: () => {
                    this.state.cart.length = 0;
                    this.props.navigation.navigate('InfoPayment', {
                    onBack: () => this.refresh()
                    });
                }},
            ],
            {cancelable: false},
          );
    }

    render(){
        console.disableYellowBox = true;
        const payment = this.props.navigation.getParam("totalPrice");
        let shippingcost = this.state.chosenKurir;
        let total = parseInt(payment) + parseInt(shippingcost);
        return(
            <Container>
                <Content padder>
                    <View>
                    <Card>
                        <CardItem>
                            <Item floatingLabel>
                                <Label>Nama Penerima</Label>
                                <Input />
                            </Item>
                        </CardItem>
                        <CardItem>
                            <Item floatingLabel>
                                <Label>Alamat</Label>
                                <Input />
                            </Item>
                        </CardItem>
                        <CardItem>
                            <Item floatingLabel>
                                <Label>Kode Pos</Label>
                                <Input />
                            </Item>
                        </CardItem>
                        <CardItem>
                            <Item floatingLabel>
                                <Label>No. HP</Label>
                                <Input />
                            </Item>
                        </CardItem>
                        <CardItem>
                            <Item picker>
                                <Text>Jasa Pengiriman :</Text>
                                <Picker
                                    mode="dropdown"
                                    selectedValue={this.state.chosenKurir}
                                    onValueChange={(itemValue, itemIndex)=>(this.setState({chosenKurir: itemValue, indexCourier: itemIndex}))}
                                >
                                   {this.arrayKurir()}
                                </Picker>
                            </Item>
                        </CardItem>
                    </Card>
                    </View>
                    <View>
                        <Card>
                            <CardItem>
                                <Left>
                                    <Text>Subtotal</Text>
                                </Left>
                                <Body>
                                    <Text>:</Text>
                                </Body>
                                <Right>
                                    <Text>Rp {this.formatNumber(payment)}</Text>
                                </Right>
                            </CardItem>

                            <CardItem>
                                <Left>
                                    <Text>Shipping Cost</Text>
                                </Left>
                                <Body>
                                    <Text>:</Text>
                                </Body>
                                <Right>
                                    <Text>Rp {this.formatNumber(shippingcost)}</Text>
                                </Right>
                            </CardItem>

                            <CardItem>
                                <Left>
                                    <Text>Total</Text>
                                </Left>
                                <Body>
                                    <Text>:</Text>
                                </Body>
                                <Right>
                                    <Text>Rp {this.formatNumber(total)}</Text>
                                </Right>
                            </CardItem>
                            <CardItem footer style={{alignContent: 'center'}}>
                                <Button style={{width: 90, alignItems: 'center'}} full primary onPress={this.finish}>
                                    <Text style={{color: '#fff', textAlign: 'center'}}>Selesai</Text>
                                </Button>
                            </CardItem>
                        </Card>
                    </View>
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    font: {
        fontSize: 15
    }
})