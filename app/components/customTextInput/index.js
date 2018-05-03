import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { mainStyles, colors } from '../../theme';

const CustomTextInput = ( { type ,value, placeholder, onChange , error, returnKeyType, onSubmitEditing, autoFocus } ) => (
  <View style={ mainStyles.widthAll }>
    <TextInput
      keyboardType={ type === 'email' ? 'email-address' : type === 'number' ? 'numeric' : 'default' }
      autoCapitalize={ type === 'email' ? 'none' : 'sentences' }
      value={ value }
      onChangeText={ onChange }
      style={ mainStyles.widthAll }
      placeholder={ placeholder }
      placeholderTextColor={ colors.red }
      underlineColorAndroid={ colors.red }
      secureTextEntry={ type === 'password' }
      returnKeyType={ returnKeyType }
      onSubmitEditing={ onSubmitEditing }
      autoFocus={ autoFocus }
    />
    <Text style={mainStyles.errorText}>{ error }</Text>
  </View>
);

export default CustomTextInput;