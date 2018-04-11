import React from 'react';
import { StatusBar, Image } from 'react-native';
import { Container, Content } from 'native-base';

import styles from './styles';
import { colors } from '../../theme';
import logo from '../../assets/logo.png';

const SplashScreen = () => (
  <Container>
    <StatusBar
       backgroundColor={ colors.red }
       barStyle="light-content"
     />
     <Content contentContainerStyle={ styles.container }>	
       <Image
          source={ logo }
          style={ styles.logoStyle }
        />
     </Content>
  </Container>
)

export default SplashScreen;

