import React from 'react';
import { Platform, View, Text } from 'react-native';
import { Button, ThemeProvider, colors, Avatar, Card } from 'react-native-elements'
import LifeCounter from "./components/LifeCounter"
import { setCustomText } from "react-native-global-props"

const theme = {
  Button: {
    raised: true,
    buttonStyle: {
      // marginBottom: 10,
      width: 60,
      height: 60
    }
  },
  Image: {
    style: {
      width: 200,
      height: 200,

    },
    // resizeMode: 'cover'
  },
  // Text: {
  //   style: {
  //     fontFamily: 'open-sans-bold'
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


  componentDidMount() {
    Expo.ScreenOrientation.allowAsync(Expo.ScreenOrientation.Orientation.LANDSCAPE_RIGHT);
  }

  componentWillUnmount() {
    Expo.ScreenOrientation.allowAsync(Expo.ScreenOrientation.Orientation.PORTRAIT);
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <LifeCounter></LifeCounter>
      </ThemeProvider>
    );
  }
}

