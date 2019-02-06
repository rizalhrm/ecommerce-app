import React, { Component } from 'react';
import { ListItem, Left, Right, Thumbnail, Body, Text, Button} from 'native-base';

class ListItemProduct extends Component{
    render(){
        const { product, navigate } = this.props;
        return(
            <ListItem 
                thumbnail
                onPress={() => navigate('DetailProduct', {product: product})}
            >
                <Left>
                    <Thumbnail square source={{ uri: product.image }} />
                </Left>
                <Body>
                    <Text>{product.name}</Text>
                    <Text style={{color: 'red'}}>Rp. {product.price}</Text>
                </Body>
                <Right>
                    <Button style={{height: 25}} primary onPress={() => navigate('DetailProduct', {product: product})}>
                        <Text>View</Text>
                    </Button>
                </Right>
            </ListItem>
        )
    }
}

export default ListItemProduct;