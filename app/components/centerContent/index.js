import React from "react";
import { Content, Grid, Col } from 'native-base';
import styles from './styles';

const CenterContent = (props) => {
  return (
    <Content contentContainerStyle={styles.contentContainer} style={styles.contentContainerStyle}>
      <Grid style={styles.gridStyle}>
        <Col>
          {props.children}
        </Col>
      </Grid>
    </Content>
  )
}

export default CenterContent;
