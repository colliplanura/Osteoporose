import React, {Component} from 'react';
import {Container} from 'native-base';
import {ActivityIndicator} from 'react-native';
import stylesComuns from '../../styles/stylesComuns';
import Cabecalho from '../../componentes/Cabecalho';
import {WebView} from 'react-native-webview';

const definicaoHTML = require('../../../assets/html/definicao.html');

export default class Definicao extends Component {
  render() {
    return (
      <Container style={stylesComuns.container}>
        <Cabecalho titulo="Definição" {...this.props} />
        <WebView
          textZoom={100}
          source={definicaoHTML}
          startInLoadingState={true}
          renderLoading={() => (
            <ActivityIndicator size="large" color="#4090f4" />
          )}
        />
      </Container>
    );
  }
}
