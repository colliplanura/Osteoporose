import React, {Component} from 'react';
import {Container} from 'native-base';
import {ActivityIndicator} from 'react-native';
import stylesComuns from '../../styles/stylesComuns';
import Cabecalho from '../../componentes/Cabecalho';
import {WebView} from 'react-native-webview';

const referenciasHTML = require('../../../assets/html/referencias.html');

export default class Referencias extends Component {
  render() {
    return (
      <Container style={stylesComuns.container}>
        <Cabecalho titulo="Referëncias" {...this.props} />
        <WebView
          source={referenciasHTML}
          startInLoadingState={true}
          renderLoading={() => (
            <ActivityIndicator size="large" color="#4090f4" />
          )}
        />
      </Container>
    );
  }
}
