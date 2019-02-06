import React, { Component } from 'react';
import { ListItem, Left, Body, Text, Button, Right} from 'native-base';
import { withNavigation } from 'react-navigation';

class ToNext extends Component{
    render(){
        return(
            <ListItem>
                <Left>
                    <Button small rounded style={{ marginLeft: 30}}>
                        <Text>CheckOut</Text>
                    </Button>
                </Left>
                <Body>
                    <Button small block rounded
                    style={{ backgroundColor: 'royalblue'}}
                    onPress={()=> {this.props.navigation.popToTop() }}>
                        <Text style={{fontSize: 12}}>Lanjut Belanja</Text>
                    </Button>
                </Body>
                <Right/>
            </ListItem>
        )
    }
}

export default withNavigation(ToNext);