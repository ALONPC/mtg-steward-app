import React, { Component } from 'react'
import { Card, Image, Button, Input, FormLabel, FormInput, FormValidationMessage, Slider } from 'react-native-elements'
import { View, Text, ActivityIndicator, StyleSheet, ImageBackground, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Col, Row, Grid } from "react-native-easy-grid";
import { Font, AppLoading } from "expo"

export default class LifeCounter extends Component {

    state = {
        startingLifeTotal: 20,
        lifeTotal: 20,
        playerName: 'Your name here',
        allowProfanity: false,
        playerStatus: undefined,
    }

    handlePlayerStatus = (currentLifeTotal) => {
        if (this.state.allowProfanity) {
            switch (currentLifeTotal) {
                case 13:
                    this.setState({
                        playerStatus: "13 MAS ME CRECE! 8====D"
                    })
                    break;
                case 11:
                    this.setState({
                        playerStatus: "11 CHUPALO ENTONCE!"
                    })
                    break;
                default:
                    this.setState({
                        playerStatus: "COMANDANTE MUERTO ABONO PA MI HUERTO"
                    })
                    break;
            }

        }
        console.log('TCL: LifeCounter -> handlePlayerStatus -> currentLifeTotal', currentLifeTotal)

    }

    handleLifeReset = () => {
        this.setState(({
            lifeTotal: this.state.startingLifeTotal
        }), () => this.handlePlayerStatus(this.state.lifeTotal))
    }

    handleCoinFlip = () => {
        let result = Math.floor(Math.random() * (2 - 1 + 1)) + 1
        let coinResult = (result == 1) ? true : false
        this.setState({
            coinResult,
            coinResultString: coinResult ? "Cara" : "Sello"
        })
        console.log(this.state.coinResultString);
    }

    handleLifeTotal = (lifeToChange) => {
        this.setState(prevState => ({
            lifeTotal: prevState.lifeTotal + lifeToChange
        }), () => this.handlePlayerStatus(this.state.lifeTotal)) // Must be executed as callback because setState is asynchronous!!!
    }

    handleTextChange = (newPlayerName) => {
        this.setState({ playerName: newPlayerName }, () => { console.log(this.state.playerName) })

    }

    handleSlider = (value) => {
        this.setState({ value })
        console.log(this.state.value);
    }

    async componentDidMount() {
        await Font.loadAsync({
            'cinzel-bold': require("../assets/fonts/Cinzel-Bold.ttf")
        })
        this.setState({ fontLoaded: true })
    }

    render() {
        const AddLifeButton = (lifeToChange) => lifeToChange > 0 ?
            (<Icon raised name="menu-up" size={100} color='#e3e3e3' onPress={() => this.handleLifeTotal(lifeToChange)}></Icon>)
            : (<Icon raised name="menu-down" size={100} color='#e3e3e3' onPress={() => this.handleLifeTotal(lifeToChange)}></Icon>)

        const { lifeTotal, playerName, playerStatus, coinResultString } = this.state

        if (!this.state.fontLoaded) {
            return <AppLoading />
        }

        return (
            <View>
                <ImageBackground source={require("../assets/background.jpg")} resizeMode="cover" style={{ width: '100%', height: '100%' }}>
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
                                        <Col style={styles.mtgGridElement}><Text style={styles.mtgLifeToChange}>1</Text></Col>
                                    </Row>
                                    <Row>
                                        <Col style={styles.mtgGridElement}>{AddLifeButton(-1)}</Col>
                                    </Row>
                                </Grid>
                            </Col>

                            <Col>
                                <Grid>
                                    <Row>
                                        {/* <Col style={styles.mtgGridElement}><Input underlineColorAndroid="transparent" inputStyle={{ textAlign: 'center' }} placeholder='Player One'><Text style={styles.mtgPlayerName}>{playerName}</Text></Input></Col> */}
                                        <Col style={styles.mtgGridElement}>
                                            <TextInput
                                                style={styles.mtgPlayerName}
                                                placeholder="Your name, Planeswalker"
                                                onChangeText={(text) => this.handleTextChange(text)}
                                                value={playerName}
                                                // maxLength={10}
                                                multiline
                                                autoGrow
                                                selectTextOnFocus
                                                spellCheck={false}
                                                underlineColorAndroid="transparent"
                                                selectionColor='transparent'
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col style={styles.mtgGridElement}>
                                            <Text style={[styles.mtgLifeCounter, { color: lifeTotal > 0 ? "#017201" : "crimson" }]}>{lifeTotal}</Text>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col style={styles.mtgGridElement}><Text style={styles.mtgPlayerStatus}>{playerStatus}</Text></Col>
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
                                            <Col style={styles.mtgGridElement}><Text style={styles.mtgLifeToChange}>5</Text></Col>
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
                                <Text style={styles.mtgDownMenu} onPress={() => this.handleLifeReset()}>20<Icon name="undo" size={20} /></Text>
                            </Col>
                            <Col style={styles.mtgGridElement}>
                                <Text style={styles.mtgDownMenu}>{coinResultString}</Text>
                            </Col>
                            <Col style={styles.mtgGridElement}>
                                <Text style={styles.mtgDownMenu} onPress={() => this.handleCoinFlip()}><Icon name="thumb-up" type="font-awesome" size={30} /><Icon name="coin" size={20} /></Text>
                            </Col>
                        </Row>
                    </Grid>
                </ImageBackground>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mtgBackground: {

    },
    mtgGridElement: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // borderColor: 'gray', borderWidth: 1

    },

    mtgLifeToChange: {
        fontSize: 80,
        color: '#e3e3e3',
        fontFamily: 'cinzel-bold',
    },

    mtgLifeCounter: {
        fontSize: 130,
        fontFamily: 'cinzel-bold',
    },
    mtgPlayerName: {
        textAlign: 'center',
        fontSize: 30,
        fontFamily: 'cinzel-bold',
        width: '100%',
        color: '#e3e3e3',

        // borderColor: 'gray', borderWidth: 1
    },
    mtgPlayerStatus: {
        textAlign: 'center',
        fontSize: 20,
        fontFamily: 'cinzel-bold',
        width: '100%',
        color: 'crimson',
    },
    mtgUpMenu: {
        textAlign: 'center',
        fontSize: 30,
        fontFamily: 'cinzel-bold',
        width: '100%',
        color: '#e3e3e3',
    },
    mtgDownMenu: {
        textAlign: 'center',
        fontSize: 30,
        fontFamily: 'cinzel-bold',
        color: '#e3e3e3',
    }
});
