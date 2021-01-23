/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Fragment, Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, Alert  } from 'react-native';

import { NativeModules, DeviceEventEmitter, AppRegistry } from 'react-native';
import FlatButton from './button';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
}); 


export default class App extends Component {
  state = {
    najvaToken: "unavailable"
  }

  constructor(props) {
    super(props);

    NativeModules.NajvaModule.initializeNajva("8b84ad3a-3daa-4520-9adc-d7528ea95a54", 12383, false, false);// true : Enable Najva Location Service

    this.componentDidMount = this.componentDidMount.bind(this);
    this.updateToken = this.updateToken.bind(this);
  }

  requestNotification() {
    fetch('https://app.najva.com/notification/api/v1/notifications/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'cache-control': 'no-cache',
        'authorization': 'Token aff3c68af97bf4608fdf28673ca26201ca027ed9'
      },
      body: JSON.stringify({
        'api_key': '8b84ad3a-3daa-4520-9adc-d7528ea95a54',
        'title': 'Test Notification',
        'body': 'This notification has sent from api',
        'url': 'https://doc.najva.com',
        'onclick_action': 'open-app',
        'priority': 'high',
        "content": "some content",
        'subscriber_tokens': [this.state.najvaToken]
      })
    }).then(response => response.json())
    .then(responseJson => {this.displayAlert(responseJson)});
  }

  displayAlert(response) {
    Alert.alert(
      "Server response",
      JSON.stringify(response),
      [
        { text: "OK" }
      ],
      { cancelable: false }
    );
    console.log(response._bodyText)
  }

  updateToken(token){
    console.log("TOKEN: " + token);
    this.setState({
      najvaToken: token
    })
  }

  componentDidMount() {
    this.subscription = DeviceEventEmitter.addListener('userHandler',this.updateToken);

    NativeModules.NajvaModule.getSubscribedToken(this.updateToken);
    NativeModules.NajvaModule.setReceiveNotificationListener(function (notificationId) {
      console.log("notificationId: ", notificationId);
    });
    NativeModules.NajvaModule.setNotificationClickListener(function (notificationId, buttonId) {
      console.log("notificationId: ", notificationId, buttonId);
    });
  }

  render() {
    return (
      <View style={styles.container}>

        <Image source={require('./asset/Najva-Logo.png')}
          style={styles.backgroundImage}>
        </Image>
        <Text> {this.state.najvaToken} </Text>

        <FlatButton text="get a notification" onPress={()=> this.requestNotification()} ></FlatButton>
      </View>
    );
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  backgroundImage: {
    flex: 1,
    width: 400,
    height: 800,
    resizeMode: 'contain'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
