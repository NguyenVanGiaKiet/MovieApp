import { useEffect, useState } from 'react';
import axios from 'axios';

// Định nghĩa interface cho dữ liệu phim từ TMDB
export interface MovieTopRated {
  id: number;
  original_title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

// Custom hook để gọi API TMDB và trả về dữ liệu
export const useFetchMoviesTopRated = () => {
  const [moviesTopRated, setMoviesTopRated] = useState<MovieTopRated[]>([]);
  const [loading, setLoading] = useState(true);
  
  const API_KEY = 'b32adb654e865c7bd05fd7c4406055f5'; // Thay thế bằng API key của bạn

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`);
        setMoviesTopRated(response.data.results); // Lấy dữ liệu từ response
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { moviesTopRated, loading };
};
