import { StyleSheet, Text, TouchableOpacity, View, Dimensions, Button } from 'react-native';
import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Movie } from '../data/SliderDataPopular';
import { WebView } from 'react-native-webview';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Watch'>;
type WatchRouteProp = RouteProp<{ params: { selectedMovie: Movie } }, 'params'>;

const PAGE_WIDTH = Dimensions.get('window').width;
const PAGE_HEIGHT = Dimensions.get('window').height;

const Watch = () => {
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<WatchRouteProp>();
    const selectedMovie = route.params.selectedMovie;

    return (
        <View style={styles.container}>
            <View style={styles.viewwebview}>
                <WebView
                    source={{ uri: selectedMovie.videoUrl }}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    startInLoadingState={true}
                    scalesPageToFit={true} // Cho phép tự động co dãn nội dung theo màn hình
                    allowFileAccess={true}
                    mixedContentMode="always"
                    allowsFullscreenVideo={true}
                    automaticallyAdjustContentInsets={false}
                    useWebkit={true}
                    scrollEnabled={true} // Cho phép cuộn trang
                    zoomControlEnabled={true} // Cho phép zoom trên Android
                    onShouldStartLoadWithRequest={() => true} // Bắt mọi request được phép chạy
                    style={styles.webview}
                />
            </View>
            <View style={styles.back}>
                <Button
                    title="Back"
                    color="black"
                    onPress={() => navigation.goBack()}
                />
            </View>
        </View>
    );
};

export default Watch;

const styles = StyleSheet.create({
    titleBack: {
        color: 'yellow',
        fontSize: 20,
    },
    container: {
        flex: 1,
        backgroundColor: '#1c1c1c',
    },
    webview: {
        width: PAGE_WIDTH,
        height: PAGE_HEIGHT,
    },
    viewwebview: {
        width: PAGE_WIDTH,
        height: 300,
    },
    back: {
        width: 100,
        marginVertical: 10,
    },
});
