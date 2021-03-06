import React, {Component} from 'react';
import {Image, StatusBar, Platform, Linking} from 'react-native';
import {
  Content,
  Text,
  List,
  ListItem,
  Container,
  Left,
  Header,
  Body,
  Title,
  Icon,
} from 'native-base';

import stylesComuns from '../../styles/stylesComuns';
import styles from './style';

const urlAbrasso = 'https://abrasso.org.br/calculadora/calculadora/';
const drawerCover = require('../../../assets/imagens/Osteoporose-horizontal.png');
const datas = [
  {
    key: '1',
    name: 'O que é osteoporose? ',
    route: 'Definicao',
    icon: 'question-circle',
    iconType: 'FontAwesome5',
  },
  {
    key: '2',
    name: 'Quem está em risco? ',
    route: 'Risco',
    icon: 'emoji-sad',
    iconType: 'Entypo',
  },
  {
    key: '3',
    name: 'O que fazer para prevenir? ',
    route: 'Prevencao',
    icon: 'user-shield',
    iconType: 'FontAwesome5',
  },
  {
    key: '4',
    name: 'Como é feito o diagnóstico? ',
    route: 'Diagnostico',
    icon: 'diagnoses',
    iconType: 'FontAwesome5',
  },
  {
    key: '5',
    name: 'Osteoporose tem cura? ',
    route: 'Tratamento',
    icon: 'pills',
    iconType: 'FontAwesome5',
  },
  {
    key: '6',
    name: 'Cálcio na dieta ',
    route: 'Calcio',
    icon: 'calculator',
    iconType: 'Entypo',
  },
  {
    key: '7',
    name: 'Risco de Fraturas FRAX®',
    route: 'Fratura',
    icon: 'bone',
    iconType: 'FontAwesome5',
  },
  {
    key: '8',
    name: 'Referências',
    route: 'Referencias',
    icon: 'book',
    iconType: 'Entypo',
  },
  {
    key: '9',
    name: 'Sobre nós ',
    route: 'Sobre',
    icon: 'info',
    iconType: 'Entypo',
  },
];

export default class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shadowOffsetWidth: 1,
      shadowRadius: 4,
    };
  }

  abreTela = rota => {
    if (rota === 'Fratura' && Platform.OS === 'ios') {
      Linking.openURL(urlAbrasso);
    } else {
      this.props.navigation.navigate(rota);
    }
  };

  render() {
    return (
      <Container style={styles.sideBar}>
        <StatusBar barStyle="light-content" animated={true} />
        <Header
          style={stylesComuns.header}
          androidStatusBarColor="#4090f4"
          iosBarStyle="light-content">
          <Body>
            <Title style={styles.titulo}>OSTEOPOROSE</Title>
          </Body>
        </Header>
        <Content bounces={true} style={styles.content}>
          <Image source={drawerCover} style={styles.drawerCover} />
          <List
            dataArray={datas}
            renderRow={data => (
              <ListItem button onPress={() => this.abreTela(data.route)}>
                <Left>
                  <Icon
                    active
                    type={data.iconType}
                    name={data.icon}
                    style={styles.icone}
                  />
                  <Text style={styles.text}>{data.name}</Text>
                </Left>
              </ListItem>
            )}
          />
        </Content>
      </Container>
    );
  }
}
