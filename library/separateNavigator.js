import React, { Component } from 'react'

export default function(WrappedComponent) {
  const EnhencedComponent = class extends Component {
    render () {
      return (
        <WrappedComponent screenProps={{ outerNavigation: this.props.navigation}}/>
      )
    }
  }
  EnhencedComponent.navigationOptions = WrappedComponent.navigationOptions;
  return EnhencedComponent
}