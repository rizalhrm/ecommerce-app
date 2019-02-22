import React, { Component } from 'react';
import {View, Image} from 'react-native';

class ToShop extends Component{

    render(){
        return(
            <View style={{ marginTop : -450 }}>
                <Image style={{ width: 350, height: 300, alignContent: 'center' }} source={{uri: 'https://bit.ly/2DeP5MJ'}} />
            </View>
        )
    }
}

export default ToShop;
