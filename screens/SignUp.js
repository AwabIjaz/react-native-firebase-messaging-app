import React from 'react';
import { Platform, StatusBar, StyleSheet, View, Text, Image, ImageBackground, 
     TextInput, Button, Alert, TouchableOpacity, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import { Feather, AntDesign } from '@expo/vector-icons';
import styles from '../constants/startStyle';
import {responsive, scale_size} from '../constants/Layout.js';
import firebase from '../FirebaseConfig';
import {db} from '../FirebaseConfig';
import Loader from '../components/Loader';


export default class SignUp extends React.Component {
 
  constructor(props) {
    super(props); 
    this.state = {
      username: '',
      email: '',
      password: '',
      isloading: false,
    };
  }

  async onSignUp() {

    let sameUser = false;
    let noError = true;
    const {email, username, password} = this.state;

    if(!email || !username || !password){
      alert("Please fill all the fields")
      return;
    }

    this.setState({ isloading: true});

    await db.collection("users").doc(username).get().then((doc) => {
      if(doc.data() !== undefined){
        sameUser = true;
        noError = false;
        alert("This username already exists");
        this.setState({ isloading: false});
      }
    });
      
    if(sameUser === false){
      firebase.auth().createUserWithEmailAndPassword(email, password).catch((error) => {
          alert(error.message);
          noError = false;
          this.setState({ isloading: false});
      });
    }

    firebase.auth().onAuthStateChanged((user) => {
      if(user && noError){
        db.collection("users").doc(username).set({
            email: email,
            username: username,
            password: password,
        })
        .then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
      }
    })
  
  }


  render() {
    return (

      <View style={styles.container}> 

        <View style={[styles.titleContainer,{flex:0.2}]}>
          <Text style={styles.titleText}>Sign Up</Text>
          <Text style={styles.subtitleText}>Create an account to get started.</Text>
        </View>

        <KeyboardAvoidingView style={styles.formContainer} behavior="padding">
          <View style={{width:'100%', alignItems:'center'}}>
            <View style={{flexDirection:'row', marginBottom:responsive(6)}}>
              <Feather name="mail" style={{marginRight:responsive(-8)}} size={scale_size(0.8)}/>
              <TextInput
                  value={this.state.email}
                  onChangeText={(email) => this.setState({ email })}
                  placeholder={'Enter your email'}
                  style={styles.input}
                  placeholderTextColor={'grey'}
                  returnKeyType="next"
                  ref = {(input) => this.mailInput=input}
                  onSubmitEditing={()=> this.usernameInput.focus()}
                />
            </View>
            <View style={{flexDirection:'row'}}>
              <Feather name="user" style={{marginRight:responsive(-8)}} size={scale_size(0.8)}/>
              <TextInput
                  value={this.state.username}
                  onChangeText={(username) => this.setState({ username })}
                  placeholder={'Choose a username'}
                  style={styles.input}
                  placeholderTextColor={'grey'}
                  returnKeyType="next"
                  ref = {(input) => this.usernameInput=input}
                  onSubmitEditing={()=> this.passwordInput.focus()}
                />
            </View>
            <View style={{flexDirection:'row', marginTop:responsive(6), marginBottom:responsive(6)}}>
              <AntDesign name="lock" style={{marginRight:responsive(-8)}} size={scale_size(0.8)}/>
                <TextInput
                  value={this.state.password}
                  onChangeText={(password) => this.setState({ password })}
                  placeholder={'Choose a password'}
                  secureTextEntry={true}
                  style={styles.input}
                  placeholderTextColor={'grey'}
                  ref = {(input)=>this.passwordInput=input}
                />
            </View>
          </View>
            <TouchableOpacity style={styles.widerButton} onPress={() => this.onSignUp()}>
              <Text style={styles.btnText}>Sign Up</Text>
            </TouchableOpacity>

        </KeyboardAvoidingView>

        <Loader isloading={this.state.isloading}/>

      </View>

     );
  }
}