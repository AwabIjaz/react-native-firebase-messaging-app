import React, { Component } from 'react';
import { TextInput,FlatList, Platform, StyleSheet, Text, View,  AppRegistry, Image, ScrollView, CheckBox,
  TouchableOpacity, TouchableHighlight, Button} from 'react-native';
import {createDrawerNavigator, createAppContainer} from 'react-navigation';
import {Icon,Body,Right,Title,Container,Content,Left,Card, CardItem, Thumbnail} from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import styles from '../constants/startStyle';
import {responsive, scale_size} from '../constants/Layout.js';
import Head from '../components/Header';
import Loader from '../components/Loader';
import firebase from '../FirebaseConfig';
import {db} from '../FirebaseConfig';

let users = [];
let currentUser = '';
let tempCheckValues = [];
let addedUsers = [];

export default class CreateGroup extends Component{
  static navigationOptions = {
    title: 'Create Group',
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
      isloading:false,
      text:'',
      checkBoxChecked:[]
    }
    users = this.props.navigation.getParam('Users', []);
    currentUser = this.props.navigation.getParam('CurrentUser', '');
  }

  componentDidMount(){
    for (i in users){
      tempCheckValues[users[i]] = false
    }
    this.setState({
      checkBoxChecked:tempCheckValues
    })
  }

  componentWillUnmount() {
    this.isCancelled = true;
  }

  checkBoxChanged(user, value) {
    
    console.log(user)
    console.log(value)
    
    if(!value){
      addedUsers.push(user)
    }

    else{
      if(addedUsers.includes(user)){
        addedUsers = addedUsers.filter(e => e !== user)
      }
    }

    let tempCheckBoxChecked = this.state.checkBoxChecked;
    tempCheckBoxChecked[user] = !value;

    this.setState({
      checkBoxChecked: tempCheckBoxChecked
    })

  }

  async createGroup(){

    const { text } = this.state;

    if(!text){
      alert("Choose a name");
      return;
    }

    addedUsers.push(currentUser);
    this.setState({ isloading:true });

    await db.collection("groups").add({
        name:text,
        users: addedUsers,
        time: new Date(),
    })
    .then(() => {
            console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });

    this.setState({ isloading:false });
    alert("Your group has been created, you can access it through the sidebar.");

  }

  render() {
    return (
      <View style={s.container}>

        <View style={s.upperContainer}>
          <View style={s.inputView}>
            <TextInput
              style={s.TextInputStyleClass}
              onChangeText={(text) => this.setState({text})}
              value={this.state.text}
              underlineColorAndroid='transparent'
              placeholder="Group Name"
              placeholderTextColor="grey"
            />
          </View>
        </View>

        <View style={s.upperContainer}>
          <View style={{flex:0.9}}>
           <Text>Select the members of your new group</Text>
          </View>
          <Button
            onPress={()=>this.createGroup()}
            title="Create Group"
            color="green"
          />
        </View>

        <ScrollView>
          <View style={{flex:1}}>
            <FlatList
              data={users}
              extra={this.state}
              renderItem={({item}) => <TouchableHighlight underlayColor='white' >

                 <CardItem>
                  <Left>
                    <CheckBox
                      value={this.state.checkBoxChecked[item]}
                      onValueChange={() => this.checkBoxChanged(item, this.state.checkBoxChecked[item])}
                    />
                    <Body>
                      <Text style={{fontSize:responsive(6)}}>{item}</Text>
                    </Body>
                  </Left>
                 </CardItem>
                           
              </TouchableHighlight> }
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
  upperContainer:{
    flexDirection:'row',
    justifyContent:'center',
    marginTop:responsive(6)
  },
  inputView:{
    height: scale_size(1.4),
    flex:0.9,
    borderWidth: 1,
    borderColor: 'rgba(50,65,88,1)',
    justifyContent:'center',
    alignItems:'center'
  },
  TextInputStyleClass:{
    fontSize:responsive(4.8),
    width:"95%"
  },
});
