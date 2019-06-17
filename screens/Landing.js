import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import styles from '../constants/startStyle';


export default class Landing extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render(){
    return (
      <View style={styles.container}>
        
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Welcome</Text>
          <Text style={styles.subtitleText}>Log in or Sign up to get started.</Text>
          <Image style={styles.welcomeImage} source={require('../assets/images/icon.png')}/>
        </View>
        
        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={()=>this.props.navigation.navigate('LoginScreen')} style={styles.button}><Text style={{color:'white'}}>Login</Text></TouchableOpacity>
          <TouchableOpacity onPress={()=>this.props.navigation.navigate('SignUpScreen')} style={styles.button}><Text style={{color:'white'}}>Signup</Text></TouchableOpacity>
        </View>

      </View>
    );
  }
}
