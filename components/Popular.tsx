import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Parallax from '../data/DataPopular';
import React from 'react';
import { useFetchMovies } from '../data/SliderDataPopular';
import { useFetchMoviesTopRated } from '../data/SliderDataTopRated';

export default function Popular() {
  const { movies } = useFetchMovies();
  const { moviesTopRated } = useFetchMoviesTopRated();
  return (
    <View style={styles.container}>
      {/* <AppCarousel /> */}
      <Parallax itemList={movies} itemListTopRated={moviesTopRated}/>
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

