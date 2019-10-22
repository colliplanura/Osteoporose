/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Image, StyleSheet, Linking} from 'react-native';
import {
  Container,
  Content,
  List,
  ListItem,
  Text,
  Grid,
  Row,
  Button,
} from 'native-base';
import stylesComuns from '../../styles/stylesComuns';
import Cabecalho from '../../componentes/Cabecalho';
import {paragrafos} from './conteudo.json';
import imagens from '../../imagens';

export default class Sobre extends Component {
  renderAutores(item) {
    return (
      <ListItem>
        <Grid>
          <Row>
            <Text style={styles.rotulo}>{item.item.titulo}: </Text>
            <Text style={styles.nomeAutor}>{item.item.nome}</Text>
          </Row>
          <Row>
            <Text style={styles.resumo}>{item.item.resumo}</Text>
          </Row>
          <Row style={{justifyContent: 'center'}}>
            <Button
              style={styles.link}
              onPress={Linking.openURL(item.item.curriculo)}>
              Ver currículo
            </Button>
          </Row>
        </Grid>
      </ListItem>
    );
  }

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
          {item.item.autores && (
            <List
              dataArray={item.item.autores}
              renderItem={this.renderAutores}
            />
          )}
        </Grid>
      </ListItem>
    );
  }

  render() {
    return (
      <Container style={stylesComuns.container}>
        <Cabecalho titulo="Sobre" {...this.props} />
        <Content>
          <List dataArray={paragrafos} renderItem={this.renderParagrafo} />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  rotulo: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  nomeAutor: {
    fontSize: 16,
  },
  resumo: {
    fontSize: 14,
  },
  link: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
