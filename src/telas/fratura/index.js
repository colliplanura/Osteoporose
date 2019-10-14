import React, {Component} from 'react';
import {Container, Content, Text} from 'native-base';
import stylesComuns from '../../styles/stylesComuns';
import Cabecalho from '../../componentes/Cabecalho';

export default class Fratura extends Component {
  render() {
    return (
      <Container style={stylesComuns.container}>
        <Cabecalho titulo="Fratura" {...this.props} />

        <Content padder>
          <Text>Texto e imagens da Definição</Text>
        </Content>
      </Container>
    );
  }
}
