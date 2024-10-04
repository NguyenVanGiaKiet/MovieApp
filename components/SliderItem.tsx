import {StyleSheet, View, Image, Dimensions, Button, Alert } from 'react-native';
import React from 'react';
import { Movie } from '../data/SliderDataPopular';
import Animated,{ Extrapolation, interpolate, SharedValue, useAnimatedStyle } from 'react-native-reanimated';

type Props = {
  item: Movie;
  index: number;
  scrollX: SharedValue<number>;
};

const {width} = Dimensions.get("screen");

const SliderItem = ({ item, index, scrollX}: Props) => {
  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
  const rnAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [-width * 0.25, 0, width * 0.25],
            Extrapolation.CLAMP
          ),
        },
        {
          scale: interpolate(
            scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [0.8,1,0.8],
            Extrapolation.CLAMP
          )
        }
      ],
    };
  });

  return (
    <Animated.View style={[styles.itemContainer, rnAnimatedStyle]}>
      <Image source={{ uri: `${IMAGE_BASE_URL}${item.poster_path}` }} style={styles.image} />
      <Button
        title="Xem Phim"
        onPress={() => Alert.alert('Button Pressed!')} 
        color="#841584" 
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    width: width,
  },
  image:{
    width: 300, 
    height: 500, 
    borderRadius: 20,
    
  }
});

export default SliderItem;