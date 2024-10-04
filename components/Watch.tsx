import { StyleSheet, Text, View, Image,FlatList, Button, Dimensions ,TouchableOpacity} from 'react-native'
import React from 'react'
import { Movie } from '../data/SliderDataPopular'
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import { useNavigation } from '@react-navigation/native';
import { RouteProp, useRoute } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Watch'>;

type WatchRouteProp = RouteProp<{ params: { selectedMovie: Movie } }, 'params'>;

const {width} = Dimensions.get('screen')
const Watch = () => {
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<WatchRouteProp>();
    const selectedMovie = route.params.selectedMovie;
    const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

    return (
        <View style={styles.container}>
          
          <Image source={{ uri: `${IMAGE_BASE_URL}${selectedMovie.poster_path}` }} style={styles.img} resizeMode='cover'/>
          <LinearGradient
            colors={['transparent', 'rgba(23,23,23,0.8)', 'rgba(23,23,23,1)']} 
            style={styles.linear}
            start={{ x: 0.5, y: 0 }} 
            end={{ x: 0.5, y: 1 }}   
          />
          
          <Text style={styles.original_title}>{selectedMovie.original_title}</Text>
          <Text style={styles.title}>{selectedMovie.overview}</Text>
          <View>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.titleBack}>Back</Text>
            </TouchableOpacity>
          </View>
          
        </View>
      );
}

export default Watch;

const styles = StyleSheet.create({
    container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1c1c1c',
    },
    img:{
      width: width,
      height: 600,
      position: 'absolute',
      top: 0,
    },
    original_title:{
      color: 'white',
      fontSize: 20,
      textAlign: 'center',
      marginTop: 550,
      paddingLeft: 30,
      paddingRight: 30
    },
    title:{
      color: 'white',
      paddingLeft: 30,
      paddingRight: 30,
      marginVertical: 10,
    },
    titleBack:{
      color: 'yellow',
      fontSize: 20,
      paddingTop: 50,
    },
    linear: {
      width: width,
      height: 900,
      position: 'absolute',
      bottom: 0,
    }

})