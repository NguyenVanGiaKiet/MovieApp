import { StyleSheet, Text, View, Image, FlatList, Button, Dimensions, TouchableOpacity, StatusBar, useWindowDimensions } from 'react-native'
import React, { useRef } from 'react'
import { Movie } from '../data/SliderDataPopular'
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import { useNavigation } from '@react-navigation/native';
import { RouteProp, useRoute } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Information'>;
type WatchRouteProp = RouteProp<{ params: { selectedMovie: Movie } }, 'params'>;

const PAGE_WIDTH = Dimensions.get('screen').width;
const Information = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<WatchRouteProp>();
  const selectedMovie = route.params.selectedMovie;


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.itemcontainer}>
          <StatusBar hidden={true} />
          <View style={styles.poster}>
            <Image source={{ uri: selectedMovie.poster_path }} style={styles.img} resizeMode='cover' />
            <LinearGradient
              colors={['transparent', '#1c1c1c']}
              style={styles.linearBottom}
            />
            <LinearGradient
              colors={['transparent', '#1c1c1c']}
              start={{ x: 0.5, y: 1 }}
              end={{ x: 0.5, y: 0 }}
              style={styles.linearTop}
            />
          </View>
          <Text style={styles.name_movie}>{selectedMovie.name_movie}</Text>
          <View style={styles.content}>
            <View style={styles.leftItem}>
              <View style={styles.watch}>
                <Button
                  title="Watch"
                  color="black"
                  onPress={() => {
                    if (selectedMovie) {
                      navigation.navigate('Watch', { selectedMovie: selectedMovie });
                    } else {
                    }
                  }}
                />
              </View>
              <View style={styles.btnBack}>
                <Button
                    title="Back"
                    color="black"
                    onPress={() => navigation.goBack()}
                />
            </View>

            </View>

            <View style={styles.rightItem}>
              <Text style={styles.title}>Thời Lượng: {selectedMovie.time}</Text>
              <Text style={styles.title}>Đạo Diễn: {selectedMovie.director}</Text>
              <Text style={styles.title}>Diễn Viên: {selectedMovie.actor}</Text>
              <Text style={styles.title}>Danh sách: {selectedMovie.list}</Text>
              <Text style={styles.title}>Thể loại: {selectedMovie.category}</Text>
              <Text style={styles.title}>Năm phát hành: {selectedMovie.year}</Text>
              <Text style={styles.title}>Quốc gia: {selectedMovie.nation}</Text>
            </View>
          </View>

          
        </View>

      </ScrollView>
    </SafeAreaView>


  );
}

export default Information;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemcontainer: {
    width: PAGE_WIDTH,
    backgroundColor: '#1c1c1c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  poster: {
    width: PAGE_WIDTH,
    height: 600,
    position: 'absolute',
    top: 0,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30
  },
  img: {
    width: PAGE_WIDTH,
    height: 600,
  },
  name_movie: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 550
  },
  title: {
    color: 'white',
    fontSize: 15
  },
  iconBack:{
    height: 40,
    width: 40,
  },
  btnBack: {
    height: 40,
    width: 100,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 30,
    
  },
  watch: {
    width: 100,
    color: 'black',
    marginRight: 30,
  },
  linearBottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 200
  },
  linearTop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 200
  },
  leftItem: {
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  rightItem: {
    justifyContent: 'center',
    width: 200
  },
})