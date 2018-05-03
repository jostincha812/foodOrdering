import React, { Component } from 'react';
import { Text, AsyncStorage } from 'react-native';
import firebase from 'react-native-firebase';

import { PublicRoutes, PrivateRoutes } from './routes';
import SplashScreen from './components/splashscreen';

export default class App extends Component{
  state = {
    loading : true,
    user : null
  }

  componentDidMount(){
    setTimeout( () => {
      this.unsubscriber = firebase.auth().onAuthStateChanged((user) => {
        this.setState({
          user,
          loading : false
         },()=>{
           if( this.state.user ){
             AsyncStorage.setItem('uid',this.state.user._user.uid);
           } else {
             AsyncStorage.clear();
           }
        });
      });
    }, 200);
  }

  componentWillUnmount(){
    if( this.unsubscriber )
      this.unsubscriber();
  }

  render(){
    const { loading, user } = this.state;
    
    if ( loading )  return <SplashScreen/>;

    return user ? <PrivateRoutes/> : <PublicRoutes/>
  }
}
