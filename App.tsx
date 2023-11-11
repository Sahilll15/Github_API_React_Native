import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';

const App = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const options = {
      method: 'GET',
      url: 'https://cricbuzz-cricket.p.rapidapi.com/stats/v1/player/trending',
      headers: {
        'X-RapidAPI-Key': '03efd5a285mshe7331c9d611b7f7p143fd2jsn5b7e913e6da3',
        'X-RapidAPI-Host': 'cricbuzz-cricket.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log('data', data);
  }, [data]);

  const getColor = (index) => {
    const colors = ["red", "blue", "green", "purple", "orange"];
    return colors[index % colors.length];
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cricket Players</Text>
      <View>
        <FlatList
          style={{ display: 'flex', flexDirection: 'column' }}
          data={data.player}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            return (
              <View style={[styles.item]}>

                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.teamName}>{item.teamName}</Text>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
    marginTop: 40
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 10,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'blue',
  },
  teamName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'green',
  },
});

export default App;
