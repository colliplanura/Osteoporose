import React, {Component} from 'react';
import {Image} from 'react-native';
import {Container, Content, List, ListItem, Text, Grid, Row} from 'native-base';
import stylesComuns from '../../styles/stylesComuns';
import Cabecalho from '../../componentes/Cabecalho';
import {paragrafos} from './conteudo.json';
import imagens from '../../imagens';

export default class Tratamento extends Component {
  renderParagrafo(item) {
    return (
      <ListItem noBorder>
        <Grid>
          <Row>
            <Text style={stylesComuns.paragrafo}>{item.item.texto}</Text>
          </Row>
          {item.item.imagem && (
            <Row>
              <Image
                source={imagens[item.item.imagem]}
                style={stylesComuns.imagemTexto}
              />
            </Row>
          )}
          {item.item.legenda && (
            <Row style={stylesComuns.linhaLegenda}>
              <Text style={stylesComuns.legenda}>{item.item.legenda}</Text>
            </Row>
          )}
        </Grid>
      </ListItem>
    );
  }

  render() {
    return (
      <Container style={stylesComuns.container}>
        <Cabecalho titulo="Tratamento" {...this.props} />
        <Content>
          <List dataArray={paragrafos} renderItem={this.renderParagrafo} />
        </Content>
      </Container>
    );
  }
}
