import React, {Component} from 'react';
import {Image} from 'react-native';
import {Container, Content} from 'native-base';

import stylesComuns from '../../styles/stylesComuns';
import Cabecalho from '../../componentes/Cabecalho';

const launchscreenLogo = require('../../../assets/imagens/Osteoporose-corpo.png');

export default class Home extends Component {
  render() {
    return (
      <Container style={stylesComuns.container}>
        <Cabecalho titulo="Osteoporose" {...this.props} />
        <Content>
          <Image source={launchscreenLogo} resizeMode="cover" />
        </Content>
      </Container>
    );
  }
}
