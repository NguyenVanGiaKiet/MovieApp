import { useState, useRef } from "react";
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Dimensions, StyleSheet, Image, Button, Alert, TouchableOpacity, FlatList, ImageBackground, ActivityIndicator, StatusBar } from "react-native";
import { Movie } from './SliderDataPopular';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import { useIsFocused } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  withSpring,
  useSharedValue,
} from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";

type NavigationProp = StackNavigationProp<RootStackParamList, 'TopRated'>;

const PAGE_WIDTH = Dimensions.get('screen').width;


export type Props = {
  itemList: Movie[],
  itemListTopRated: Movie[]
}


function Parallax({ itemList, itemListTopRated }: Props) {
  const navigation = useNavigation<NavigationProp>();
  const [autoPlay, setAutoPlay] = useState(true);
  const [pagingEnabled, setPagingEnabled] = useState(true);
  const progressValue = useSharedValue(0);
  const isFocused = useIsFocused();
  const currentMovieRef = useRef<Movie | null>(null);
  const [refreshKey, setRefreshKey] = useState(0); // Sử dụng state để lưu key
  const [currentMovie, setCurrentMovie] = useState<Movie | null>(itemListTopRated[0]);
  const [loading, setLoading] = useState(true);

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
    <SafeAreaView>
      <ScrollView>
        <View >
          <StatusBar hidden={true} />
          <ImageBackground
            source={
              currentMovie?.poster_path
                ? { uri: currentMovie.poster_path }
                : { uri: 'https://phim.nguonc.com/public/images/Film/rNMTxDJGnyqXZ9n3b3HXdoKFRid.jpg' } // Ảnh mặc định nếu không có poster
            }
            style={styles.container}
            resizeMode="cover"
            onLoadStart={() => setLoading(true)} // Bắt đầu tải ảnh
            onLoadEnd={() => setLoading(false)}  // Ảnh tải xong
          >
            {loading && (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#ffffff" />
              </View>
            )}
            <LinearGradient
              colors={['transparent', '#1c1c1c']}
              style={styles.linearBot}

            />
            <LinearGradient
              colors={['transparent', '#1c1c1c']}
              start={{ x: 0.5, y: 1 }}
              end={{ x: 0.5, y: 0 }}
              style={styles.linearTop}
            />
            <TouchableOpacity onPress={() => {
              refreshScreen()
              navigation.navigate('Popular')
            }}>
              <Image source={require('../assets/images/icon.png')} style={styles.icon} />
            </TouchableOpacity>
            <View style={styles.buttonHeader}>
              <TouchableOpacity onPress={() => {
                refreshScreen()
                navigation.navigate('TopRated')
              }}>
                <Text style={styles.title}>Top Rated</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.iconPersonContainer}>
              <TouchableOpacity onPress={() => {
                setAutoPlay(false);
                navigation.navigate('Login')
              }}>
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
                currentMovieRef.current = itemListTopRated[index];
                setCurrentMovie(itemListTopRated[index])
              }
              }
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
                      navigation.navigate('Information', { selectedMovie: item });
                    }}
                  >
                    <Image
                      source={{ uri: item.poster_path }}
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
                  setAutoPlay(false);
                  const currentMovie = currentMovieRef.current;  // Lấy phim hiện tại từ ref
                  if (currentMovie) {
                    navigation.navigate('Watch', { selectedMovie: currentMovie });
                  } else {
                  }
                }}
              />
            </View>
          </ImageBackground>
          <View style={styles.containerFooter}>
          <View style={styles.buttonFooter}>
            <TouchableOpacity onPress={() => {
              refreshScreen()
              navigation.navigate('Popular')
            }}>
              <Text style={styles.title}>Popular</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.iconSearchContainer}>
              <TouchableOpacity onPress={() => {
                setAutoPlay(false);
                navigation.navigate('Search')
              }}>
                <Image source={require('../assets/images/iconSearch.png')} style={styles.iconSearch} />
              </TouchableOpacity>
            </View>
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
                    onPress={() => navigation.navigate('Information', { selectedMovie: item })}
                  >
                    <Image source={{ uri: item.poster_path }} style={styles.toprated} resizeMode='cover' />
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
  loadingContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  linearBot: {
    width: PAGE_WIDTH,
    height: 1300,
    position: 'absolute',
    bottom: 0,
  },
  linearTop: {
    width: PAGE_WIDTH,
    height: 300,
    position: 'absolute',
    top: 0,
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconPerson: {
    height: 70,
    width: 70,
  },
  
  title: {
    color: 'white',
    fontSize: 15,
    marginVertical: 10, // Thêm khoảng cách giữa tiêu đề và các phần tử khác
  },
  buttonPressed: {
    backgroundColor: 'transparent',
  },
  buttonHeader: {
    width: 100,
    marginVertical: 10, // Thêm khoảng cách giữa các tiêu đề
    marginRight: 310,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: PAGE_WIDTH, // Giảm kích thước hình ảnh một chút để tạo khoảng cách
    height: 550, // Tăng chiều cao của ảnh để phù hợp với tỉ lệ màn hình
    borderRadius: 20,
  },
  watch: {
    width: 100,
    marginVertical: 10, // Thêm khoảng cách giữa nút Watch và slider
  },
  containerFooter:{
    width: PAGE_WIDTH,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonFooter: {
    width: 100,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconSearchContainer:{
    height: 40,
    width: 70,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconSearch: {
    height: 30,
    width: 30,
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