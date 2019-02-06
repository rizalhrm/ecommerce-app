import React, { Component } from 'react';
import {View, Image} from 'react-native';
import { Text, Button } from 'native-base';
import { withNavigation } from 'react-navigation';

class ToShop extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <View>
            <Image style={{ width: 350, height: 300, alignContent: 'center' }} source={{uri: 'https://bit.ly/2DeP5MJ'}} />
                <Button small block rounded
                style={{ backgroundColor: 'royalblue',
                         marginLeft: 20,
                         marginRight:20
                                        }}
                onPress={()=> {this.props.navigation.navigate('Home')}}>
                    <Text>Belanja Sekarang</Text>
                </Button>
            </View>
        )
    }
}

export default withNavigation(ToShop);
