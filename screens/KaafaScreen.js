import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, } from 'react-native';
import { firebaseApp } from '../configuration/firebase.js';


export default class KaafaScreen extends React.Component {
  static navigationOptions = {
    title: 'Kaafa',
  };
  constructor(props) {
      super(props)
      this.usersRef = firebaseApp.database().ref('/users/matan');
      this.state = {
        count: 0,
        lastScore: 0,
        totalScoreLive: ""
      }

  }

  onPress = () => {
    this.setState({
      count: this.state.count+1
    })
  }

  onPressReset = () => {
    this.usersRef.set({
      score: this.state.count+this.state.totalScoreLive
    })
    this.setState({
      lastScore: this.state.count,
      count: 0
    })
  }

  //listener to get data from firebase and update Total score live and radical score
  listenForScore = () => {
    this.usersRef.on('value', (snapshot) => {
      if (snapshot.val().score && snapshot.val().score !== this.state.totalScoreLive) {
        console.log(snapshot.val().score)
        this.setState({
          totalScoreLive: snapshot.val().score
        })
      }
    });
  }

  componentDidMount() {
    // start listening for firebase updates
    this.listenForScore();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Tap the image below for Torid</Text>
        <TouchableOpacity onPress = { this.onPress }>
          <Image source={require('../assets/images/waving-hand.png')}/>
        </TouchableOpacity >
        <View style={[styles.countContainer]}>
          <Text style={[styles.countText]}>
            Score of
            <Image style={styles.image} source={require('../assets/images/waving-hand.png')} />
             : { this.state.count !== 0 ? this.state.count: null}
          </Text>
        </View>
        <View style={[styles.countContainer]}>
          <TouchableOpacity onPress = { this.onPressReset}>
            <Text style={[styles.resetText, {fontWeight: 'bold'}]}>Save & Reset</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.countContainer]}>
          <Text style={[styles.resetText]}>
            Last score: { this.state.lastScore !== 0 ? this.state.lastScore: null}
          </Text>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  image: {
    width: 20,
    height: 20,
  },
  countContainer: {
    padding: 20
  },
  countText: {
    color: '#808000',
    fontWeight: 'bold',
    fontSize: 20,
  },
  resetText: {
    color: 'black',
    fontSize: 20,
    justifyContent: 'center',
  }
});
