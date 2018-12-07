import React from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import { firebaseApp } from '../configuration/firebase.js';

export default class ScoreScreen extends React.Component {
  static navigationOptions = {
    title: 'Score',
  };
  constructor(props) {
      super(props)
      this.usersRef = firebaseApp.database().ref('/users/matan');
      this.state = {
        lastScore: 0,
        totalScore: "",
        totalScoreLive: "",
        radicalScore: ""
      }
  }

  //Read total score once
  readTotalScoreOnce = () => {
    this.usersRef.once('value', (snapshot) => {
      if (snapshot.val()) {
        this.setState({
          totalScore: snapshot.val().score
        })
      }
    });
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
      if (snapshot.val().radicalScore) {
        console.log(snapshot.val().radicalScore)
        this.setState({
          radicalScore: snapshot.val().radicalScore
        })
      }
    });
  }

  componentDidMount() {
    // call to function to read total score once in mount
    this.readTotalScoreOnce();
    // start listening for firebase updates
    this.listenForScore();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.countContainer]}>
          <Text style={[styles.resetText, {textDecorationLine: 'underline'}]}>Score info:</Text>
          <Text style={[styles.resetText]}>
            Last score: { this.state.lastScore !== 0 ? this.state.lastScore: null} {"\n"}
            Total score (once): { this.state.totalScore } {"\n"}
            Total score (on): { this.state.totalScoreLive } {"\n"}
            Radical score: { this.state.radicalScore }
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
countContainer: {
  padding: 20
},
resetText: {
  color: 'black',
  fontSize: 20,
  justifyContent: 'center',
}
});
