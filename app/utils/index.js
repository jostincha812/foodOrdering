import { NetInfo, Alert } from 'react-native';

const addSpaceBeforeCapital = ( string ) => (
  !string ? string : string.replace(/([a-z])([A-Z])/g, '$1 $2')
)

const makeCopy = ( data ) => (
  JSON.parse( JSON.stringify( data ) )
)

const checkInternetConnection = ( successCallbackFn, tryAgainCallbackFn ) => {
  NetInfo.isConnected.fetch().then(isConnected => {
    if(isConnected)
      successCallbackFn();
    else {
      Alert.alert(
        'No Internet Connection',
        'Kindly, check your connection and try again.',
        [
          {text: 'Try Again', onPress: () => tryAgainCallbackFn()}
        ],
        { cancelable: false }
      )
    }
  });
}

export {
  addSpaceBeforeCapital,
  makeCopy,
  checkInternetConnection
};