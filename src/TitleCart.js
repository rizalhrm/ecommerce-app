import React, { Component } from 'react';
import {Icon, Button, Text} from 'native-base';

export default class TitleCart extends Component{
    
    render(){

        const {navigation} = this.props;
        return(

            <Button style={{color: '#fff', alignItems: 'center', alignContent: 'center', alignSelf: 'center'}} onPress={() => navigation('Home')}>
                <Icon name='arrow-back' />
            </Button>

        )
    }
}