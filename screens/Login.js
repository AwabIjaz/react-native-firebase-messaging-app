import React from 'react';
import { Platform, StatusBar, StyleSheet, View, Text, Image, ImageBackground, 
     TextInput, Button, Alert, TouchableOpacity, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import { Feather, AntDesign } from '@expo/vector-icons';
import styles from '../constants/startStyle';
import {responsive, scale_size} from '../constants/Layout.js';
import firebase from '../FirebaseConfig';
import {db} from '../FirebaseConfig';
import Loader from '../components/Loader';


export default class Login extends React.Component {
  
  constructor(props) {
    super(props); 
    this.state = {
      username: '',
      password: '',
      isloading: false,
    };
  }

  async onLogin() {
    
    const {username, password} = this.state;
    let email = username;

    if(!username || !password){
      alert("Please fill all the fields")
      return;
    }

    this.setState({ isloading: true});

    await db.collection("users").doc(username).get().then((doc) => {
      if(doc.data() !== undefined){
        email = doc.data().email;
        console.log(email)
      }
    });

    firebase.auth().signInWithEmailAndPassword(email, password).then((u)=>{
    }).catch((error) => {
        alert("Invalid email/username or password");
        this.setState({ isloading: false});
    });
  
  }

  render() {
    return (

      <View style={styles.container}> 

        <View style={[styles.titleContainer,{flex:0.3}]}>
          <Text style={styles.titleText}>Login</Text>
          <Text style={styles.subtitleText}>Log in to your account.</Text>
        </View>

        <KeyboardAvoidingView style={styles.formContainer} behavior="padding">
          <View style={{width:'100%', alignItems:'center'}}>
            <View style={{flexDirection:'row'}}>
              <Feather name="user" style={{marginRight:responsive(-8)}} size={scale_size(0.8)}/>
              <TextInput
                  value={this.state.username}
                  onChangeText={(username) => this.setState({ username })}
                  placeholder={'Username or Email'}
                  style={styles.input}
                  placeholderTextColor={'grey'}
                  returnKeyType="next"
                  onSubmitEditing={()=> this.passwordInput.focus()}
                />
            </View>
            <View style={{flexDirection:'row', marginTop:responsive(8), marginBottom:responsive(8)}}>
              <AntDesign name="lock" style={{marginRight:responsive(-8)}} size={scale_size(0.8)}/>
                <TextInput
                  value={this.state.password}
                  onChangeText={(password) => this.setState({ password })}
                  placeholder={'Password'}
                  secureTextEntry={true}
                  style={styles.input}
                  placeholderTextColor={'grey'}
                  ref = {(input)=>this.passwordInput=input}
                />
            </View>
          </View>
            <TouchableOpacity style={styles.widerButton} onPress={() => this.onLogin()}>
              <Text style={styles.btnText}>Login</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>

        <Loader isloading={this.state.isloading}/>

      </View>

     );
  }
}
