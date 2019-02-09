import React, {Component} from 'react';
import {
    Container,
    Content,
    List,
    ListItem,
    Left,
    Body,
    Right,
    Thumbnail,
    Text,
    Icon
} from 'native-base';

export default class ChatScreen extends Component {

    render(){
        return(
            <Container>
            <Content>
              <List>
                <ListItem avatar>
                  <Left>
                    <Thumbnail source={{ uri: 'https://bit.ly/2Gfzmks' }} />
                  </Left>
                  <Body>
                    <Text style={{fontWeight : 'bold'}}><Icon style={{ fontSize : 15 }} name='checkmark-circle-outline'/>Promo Zona Gadget</Text>
                    <Text note>SURPRISE! Kamu terpilih mendapatkan...</Text>
                  </Body>
                  <Right>
                    <Text note>1:15 pm</Text>
                  </Right>
                </ListItem>
                <ListItem avatar>
                  <Left>
                    <Thumbnail source={{ uri: 'https://bit.ly/2SgGGTa' }} />
                  </Left>
                  <Body>
                    <Text>People 1</Text>
                    <Text note>Lorem ipsum consectetur adipiscing...</Text>
                  </Body>
                  <Right>
                    <Text note>1:15 pm</Text>
                  </Right>
                </ListItem>
                <ListItem avatar>
                  <Left>
                    <Thumbnail source={{ uri: 'https://bit.ly/2SgGGTa' }} />
                  </Left>
                  <Body>
                    <Text>People 2</Text>
                    <Text note>Lorem ipsum consectetur adipiscing...</Text>
                  </Body>
                  <Right>
                    <Text note>1:15 pm</Text>
                  </Right>
                </ListItem>
                <ListItem avatar>
                  <Left>
                    <Thumbnail source={{ uri: 'https://bit.ly/2SgGGTa' }} />
                  </Left>
                  <Body>
                    <Text>People 3</Text>
                    <Text note>Lorem ipsum consectetur adipiscing...</Text>
                  </Body>
                  <Right>
                    <Text note>1:15 pm</Text>
                  </Right>
                </ListItem>
              </List>
            </Content>
          </Container>
        )
    }
}