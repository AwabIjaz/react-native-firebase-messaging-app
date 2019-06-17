import React from 'react';
import { Platform, StatusBar, StyleSheet, View, Text, Image, 
		ImageBackground, TouchableOpacity, ScrollView, TextInput, KeyboardAvoidingView, FlatList } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import {Body,Right,Title,Container,Header,Content,Left,Card, CardItem, Thumbnail} from 'native-base';
import { responsive, scale_size } from '../constants/Layout.js';
import Head from '../components/Header.js'
import firebase from '../FirebaseConfig';
import {db} from '../FirebaseConfig';
import Loader from '../components/Loader';

let username = '';
let currentUser = '';

export default class Messages extends React.Component {
  
  constructor(props) {
    super(props); 
    this.state = {
      text: '',
      oneMessage:false,
      isloading:true
    };
    username = this.props.navigation.getParam('Username', 'A Details Screen');
    currentUser = this.props.navigation.getParam('CurrentUser', '');
  }

  static navigationOptions = {
    header: null,
  };

  componentDidMount(){
    this.getMessages();  
  }

  componentWillUnmount() {
    this.isCancelled = true;
  }

  getMessages(){
    db.collection("users/"+currentUser+"/"+username).orderBy("time", "desc").onSnapshot((querySnapshot) => {
        let tempData = [];
        querySnapshot.forEach(function(doc) {
          tempData.push(doc.data());
        });
      !this.isCancelled && this.setState({ dataSource:tempData, isloading:false, oneMessage:false })
    })
  }

  sendMessage(){

    const { text } = this.state;
    let tempData = this.state.dataSource;

    if(!text){
      return;
    }

    tempData.unshift({message:text, type:'sent'});

    this.setState({ oneMessage:tempData, text:'' })

    db.collection("users/"+currentUser+"/"+username).add({
        message: text,
        time: new Date(),
        type: 'sent',
    })
    .then(() => {
            console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });

    db.collection("users/"+username+"/"+currentUser).add({
        message: text,
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

  render() {
    return (
  		<View style={{flex:1}}>

        <Head navigation={this.props.navigation} name={username}/>
  		      
        <View style={styles.messagesContainer}>

            <FlatList
              data={this.state.oneMessage ? this.state.oneMessage : this.state.dataSource}
              extraData={this.state}
              inverted={true}
              renderItem={({item}) => 

              <View style={(item.type === 'sent') ? styles.sentContainer : styles.recievedContainer}>
                <View style={(item.type === 'sent') ? styles.send : styles.recieve}>
                  <View style={styles.msgMain}><Text style={styles.msgText}>{item.message}</Text></View>
                </View>
              </View>

              }
              keyExtractor={(item, index) => index.toString()}
            /> 

        </View>

        <KeyboardAvoidingView style={styles.bottomBar} behavior="padding">
          <TextInput
            style={styles.input}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
            placeholder="send a message"
            placeholderTextColor="grey"
          />
          <TouchableOpacity onPress={()=>this.sendMessage()}><FontAwesome name="arrow-circle-right" size={scale_size(1.1)}/></TouchableOpacity>
        </KeyboardAvoidingView>

        <Loader isloading={this.state.isloading}/>

      </View>
	   );
	}
}

const styles = StyleSheet.create({
 
  messagesContainer:{
  	flex:0.85,
    padding:"3%",
    borderBottomWidth:2,
  },
  sentContainer:{
    alignItems:'flex-end',
    paddingBottom:"5%"
  },
  recievedContainer:{
    alignItems:'flex-start',
    paddingBottom:"5%"
  },
  send:{
    backgroundColor:'rgba(0,200,255,0.7)',
    borderRadius:responsive(4),
    padding:"3%",
    flexDirection:'row'
  },
  recieve:{
    backgroundColor:'grey',
    borderRadius:responsive(4),
    padding:"3%",
    flexDirection:'row'
  },
  msgMain:{ 
    alignItems:'center', 
    width:"70%"
  },
  msgText:{
    color:'white',
    fontSize:responsive(3.6)
  },
  bottomBar:{
    flex:0.15,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-evenly', 
  },
  input:{
    width:'80%',
    borderWidth:1,
    paddingLeft:responsive(5),
  }
});
