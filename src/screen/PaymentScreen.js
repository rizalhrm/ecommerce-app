import React, {Component} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import { Card, CardItem, Body, Button, Text, Container, Content, Form, Item, Input, Label, Icon, Textarea, List, ListItem, Picker } from 'native-base';

import '../data/cart';
import '../data/kurir';

export default class PaymentScreen extends Component {

    constructor(){
        super();
        this.state = {
            cart:cart,
            kurirs:kurir,
            chosenKurir : 0
        }
    }

    formatNumber = (num) => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    arrayKurir(){
        let items = [<Picker.Item key='0' label='pilih kurir' value='0'/>];
        this.state.kurirs.forEach((item) => {
            items.push(
                <Picker.Item key={items.id} label={items.jasa} value={items.harga}/>
            );
        })
        return items;
    }

    delCart = (id) => {
        let prod = this.state.cart;
        let index = cart.indexOf(id);
        prod.splice(index, 1);
        this.props.navigation.navigate('Home', {
            Refresh: () => this.forceUpdate()
        });
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
              {text: 'OK', onPress: () => {delCart}},
            ],
            {cancelable: false},
          );
    }

    render(){
        console.disableYellowBox = true;
        const Payment = this.props.navigation.getParam("totalPrice");
        let ongkosKirim = this.state.chosenKurir;
        let Total = Payment + ongkosKirim;
        return(
            <Container>
                <Content padder>
                        <Form>
                            <Item floatingLabel>
                                <Label>Nama Penerima</Label>
                                <Input />
                            </Item>
                            <Item floatingLabel>
                                <Label>Alamat</Label>
                                <Input />
                            </Item>
                            <Item floatingLabel>
                                <Label>Kode Pos</Label>
                                <Input />
                            </Item>
                            <Item floatingLabel>
                                <Label>No. HP</Label>
                                <Input />
                            </Item>
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
                            
                        </Form>
                        <Card>
                            <CardItem bordered>
                            <Body>
                                        <Text style={styles.font}>Subtotal : Rp {this.formatNumber(Payment)}</Text>
                                        <Text style={styles.font}>Shipping Cost : Rp {this.formatNumber(ongkosKirim)} </Text>
                                        <Text style={styles.font}>Total : Rp {parseInt(this.formatNumber(Total))}</Text>
                            </Body>
                            </CardItem>
                            <CardItem footer bordered>
                                    <Button style={{width: 90}} success onPress={this.finish}>
                                        <Text style={{color: '#fff', textAlign: 'center'}}>Selesai</Text>
                                    </Button>
                            </CardItem>
                        </Card>
            
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