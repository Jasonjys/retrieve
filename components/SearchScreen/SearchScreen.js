import React, {Component} from 'react';
import { NavigationActions } from 'react-navigation'
import {View, Text, TextInput, TouchableHighlight} from 'react-native';
import style from './SearchStyle'

class SearchScreen extends Component {
    constructor(props) {
        super(props);
        this.state = (({search_string, search_location, search_date}) => ({ search_string, search_location,search_date}))(props.navigation.state.params);       
        this.searchUpdatedCallback = props.navigation.state.params['searchUpdatedCallback'];
    }

    static navigationOptions = {
        header: null,
        tabBarVisible: false
    };

    _onSearchPress() {
        const { navigation } = this.props;
        this.searchUpdatedCallback(this.state, function(){
            const backAction = NavigationActions.back({});
            navigation.dispatch(backAction);
        });
    }

    render() {
        return (
            <View style = {style.searchContainer}>
                <Text>This is the search screen</Text>
                <TouchableHighlight onPress={this._onSearchPress.bind(this)}>
                <Text>Search</Text>
                </TouchableHighlight>
                <TextInput
                    placeholder={this.state.search_string}
                    onChangeText={(search_string) => this.setState({ search_string })}
                    value={this.state.search_string}
                    />
                <TextInput
                    placeholder={this.state.search_location}
                    onChangeText={(search_location) => this.setState({ search_location })}
                    value={this.state.search_location}
                />
                <TextInput
                    placeholder={this.state.search_date}
                    onChangeText={(search_date) => this.setState({ search_date })}
                    value={this.state.search_date}
                />
            </View>
        )
    }
};

export default SearchScreen;