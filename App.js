/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment,Component} from 'react';
import { Platform,  StyleSheet,  View,Image} from 'react-native';

import {NativeModules,DeviceEventEmitter,AppRegistry} from 'react-native';
var Najva = NativeModules.NajvaModule;

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});



type Props = {};
export default class App extends Component<Props> {
	constructor(props) {
		super(props);

		Najva.initializeNajva(true);     // true : Enable Najva Location Service

	}
	
	componentDidMount(){
		this.subscription = DeviceEventEmitter.addListener('userHandler',
		function(token) {
			// handle token here
			console.log("TOKEN: " +token );
		});
		
		Najva.getSubscribedToken(function(token){
			console.log(token);
		});
                Najva.setReceiveNotificationListener(function(notificationId) {
     			console.log("notificationId: ", notificationId);
    		});
    		Najva.setNotificationClickListener(function(notificationId, buttonId) {
     			 console.log("notificationId: ", notificationId, buttonId);
    		});
	}

		


 render() {
  return (
	<View style={styles.container}>
 
		<Image source={require('./asset/Najva-Logo.png')}
         style={styles.backgroundImage}>
		 </Image>
    
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

