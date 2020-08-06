import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Col, Row, Grid } from "react-native-easy-grid";
import { AppLoading } from "expo";
import * as Font from "expo-font";

export default class LifeCounter extends Component {
  state = {
    startingLifeTotal: 20,
    lifeTotal: 20,
    playerName: undefined,
    playerStatus: undefined,
  };

  handlePlayerStatus = (currentLifeTotal) => {
    if (currentLifeTotal <= 0) {
      this.setState({
        playerStatus: "YOU DIED",
      });
    } else {
      this.setState({
        playerStatus: undefined,
      });
    }
  };

  handleLifeReset = () => {
    this.setState(
      {
        lifeTotal: this.state.startingLifeTotal,
      },
      () => this.handlePlayerStatus(this.state.lifeTotal)
    );
  };

  handleCoinFlip = () => {
    let result = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
    let coinResult = result == 1 ? true : false;
    this.setState({
      coinResult,
      coinResultString: coinResult ? "Cara" : "Sello",
    });
  };

  handleLifeTotal = (lifeToChange) => {
    this.setState(
      (prevState) => ({
        lifeTotal: prevState.lifeTotal + lifeToChange,
      }),
      () => this.handlePlayerStatus(this.state.lifeTotal)
    ); // Must be executed as callback because setState is asynchronous!!!
  };

  handleTextChange = (newPlayerName) => {
    this.setState({ playerName: newPlayerName }, () => {
      console.log(this.state.playerName);
    });
  };

  async componentDidMount() {
    await Font.loadAsync({
      "cinzel-bold": require("../assets/fonts/Cinzel-Bold.ttf"),
    });
    this.setState({ fontLoaded: true });
  }

  render() {
    const AddLifeButton = (lifeToChange) =>
      lifeToChange > 0 ? (
        <Icon
          raised
          name="menu-up"
          size={100}
          color="#e3e3e3"
          onPress={() => this.handleLifeTotal(lifeToChange)}></Icon>
      ) : (
        <Icon
          raised
          name="menu-down"
          size={100}
          color="#e3e3e3"
          onPress={() => this.handleLifeTotal(lifeToChange)}></Icon>
      );

    const {
      lifeTotal,
      playerName,
      playerStatus,
      coinResultString,
    } = this.state;

    if (!this.state.fontLoaded) {
      return <AppLoading />;
    }

    return (
      <View>
        <ImageBackground
          source={require("../assets/background.jpg")}
          resizeMode="cover"
          style={{ width: "100%", height: "100%" }}>
          <Grid>
            <Row size={10}>
              <Col style={styles.mtgGridElement}>
                <Text style={styles.mtgUpMenu}></Text>
              </Col>
              <Col style={styles.mtgGridElement}>
                <Text style={styles.mtgUpMenu}></Text>
              </Col>
              <Col style={styles.mtgGridElement}>
                <Text style={styles.mtgUpMenu}></Text>
              </Col>
            </Row>

            <Row size={70}>
              <Col>
                <Grid>
                  <Row>
                    <Col style={styles.mtgGridElement}>{AddLifeButton(1)}</Col>
                  </Row>
                  <Row>
                    <Col style={styles.mtgGridElement}>
                      <Text style={styles.mtgLifeToChange}>1</Text>
                    </Col>
                  </Row>
                  <Row>
                    <Col style={styles.mtgGridElement}>{AddLifeButton(-1)}</Col>
                  </Row>
                </Grid>
              </Col>

              <Col>
                <Grid>
                  <Row>
                    <Col style={styles.mtgGridElement}>
                      <View>
                        <TextInput
                          style={styles.mtgPlayerName}
                          placeholder="Your name, Planeswalker"
                          onChangeText={(text) => this.handleTextChange(text)}
                          value={playerName}
                          multiline
                          autoGrow
                          selectTextOnFocus
                          spellCheck={false}
                          underlineColorAndroid="transparent"
                          selectionColor="transparent"
                          blurOnSubmit={true}
                        />
                      </View>
                    </Col>
                  </Row>
                  <Row>
                    <Col style={styles.mtgGridElement}>
                      <Text
                        style={[
                          styles.mtgLifeCounter,
                          { color: lifeTotal > 0 ? "#017201" : "crimson" },
                        ]}>
                        {lifeTotal}
                      </Text>
                    </Col>
                  </Row>
                  <Row>
                    <Col style={styles.mtgGridElement}>
                      <Text style={styles.mtgPlayerStatus}>{playerStatus}</Text>
                    </Col>
                  </Row>
                </Grid>
              </Col>

              <Col>
                <Grid>
                  <Row>
                    <Col style={styles.mtgGridElement}>{AddLifeButton(5)}</Col>
                  </Row>
                  <Row>
                    <Col style={styles.mtgGridElement}>
                      <Col style={styles.mtgGridElement}>
                        <Text style={styles.mtgLifeToChange}>5</Text>
                      </Col>
                    </Col>
                  </Row>
                  <Row>
                    <Col style={styles.mtgGridElement}>{AddLifeButton(-5)}</Col>
                  </Row>
                </Grid>
              </Col>
            </Row>

            <Row size={20}>
              <Col style={styles.mtgGridElement}>
                <Text
                  style={styles.mtgDownMenu}
                  onPress={() => this.handleLifeReset()}>
                  20
                  <Icon name="undo" size={20} />
                </Text>
              </Col>
              <Col style={styles.mtgGridElement}>
                <Text style={styles.mtgDownMenu}>{coinResultString}</Text>
              </Col>
              <Col style={styles.mtgGridElement}>
                <Text
                  style={styles.mtgDownMenu}
                  onPress={() => this.handleCoinFlip()}>
                  <Icon name="thumb-up" type="font-awesome" size={30} />
                  <Icon name="coin" size={20} />
                </Text>
              </Col>
            </Row>
          </Grid>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mtgBackground: {},
  mtgGridElement: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  mtgLifeToChange: {
    fontSize: 80,
    color: "#e3e3e3",
    fontFamily: "cinzel-bold",
  },
  mtgLifeCounter: {
    fontSize: 130,
    fontFamily: "cinzel-bold",
  },
  mtgPlayerName: {
    textAlign: "center",
    fontSize: 20,
    fontFamily: "cinzel-bold",
    width: "100%",
    color: "#e3e3e3",
    height: 100,
    width: "100%",
  },
  mtgPlayerStatus: {
    textAlign: "center",
    fontSize: 20,
    fontFamily: "cinzel-bold",
    width: "100%",
    color: "crimson",
  },
  mtgUpMenu: {
    textAlign: "center",
    fontSize: 30,
    fontFamily: "cinzel-bold",
    width: "100%",
    color: "#e3e3e3",
  },
  mtgDownMenu: {
    textAlign: "center",
    fontSize: 30,
    fontFamily: "cinzel-bold",
    color: "#e3e3e3",
  },
});
