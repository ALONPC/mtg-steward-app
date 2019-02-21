import React from 'react';
import { Platform, View, Text } from 'react-native';
import { Button, ThemeProvider, colors, Avatar, Card } from 'react-native-elements'
import LifeCounter from "./components/LifeCounter"

const theme = {
  Button: {
    raised: true,
    // buttonStyle: {
    //   marginBottom: 10,
    // }
  },
  Card: {
    titleStyle: {
      fontSize: 40,
    }
  },
  Image: {
    style: {
      width: 200,
      height: 200,
      marginBottom: 10,

    },
    // resizeMode: 'cover'
  },
  // View: {
  //   stlye: {
  //     justifyContent: "center"
  //   }
  // },
  colors: {
    ...Platform.select({
      default: colors.platform.android,
      ios: colors.platform.ios,
    }),
  },
};


export default class App extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        {/* <LifeCounter lifeTotal={this.currentLifeTotal(lifeTotal)} /> */}
        <LifeCounter></LifeCounter>
      </ThemeProvider>
    );
  }
}
