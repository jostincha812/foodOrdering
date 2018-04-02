import React from "react";
import { Header, Title, Subtitle, Button , Left , Right, Icon, Body } from "native-base";
import styles from './styles';

const NavBar = (props) => {
  return (
    <Header style={styles.headerContainer}>
      <Left style={styles.headerLeft}>
        <Button
          transparent
          onPress={() => props.LeftIconPressed()}>
          <Icon name={props.LeftIcon} />
        </Button>
      </Left>
      <Body style={styles.headerBody}>
        <Title style={styles.headerTitle}>{props.Title}</Title>
        {props.Subtitle && <Subtitle>{props.Subtitle}</Subtitle>}
      </Body>
      {props.RightIcon ? <Right
          style={styles.headerRight}
         >
         <Button
           transparent
           onPress={() => props.RightIconPressed()}>
           <Icon 
            name={props.RightIcon} 
            style={
              {
                color : props.RightIconColor ? props.RightIconColor : '', 
                fontSize : props.RightIconColor ? 30 : 27
              }
            }/>
         </Button>
        </Right> : <Right />}
    </Header>
  )
}

export default NavBar;
