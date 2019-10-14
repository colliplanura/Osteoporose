/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  StyleSheet,
  StatusBar,
} from 'react-native';
import {
  Container,
  Body,
  Text,
  ListItem,
  Footer,
  Item,
  Input,
  Label,
  Icon,
  Button,
  Header,
  Left,
  Right,
  Title,
} from 'native-base';
import {Grid, Row, Col} from 'react-native-easy-grid';
import SwitchSelector from 'react-native-switch-selector';
import InputSpinner from 'react-native-input-spinner';

import stylesComuns from '../../styles/stylesComuns';

import alimentos from '../../../dados/alimentos-abrasso';
import alimentosAccordion from '../../../dados/alimentos-abrasso-accordion';

const optionsSexo = [
  {
    label: 'Masculino',
    value: 'M',
    customIcon: <Icon type="FontAwesome" name="male" />,
  },
  {
    label: 'Feminino',
    value: 'F',
    customIcon: <Icon type="FontAwesome" name="female" />,
  },
];

const optionsPeriodo = [
  {
    label: 'Diário',
    value: 'D',
    customIcon: <Icon type="MaterialCommunityIcons" name="calendar-today" />,
  },
  {
    label: 'Semanal',
    value: 'S',
    customIcon: <Icon type="MaterialCommunityIcons" name="calendar-week" />,
  },
  {
    label: 'Mensal',
    value: 'M',
    customIcon: <Icon type="MaterialCommunityIcons" name="calendar-month" />,
  },
];

export default class Calcio extends Component {
  state = {
    alimentos: alimentos,
    calcioDieta: 0,
    calcioRecomendado: 0,
    idadeAnos: '0',
    idadeMeses: '0',
    sexo: 'F',
    periodo: 'D',
    stickyHeaderIndices: [],
  };

  componentDidMount() {
    for (let i = 0; i < this.state.alimentos.length; i++) {
      if (this.state.alimentos[i].header) {
        this.state.stickyHeaderIndices.push(i);
      }
    }
    this.state.stickyHeaderIndices.push(0);
  }

  alterarIdadeAnos = text => {
    this.setState({idadeAnos: text}, this.recalcularCalcioRecomendado);
  };

  alterarIdadeMeses = text => {
    let idadeMeses = isNaN(text) ? 0 : parseInt(text, 10);
    if (idadeMeses > 12) {
      idadeMeses = 12;
    }
    this.setState(
      {idadeMeses: idadeMeses.toString()},
      this.recalcularCalcioRecomendado,
    );
  };

  alterarSexo = value => {
    this.setState({sexo: value}, this.recalcularCalcioRecomendado);
  };

  alterarPeriodo = value => {
    this.setState({periodo: value}, this.recalcularCalcioRecomendado);
  };

  recalcularCalcioRecomendado = () => {
    let calcioRecomendado = 0;
    let idadeAnos = this.state.idadeAnos;
    idadeAnos = isNaN(idadeAnos) ? 0 : parseInt(idadeAnos, 10);
    let idadeMeses = this.state.idadeMeses;
    idadeMeses = isNaN(idadeMeses) ? 0 : parseInt(idadeMeses, 10);
    let sexo = this.state.sexo;
    let periodo = this.state.periodo;

    if (idadeAnos === 0) {
      if (idadeMeses <= 6) {
        calcioRecomendado = 200;
      } else {
        calcioRecomendado = 260;
      }
    } else {
      if (idadeAnos <= 3) {
        calcioRecomendado = 700;
      } else {
        if (idadeAnos <= 8) {
          calcioRecomendado = 1000;
        } else {
          if (idadeAnos <= 18) {
            calcioRecomendado = 1300;
          } else {
            if (idadeAnos <= 50) {
              calcioRecomendado = 1000;
            } else {
              if (idadeAnos <= 70) {
                if (sexo === 'F') {
                  calcioRecomendado = 1200;
                } else {
                  calcioRecomendado = 1000;
                }
              } else {
                calcioRecomendado = 1200;
              }
            }
          }
        }
      }
    }

    if (!calcioRecomendado) {
      calcioRecomendado = 1000;
    }

    switch (periodo) {
      case 'S':
        calcioRecomendado *= 7;
        break;

      case 'M':
        calcioRecomendado *= 30;
        break;

      default:
        break;
    }

    this.setState({calcioRecomendado: calcioRecomendado});
  };

