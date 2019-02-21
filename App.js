import React from 'react';
import { Platform, View, Text } from 'react-native';
import { Button, ThemeProvider, colors, Avatar, Card } from 'react-native-elements'
import LifeCounter from "./components/LifeCounter"

const theme = {
  Button: {
    raised: true
  },
  colors: {
    ...Platform.select({
      default: colors.platform.android,
      ios: colors.platform.ios,
    }),
  },
};

const AddLifeButton = lifeToAdd => <Button title={`+${lifeToAdd}`} lifeToAdd></Button>

export default class App extends React.Component {

  state = {
    lifeTotal: 20
  }

  currentLifeTotal(life) {
    return life;
  }

  handleLifeTotal = (lifeAdded) => {
    this.setState({
      lifeTotal: this.state.lifeTotal + lifeAdded
    })
  }

  render() {
    const { lifeTotal } = this.state
    return (
      <ThemeProvider theme={theme}>
        <LifeCounter lifeTotal={this.currentLifeTotal(lifeTotal)} />
        {/* <Button title="+1" onPress={() => this.handleLifeTotal(1)}></Button>
        <Button title="+5" onPress={() => this.handleLifeTotal(5)}></Button> */}
        <AddLifeButton></AddLifeButton>
      </ThemeProvider>
    );
  }
}
