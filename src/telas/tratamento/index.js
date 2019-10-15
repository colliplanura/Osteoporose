import React, {Component} from 'react';
import {Container} from 'native-base';
import {ActivityIndicator} from 'react-native';
import stylesComuns from '../../styles/stylesComuns';
import Cabecalho from '../../componentes/Cabecalho';
import {WebView} from 'react-native-webview';

const tratamentoHTML = require('../../../assets/html/tratamento.html');

export default class Tratamento extends Component {
  render() {
    return (
      <Container style={stylesComuns.container}>
        <Cabecalho titulo="Tratamento" {...this.props} />
        <WebView
          source={tratamentoHTML}
          startInLoadingState={true}
          renderLoading={() => (
            <ActivityIndicator size="large" color="#4090f4" />
          )}
        />
      </Container>
    );
  }
}
