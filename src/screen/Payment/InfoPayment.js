import React from 'react';
import {View, Text} from 'react-native';
import  {Container, Content} from 'native-base';
import { Card } from 'react-native-elements';

import '../../data/bank';

export default class InfoPayment extends React.Component {

    constructor(props){
        super(props);

        
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
                title="ATM BCA" titleStyle={{fontSize: 15}}>
                <View style={{flex: 1}}>
                    <Text style={{color: 'black', marginBottom: 10, fontSize:16, justifyContent: 'space-between', textAlign:"center"}}>
                    Lakukan Pembayaran Ke : {"\n"}
                    Atas Nama : PT Zona Gadget Indonesia {"\n"}
                    Nomor Rekening : 646378328239 {"\n"}
                    Total Transfer : Rp {this.formatNumber(total)}
                    </Text>
                </View>
                </Card>
            </Content>
        </Container>
        )
    }
}