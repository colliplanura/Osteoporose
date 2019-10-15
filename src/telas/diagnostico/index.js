import React, {Component} from 'react';
import {Container} from 'native-base';
import {ActivityIndicator} from 'react-native';
import stylesComuns from '../../styles/stylesComuns';
import Cabecalho from '../../componentes/Cabecalho';
import {WebView} from 'react-native-webview';

const diagnosticoHTML = require('../../../assets/html/diagnostico.html');

export default class Diagnostico extends Component {
  render() {
    return (
      <Container style={stylesComuns.container}>
        <Cabecalho titulo="Diagnóstico" {...this.props} />
        <WebView
          source={diagnosticoHTML}
          startInLoadingState={true}
          renderLoading={() => (
            <ActivityIndicator size="large" color="#4090f4" />
          )}
        />
      </Container>
    );
  }
}
