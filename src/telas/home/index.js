import React, {Component} from 'react';
import {Image, StyleSheet} from 'react-native';
import {Container, Content, View} from 'native-base';

import stylesComuns from '../../styles/stylesComuns';
import Cabecalho from '../../componentes/Cabecalho';

const launchscreenLogo = require('../../../assets/imagens/Osteoporose-corpo.png');

export default class Home extends Component {
  componentDidMount() {
    this.props.navigation.openDrawer();
  }

  render() {
    return (
      <Container style={stylesComuns.container}>
        <Cabecalho titulo="Osteoporose" {...this.props} />
        <Content>
          <View>
            <Image source={launchscreenLogo} style={styles.imagem} />
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  imagem: {
    resizeMode: 'contain',
    width: '100%',
    opacity: 0.4,
  },
});
