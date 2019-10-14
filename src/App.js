import React from 'react';
import {Root} from 'native-base';
import {createAppContainer} from 'react-navigation';
import {Dimensions} from 'react-native';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';

import SideBar from './telas/sidebar/';
import Home from './telas/home/';
import Definicao from './telas/definicao/';
import Risco from './telas/risco/';
import Diagnostico from './telas/diagnostico/';
import Tratamento from './telas/tratamento/';
import Prevencao from './telas/prevencao/';
import Calcio from './telas/calcio/';
import Fratura from './telas/fratura/';
import Referencias from './telas/referencias/';
import Sobre from './telas/sobre/';

const Drawer = createDrawerNavigator(
  {
    Home: {screen: Home},
    Definicao: {screen: Definicao},
    Risco: {screen: Risco},
    Diagnostico: {screen: Diagnostico},
    Tratamento: {screen: Tratamento},
    Prevencao: {screen: Prevencao},
    Calcio: {screen: Calcio},
    Fratura: {screen: Fratura},
    Referencias: {screen: Referencias},
    Sobre: {screen: Sobre},
  },
  {
    initialRouteName: 'Home',
    contentOptions: {
      activeTintColor: '#e91e63',
    },
    contentComponent: props => <SideBar {...props} />,
    drawerWidth:
      Math.min(
        Dimensions.get('window').width,
        Dimensions.get('window').height,
      ) * 0.9,
  },
);

const AppNavigator = createStackNavigator(
  {
    Drawer: {screen: Drawer},
  },
  {
    initialRouteName: 'Drawer',
    headerMode: 'none',
  },
);

const AppContainer = createAppContainer(AppNavigator);

export default () => (
  <Root>
    <AppContainer />
  </Root>
);
