import React, { Component } from 'react'
import { Card, Image, Button } from 'react-native-elements'
import { View, Text, ActivityIndicator, StyleSheet, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Col, Row, Grid } from "react-native-easy-grid";

import { Font, AppLoading } from "expo"

const imageUrl = `https://picsum.photos/200/200/?image=421`

import FontAwesome


    // from '../../node_modules/@expo/vector-icons/fonts/FontAwesome.ttf';
    from "@expo/vector-icons/fonts/FontAwesome.ttf"


import MaterialIcons


    from '@expo/vector-icons/fonts/MaterialIcons.ttf';

export default class LifeCounter extends Component {

    state = {
        lifeTotal: 20,
        playerName: 'Player 1',
        // playerStatus: <Icon name="skull" size={100} color="white" />
        playerStatus: undefined,
        loading: true
    }

    handleLifeTotal = (lifeToChange) => {
        this.setState({
            lifeTotal: this.state.lifeTotal + lifeToChange
        })
    }

    async componentDidMount() {
        // await Font.loadAsync({
        //     'open-sans-bold': require('../assets/fonts/OpenSans-Bold.ttf'),
        // });
        await Font.loadAsync({
            FontAwesome,
            MaterialIcons

        });
        this.setState({ loading: false });

    }

    render() {
        const AddLifeButton = (lifeToChange) => lifeToChange > 0 ?
            (<Icon raised name="menu-up" size={100} color='white' onPress={() => this.handleLifeTotal(lifeToChange)}></Icon>)
            : (<Icon raised name="menu-down" size={100} color='white' onPress={() => this.handleLifeTotal(lifeToChange)}></Icon>)

        const { lifeTotal, playerName, playerStatus } = this.state

        if (this.state.loading) {


            return (
                <View>
                    <ImageBackground source={require("../assets/background.jpg")} resizeMode="cover" style={{ width: '100%', height: '100%' }}>
                        <Grid>
                            <Col>
                                <Grid>
                                    <Row>
                                        <Col style={styles.mtgLifeButton}>{AddLifeButton(1)}</Col>
                                    </Row>
                                    <Row>
                                        <Col style={styles.mtgPlusOneLife}><Text style={styles.mtgLifeToChange}>1</Text></Col>
                                    </Row>
                                    <Row>
                                        <Col style={styles.mtgLifeButton}>{AddLifeButton(-1)}</Col>
                                    </Row>
                                </Grid>
                            </Col>

                            <Col>
                                <Grid>
                                    <Row>
                                        <Col style={styles.mtgLifeButton}><Text style={styles.mtgPlayerName}>{playerName}</Text></Col>
                                    </Row>
                                    <Row>
                                        <Col style={styles.mtgLifeButton}><Text style={[styles.mtgLifeCounter, { color: lifeTotal > 0 ? "green" : "red" }]}>{lifeTotal}</Text></Col>
                                    </Row>
                                    <Row>
                                        <Col style={styles.mtgLifeButton}><Text>{playerStatus}</Text></Col>
                                    </Row>
                                </Grid>
                            </Col>

                            <Col>
                                <Grid>
                                    <Row>
                                        <Col style={styles.mtgLifeButton}>{AddLifeButton(5)}</Col>
                                    </Row>
                                    <Row>
                                        <Col style={styles.mtgPlusFiveLife}><Text style={styles.mtgLifeToChange}>5</Text></Col>
                                    </Row>
                                    <Row>
                                        <Col style={styles.mtgLifeButton}>{AddLifeButton(-5)}</Col>
                                    </Row>
                                </Grid>
                            </Col>

                        </Grid>
                    </ImageBackground>
                </View>
            )
        } else {
            return (<AppLoading></AppLoading>)
        }
    }
}

const styles = StyleSheet.create({
    mtgBackground: {

    },
    mtgLifeButton: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    mtgLifeToChange: {
        fontSize: 100,
        // color: 'white',
    },
    mtgPlusOneLife: {
        flex: 1.5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // color: 'white'
    },
    mtgPlusFiveLife: {
        flex: 1.5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // color: 'white'

    },
    mtgLifeCounter: {
        fontSize: 150
    },
    mtgPlayerName: {
        fontSize: 40,
        fontWeight: 'bold',
        // fontFamily: 'open-sans-bold',
    }
});
