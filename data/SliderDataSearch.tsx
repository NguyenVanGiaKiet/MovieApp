import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../components/API';

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

export const useFetchMoviesSearch = () => {
  const [moviesSearch, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
 
  const fetchMovies = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/movies`);
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
