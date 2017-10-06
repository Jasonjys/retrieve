import React, { Component } from 'react';
import { View, Button, Text, Image, StyleSheet } from 'react-native';
import { firebaseApp } from '../../firebaseConfig';

class ProfileHeader extends Component {
    static navigationOptions = {
        tabBarLabel: 'Profile',
        tabBarIcon: ({ tintColor }) => (
            <Image
                source={require('../../assets/images/account_circle.png')}
                style={{ tintColor: tintColor }}
            />
        )
    };

    _onPressButton() {
        alert('You tapped the button!')
    }

    render() {
        if (this.props.stuff) {
            const {displayName, email, photoURL, phoneNumber} = this.props.stuff;
            return (
                //413 x 189
                <Image style={styles.headerBackground} source={require('../../assets/images/header3.jpg')}>
    
                    {/* <View style={styles.button}>
                        <Button
                            onPress={this._onPressButton}
                            title="edit"
                        />
                    </View> */}
                {/* <View style={styles.background}> */}
                    <View style={styles.header}>
                        <Image style={styles.profilepic} source={{uri: photoURL}} />
                        <View style={styles.textbackground}>
                            <Text style={styles.name}>{displayName}</Text>
                            <Text style={styles.email}>{email}</Text>
                            <Text style={styles.tel}>{phoneNumber}</Text>
                        </View>
                    </View>
                {/* </View> */}
                </Image>
            );
        } else {
            return null
        }
    }
}

const styles = StyleSheet.create({

    // background: {
    //     backgroundColor: '#D14444',
    //     height: 189,
    //     alignItems: 'center',
    //     alignSelf: 'stretch'
    // },

    headerBackground: {
        alignItems: 'center',
        alignSelf: 'stretch'
    },

    profilepic: {
        flex: 1,
        alignItems: 'center',
        width: 140,
        alignSelf: 'stretch',
        borderRadius: 100,
        borderColor: 'rgba(0,0,0, 0.4)',
        borderWidth: 6
    },

    textbackground: {
        backgroundColor: 'rgba(0,0,0,0)',
        alignItems: 'center'
    },

    name: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold'
    },

    email: {
        fontSize: 14,
        //color: '#0394c0',
        color: '#fff',
        fontWeight: '300',
        fontStyle: 'italic'
    },

    tel: {
        fontSize: 14,
        //color: '#0394c0',
        color: '#fff',
        fontWeight: '300',
        fontStyle: 'italic'
    },

    // button: {
    //     marginLeft: 300,
    // }
});

export default ProfileHeader;