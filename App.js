import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';

export default class App extends React.Component {
  state = {
    movieName: "",
    movies: [],
  };

  handleNewMovie= (text) => {
    this.setState({ ...this.state, movieName: text });
  };

  searchMovie= () => {
    this.componentWillMount();
  }

  componentWillMount() {
    fetch('http://www.omdbapi.com/?s='+ this.state.movieName +'&apikey=9256d2ec&r=json')
      .then(resp => resp.json())
      .then(data => {
        this.setState({ ...this.state, movies: data.Search });
      });
  }

  render() {
    return (
      <View style={styles.container}>

        <Text>Enter the name of a movie to search:</Text>

        <TextInput style={styles.input}
          placeholder = "Movie name"
          onChangeText = {this.handleNewMovie}
          value = {this.state.movieName}
          />

        <Button
          onPress = {this.searchMovie}
          title = "Search"
        />
        <View style={styles.list}>
          <FlatList
            data={this.state.movies}
            renderItem={({ item }) => {
              return <View style={styles.row}>
              <Text>Title: {item.Title}</Text>
              <Text>Year: {item.Year}</Text>
              </View>;
            }} />
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    margin: 15,
    padding: 15,
    height: 50,
    fontSize: 20,
    width: '100%',
    borderColor: '#7a42f4',
    borderWidth: 1
  },
  list: {
    margin: 15,
    padding: 15,
    fontSize: 20,
    width: '100%',
    height: '65%',
    borderColor: '#7a42f4',
    borderWidth: 1
  },
  row: {
    fontSize: 20,
    padding: 5,
  }
});
