import {Text, View, StyleSheet,FlatList} from 'react-native';
import React from 'react';
import { useFetchMovies, Movie} from '../data/SliderDataPopular';
import SliderItem from '../components/SliderItem';
import Animated,{useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';

export type Props={
  itemList : Movie[]
}
const Slider = ({itemList} : Props) => {
  const scrollX = useSharedValue(0);
    const onScrollHandler = useAnimatedScrollHandler({
        onScroll: (e) => {
            scrollX.value = e.contentOffset.x;
        }
    })

  return (
    <View>
      <Animated.FlatList
        data={itemList}
        renderItem={({ item, index}) => 
          <SliderItem item={item} index={index} scrollX={scrollX}/>
        }
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={onScrollHandler}

      />
    </View>
  );
};

export default Slider;
