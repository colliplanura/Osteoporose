import React, {Component} from 'react';
import {Container} from 'native-base';
import {ActivityIndicator} from 'react-native';
import stylesComuns from '../../styles/stylesComuns';
import Cabecalho from '../../componentes/Cabecalho';
import {WebView} from 'react-native-webview';

const prevencaoHTML = require('../../../assets/html/prevencao.html');

export default class Prevencao extends Component {
  render() {
    return (
      <Container style={stylesComuns.container}>
        <Cabecalho titulo="Prevenção" {...this.props} />
        <WebView
          source={prevencaoHTML}
          startInLoadingState={true}
          renderLoading={() => (
            <ActivityIndicator size="large" color="#4090f4" />
          )}
        />
      </Container>
    );
  }
}
