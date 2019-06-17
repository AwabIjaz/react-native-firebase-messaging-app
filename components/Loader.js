import React, { Component } from 'react';
import { Text, View, ActivityIndicator, StyleSheet } from 'react-native';


export default class Loader extends Component {

	loading(){
	    if(this.props.isloading){
	      return  <View style={[styles.loading,{backgroundColor:'rgba(0,0,0,0.6)'}]}>
	                <ActivityIndicator size="large" color='black'/>
	              </View>
	    }
	}

    render() {
	    return (
	      <View style={styles.loading}>{this.loading()}</View>
	    );
    }

}


const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
});