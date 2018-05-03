import React, { Component } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';

import CustomTextInput from '../../../../components/customTextInput';
import ProgressButton from '../../../../components/progressButton';
import { mainStyles } from '../../../../theme';
import { checkInternetConnection } from '../../../../utils';

export default class PersonalDetails extends Component {
  state = {
    address : '',
    city : '',
    state : '',
    zip : '',
    errors : {
      address : '',
      city : '',
      state : '',
      zip : '',
    }
  };
  
  onSave = () => {
    if( !this.validateForm() ) return;
    checkInternetConnection( this.onSaveSuccessfull, this.onSave );
  };

  onSaveSuccessfull = () => {
    const addressObj = {
      address : this.state.address,
      city : this.state.city,
      state : this.state.state,
      zip : this.state.zip,
    };
    this.props.onSave( addressObj );
  }
  
  validateForm = () => {
    const { errors } = this.state;
    let valid = false;
    
    valid = !!this.state.address;
    valid = valid ? !!this.state.city : valid;
    valid = valid ? !!this.state.state : valid;
    valid = valid ? !!this.state.zip : valid;


    errors.address = !this.state.address ? 'Required' : '';
    errors.city = !this.state.city ? 'Required' : '';
    errors.state = !this.state.state ? 'Required' : '';
    errors.zip = !this.state.zip ? 'Required' : '';

    this.setState( { errors } );

    return valid;
  }
    
  render(){
    const { errors } = this.state;
    
    return(
      <View style={ mainStyles.widthAll }>
        <CustomTextInput
          value={ this.state.address }
          placeholder="Address"
          onChange={ address => this.setState( { address } ) }
          error={ errors.address }
        />
        <CustomTextInput
          value={ this.state.city }
          placeholder="City"
          onChange={ city => this.setState( { city } ) }
          error={ errors.city }
        />
        <CustomTextInput
          value={ this.state.state }
          placeholder="State"
          onChange={ state => this.setState( { state } ) }
          error={ errors.state }
        />
        <CustomTextInput
          type="number"
          value={ this.state.zip }
          placeholder="Zip"
          onChange={ zip => this.setState( { zip } ) }
          error={ errors.zip }
        />
        {/* <TouchableOpacity 
          onPress={ this.props.onBack } 
          style={ mainStyles.roundButton }
          activeOpacity={0.8}
        >
            <Text style={mainStyles.whiteText}>Back</Text>
        </TouchableOpacity> */}
        <ProgressButton
          round
          onPress={ this.onSave }
          loading={ this.props.loading }
          buttonText="Save"
        />
      </View>
    )
  }
  
};