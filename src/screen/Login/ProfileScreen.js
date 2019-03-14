import React, { Component } from 'react';
import { StyleSheet, View, Image, AsyncStorage, Alert } from 'react-native';
import { Button, Text } from 'native-base';
import { connect } from 'react-redux';
import { logout } from '../../public/redux/actions/auth';
import { getUserProfile } from '../../public/redux/actions/profile';

class ProfileScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
          isAuth: false
        };
      }

    componentDidMount() {
        if (this.props.auth.isAuth) {
            this.getProfiles();
        }
    }

    getProfiles = async () => {
        const user_id = this.props.auth.id;
        const token = this.props.auth.access_token.token;
        await this.props.dispatch(getUserProfile(user_id, token));
    };
    

    handleLogout = () => {
        Alert.alert("Warning", "Are you sure want to logout ?", [
          { text: "No" },
          {
            text: "Yes",
            style: "cancel",
            onPress: () => {
              this.doLogout()
                .then(res => {
                  AsyncStorage.removeItem("token");
                  AsyncStorage.removeItem("refreshToken");
                  this.setState({ isAuth: this.props.auth.isAuth });
                  this.props.navigation.navigate("Login");
                })
                .catch(err => {
                  console.log(`message : ${err}`);
                });
            }
          }
        ]);
      };
    
      doLogout = async () => {
        const token = this.props.auth.access_token.token;
        await this.props.dispatch(logout(token));
      };
    

    render() {
        console.log(this.props.profile.data.username)
        console.log(this.props.profile.data.email)
        return (
        <View style={styles.container}>
            <View style={styles.header}></View>
            <Image style={styles.avatar} source={{uri: 'https://secure.gravatar.com/avatar/c9490c639969cbcac686c3e66feb4648?s=800&d=identicon'}}/>
            <View style={styles.body}>
                <View style={styles.bodyContent}>
                <Text style={styles.name}>Rizal Hermawan</Text>
                <Text style={styles.email}>rizal@gmail.com</Text>
                <Text style={styles.description}>Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet.</Text>
                
                <Button style={styles.buttonContainer}>
                    <Text>Edit Profile</Text>  
                </Button>              
                <Button style={[styles.buttonContainer, styles.buttonLogout]}
                onPress={() => this.handleLogout()}
                >
                    <Text>Log Out</Text> 
                </Button>
                </View>
            </View>
        </View>
        );
    }
}

const mapStateToProps = (state) => {
	return {
        auth: state.auth,
        profile: state.profile
	}
}

export default connect(mapStateToProps)(ProfileScreen)

const styles = StyleSheet.create({
    header:{
        backgroundColor: "#0086cb",
        height: 150,
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 30,
        borderWidth: 5,
        borderColor: "white",
        marginBottom:10,
        alignSelf:'center',
        position: 'absolute',
        marginTop:80
    },
    name:{
        fontSize:22,
        color:"#fff",
        fontWeight:'bold',
    },
    body:{
        marginTop:30,
    },
    bodyContent: {
        flex: 1,
        alignItems: 'center',
        padding:30,
    },
    name:{
        fontSize:28,
        color: "black",
        fontWeight: "bold"
    },
    email:{
        fontSize:16,
        color: "grey",
        marginTop:10
    },
    description:{
        fontSize:16,
        color: "black",
        marginTop:10,
        textAlign: 'center'
    },
    buttonContainer: {
        marginTop:10,
        height:45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom:20,
        width:250,
        borderRadius:10,
        backgroundColor: "#0086cb",
    },
    buttonLogout: {
        marginTop : -8
    }
});