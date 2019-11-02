/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {KeyboardAvoidingView, StyleSheet, View, StatusBar} from 'react-native';
import {
  Container,
  Body,
  Text,
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
  Accordion,
  Card,
  CardItem,
  Content,
} from 'native-base';
import {Grid, Row, Col} from 'react-native-easy-grid';
import SwitchSelector from 'react-native-switch-selector';
import InputSpinner from 'react-native-input-spinner';

import stylesComuns from '../../styles/stylesComuns';

import {alimentos} from '../../../assets/dados/alimentos-abrasso-estruturado.json';

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
    this.state.alimentos.forEach(tipo => {
      tipo.tabAlimentos.forEach(alimento => {
        if (alimento.quantidade) {
          calcioDieta += alimento.quantidade * alimento.calcioMg;
        }
      });
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

    if (this.sexoSwitch) {
      this.sexoSwitch.toggleItem(1);
    }

    if (this.periodoSwitch) {
      this.periodoSwitch.toggleItem(0);
    }

    this.state.alimentos.forEach(tipo => {
      tipo.tabAlimentos.forEach(alimento => {
        alimento.quantidade = 0;
      });
    });

    this.componenteConteudo._root.scrollToPosition(0, 0);
  };

  renderHeaderAccordion(item, expanded) {
    return (
      <View style={styles.tituloSecao}>
        <Text style={styles.textoTituloSecao}>{item.tipo}</Text>
        {expanded ? (
          <Icon
            type="AntDesign"
            name="up"
            style={stylesComuns.iconeCabecalho}
          />
        ) : (
          <Icon
            type="AntDesign"
            name="down"
            style={stylesComuns.iconeCabecalho}
          />
        )}
      </View>
    );
  }

  renderLinha = item => {
    if (item.item.paciente) {
      return this.renderFormulario();
    } else {
      return this.renderAlimentos(item.item);
    }
  };

  renderFormulario = () => {
    return (
      <Grid style={{marginTop: 10}}>
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
              ref={ref => (this.sexoSwitch = ref)}
              onPress={this.alterarSexo}
              options={optionsSexo}
              initial={this.state.sexo === 'M' ? 0 : 1}
              textColor="#b1b1b1"
              buttonColor="#4b9bff"
              borderColor="#4b9bff"
              hasPadding={true}
              animationDuration={100}
              bold={true}
            />
          </Col>
        </Row>
        <Row style={styles.linhaFormulario}>
          <Col>
            <Text style={styles.textoLabelFormulario}>Periodicidade</Text>
            <SwitchSelector
              ref={ref => (this.periodoSwitch = ref)}
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
              bold={true}
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
    );
  };

  renderAlimentos = item => {
    return (
      <CardItem style={{marginLeft: 0, marginRight: 0}}>
        <Grid style={{marginLeft: -10, marginRight: 20}}>
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
      </CardItem>
    );
  };

  renderCabecalho() {
    return (
      <Header
        style={stylesComuns.header}
        androidStatusBarColor="#4090f4"
        iosBarStyle="light-content">
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
    );
  }

  renderRodape() {
    return (
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
                {this.state.calcioDieta < this.state.calcioRecomendado ? (
                  <Text style={styles.labelRodape}>Cálcio da Dieta Baixo:</Text>
                ) : (
                  <Text style={styles.labelRodape}>
                    Cálcio da Dieta Adequado:
                  </Text>
                )}
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
    );
  }

  render() {
    return (
      <Container style={stylesComuns.container}>
        <StatusBar setBarStyle={{style: 'light-content', animated: true}} />
        {this.renderCabecalho()}
        <Content ref={c => (this.componenteConteudo = c)}>
          {this.renderFormulario()}
          <Accordion
            style={{width: '100%', marginLeft: 0, marginRight: 0}}
            dataArray={this.state.alimentos}
            animation={true}
            renderHeader={this.renderHeaderAccordion}
            renderContent={item => (
              <Card
                style={{width: '100%', marginLeft: 0, marginRight: 0}}
                dataArray={item.tabAlimentos}
                renderRow={this.renderLinha}
              />
            )}
          />
        </Content>

        <KeyboardAvoidingView
          style={stylesComuns.container}
          behavior="height"
          enabled>
          {this.renderRodape()}
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
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#4090f4',
    marginTop: 1,
  },
  textoTituloSecao: {
    fontWeight: 'normal',
    fontSize: 18,
    color: '#ffffff',
  },
  textoAlimento: {
    fontSize: 18,
  },
  textoPorcao: {
    fontSize: 14,
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
    color: '#000000',
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
  },
  gridResultado: {
    marginLeft: 5,
    marginRight: 20,
  },
  rodape: {
    borderTopColor: '#ffffff',
    borderTopWidth: 3,
    backgroundColor: '#E9E9E9',
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 5,
  },
  labelRodape: {
    fontSize: 18,
    color: '#222222',
    fontWeight: 'normal',
  },
  textoResultado: {
    fontSize: 20,
    color: '#4090f4',
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
