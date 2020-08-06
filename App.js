import React from "react";
import { Platform } from "react-native";
import { ThemeProvider, colors } from "react-native-elements";
import LifeCounter from "./components/LifeCounter";
import * as ScreenOrientation from "expo-screen-orientation";

const theme = {
  Button: {
    raised: true,
    buttonStyle: {
      width: 60,
      height: 60,
    },
  },
  Image: {
    style: {
      width: 200,
      height: 200,
    },
  },
  TextInput: {},
  colors: {
    ...Platform.select({
      default: colors.platform.android,
      ios: colors.platform.ios,
    }),
  },
};

export default class App extends React.Component {
  componentDidMount() {
    ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
    );
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <LifeCounter></LifeCounter>
      </ThemeProvider>
    );
  }
}
