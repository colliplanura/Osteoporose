import React, {Component} from 'react';
import {StatusBar, View} from 'react-native';
import {Header, Left, Button, Icon, Body, Title, Right} from 'native-base';

import stylesComuns from '../../styles/stylesComuns';

export default class Cabecalho extends Component {
  render() {
    return (
      <View>
        <StatusBar barStyle="light-content" animated={true} />
        <Header
          style={stylesComuns.header}
          androidStatusBarColor="#4090f4"
          iosBarStyle="light-content">
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.openDrawer()}>
              <Icon
                type="Entypo"
                name="menu"
                style={stylesComuns.iconeCabecalho}
              />
            </Button>
          </Left>
          <Body>
            <Title style={stylesComuns.textoCabecalho}>
              {this.props.titulo}
            </Title>
          </Body>
          <Right />
        </Header>
      </View>
    );
  }
}
