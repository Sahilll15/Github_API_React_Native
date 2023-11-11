import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  Linking,
  StyleSheet,
} from 'react-native';

export default function GitHubUserSearch() {
  const accessToken = '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';

  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  const [searchTerm, setSearchTerm] = useState('Sahilll15');
  const [userData, setUserData] = useState(null);
  const [repositories, setRepositories] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [starredRepos, setStarredRepos] = useState([]);

  const handleSearch = async () => {
    try {
      const userResponse = await fetch(`https://api.github.com/users/${searchTerm}`);
      if (userResponse.ok) {
        const user = await userResponse.json();

        const repositoriesResponse = await fetch(user.repos_url);
        const repositories = await repositoriesResponse.json();

        const followersResponse = await fetch(user.followers_url);
        const followers = await followersResponse.json();

        const starredReposResponse = await fetch(`https://api.github.com/users/${searchTerm}/starred`);
        const starredRepos = await starredReposResponse.json();

        setUserData(user);
        setRepositories(repositories);
        setFollowers(followers);
        setStarredRepos(starredRepos);
      } else {
        console.log('User not found');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleRepoClick = (repoUrl) => {
    Linking.openURL(repoUrl);
  };

  useEffect(() => {
    // Set up any initial configurations or styles here
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          value={searchTerm}
          onChangeText={setSearchTerm}
          placeholder="Enter a GitHub username"
        />
        <TouchableOpacity style={styles.button} onPress={handleSearch}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>

      {userData ? (
        <View style={styles.userContainer}>
          <Text style={styles.username}>{userData.login}</Text>
          <Image source={{ uri: userData.avatar_url }} style={styles.avatar} />
          <Text style={styles.userInfo}>Name: {userData.name}</Text>
          <Text style={styles.userInfo}>Location: {userData.location}</Text>
          <Text style={styles.userInfo}>Followers: {followers.length}</Text>
          <Text style={styles.userInfo}>Total Repositories: {userData.public_repos}</Text>
          <Text style={styles.userInfo}>Starred Repositories: {starredRepos.length}</Text>
        </View>
      ) : (
        <View style={styles.developerUrlMessage}>
          <Text style={styles.messageText}>This is a developer's URL. You can search for other GitHub users.</Text>
        </View>
      )}

      {repositories.length > 0 && (
        <View style={styles.repoContainer}>
          <Text style={styles.sectionTitle}>Repositories</Text>
          <FlatList

            data={repositories}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleRepoClick(item.html_url)}>
                <Text style={styles.repoName}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}

      {followers.length > 0 && (
        <View style={styles.followersContainer}>
          <Text style={styles.sectionTitle}>Followers</Text>
          <FlatList
            data={followers}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Text style={styles.followerName}>{item.login}</Text>
            )}
          />
        </View>
      )}

      {starredRepos.length > 0 && (
        <View style={styles.starredReposContainer}>
          <Text style={styles.sectionTitle}>Starred Repositories</Text>
          <FlatList
            data={starredRepos}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleRepoClick(item.html_url)}>
                <Text style={styles.repoName}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
  },
  userContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  userInfo: {
    fontSize: 16,
    marginBottom: 5,
  },
  developerUrlMessage: {
    alignItems: 'center',
    marginBottom: 10,
  },
  messageText: {
    fontSize: 16,
  },
  repoContainer: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  repoName: {
    fontSize: 16,
    color: 'blue',
  },
  followersContainer: {
    marginBottom: 10,
  },
  followerName: {
    fontSize: 16,
  },
  starredReposContainer: {
    marginBottom: 10,
  },
});
