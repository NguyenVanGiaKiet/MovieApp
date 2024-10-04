import { useEffect, useState } from 'react';
import axios from 'axios';
import storage from '@react-native-firebase/storage';

// Định nghĩa interface cho dữ liệu phim từ TMDB
export interface Movie {
  id: number;
  original_title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

// Custom hook để gọi API TMDB và trả về dữ liệu
export const useFetchMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  const uploadMovie = async (filePath: string) => {
    try {
      // Tạo một reference trong Firebase Storage
      const reference = storage().ref('movies/myMovie.mp4');

      // Tải file lên Firebase Storage
      await reference.putFile(filePath);

      // Lấy URL của file sau khi tải lên thành công
      const url = await reference.getDownloadURL();
      console.log('File available at: ', url);

      return url; // Trả về URL để sử dụng sau
    } catch (error) {
      console.error('Error uploading file: ', error);
    }
  };

  const API_KEY = 'b32adb654e865c7bd05fd7c4406055f5'; // Thay thế bằng API key của bạn

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
        setMovies(response.data.results); // Lấy dữ liệu từ response
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { movies, loading };
};
