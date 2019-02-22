import React, { Component } from 'react'
import { Card, Image, Button, Input, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import { View, Text, ActivityIndicator, StyleSheet, ImageBackground, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Col, Row, Grid } from "react-native-easy-grid";
import { Font, AppLoading } from "expo"

const imageUrl = `https://picsum.photos/200/200/?image=421`

export default class LifeCounter extends Component {

    state = {
        lifeTotal: 20,
        playerName: 'Player 1',
        // playerStatus: <Icon name="skull" size={100} color="white" />
        playerStatus: undefined,
    }

    handleLifeTotal = (lifeToChange) => {
        this.setState({
            lifeTotal: this.state.lifeTotal + lifeToChange
        })
    }

    handleTextChange = (newPlayerName) => {
        this.setState({ playerName: newPlayerName })
        console.log(this.state.playerName)
    }

    async componentDidMount() {
        await Font.loadAsync({
            'cinzel-bold': require("../assets/fonts/Cinzel-Bold.ttf")
        })
        this.setState({ fontLoaded: true })
    }

    render() {
        const AddLifeButton = (lifeToChange) => lifeToChange > 0 ?
            (<Icon raised name="menu-up" size={100} color='white' onPress={() => this.handleLifeTotal(lifeToChange)}></Icon>)
            : (<Icon raised name="menu-down" size={100} color='white' onPress={() => this.handleLifeTotal(lifeToChange)}></Icon>)

        const { lifeTotal, playerName, playerStatus } = this.state

        if (!this.state.fontLoaded) {
            return <AppLoading />
        }

        return (
            <View>
                <ImageBackground source={require("../assets/background.jpg")} resizeMode="cover" style={{ width: '100%', height: '100%' }}>
                    <Grid>
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
                                            placeholder="Name"
                                            onChangeText={(text) => this.handleTextChange(text)}
                                            value={playerName}
                                            // maxLength={10}
                                            multiline
                                            autoGrow
                                            spellCheck={false}
                                            underlineColorAndroid="transparent"
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col style={styles.mtgGridElement}><Text style={[styles.mtgLifeCounter, { color: lifeTotal > 0 ? "darkgreen" : "crimson" }]}>{lifeTotal}</Text></Col>
                                </Row>
                                <Row>
                                    <Col style={styles.mtgGridElement}><Text>{playerStatus}</Text></Col>
                                </Row>
                            </Grid>
                        </Col>

                        <Col>
                            <Grid>
                                <Row>
                                    <Col style={styles.mtgGridElement}>{AddLifeButton(5)}</Col>
                                </Row>
                                <Row>
                                    <Col style={styles.mtgGridElement}><Text style={styles.mtgLifeToChange}>5</Text></Col>
                                </Row>
                                <Row>
                                    <Col style={styles.mtgGridElement}>{AddLifeButton(-5)}</Col>
                                </Row>
                            </Grid>
                        </Col>

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
        alignItems: 'center', borderColor: 'gray', borderWidth: 1

    },
    // mtgGridElementPlayerName: {
    //     flex: 2,
    //     flexDirection: 'row',
    //     justifyContent: 'center',
    //     alignItems: 'center', borderColor: 'gray', borderWidth: 1

    // },
    mtgLifeToChange: {
        fontSize: 100,
        color: 'white',
        fontFamily: 'cinzel-bold',

    },
    // mtgPlusOneLife: {
    //     flex: 1,
    //     flexDirection: 'row',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    // },
    // mtgPlusFiveLife: {
    //     flex: 1,
    //     flexDirection: 'row',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    // },
    mtgLifeCounter: {
        fontSize: 150,
        fontFamily: 'cinzel-bold',

    },
    mtgPlayerName: {
        textAlign: 'center',
        fontSize: 30,
        fontFamily: 'cinzel-bold',
        width: '100%',
        // borderColor: 'gray', borderWidth: 1
    }
});
