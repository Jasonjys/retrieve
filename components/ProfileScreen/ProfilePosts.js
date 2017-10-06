import React, { Component } from 'react';
import { FlatList, View, Button, Text, Image, StyleSheet } from 'react-native';
import { firebaseApp } from '../../firebaseConfig';
import List from '../List/ListComponent'

let pic = {
    uri: 'https://i.pinimg.com/736x/88/f6/b8/88f6b8f02cb6a21a255cee5da2c62be1--beautiful-men-beautiful-people.jpg'
};

class ProfilePosts extends Component {
    static navigationOptions = {
        tabBarLabel: 'Profile',
        tabBarIcon: ({ tintColor }) => (
            <Image
                source={require('../../assets/images/account_circle.png')}
                style={{ tintColor: tintColor }}
            />
        )
    };

    render() {
        return (
            // <View style={styles.container}>
            //     <FlatList
            //         data={[
            //             { key: 'Item1' },
            //             { key: 'Item2' },
            //             { key: 'Item3' },
            //             { key: 'Item4' },
            //             { key: 'Item5' },
            //             { key: 'Item6' },
            //             { key: 'Item7' },
            //             { key: 'Item8' },
            //         ]}
            //         renderItem={({ item }) => (
            //             <View style={styles.border}>
            //                 <Text style={styles.item}>{item.key}</Text>
            //             </View>
            //         )}
            //     />
            // </View>
            <View style={styles.container}>
                <View style={styles.border}>
                    <List />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },

    item: {
        padding: 5,
        fontSize: 18,
        fontStyle: 'italic',
        height: 150,
        backgroundColor: '#CCC'
    },

    border: {
        // borderBottomWidth: 2,
        // borderBottomColor: '#fff',
    }
});

export default ProfilePosts;