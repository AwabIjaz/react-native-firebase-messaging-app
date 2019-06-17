import React, { Component, Text } from 'react'
import * as firebase from 'firebase';

export default function Logout(){
  firebase.auth().signOut();
  return null;
}