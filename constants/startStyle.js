import React from 'react';
import {
  StyleSheet,
  Platform,
} from 'react-native';

import { responsive, scale_size } from './Layout';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  titleContainer:{
    flex:0.4,
    justifyContent:'flex-end',
    alignItems:'center',
  },
  buttonsContainer:{
    marginTop:responsive(8),
    alignItems:'center',
    justifyContent:'space-between',
    flex:0.15,
  },
  button: {
    height:scale_size(1.2),
    width:scale_size(4),
    backgroundColor:'rgba(0,51,102,1)',
    borderRadius:10,
    elevation:4,
    alignItems:'center',
    justifyContent:'center',
  },
  titleText:{
    fontSize:responsive(12),
    color:'rgba(0,51,102,1)',
    fontFamily:'Roboto',
    letterSpacing:responsive(0.2),
  },
  subtitleText:{
    color:'grey',
    fontFamily:'Roboto',
    fontWeight:'bold',
    padding:responsive(2)
  },
  welcomeImage:{
    width:scale_size(3.5),
    height:scale_size(3.5)
  },
  formContainer:{
    flex:0.6,
    alignItems:'center',
    justifyContent:'flex-start',
    marginTop:responsive(8),
  },
  input: {
    width: "80%",
    height: "100%",
    paddingLeft:responsive(10),
    borderWidth: 0.8,
    borderColor: 'rgba(0,51,102,1)',
    fontFamily:'Roboto',
    fontSize:responsive(5),
  },
  widerButton:{ 
    borderRadius:responsive(4.5), 
    width:"80%", 
    height:scale_size(1.4),
    backgroundColor:'rgba(0,51,102,1)',
    alignItems:'center',
    justifyContent:'center',
    elevation:4,
  },
  btnText:{
    color:'white',
    fontSize:responsive(5.5),
    letterSpacing:responsive(2.5),
  },
});

export default styles;