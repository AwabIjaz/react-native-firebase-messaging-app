import React, { Component } from 'react';
import { TextInput,FlatList, Platform, StyleSheet, Text, View,  AppRegistry, Image, ScrollView, TouchableOpacity, TouchableHighlight} from 'react-native';
import {createDrawerNavigator, createAppContainer} from 'react-navigation';
import {Icon,Button,Body,Right,Title,Container,Content,Left,Card, CardItem, Thumbnail, List, ListItem} from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import styles from '../constants/startStyle';
import {responsive, scale_size} from '../constants/Layout.js';
import Head from '../components/Header';
import firebase from '../FirebaseConfig';
import {db} from '../FirebaseConfig';
import Loader from '../components/Loader';


export default class Groups extends Component{
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
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged((user) => {
      if(user){
        console.log('Group email '+user.email);
        this.getUser(user.email);
      }
    }); 
  }

  componentWillUnmount() {
    this.isCancelled = true;
  }

  getUser(email){
    db.collection("users").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if(email === doc.data().email){
          this.getGroups(doc.data().username)
          !this.isCancelled && this.setState({ username: doc.data().username });
        }
      })
    }).catch((error) => { console.log("error getting users", error) });
  }

  getGroups(currentUser){
    db.collection("groups").onSnapshot((querySnapshot) => {
      let tempData = [];
      let tempObject = {};
      querySnapshot.forEach((doc) => {
      if((doc.data().users).includes(currentUser)){
        tempObject = doc.data();
        tempObject.id = doc.id;
        tempData.push(tempObject);
      }
      });
      !this.isCancelled && this.setState({ dataSource:tempData, isloading:false })
    })
  }


  details(gid,gname){
    this.props.navigation.navigate('GroupMessagesScreen',{
      Groupid:gid,
      Groupname:gname,
      CurrentUser:this.state.username
    });
  }

  render() {
    return (
      <View style={s.container}>

        <Head navigation={this.props.navigation} name="Groups"/>

        <ScrollView style={{flex:1,marginTop:responsive(8)}}>
          <View>
            <FlatList
              data={this.state.dataSource}
              extraData={this.state}
              renderItem={({item}) => <TouchableOpacity onPress={()=>this.details(item.id,item.name)}>

                <Card transparent>
                  <CardItem style={s.content}>
                    <Left>
                      <Body>
                        <Text style={s.groupnameText}>{item.name}</Text>
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
  content:{
    height:scale_size(2.2),
    borderBottomWidth:0.6,
    alignItems:'center'
  },
  groupnameText:{
    fontSize:responsive(6),
  },
  iconText:{
    color:'grey',
    fontSize:responsive(8)
  }
});
