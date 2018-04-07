import React, { Component } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';

import CustomTextInput from '../../../../components/customTextInput';
import ProgressButton from '../../../../components/progressButton';
import { mainStyles } from '../../../../theme';

export default class PersonalDetails extends Component {
  state = {
    first_name : '',
    last_name : '',
    email : '',
    mobile_no : '',
    password : '',
    confirm_password : '',
    errors : {
      first_name : '',
      last_name : '',
      email : '',
      mobile_no : '',
      password : '',
      confirm_password : ''
    }
  };
  
  onNext = () => {
    if( !this.validateForm() ) return;
  
    const personalDetails = {
      first_name : this.state.first_name,
      last_name : this.state.last_name,
      email : this.state.email,
      mobile_no : this.state.mobile_no,
      password : this.state.password,
    }
    
    this.props.onNext( personalDetails );
  };
  
  validateForm = () => {
    const { errors } = this.state;
    let valid = false;
    
    valid = !!this.state.first_name;
    valid = valid ? !!this.state.last_name : valid;
    valid = valid ? !!this.state.email : valid;
    valid = valid ? !!this.state.mobile_no : valid;
    valid = valid ? !!this.state.password : valid;
    valid = valid ? !!this.state.confirm_password : valid;
    valid = valid ? this.state.password.length >= 6 : valid;
    valid = valid ? this.state.password === this.state.confirm_password : valid;

    errors.first_name = !this.state.first_name ? 'Required' : '';
    errors.last_name = !this.state.last_name ? 'Required' : '';
    errors.email = !this.state.email ? 'Required' : '';
    errors.mobile_no = !this.state.mobile_no ? 'Required' : '';
    errors.password = !this.state.password ? 'Required' : '';
    errors.confirm_password = !this.state.confirm_password ? 'Required' : '';
    
    if ( !errors.password && !errors.confirm_password ){
      if ( this.state.password.length < 6 )
        errors.password = 'Atleast 6 characters';
      else if ( this.state.password !== this.state.confirm_password ) 
        errors.confirm_password = 'Password mismatch';
    }
    
    this.setState( { errors } );

    return valid;
  };
  
  render(){
    const { errors } = this.state;
    
    return(
      <View style={ mainStyles.widthAll }>
        <CustomTextInput
          value={ this.state.first_name }
          placeholder="First Name"
          onChange={ first_name => this.setState( { first_name } ) }
          error={ errors.first_name }
        />
        <CustomTextInput
          value={ this.state.last_name }
          placeholder="Last Name"
          onChange={ last_name => this.setState( { last_name } ) }
          error={ errors.last_name }
        />
        <CustomTextInput
          type="email"
          value={ this.state.email }
          placeholder="Email"
          onChange={ email => this.setState( { email } ) }
          error={ errors.email }
        />
        <CustomTextInput
          type="number"
          value={ this.state.mobile_no }
          placeholder="Mobile"
          onChange={ mobile_no => this.setState( { mobile_no } ) }
          error={ errors.mobile_no }
        />
        <CustomTextInput
          type="password"
          value={ this.state.password }
          placeholder="Password"
          onChange={ password => this.setState( { password } ) }
          error={ errors.password }
        />
        <CustomTextInput
          type="password"
          value={ this.state.confirm_password }
          placeholder="Confirm Password"
          onChange={ confirm_password => this.setState( { confirm_password } ) }
          error={ errors.confirm_password }
        />
        <ProgressButton
          round
          onPress={ this.onNext } 
          buttonText="Next"
        />
      </View>
    )
  }
  
};