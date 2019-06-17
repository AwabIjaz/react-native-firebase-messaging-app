import React, { Component } from "react";
import { Image,View } from "react-native";
import {
  Content,
  Text,
  List,
  ListItem,
  Icon,
  Container,
  Left,
  Right,
  Badge
} from "native-base";
import styles from "./SideMenu.style";
import {responsive, scale_size} from '../../constants/Layout.js';
import firebase from '../../FirebaseConfig';
import {db} from '../../FirebaseConfig';

const datas = [
  {
    name: "Home",
    route: "HomeScreen",
    icon: "home",
    bg: "#C5F442"
  },
  {
    name: "Groups",
    route: "GroupsScreen",
    icon: "md-people",
    bg: "#C5F442"
  },
  {
    name: "Logout",
    route: "LogoutScreen",
    icon: "ios-log-out",
    bg: "#C5F442"
  },
];

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shadowOffsetWidth: 1,
      shadowRadius: 4,
      username:'',
    };
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged((user) => {
      if(user){
        console.log('Side email '+user.email);
        this.getUser(user.email);
      }
    });
  }

  componentWillUnmount() {
    this.isCancelled = true;
  }

  getUser(email){
    db.collection("users").where("email", "==", email).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        !this.isCancelled && this.setState({ 
          username: doc.data().username, 
        });
      })
    }).catch((error) => { console.log("error getting docs", error) });
  }

  render() {
    return (
      <Container>
        <Content
          bounces={false}
          style={{ flex: 1, backgroundColor: "#fff", top: -1 }}
        >
          <View style={{paddingTop:responsive(14),paddingLeft:responsive(10)}}>
          <Text style={{paddingBottom:responsive(6),fontSize:responsive(6)}}>Welcome, {this.state.username}</Text>
          </View>
          <List
            dataArray={datas}
            renderRow={data =>
              <ListItem
                button
                noBorder
                onPress={() => this.props.navigation.navigate(data.route)}
              >
                <Left>
                  <Icon
                    active
                    name={data.icon}
                    style={{ color: "#777", fontSize: responsive(8), width: scale_size(1) }}
                  />
                  <Text style={styles.text}>
                    {data.name}
                  </Text>
                </Left>
                {data.types &&
                  <Right style={{ flex: 1 }}>
                    <Badge
                      style={{
                        borderRadius: 3,
                        height: scale_size(1),
                        width: scale_size(2),
                        backgroundColor: data.bg
                      }}
                    >
                      <Text
                        style={styles.badgeText}
                      >{`${data.types} Types`}</Text>
                    </Badge>
                  </Right>}
              </ListItem>}
          />
        </Content>
      </Container>
    );
  }
}

export default SideBar;
