import React from 'react';
import {View, Text} from 'react-native';
import  {Container, Content} from 'native-base';
import { Card } from 'react-native-elements';

export default class InfoPembayaran extends React.Component {
    
    render(){
        return (
        <Container>
            <Content>
                <Card
                title="ATM BCA" titleStyle={{fontSize: 15}}>
                <View style={{flex: 1}}>
                    <Text style={{color: 'black', marginBottom: 10, fontSize:16, justifyContent: 'space-between', textAlign:"center"}}>
                    Lakukan Pembayaran Ke : {"\n"}
                    Atas Nama : Rizal Hermawan {"\n"}
                    Nomor Rekening : 3121392303
                    </Text>
                </View>
                </Card>
            </Content>
        </Container>
        )
    }
}