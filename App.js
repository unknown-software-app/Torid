import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import AppNavigator from './navigation/AppNavigator.js';



const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            <AppContainer />
        </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
