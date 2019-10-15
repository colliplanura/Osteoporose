import React, {Component} from 'react';
import {ActivityIndicator} from 'react-native';
import {Container} from 'native-base';
import stylesComuns from '../../styles/stylesComuns';
import Cabecalho from '../../componentes/Cabecalho';
import {WebView} from 'react-native-webview';

export default class Fratura extends Component {
  render() {
    return (
      <Container style={stylesComuns.container}>
        <Cabecalho titulo="FRAX®" {...this.props} />
        <WebView
          source={{
            // uri: 'https://www.sheffield.ac.uk/FRAX/tool.aspx?country=55',
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
