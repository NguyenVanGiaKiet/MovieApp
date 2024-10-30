import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../components/API';
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
  videoUrl: { tap: string; url: string }[];
}

// Custom hook để gọi API TMDB và trả về dữ liệu
export const useFetchMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
 
  const fetchMovies = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/movies/popular`); // Thay localhost bằng 10.0.2.2 cho máy ảo Android
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

  return { movies, loading };
};
