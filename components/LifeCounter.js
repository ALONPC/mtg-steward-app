import React, { Component } from 'react'
import { Card, Image, Button } from 'react-native-elements'
import { View, Text, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const imageUrl = `https://picsum.photos/200/200/?image=421`

export default class LifeCounter extends Component {

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
        const AddLifeButton = (lifeToAdd) => lifeToAdd > 0 ?
            (<Button icon={<Icon name="arrow-up" size={15} color="white"></Icon>} title={`+${lifeToAdd}`} onPress={() => this.handleLifeTotal(lifeToAdd)} ></Button>)
            : (<Button icon={<Icon name="arrow-down" size={15} color="white"></Icon>} title={`${lifeToAdd}`} onPress={() => this.handleLifeTotal(lifeToAdd)} ></Button>)

        const { lifeTotal } = this.state

        // const { lifeTotal } = this.props
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}>

                <Card title={`${lifeTotal}`} titleStyle={{ fontSize: 40, color: lifeTotal > 0 ? "green" : "red" }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        padding: 10
                    }}>
                        {AddLifeButton(1)}
                        {AddLifeButton(5)}
                    </View>

                    <Image
                        source={{ uri: imageUrl }}
                        PlaceholderContent={<ActivityIndicator />}
                    />
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        padding: 10
                    }}>

                        {AddLifeButton(-1)}
                        {AddLifeButton(-5)}
                    </View>

                    {/* <Text>This is your current life total</Text> */}
                </Card>
            </View>

        )
    }
}
