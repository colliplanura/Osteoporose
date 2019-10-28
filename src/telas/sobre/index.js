import React, {Component} from 'react';
import {StyleSheet, Linking} from 'react-native';
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
import {texto, autores} from './conteudo.json';

export default class Sobre extends Component {
  abrirCurriculo(textoLink) {
    Linking.openURL(textoLink);
  }

  renderAutores(item) {
    return (
      <ListItem style={stylesComuns.itemParagrafo}>
        <Grid>
          <Row>
            <Text style={styles.nomeAutor}>{item.item.nome}</Text>
          </Row>
          <Row>
            <Text style={styles.rotulo}>{item.item.titulo}</Text>
          </Row>
          <Row>
            <Text style={(styles.resumo, stylesComuns.paragrafo)}>
              {item.item.resumo}
            </Text>
          </Row>
          <Row style={styles.botaoCurriculo}>
            <Button
              transparent
              style={styles.link}
              onPress={() => Linking.openURL(item.item.curriculo)}>
              <Text>Ver currículo</Text>
            </Button>
          </Row>
        </Grid>
      </ListItem>
    );
  }

  render() {
    return (
      <Container style={stylesComuns.container}>
        <Cabecalho titulo="Sobre" {...this.props} />
        <Content>
          <List>
            <ListItem>
              <Grid>
                <Row style={stylesComuns.paragrafo}>
                  <Text style={stylesComuns.paragrafo}>{texto}</Text>
                </Row>
              </Grid>
            </ListItem>
          </List>
          <List dataArray={autores} renderItem={this.renderAutores} />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  rotulo: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'justify',
  },
  nomeAutor: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'justify',
  },
  resumo: {
    fontSize: 14,
  },
  link: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  botaoCurriculo: {
    justifyContent: 'flex-start',
  },
});
