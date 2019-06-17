import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { YellowBox } from 'react-native';

import AppNavigator from './navigation/AppNavigator';
import Drawer from './navigation/DrawerNavigator';

import firebase from './FirebaseConfig';
import {db} from './FirebaseConfig';
import Loader from './components/Loader';


YellowBox.ignoreWarnings(['Setting a timer']);

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
    user: {},
  };

  componentDidMount(){
    this.authListener();
  }
  
  authListener(){
    firebase.auth().onAuthStateChanged((user) => {
      if(user){
        console.log('authListener email '+user.email);
        this.setState({ user });
      }
      else {
        this.setState({ user: null});
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.user ? (<Drawer/>) : (<AppNavigator/>)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
