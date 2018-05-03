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

const createMailContent = ( userName, userEmail, mobile, address, restaurantData, cartData ) => {
  const { name } = restaurantData;
  const orderData = parseOrder( cartData );
  return(
    `<div>
      <p>Hi ${name},</p>
    </div>
    <div>
      <h4>My order is as follows :</h4>
      <ul>
      ${orderData}
      </ul>
    </div>
    <div>
      <h4>My Details : </h4>
      <ul>
        <li>Name    : ${userName}</li>
        <li>Address : ${address}</li>
        <li>Mobile  : ${mobile}</li>
      </ul>
    </div>
    `
  )
}

const parseOrder = ( cartData ) => {
  let listData = '';
  cartData.forEach( item => {
    listData = listData+`<li>${item.name} - ${item.qty}</li>`
  } );
  return listData;
}

export {
  addSpaceBeforeCapital,
  makeCopy,
  checkInternetConnection,
  createMailContent
};