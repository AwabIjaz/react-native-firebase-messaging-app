import React, { Component } from 'react';
import { TextInput,FlatList, Platform, StyleSheet, Text, View,  AppRegistry, Image, ScrollView, KeyboardAvoidingView, TouchableOpacity, TouchableHighlight} from 'react-native';
import {createDrawerNavigator, createAppContainer} from 'react-navigation';
import {Icon,Button,Body,Right,Title,Container,Content,Left,Card, CardItem, Thumbnail} from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import styles from '../constants/startStyle';
import {responsive, scale_size} from '../constants/Layout.js';
import Head from '../components/Header';
import Loader from '../components/Loader';
import firebase from '../FirebaseConfig';
import {db} from '../FirebaseConfig';


let users = [];
let currentUser = '';

export default class Broadcast extends Component{
  static navigationOptions = {
    title: 'Send a broadcast',
    headerStyle: {
      backgroundColor: 'rgba(50,65,88,1)',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
  
  constructor(props){
    super(props);
    this.state = {
      isloading: false,
      text:''
    }
    users = this.props.navigation.getParam('Users', []);
    currentUser = this.props.navigation.getParam('CurrentUser', '');
  }

  async sendMessage(){

    if(!this.state.text){
      return;
    }

    this.setState({isloading:true})

    for (i in users){
      await db.collection("users/"+currentUser+"/"+users[i]).add({
          message: this.state.text,
          time: new Date(),
          type: 'sent',
      })
      .then(() => {
              console.log("Document successfully written!");
      })
      .catch(function(error) {
          console.error("Error writing document: ", error);
      });

      await db.collection("users/"+users[i]+"/"+currentUser).add({
        message: this.state.text,
        time: new Date(),
        type: 'received',
      })
      .then(() => {
          console.log("Document successfully written!");
      })
      .catch(function(error) {
          console.error("Error writing document: ", error);
      });
    }

    this.setState({isloading:false});
    alert("Your message has been broadcasted!");

  }


  render() {
    return (
      <KeyboardAvoidingView style={s.container} behavior="padding">

        <View style={s.upperContainer}>
          <View style={s.inputView}>
            <TextInput
              style={s.TextInputStyleClass}
              onChangeText={(text) => this.setState({text})}
              value={this.state.text}
              underlineColorAndroid='transparent'
              placeholder="Type out your broadcast message here"
              placeholderTextColor="grey"
              multiline={true}
            />
          </View>
        </View>

        <View style={{alignItems:'center'}}>
          <View style={{width:"90%",alignItems:'flex-end'}}>
            <TouchableOpacity onPress={()=>this.sendMessage()} style={s.sendButton}><Text style={{color:'white'}}>Send!</Text></TouchableOpacity>
          </View>
        </View>

        <Loader isloading={this.state.isloading}/>

      </KeyboardAvoidingView>
    );
  }
}


const s = StyleSheet.create({
  container: {
    flex:1,
  },
  upperContainer:{
    flex:0.80,
    justifyContent:'center',
    alignItems:'center',
  },
  inputView:{
    marginTop:responsive(12),
    width:"90%",
    height:"80%",
    borderWidth: 1,
    borderColor: 'rgba(50,65,88,1)',
    alignItems:'center'
  },
  TextInputStyleClass:{
    fontSize:responsive(5),
    width:"95%",
  },
  sendButton:{
    height:scale_size(1.25),
    width:scale_size(2.8),
    backgroundColor:'rgba(0,51,102,1)',
    elevation:4,
    borderRadius:10,
    alignItems:'center',
    justifyContent:'center',
  }
});
