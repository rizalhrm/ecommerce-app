import React, {Component} from 'react';
import {View} from 'react-native';
import { Card, CardItem, Body, Button, Text, Container, Content, Item, Input, Label, Picker, Right, Left } from 'native-base';
import axios from 'axios';

export default class PaymentScreen extends Component {

    constructor(){
        super();
        this.state = {
            Couriers : [],
            chosenCourier : '0',
            indexCourier : '',
            bank : [],
            chosenBank : '0',
            indexBank : '',
            name : "",
            adress : "",
            postalcode : "",
            hp : ""
        }
        this.arrayCourier = () => {
            let items = [<Picker.Item key='0' label='Silahkan Pilih Kurir' value='0'/>];
            this.state.Couriers.forEach((item) => {
                items.push(
                    <Picker.Item key={item.id} label={item.name} value={item.price}/>
                );
            })
            return items
        }
        this.arrayBank = () => {
            let banks = [<Picker.Item key='0' label='Silahkan Pilih Bank' value='0'/>];
            this.state.bank.forEach((item) => {
                banks.push(
                    <Picker.Item key={item.id} label={item.name} value={item.code}/>
                );
            })
            return banks
        }
    }

    formatNumber = (num) => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    }

    finish = (total, idbank) => {

        axios({
            method: 'get',
            url: 'http://192.168.0.26:3333/api/v1/orders/destroy'
        })
        .then(res => {
            this.props.navigation.navigate('InfoPayment', {'total' : total, 'idbank' : idbank})
        })
        .catch(err => {
            console.log(err);
        })

    }

    componentDidMount() {
        axios({
            method: 'get',
            url: 'http://192.168.0.26:3333/api/v1/banks'
        })
        .then(res => {
            this.setState({
                bank: res.data
            })
        })
        .catch(err => {
            console.log(err);
        })

        axios({
            method: 'get',
            url: 'http://192.168.0.26:3333/api/v1/couriers'
        })
        .then(res => {
            this.setState({
                Couriers: res.data
            })
        })
        .catch(err => {
            console.log(err);
        })
    }

    validation = () => {
        const self = this;
        
        setTimeout(() => {
            const self = this;

            setTimeout(() => {
                const { name, adress, postalcode, hp} = self.state;
                if(name != "" && adress != "" && postalcode != "" && hp != ""){
                    self.setState({isValid: true});
                }
                else{
                    self.setState({isValid: false})
                }
            }, 1000);
        })
    }

    render(){
        console.disableYellowBox = true;
        const { isValid } = this.state;
        const { navigation } = this.props;
        const payment = navigation.getParam("totalPrice");
        let shippingcost = this.state.chosenCourier;
        let mybank = this.state.chosenBank;
        let idbank = this.state.indexBank;
        let total = parseInt(payment) + parseInt(shippingcost) + parseInt(mybank);
        return(
            <Container>
                <Content padder>
                    <View>
                    <Card>
                        <CardItem>
                            <Item floatingLabel>
                                <Label>Nama Penerima</Label>
                                <Input onChangeText={(text) =>  {
                                    this.setState({name: text})
                                    this.validation();
                                }}/>
                            </Item>
                        </CardItem>
                        <CardItem>
                            <Item floatingLabel>
                                <Label>Alamat</Label>
                                <Input onChangeText={(text) => {
                                    this.setState({adress: text})
                                    this.validation();
                                }}/>
                            </Item>
                        </CardItem>
                        <CardItem>
                            <Item floatingLabel>
                                <Label>Kode Pos</Label>
                                <Input onChangeText={(text) => {
                                    this.setState({postalcode: text})
                                    this.validation();
                                }}/>
                            </Item>
                        </CardItem>
                        <CardItem>
                            <Item floatingLabel>
                                <Label>No. HP</Label>
                                <Input onChangeText={(text) => {
                                    this.setState({hp: text})
                                    this.validation();
                                }}/>
                            </Item>
                        </CardItem>
                        <CardItem>
                            <Item picker>
                                <Text>Jasa Pengiriman :</Text>
                                <Picker
                                    selectedValue={this.state.chosenCourier}
                                    onValueChange={(itemValue, itemIndex)=>(this.setState({chosenCourier: itemValue, indexCourier: itemIndex}))}
                                >
                                {this.arrayCourier()}
                                </Picker>
                            </Item>
                        </CardItem>
                        <CardItem>
                            <Item picker>
                                <Text>Bank :</Text>
                                <Picker
                                    selectedValue={this.state.chosenBank}
                                    onValueChange={(itemValue, itemIndex)=>(this.setState({chosenBank: itemValue, indexBank: itemIndex}))}
                                >
                                {this.arrayBank()}
                                </Picker>
                            </Item>
                        </CardItem>
                    </Card>
                    </View>
                    <View>
                        <Card>
                            <CardItem>
                                <Body>
                                    <Text>Subtotal :</Text>
                                </Body>
                                <Right>
                                    <Text>Rp {this.formatNumber(payment)}</Text>
                                </Right>
                            </CardItem>

                            <CardItem>
                                <Body>
                                    <Text>Shipping Cost :</Text>
                                </Body>
                                <Right>
                                    <Text>Rp {this.formatNumber(shippingcost)}</Text>
                                </Right>
                            </CardItem>

                            <CardItem>
                                <Body>
                                    <Text>Total :</Text>
                                </Body>
                                <Right>
                                    <Text>Rp {this.formatNumber(total)}</Text>
                                </Right>
                            </CardItem>
                            <CardItem footer style={{alignContent: 'center'}}>
                                <Left/>
                                <Body>
                                    {
                                        isValid && this.state.chosenCourier != '0' && this.state.chosenBank != '0' ?
                                        (
                                            <Button style={{width: 90, alignItems: 'center'}} full primary onPress={() => this.finish(total, idbank)}>
                                            <Text style={{color: '#fff', textAlign: 'center'}}>Finish</Text>
                                            </Button>
                                        ):
                                        (
                                            <Button style={{width: 90, alignItems: 'center'}} full disabled>
                                            <Text style={{color: '#fff', textAlign: 'center'}}>PAY NOW</Text>
                                            </Button>
                                        )
                                    }
                                </Body>
                                <Right/>
                            </CardItem>
                        </Card>
                    </View>
                </Content>
            </Container>
        )
    }
}