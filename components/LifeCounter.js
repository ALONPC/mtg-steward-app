import React, { Component } from 'react'
import { Card, Image } from 'react-native-elements'
import { View, Text, ActivityIndicator } from 'react-native';

export default class LifeCounter extends Component {
    render() {
        const { lifeTotal } = this.props

        return (
            <Card title={`${lifeTotal}`}>
                <View>
                    <Image
                        source={{ uri: "https://picsum.photos/100/100/?random" }}
                        style={{ width: 200, height: 200 }}
                        PlaceholderContent={<ActivityIndicator />}
                    />
                    {/* <Text>This is your current life total</Text> */}
                </View>
            </Card>
        )
    }
}
