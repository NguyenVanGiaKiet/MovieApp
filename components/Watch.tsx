import { 
    StyleSheet, 
    Text, 
    TouchableOpacity, 
    View, 
    Dimensions, 
    FlatList, 
    ActivityIndicator, 
    Button
} from 'react-native';
import React, { useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import { RootStackParamList } from '../App';
import { Movie } from '../data/SliderDataPopular';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Watch'>;
type WatchRouteProp = RouteProp<{ params: { selectedMovie: Movie } }, 'params'>;

const { width: PAGE_WIDTH, height: PAGE_HEIGHT } = Dimensions.get('window');

const Watch = () => {
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<WatchRouteProp>();
    const selectedMovie = route.params.selectedMovie;

    const [currentUrl, setCurrentUrl] = useState<string>(selectedMovie.videoUrl[0].url);

    const handleSelectEpisode = (url: string) => {
        setCurrentUrl(url);
    };

    return (
        <View style={styles.container}>
            <View style={styles.viewWebView}>
                <WebView
                    source={{ uri: currentUrl }}
                    javaScriptEnabled
                    domStorageEnabled
                    startInLoadingState
                    allowsFullscreenVideo
                    style={styles.webview}
                />
            </View>
            <FlatList
                data={selectedMovie.videoUrl}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                style={styles.episodeList}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.episodeItem}
                        onPress={() => handleSelectEpisode(item.url)}
                    >
                        <Text style={[
                            styles.episodeText,
                            currentUrl === item.url && styles.boldText 
                        ]}>
                            {item.tap}
                        </Text>
                    </TouchableOpacity>
                )}
            />
            <View style={styles.btnBack}>
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
    container: {
        flex: 1,
        backgroundColor: '#1c1c1c',
    },
    viewWebView: {
        width: PAGE_WIDTH,
        height: PAGE_HEIGHT * 0.4,
    },
    webview: {
        flex: 1,
    },
    episodeList: {
        paddingHorizontal: 10,
    },
    episodeItem: {
        padding: 10,
        backgroundColor: '#333',
        marginHorizontal: 5,
        borderRadius: 8,
        margin: 5,
    },
    episodeText: {
        color: '#fff',
        fontSize: 16,
    },
    boldText: {
        color: 'red'
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        marginLeft: 10,
    },
    btnBack: {
        height: 40,
        width: 100,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        position:'absolute',
        bottom: 10,
        left: 0
    },
});
