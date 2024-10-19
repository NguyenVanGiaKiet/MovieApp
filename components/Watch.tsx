import React from 'react';
import { View, FlatList, Text, TouchableOpacity } from 'react-native';
import Video, {VideoRef} from 'react-native-video';

const MovieApp = () => {
  const movies = [
    { id: 1, title: 'Movie 1', videoUrl: 'https://www.youtube.com/watch?v=wCfbfyhzbbk' },
    { id: 2, title: 'Movie 2', videoUrl: 'https://www.youtube.com/watch?v=wCfbfyhzbbk' },
    { id: 3, title: 'Movie 3', videoUrl: 'https://www.youtube.com/watch?v=wCfbfyhzbbk' },
  ];

  const handlePress = (videoUrl: string) => {
    // Hàm xử lý khi nhấn vào phim, mở video từ videoUrl
    console.log('Play video from URL:', videoUrl);
    // Bạn có thể sử dụng video player như Video từ 'expo-av' hoặc bất kỳ thư viện nào khác
  };

  return (
    <View>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePress(item.videoUrl)}>
            <Text>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default MovieApp;
