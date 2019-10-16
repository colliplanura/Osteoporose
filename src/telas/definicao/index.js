import React, {Component} from 'react';
import {Container} from 'native-base';
import {ActivityIndicator, Platform} from 'react-native';
import stylesComuns from '../../styles/stylesComuns';
import Cabecalho from '../../componentes/Cabecalho';
import {WebView} from 'react-native-webview';

export default class Definicao extends Component {
  render() {
    return (
      <Container style={stylesComuns.container}>
        <Cabecalho titulo="Definição" {...this.props} />
        <WebView
          originWhitelist={['*']}
          source={
            Platform.OS === 'ios'
              ? require('../../../assets/html/definicao.html')
              : {uri: 'file:///android_asset/html/definicao.html'}
          }
          scalesPageToFit={true}
          startInLoadingState={true}
          renderLoading={() => (
            <ActivityIndicator size="large" color="#4090f4" />
          )}
        />
      </Container>
    );
  }
}
