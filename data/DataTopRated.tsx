import { useState, useRef } from "react";
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Dimensions, StyleSheet, Image, Button, Alert, TouchableOpacity,FlatList } from "react-native";
import { useFetchMovies, Movie} from './SliderDataPopular';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import { useIsFocused } from '@react-navigation/native';
import { useFetchMoviesTopRated, MovieTopRated} from './SliderDataTopRated';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedStyle,
    withSpring,
    useSharedValue,
} from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";

type NavigationProp = StackNavigationProp<RootStackParamList, 'TopRated'>;

const PAGE_WIDTH = Dimensions.get('screen').width;


export type Props={
  itemList : Movie[],
  itemListTopRated: MovieTopRated[]
}


function Parallax({ itemList, itemListTopRated}: Props) {
  const navigation = useNavigation<NavigationProp>();
  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
  const [isVertical, setIsVertical] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);
  const [pagingEnabled, setPagingEnabled] = useState(true);
  const [snapEnabled, setSnapEnabled] = useState(true);
  const progressValue = useSharedValue(0);
  const isFocused = useIsFocused();
  const currentMovieRefTopRated = useRef<MovieTopRated | null>(null);
  const [refreshKey, setRefreshKey] = useState(0); // Sử dụng state để lưu key

  const refreshScreen = () => {
    setRefreshKey(prevKey => prevKey + 1); // Thay đổi key để reset vòng lặp
  };
  React.useEffect(() => {
    if (!isFocused) {
      setAutoPlay(false);
    } else {
      setAutoPlay(true);
    }
  }, [isFocused]);
  
  const [isPressed, setIsPressed] = useState(false);


  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/icon.png')} style={styles.icon} />
      <View style={styles.buttonHeader}>
        <TouchableOpacity onPress={()=> {
          refreshScreen()
          navigation.navigate('TopRated')}}>
          <Text style={styles.title}>TopRated</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.iconPersonContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
      <Image source={require('../assets/images/iconPerson.png')} style={styles.iconPerson} />
      </TouchableOpacity>
      </View>
      
      <Carousel
        width={PAGE_WIDTH}
        height={PAGE_WIDTH * 1}
        vertical={false}
        style={{ justifyContent: 'center', alignItems: 'center' }}
        loop
        key={refreshKey}
        pagingEnabled={pagingEnabled}
        snapEnabled={false} // Tắt snap để cuộn mượt hơn
        autoPlay={autoPlay}
        autoPlayInterval={3000} // Tăng thời gian giữa các lần tự động chuyển
        scrollAnimationDuration={1500} // Tăng thời gian chuyển ảnh
        onSnapToItem={(index) => {
          currentMovieRefTopRated.current = itemListTopRated[index];
        }}
        onProgressChange={(_, absoluteProgress) =>
          (progressValue.value = absoluteProgress)
        }
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.7, // Giảm scale
          parallaxScrollingOffset: 150,  // Giảm offset
        }}
        data={itemListTopRated}
        onScrollBegin={() => setAutoPlay(false)}
        onScrollEnd={() => setAutoPlay(true)}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              width: PAGE_WIDTH,
              height: PAGE_WIDTH * 1, // Thay đổi chiều cao của View để phù hợp với ảnh
            }}
          >
            <TouchableOpacity
              style={[isPressed && styles.buttonPressed]}
              activeOpacity={1}
              onPressIn={() => setIsPressed(true)}
              onPressOut={() => setIsPressed(false)}
              onPress={() => {
                setAutoPlay(false);
                navigation.navigate('Watch', { selectedMovie: item });
              }}
            >
              <Image
                source={{ uri: `${IMAGE_BASE_URL}${item.poster_path}` }}
                style={[styles.img, { alignSelf: 'center' }]}
                resizeMode="cover"
              />
              <LinearGradient
                colors={['transparent', 'rgba(0, 0, 0, 0.8)']}
                style={styles.gradient}
              />
            </TouchableOpacity>
          </View>
        )}
      />


      <View style={styles.watch}>
        <Button
          title="Watch"
          color="black"
          onPress={() => {
            const currentMovie = currentMovieRefTopRated.current;  // Lấy phim hiện tại từ ref
            if (currentMovie) {
              navigation.navigate('Watch', { selectedMovie: currentMovie });
            } else {
            }
          }} 
        />
      </View>
      <View style={styles.buttonFooter}>
        <TouchableOpacity onPress={()=> {
          refreshScreen()
          navigation.navigate('Popular')}}>
          <Text style={styles.title}>Popular</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.topratedContainer}>
        <FlatList
          horizontal
          key={refreshKey}
          data={itemList}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <TouchableOpacity style={[
                isPressed && styles.buttonPressed // Kiểm tra nếu đang giữ thì thay đổi style
              ]}
                activeOpacity={1} // Điều chỉnh opacity không thay đổi khi nhấn
                onPressIn={() => setIsPressed(true)}// Khi bắt đầu nhấn
                onPressOut={() => setIsPressed(false)} // Khi thả tay ra
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
    width: PAGE_WIDTH,
    flexDirection: 'row',
    justifyContent: 'flex-start', // Đặt tiêu đề Top Rated ở giữa
    marginVertical: 10, // Thêm khoảng cách giữa các tiêu đề
    marginLeft: 30,
  },
  img: {
    width: PAGE_WIDTH , // Giảm kích thước hình ảnh một chút để tạo khoảng cách
    height: 550, // Tăng chiều cao của ảnh để phù hợp với tỉ lệ màn hình
    borderRadius: 20,
  },
  watch: {
    width: 100,
    marginVertical: 10, // Thêm khoảng cách giữa nút Watch và slider
  },
  buttonFooter: {
    width: PAGE_WIDTH,
    flexDirection: 'row',
    justifyContent: 'flex-start', // Đặt tiêu đề Top Rated ở giữa
    marginLeft: 30,
  },
  topratedContainer: {
    width: PAGE_WIDTH,
    height: 200,
    marginVertical: 20, // Thêm khoảng cách giữa slider và danh sách Top Rated
  },
  itemContainer: {
    marginHorizontal: 10,
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