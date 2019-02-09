import React, { Component } from 'react';
import { CardItem, Card, Left, Body, Text, Button, Right} from 'native-base';
import { withNavigation } from 'react-navigation';

class ToNext extends Component{
    render(){
        return(
            <Card style={{position : 'absolute' , bottom : 10}}>
                <CardItem>
                <Body>
                    <Text>Total: Rp </Text>
                </Body>
                </CardItem>
                <CardItem footer>
                    <Button small rounded style={{padding : 5}}>
                        <Text>CheckOut</Text>
                    </Button>
                    
                    <Button small rounded
                    style={{ backgroundColor: 'royalblue', marginLeft : 8}}
                    onPress={()=> this.props.navigation.popToTop()}>
                        <Text style={{fontSize: 12}}>Lanjut Belanja</Text>
                    </Button>
                </CardItem>
            </Card>
        )
    }
}

export default withNavigation(ToNext);