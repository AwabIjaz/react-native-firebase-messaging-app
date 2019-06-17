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

let groupid = '';
let groupname = '';
let currentUser = '';

export default class GroupMessages extends React.Component {
  
  constructor(props) {
    super(props); 
    this.state = {
      text: '',
      oneMessage:false,
      isloading:true
    };
    groupid = this.props.navigation.getParam('Groupid', '');
    groupname = this.props.navigation.getParam('Groupname', '');
    currentUser = this.props.navigation.getParam('CurrentUser', '');
  }

  static navigationOptions = {
    header: null,
  };

  componentDidMount(){
    this.getGroupMessages();  
  }

  componentWillUnmount() {
    this.isCancelled = true;
  }

  getGroupMessages(){
    db.collection("groups/"+groupid+"/messages").orderBy("time", "desc").onSnapshot((querySnapshot) => {
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

    tempData.unshift({message:text, username:currentUser});

    this.setState({ oneMessage:tempData, text:'' })

    db.collection("groups/"+groupid+"/messages").add({
        message: text,
        time: new Date(),
        username: currentUser,
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

        <Head navigation={this.props.navigation} name={groupname}/>
  		      
        <View style={styles.messagesContainer}>

            <FlatList
              data={this.state.oneMessage ? this.state.oneMessage : this.state.dataSource}
              extraData={this.state}
              inverted={true}
              renderItem={({item}) => 

              <View style={(item.username === currentUser) ? styles.sentContainer : styles.recievedContainer}>
                <View style={(item.username === currentUser) ? styles.send : styles.recieve}>
                  <View style={styles.msgMain}>
                    <Text style={styles.msgText}>{item.message}</Text>
                  </View>
                  <Text style={styles.msgText}>{item.username}</Text>
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
