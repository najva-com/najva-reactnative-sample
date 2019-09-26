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

		Najva.initializeNajva();     

	}
	
	componentDidMount(){
		this.subscription = DeviceEventEmitter.addListener('userHandler',
		function(token) {
			// handle token here
			console.log("TOKEN: " +token );
		});
		
		this.subscription = DeviceEventEmitter.addListener('data',
		function(data){
			// access data 
			console.log("DATA: " +data);
		});
		Najva.getSubscribedToken(function(token){
			console.log(token);
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

AppRegistry.registerHeadlessTask('NotificationReceiver', () => require('./NotificationReceiver'));
AppRegistry.registerHeadlessTask('ClickReceiver', () => require('./ClickReceiver'));
