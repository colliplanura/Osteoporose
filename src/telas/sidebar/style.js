const React = require('react-native');
const {Platform, Dimensions} = React;

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const drawerWidth = Math.min(deviceHeight, deviceWidth) * 0.8;

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
    marginBottom: 10,
    resizeMode: 'contain',
    backgroundColor: '#00A',
  },
  titulo: {
    fontSize: 26,
    color: '#FFF',
  },
  icone: {
    color: '#00A',
    fontSize: 36,
    width: 45,
  },
  text: {
    fontWeight: Platform.OS === 'ios' ? '500' : '400',
    fontSize: 18,
    marginLeft: 10,
  },
};
