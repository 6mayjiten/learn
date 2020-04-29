import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  headerBody:{
    display: "flex", 
    justifyContent: "flex-end", 
    flexDirection: "row"
  }
})

export default class AppHeader extends Component {
  render() {
    let {title, isHome} = this.props;
    return (
        <Header>
            <Left>
            {
              isHome?
              <Icon/>
              :
                <Button transparent onPress={() => this.props.navigation.goBack()}>
                  <Icon name='arrow-back' />
                </Button>
            }
            </Left>
            <Body style={styles.headerBody}>
              <Title>{title}</Title>
            </Body>
            <Right>
              <Button transparent onPress={() => this.props.navigation.toggleDrawer()}>
                <Icon type="Ionicons" ios="ios-menu" android='md-menu' />
              </Button>
            </Right>
        </Header>
    );
  }
}