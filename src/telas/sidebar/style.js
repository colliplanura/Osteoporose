const React = require('react-native');
const {Platform, Dimensions} = React;

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const drawerWidth = Math.min(deviceHeight, deviceWidth) * 0.9;

export default {
  deviceHeight: deviceWidth,
  deviceWidth: deviceWidth,
  sideBar: {
    drawerWidth: drawerWidth,
  },
  content: {
    flex: 1,
    backgroundColor: '#E9E9E9',
    top: -1,
  },
  drawerCover: {
    alignSelf: 'stretch',
    height: deviceHeight * 0.2,
    width: null,
    position: 'relative',
    marginBottom: 0,
    resizeMode: 'contain',
    backgroundColor: '#4090f4',
  },
  titulo: {
    fontSize: 26,
    color: '#FFF',
  },
  icone: {
    color: '#4090f4',
    fontSize: 36,
    width: 45,
  },
  text: {
    fontWeight: Platform.OS === 'ios' ? '500' : '400',
    fontSize: 18,
    marginLeft: 10,
  },
};