  recalcularCalcioIngerido = () => {
    let calcioDieta = 0;
    this.state.alimentos.forEach(alimento => {
      if (alimento.quantidade) {
        calcioDieta += alimento.quantidade * alimento.calcioMg;
      }
    });
    this.setState({calcioDieta: calcioDieta});
  };

  limpar = () => {
    this.setState({
      calcioDieta: 0,
      calcioRecomendado: 0,
      idadeAnos: '0',
      idadeMeses: '0',
      sexo: 'F',
      periodo: 'D',
    });
    this.state.alimentos.forEach(alimento => {
      alimento.quantidade = 0;
    });
  };

  renderItem = ({item}) => {
    if (item.header) {
      return (
        <ListItem itemDivider>
          <Body style={styles.tituloSecao}>
            <Text style={styles.textoTituloSecao}>{item.alimento}</Text>
          </Body>
        </ListItem>
      );
    } else {
      if (item.paciente) {
        return (
          <ListItem>
            <Grid>
              <Row style={styles.linhaFormulario}>
                <Col size={3}>
                  <Item floatingLabel>
                    <Label>Idade anos</Label>
                    <Input
                      selectTextOnFocus={true}
                      placeholder="anos"
                      placeholderTextColor="#A0A0A0"
                      keyboardType="numeric"
                      maxLength={3}
                      value={this.state.idadeAnos}
                      style={{borderColor: '#4090f4'}}
                      onChangeText={this.alterarIdadeAnos}
                    />
                  </Item>
                </Col>
                {(this.state.idadeAnos === '' ||
                  parseInt(this.state.idadeAnos, 10) === 0) && (
                  <Col size={1}>
                    <Item floatingLabel>
                      <Label>meses</Label>
                      <Input
                        selectTextOnFocus={true}
                        placeholder="meses"
                        placeholderTextColor="#A0A0A0"
                        keyboardType="numeric"
                        maxLength={2}
                        value={this.state.idadeMeses}
                        style={{borderColor: '#4090f4'}}
                        onChangeText={this.alterarIdadeMeses}
                      />
                    </Item>
                  </Col>
                )}
              </Row>
              <Row style={styles.linhaFormulario}>
                <Col>
                  <Text style={styles.textoLabelFormulario}>Sexo</Text>
                  <SwitchSelector
                    onPress={this.alterarSexo}
                    options={optionsSexo}
                    initial={this.state.sexo === 'M' ? 0 : 1}
                    textColor="#b1b1b1"
                    buttonColor="#4b9bff"
                    borderColor="#4b9bff"
                    hasPadding={true}
                    animationDuration={100}
                  />
                </Col>
              </Row>
              <Row style={styles.linhaFormulario}>
                <Col>
                  <Text style={styles.textoLabelFormulario}>Periodicidade</Text>
                  <SwitchSelector
                    onPress={this.alterarPeriodo}
                    options={optionsPeriodo}
                    initial={
                      this.state.periodo === 'D'
                        ? 0
                        : this.state.periodo === 'S'
                        ? 1
                        : 2
                    }
                    textColor="#b1b1b1"
                    buttonColor="#4b9bff"
                    borderColor="#4b9bff"
                    hasPadding={true}
                    animationDuration={100}
                  />
                </Col>
              </Row>
              <Row style={styles.textoLabelFormulario}>
                <Col>
                  <Text style={styles.textoOrientacaoPeriodicidade}>
                    {this.state.periodo === 'D'
                      ? 'Informe, dos alimentos abaixo, os consumidos ontem'
                      : this.state.periodo === 'S'
                      ? 'Informe, dos alimentos abaixo, os consumidos na última semana'
                      : 'Informe, dos alimentos abaixo, os consumidos no último mes'}
                  </Text>
                </Col>
              </Row>
            </Grid>
          </ListItem>
        );
      } else {
        return (
          <ListItem style={styles.lista}>
            <Grid>
              <Col size={5}>
                <Row size={2}>
                  <Text style={styles.textoAlimento}>{item.alimento}</Text>
                </Row>
                <Row size={1}>
                  <Text style={styles.textoPorcao}>{item.porcao}</Text>
                </Row>
              </Col>
              <Col size={3}>
                <InputSpinner
                  min={0}
                  step={1}
                  colorMax={'#4b9bff'}
                  colorMin={'#4090f4'}
                  showBorder={true}
                  rounded={false}
                  inputStyle={styles.inputQuantidade}
                  value={item.quantidade}
                  onChange={quantidade => {
                    item.quantidade = quantidade;
                    this.recalcularCalcioIngerido();
                  }}
                />
              </Col>
            </Grid>
          </ListItem>
        );
      }
    }
  };

