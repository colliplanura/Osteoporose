import React, {Component} from 'react';
import {ActivityIndicator} from 'react-native';
import {
  Container,
  Header,
  Left,
  Button,
  Icon,
  Body,
  Title,
  Right,
} from 'native-base';
import stylesComuns from '../../styles/stylesComuns';
import {WebView} from 'react-native-webview';

export default class Fratura extends Component {
  render() {
    return (
      <Container style={stylesComuns.container}>
        <Header
          style={stylesComuns.header}
          androidStatusBarColor="#ffffff"
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
            <Title style={stylesComuns.textoCabecalho}>FRAX®</Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() => {
                this.WebViewRef && this.WebViewRef.reload();
              }}>
              <Icon
                type="MaterialCommunityIcons"
                name="reload"
                style={stylesComuns.iconeCabecalho}
              />
            </Button>
          </Right>
        </Header>
        <WebView
          ref={WEBVIEW_REF => (this.WebViewRef = WEBVIEW_REF)}
          source={{
            uri: 'https://abrasso.org.br/calculadora/calculadora/',
          }}
          startInLoadingState={true}
          renderLoading={() => (
            <ActivityIndicator size="large" color="#4090f4" />
          )}
        />
      </Container>
    );
  }
}
