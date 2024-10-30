import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SearchScreen from '../data/DataSearch';
import React from 'react';
import { useFetchMoviesSearch } from '../data/SliderDataSearch';


export default function Search() {
  const { moviesSearch } = useFetchMoviesSearch();
  return (
    <View style={styles.container}>
      {/* <AppCarousel /> */}
      <SearchScreen itemListSearch={moviesSearch} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1c1c1c',
    flex: 1
  },
});

