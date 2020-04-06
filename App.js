import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import InvertibleScrollView from 'react-native-invertible-scroll-view';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      inverted: false
    }
    this.toggleOrder = this.toggleOrder.bind(this);
  }

  componentDidMount() {
    const url = 'https://raw.githubusercontent.com/RyanHemrick/star_wars_movie_app/master/movies.json'

    fetch(url)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        dataSource: responseJson.movies
      })
    })
    .catch((error) => {
      console.log(error)
    })
  }

  renderItem = ({ item }) => {
    return(
      <View style={styles.listItem}>
        <Image 
          style={{width: 120, height: 120}} 
          source={{uri: `https://raw.githubusercontent.com/RyanHemrick/star_wars_movie_app/master/public/images/${item.poster}`}}
          PlaceholderContent={<ActivityIndicator />}
        />
        <View style={styles.textPart}>
          <Text style={styles.episodeTitle}>{item.title}</Text>
          <Text style={styles.episodeNumber}>Episode: {item.episode_number}</Text>
        </View>
      </View>
    )
  }

  toggleOrder(){
    const inverted= this.state.inverted;
    
    if (inverted){
      this.setState({inverted: false});
    }
    else{
      this.setState({inverted: true});
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: 'https://clipart.info/images/ccovers/1513370389Star%20Wars%20Logo%20transparent%20PNG.png' }}
          style={{ width: 200, height: 100, marginBottom: 5 }}
          PlaceholderContent={<ActivityIndicator />}
        />
        <InvertibleScrollView>
          <FlatList
            inverted={this.state.inverted}
            data={this.state.dataSource}
            renderItem={this.renderItem}
         />
        </InvertibleScrollView>
        <Text style={styles.sortText}>Sort Episodes</Text>
        <View style={styles.buttonStyleOutside}>
          <TouchableOpacity onPress={this.toggleOrder}> 
            <Text style={styles.buttonStyleInside}>
                Switch order
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 35,
    width: '100%',
    backgroundColor: '#2e3131',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10
  },

  listItem: {
    display: 'flex',
    flexDirection: 'row',
    minWidth: '100%',
    marginBottom: 6,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#fee94e'
  },

  textPart: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 10
  },

  episodeTitle: {
    color: '#fff',
    fontSize: 17
  },

  episodeNumber: {
    color: '#fff',
  },

  sortText: {
    color: '#fff',
    fontSize: 13,
    padding: 10,
  },

  buttonStyleOutside: {
    borderRadius: 5,
    backgroundColor: '#fee94e',
    fontWeight: 'bold',
    shadowColor: '#fee94e',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
    marginBottom: 15
  },

  buttonStyleInside: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
    fontSize: 18,
    fontWeight: 'bold'
  }
});
