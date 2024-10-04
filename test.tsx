import React from 'react';
import {View, FlatList, Dimensions, StyleSheet, Image} from 'react-native';
import Animated, {useSharedValue, useAnimatedStyle, interpolate} from 'react-native-reanimated';

const {width} = Dimensions.get('screen'); // Get screen width for calculations

const images = [
  {uri: 'https://placeimg.com/640/480/nature'},
  {uri: 'https://placeimg.com/640/480/tech'},
  {uri: 'https://placeimg.com/640/480/animals'},
  {uri: 'https://placeimg.com/640/480/arch'},
];

const Carousel = () => {
  const scrollX = useSharedValue(0); // Shared value for horizontal scroll position

  const onScroll = (e: any) => {
    scrollX.value = e.nativeEvent.contentOffset.x; // Set scrollX to current scroll position
  };

  const renderItem = ({item, index}: {item: {uri: string}; index: number}) => {
    const animatedStyle = useAnimatedStyle(() => {
      // Interpolation for the current position and smooth transition
      const scale = interpolate(
        scrollX.value,
        [(index - 1) * width, index * width, (index + 1) * width],
        [0.8, 1, 0.8],
        'clamp'
      );
      const opacity = interpolate(
        scrollX.value,
        [(index - 1) * width, index * width, (index + 1) * width],
        [0.6, 1, 0.6],
        'clamp'
      );
      return {
        transform: [{scale}],
        opacity,
      };
    });

    return (
      <Animated.View style={[styles.imageContainer, animatedStyle]}>
        <Image source={{uri: item.uri}} style={styles.image} />
      </Animated.View>
    );
  };

  return (
    <View style={styles.carouselContainer}>
      <FlatList
        data={images}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={onScroll}
        scrollEventThrottle={16} // Control how often the scroll event fires
      />
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({
  carouselContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: width * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: width * 0.1, // Adds margin for smooth scaling effect
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 20,
  },
});