  render() {
    return (
      <Container style={stylesComuns.container}>
        <StatusBar barStyle="light-content" />
        <KeyboardAvoidingView
          style={styles.container}
          behavior="padding"
          enabled>
          <Header style={stylesComuns.header}>
            <Left>
              <Button
                transparent
                onPress={() => this.props.navigation.openDrawer()}>
                <Icon
                  type="Entypo"
                  name="menu"
                  style={stylesComuns.iconeCabecalho}
                />
              </Button>
            </Left>
            <Body>
              <Title style={stylesComuns.textoCabecalho}>Cálcio</Title>
            </Body>
            <Right>
              <Button transparent onPress={this.limpar}>
                <Icon
                  type="Entypo"
                  name="trash"
                  style={stylesComuns.iconeCabecalho}
                />
              </Button>
            </Right>
          </Header>

          <FlatList
            data={this.state.alimentos}
            renderItem={this.renderItem}
            keyExtractor={item => item.alimento}
            stickyHeaderIndices={this.state.stickyHeaderIndices}
          />

          <Footer style={styles.rodape}>
            <Body>
              <Grid style={styles.gridResultado}>
                <Row>
                  <Col size={3}>
                    <Text style={styles.labelRodape}>Cálcio Recomendado:</Text>
                  </Col>
                  <Col size={1}>
                    <Text style={styles.textoResultado}>
                      {this.state.calcioRecomendado}
                    </Text>
                  </Col>
                </Row>
                <Row>
                  <Col size={3}>
                    <Text style={styles.labelRodape}>Cálcio da Dieta:</Text>
                  </Col>
                  <Col size={1}>
                    {this.state.calcioDieta < this.state.calcioRecomendado ? (
                      <Text style={styles.textoResultadoNegativo}>
                        {this.state.calcioDieta}
                      </Text>
                    ) : (
                      <Text style={styles.textoResultado}>
                        {this.state.calcioDieta}
                      </Text>
                    )}
                  </Col>
                </Row>
              </Grid>
            </Body>
          </Footer>
        </KeyboardAvoidingView>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  lista: {
    marginRight: 10,
    marginLeft: 5,
  },
  inputQuantidade: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  tituloSecao: {
    alignItems: 'center',
  },
  textoTituloSecao: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 24,
  },
  textoAlimento: {
    fontSize: 18,
  },
  textoPorcao: {
    fontSize: 16,
    color: '#A0A0A0',
  },
  linhaFormulario: {
    margin: 10,
    justifyContent: 'center',
  },
  textoLabelFormulario: {
    color: '#A0A0A0',
  },
  textoOrientacaoPeriodicidade: {
    color: '#D0D0D0',
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
  },
  gridResultado: {
    marginLeft: 5,
    marginRight: 20,
  },
  rodape: {
    backgroundColor: '#4090f4',
  },
  labelRodape: {
    fontSize: 20,
    color: '#ffffff',
  },
  textoResultado: {
    fontSize: 20,
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'right',
  },
  textoResultadoNegativo: {
    fontSize: 20,
    color: '#FF595E',
    fontWeight: 'bold',
    textAlign: 'right',
  },
});
