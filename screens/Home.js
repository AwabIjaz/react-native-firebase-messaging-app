import React, { Component } from 'react';
import { TextInput,FlatList, Platform, StyleSheet, Text, View,  AppRegistry, Image, ScrollView, TouchableOpacity, TouchableHighlight} from 'react-native';
import {createDrawerNavigator, createAppContainer} from 'react-navigation';
import {Icon,Button,Body,Right,Title,Container,Content,Left,Card, CardItem, Thumbnail} from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import styles from '../constants/startStyle';
import {responsive, scale_size} from '../constants/Layout.js';
import Head from '../components/Header';
import firebase from '../FirebaseConfig';
import {db} from '../FirebaseConfig';
import Loader from '../components/Loader';


export default class Home extends Component{
  static navigationOptions = {
    header: null,
  };
  
  constructor(props){
    super(props);
    this.state = {
      isloading: true,
      text:'',
      dataSource:[],
      username:'',
    }
    this.arrayholder = [] ;
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged((user) => {
      if(user){
        console.log('Home email '+user.email);
        this.getUsers(user.email);
      }
    }); 
  }

  componentWillUnmount() {
    this.isCancelled = true;
  }

  getUsers(email){
    db.collection("users").get().then((querySnapshot) => {
      let tempData = [];
      querySnapshot.forEach((doc) => {
        if(email !== doc.data().email){
          tempData.push(doc.data().username);
        }
        else{
          !this.isCancelled && this.setState({ username: doc.data().username })
        }
      })
      !this.isCancelled && this.setState({ dataSource : tempData, isloading: false })
      this.arrayholder = tempData
    }).catch((error) => { console.log("error getting users", error) });
  }

  SearchFilterFunction(text){
    const newData = this.arrayholder.filter(function(item){
      const itemData = item.toUpperCase()
      const textData = text.toUpperCase()
      return itemData.indexOf(textData) > -1
    })
    this.setState({
      dataSource: newData,
      text: text
    })
  }


  details(uname){
    this.props.navigation.navigate('MessagesScreen',{
      Username:uname,
      CurrentUser:this.state.username
    });
  }

  gotoBroadcast(){
    this.props.navigation.navigate('BroadcastScreen',{
      Users:this.state.dataSource,
      CurrentUser:this.state.username
    });
  }

  gotoGroup(){
    this.props.navigation.navigate('GroupScreen',{
      Users:this.state.dataSource,
      CurrentUser:this.state.username
    });
  }

  render() {
    return (
      <View style={s.container}>

        <Head navigation={this.props.navigation} name="Home"/>

        <View style={{flexDirection:'row',justifyContent:'center'}}>
          <Ionicons name="ios-search" style={{position:'absolute',left:responsive(36),top:responsive(6)}} size={scale_size(0.8)}/>
          <View style={s.inputView}>
            <TextInput
              style={s.TextInputStyleClass}
              onChangeText={(text) => this.SearchFilterFunction(text)}
              value={this.state.text}
              underlineColorAndroid='transparent'
              placeholder="Search Contacts"
              placeholderTextColor="grey"
            />
          </View>
        </View>

        <View style={{flexDirection:'row', justifyContent:'space-evenly',marginTop:responsive(6)}}>
          <TouchableOpacity onPress={()=>this.gotoGroup()} style={[styles.button,{elevation:0}]}><Text style={{color:'white'}}>Add a new group</Text></TouchableOpacity>
          <TouchableOpacity onPress={()=>this.gotoBroadcast()} style={[styles.button,{elevation:0}]}><Text style={{color:'white'}}>Send Broadcast</Text></TouchableOpacity>
        </View>

        <ScrollView style={{flex:1,marginTop:responsive(8)}}>
          <View>
            <FlatList
              data={this.state.dataSource}
              extraData={this.state}
              renderItem={({item}) => <TouchableOpacity onPress={()=>this.details(item)}>
              
                <Card transparent>
                  <CardItem style={s.content}>
                    <Left>
                      <Body>
                        <Text style={s.usernameText}>{item}</Text>
                      </Body>
                    </Left>
                    <Right>
                      <Text style={s.iconText}> > </Text>                    
                    </Right>
                  </CardItem>
                </Card>
                      
              </TouchableOpacity> }
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </ScrollView>

        <Loader isloading={this.state.isloading}/>

      </View>
    );
  }
}


const s = StyleSheet.create({
  container: {
    flex:1,
  },
  inputView:{
    marginTop:responsive(4),
    height: scale_size(1.4),
    flex:0.9,
    borderWidth: 1,
    borderColor: 'rgba(50,65,88,1)',
    borderRadius: 20,
    justifyContent:'center',
    alignItems:'center'
  },
  TextInputStyleClass:{
    textAlign: 'center',
    fontSize:responsive(4.8),
    width:"32%"
  },
  content:{
    height:scale_size(2.2),
    borderBottomWidth:0.6,
    alignItems:'center'
  },
  usernameText:{
    fontSize:responsive(6),
  },
  iconText:{
    color:'grey',
    fontSize:responsive(8)
  }
});
