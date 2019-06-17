import React from 'react';
import { Platform, StatusBar, StyleSheet, View, Text, Image, ImageBackground } from 'react-native';
import { Header, Body, Title, Left, Right, Thumbnail, Button } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import SideMenu from './menu/SideMenu';
import {responsive, scale_size} from '../constants/Layout.js';

export default class Head extends React.Component {

  constructor(props){
    super(props);
  }

  render() {
      return (
        
          <Header transparent style={{backgroundColor:'rgba(50,65,88,1)'}}>
            <Left>
              <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                <Ionicons name="ios-menu" style={{color:'white'}} size={scale_size(1.2)}/>
              </Button>
            </Left>
            <Body style={styles.header}>
                <Text style={styles.headerText1}>{this.props.name}</Text>
            </Body>
            <Right style={{flex:0.4}}>
              <Image 
                source={require('../assets/images/icon.png')}
                style={styles.profileImg}
              />
            </Right>
          </Header>  
     
      );
    }
  }

const styles = StyleSheet.create({
  header:{
    justifyContent:'center',
    alignItems:'center'
  },
  headerText1:{
    textAlign:'center',
    fontSize:responsive(8),
    color:'white',
  },
  profileImg: {
    height: scale_size(1.3),
    width: scale_size(1.3),
    borderRadius: 40,
  }
});
