import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useFetchMoviesTopRated } from '../data/SliderDataTopRated';
import ParallaxTopRated from '../data/DataTopRated';
import { useFetchMovies } from '../data/SliderDataPopular';

export default function TopRated() {
  const { moviesTopRated} = useFetchMoviesTopRated();
  const { movies} = useFetchMovies();

  return (
    <View style={styles.container}>
      {/* <AppCarousel /> */}
      <ParallaxTopRated itemListTopRated={moviesTopRated} itemList={movies}/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1c1c1c',
    flex:1 
  },
});
