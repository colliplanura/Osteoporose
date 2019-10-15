/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Image} from 'react-native';
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
import styles from './style';

const drawerCover = require('../../../assets/imagens/Osteoporose-horizontal.png');
const datas = [
  {
    name: 'O que é osteoporose? ',
    route: 'Definicao',
    icon: 'question-circle',
    iconType: 'FontAwesome5',
  },
  {
    name: 'Quem está em risco? ',
    route: 'Risco',
    icon: 'emoji-sad',
    iconType: 'Entypo',
  },
  {
    name: 'Como é feito o diagnóstico? ',
    route: 'Diagnostico',
    icon: 'diagnoses',
    iconType: 'FontAwesome5',
  },
  {
    name: 'Osteoporose tem cura? ',
    route: 'Tratamento',
    icon: 'pills',
    iconType: 'FontAwesome5',
  },
  {
    name: 'O que fazer para prevenir? ',
    route: 'Prevencao',
    icon: 'user-shield',
    iconType: 'FontAwesome5',
  },
  {
    name: 'Cálcio na dieta ',
    route: 'Calcio',
    icon: 'calculator',
    iconType: 'Entypo',
  },
  {
    name: 'Risco de Fraturas FRAX®',
    route: 'Fratura',
    icon: 'bone',
    iconType: 'FontAwesome5',
  },
  {
    name: 'Referências',
    route: 'Referencias',
    icon: 'book',
    iconType: 'Entypo',
  },
  {
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

  render() {
    return (
      <Container style={styles.sideBar}>
        {/* <StatusBar barStyle="light-content" /> */}
        <Header style={{backgroundColor: '#4090f4'}}>
          <Body>
            <Title style={styles.titulo}>OSTEOPOROSE</Title>
          </Body>
        </Header>
        <Content bounces={true} style={styles.content}>
          <Image source={drawerCover} style={styles.drawerCover} />
          <List
            dataArray={datas}
            keyExtractor={data => data.route}
            renderRow={data => (
              <ListItem
                button
                onPress={() => this.props.navigation.navigate(data.route)}>
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
