import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import  {Container, Content} from 'native-base';
import { Card, Image } from 'react-native-elements';

import axios from 'axios';

export default class InfoPayment extends React.Component {

    constructor(props){
        super(props);

        const idbank  = props.navigation.getParam("idbank");

        this.state = {
            idbank : idbank,
            bank : []
        }
    }

    componentDidMount() {
        axios({
            method: 'get',
            url: `http://192.168.0.26:3333/api/v1/bank/${this.state.idbank}`
        })
        .then(res => {
            this.setState({
                bank: res.data
            })
        })
        .catch(err => {
            console.log(err);
        })
    }

    formatNumber = (num) => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
    
    render(){

        const total = this.props.navigation.getParam("total");

        return (
        <Container>
            <Content>
                <Card
                title={this.state.bank.title} titleStyle={{fontSize: 16}}>
                <View style={{flex: 1}}>
                    <Text style={styles.textstyling}>
                    Lakukan Pembayaran Ke : {"\n"}
                    Atas Nama : PT Zona Gadget Indonesia
                    </Text>

                    <Image
                        source={{ uri: this.state.bank.image }}
                        style={{ width: 250, height: 150, alignSelf : 'center' ,justifyContent: 'space-between', marginTop : 6, marginBottom : 6 }}
                    />

                    <Text style={styles.textstyling}>
                    Nomor Rekening : {this.state.bank.rekening} {"\n"}
                    Total Transfer : Rp {this.formatNumber(total)}
                    </Text>
                </View>
                </Card>
            </Content>
        </Container>
        )
    }
}

const styles = StyleSheet.create({
    textstyling: {
        color: 'black',
        marginBottom: 10,
        fontSize:16,
        justifyContent: 'space-between',
        textAlign:"center"
    }
})