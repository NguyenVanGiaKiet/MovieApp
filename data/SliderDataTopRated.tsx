import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../components/API';


export interface Movie {
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


export const useFetchMoviesTopRated = () => {
  const [moviesTopRated, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMovies = async () => {
    try {
      const response = await axios.get( `${API_BASE_URL}/toprated`); 
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

  return { moviesTopRated, loading };
};
