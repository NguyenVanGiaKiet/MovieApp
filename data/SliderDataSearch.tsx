import { useEffect, useState } from 'react';
import axios from 'axios';

// Định nghĩa interface cho dữ liệu phim từ TMDB
export interface Movie {
  id: number;
  name_movie: string;
  time: string;
  director: string;
  actor: string;
  list: string;
  category: string;
  year: number;
  nation: string;
  poster_path: string;
  videoUrl: string;
}

// Custom hook để gọi API TMDB và trả về dữ liệu
export const useFetchMoviesSearch = () => {
  const [moviesSearch, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
 
  const fetchMovies = async () => {
    try {
      const response = await axios.get('http://10.0.2.2:3000/search'); // Thay localhost bằng 10.0.2.2 cho máy ảo Android
      setMovies(response.data);
    } catch (error) {
      console.error('Lỗi khi gọi API:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return { moviesSearch, loading };
};
