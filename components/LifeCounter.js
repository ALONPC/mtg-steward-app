import React, { Component } from 'react'
import { Card, Image, Button, Input } from 'react-native-elements'
import { View, Text, ActivityIndicator, StyleSheet, ImageBackground } from 'react-native';
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
                                    <Col style={styles.mtgLifeButton}><Input inputStyle={{ fontFamily: 'cinzel-bold', textAlign: 'center' }} placeholder='Player One' leftIcon={
                                        <Icon
                                            name='skull'
                                            size={24}
                                            color='black'
                                        />
                                    }><Text style={styles.mtgPlayerName}></Text></Input></Col>
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
        color: 'white',
        fontFamily: 'cinzel-bold',

    },
    mtgPlusOneLife: {
        flex: 1.5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    mtgPlusFiveLife: {
        flex: 1.5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    mtgLifeCounter: {
        fontSize: 150,
        fontFamily: 'cinzel-bold',

    },
    mtgPlayerName: {
        fontSize: 40,
        fontFamily: 'cinzel-bold',
    }
});
