import React, { Component } from 'react'
import { Card, Image, Button } from 'react-native-elements'
import { View, Text, ActivityIndicator } from 'react-native';

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
        const AddLifeButton = (lifeToAdd) => <Button title={lifeToAdd > 0 ? `+${lifeToAdd}` : `${lifeToAdd}`} onPress={() => this.handleLifeTotal(lifeToAdd)} ></Button>
        const { lifeTotal } = this.state

        // const { lifeTotal } = this.props
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}>

                <Card title={`${lifeTotal}`}>
                    <Image
                        source={{ uri: imageUrl }}
                        PlaceholderContent={<ActivityIndicator />}
                    />

                    {AddLifeButton(1)}
                    {AddLifeButton(5)}
                    {AddLifeButton(-1)}
                    {AddLifeButton(-5)}

                    {/* <Text>This is your current life total</Text> */}
                </Card>
            </View>

        )
    }
}
