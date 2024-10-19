import { useState, useRef } from "react";
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Dimensions, StyleSheet, Image, Button, Alert, TouchableOpacity, FlatList, Animated } from "react-native";
import { useFetchMovies, Movie } from './SliderDataPopular';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import { useFetchMoviesTopRated, MovieTopRated } from './SliderDataTopRated';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";

type NavigationProp = StackNavigationProp<RootStackParamList, 'TopRated'>;

const { width } = Dimensions.get('screen'); // Lấy chiều rộng màn hình
const ITEM_WIDTH = width * 0.7; // Mỗi item chiếm 70% màn hình
const ITEM_SPACING = (width - ITEM_WIDTH) / 2; // Khoảng cách giữa các item

export type Props = {
  itemList: Movie[],
  itemListTopRated: MovieTopRated[]
}

function Parallax({ itemList, itemListTopRated }: Props) {
  const navigation = useNavigation<NavigationProp>();
  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
  const scrollX = useRef(new Animated.Value(0)).current;
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <TouchableOpacity onPress={() => {
            navigation.navigate('Popular')
          }}>
            <Image source={require('../assets/images/icon.png')} style={styles.icon} />
          </TouchableOpacity>
          <View style={styles.buttonHeader}>
            <TouchableOpacity onPress={() => {
              navigation.navigate('TopRated')
            }}>
              <Text style={styles.title}>TopRated</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.iconPersonContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Image source={require('../assets/images/iconPerson.png')} style={styles.iconPerson} />
            </TouchableOpacity>
          </View>

          <Animated.FlatList
            data={itemListTopRated}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: ITEM_SPACING }}
            keyExtractor={(item) => item.id.toString()}
            snapToInterval={ITEM_WIDTH} // Để dừng chính xác tại từng item
            decelerationRate="fast" // Tăng tốc độ dừng khi cuộn
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: true }
            )}
            renderItem={({ item, index }) => {
              const inputRange = [
                (index - 0.5) * ITEM_WIDTH,
                index * ITEM_WIDTH,
                (index + 0.5) * ITEM_WIDTH,
              ];

              const scale = scrollX.interpolate({
                inputRange,
                outputRange: [0.9, 1, 0.9], // Giữa lớn hơn, hai bên nhỏ hơn
                extrapolate: 'clamp',
              });
              const scaleY = scrollX.interpolate({
                inputRange,
                outputRange: [0.8, 1, 0.8], // Chiều cao item ở giữa lớn hơn
                extrapolate: 'clamp',
              });

              return (
                <View style={{ width: ITEM_WIDTH }}>
                  <Animated.View
                    style={[
                      styles.itemContainer,
                      {
                        transform: [{ scale }, { scaleY }],
                      },
                    ]}
                  >
                    <View>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate('Watch', { selectedMovie: item });
                        }}
                      >
                        <Image
                          source={{ uri: `${IMAGE_BASE_URL}${item.poster_path}` }}
                          style={[styles.image, { alignSelf: 'center' }]}
                          resizeMode="cover"
                        />
                        <LinearGradient
                          colors={['transparent', 'rgba(0, 0, 0, 0.8)']}
                          style={styles.gradient}
                        />
                      </TouchableOpacity>
                    </View>
                  </Animated.View>
                </View>
              );
            }}
          />

          <View style={styles.buttonFooter}>
            <TouchableOpacity onPress={() => {
              navigation.navigate('Popular')
            }}>
              <Text style={styles.title}>Popular</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.topratedContainer}>
            <FlatList
              horizontal
              data={itemList}
              renderItem={({ item }) => (
                <View style={styles.itemContainer}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Watch', { selectedMovie: item })}
                  >
                    <Image source={{ uri: `${IMAGE_BASE_URL}${item.poster_path}` }} style={styles.toprated} resizeMode='cover' />
                  </TouchableOpacity>
                </View>
              )}
              keyExtractor={(item) => item.id.toString()}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>

  );
}

export default Parallax;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1c1c1c',
  },
  icon: {
    width: 170,
    height: 30,
    marginTop: 20,
  },
  iconPersonContainer: {
    height: 50,
    width: 50,
    backgroundColor: 'white',
    borderRadius: 50,
    position: 'absolute',
    top: 50,
    right: 20, // Đặt icon ở góc trên cùng bên phải
  },
  iconPerson: {
    height: 50,
    width: 50,
  },
  title: {
    color: 'white',
    fontSize: 20,
    marginVertical: 10, // Thêm khoảng cách giữa tiêu đề và các phần tử khác
  },
  buttonPressed: {
    backgroundColor: 'transparent',
  },
  buttonHeader: {
    width: width,
    flexDirection: 'row',
    justifyContent: 'flex-start', // Đặt tiêu đề Top Rated ở giữa
    marginVertical: 10, // Thêm khoảng cách giữa các tiêu đề
    marginLeft: 30,
  },
  image: {
    width: '100%',
    height: ITEM_WIDTH * 1.45,
    borderRadius: 20,
  },
  watch: {
    width: 100,
    marginVertical: 10, // Thêm khoảng cách giữa nút Watch và slider
  },
  buttonFooter: {
    width: width,
    flexDirection: 'row',
    justifyContent: 'flex-start', // Đặt tiêu đề Top Rated ở giữa
    marginLeft: 30,
  },
  topratedContainer: {
    width: width,
    height: 200,
    marginVertical: 20, // Thêm khoảng cách giữa slider và danh sách Top Rated
  },
  itemContainer: {
    marginHorizontal: 10,
    marginBottom: 40,
  },
  toprated: {
    width: 120,
    height: 200,
    borderRadius: 10,

  },
  gradient: {
    height: 450, // Điều chỉnh lại chiều cao gradient cho phù hợp với hình ảnh
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: 20,
  },
})