import axios from 'axios';
import { apiKey } from '../constants';

const apiBaseUrl = 'https://api.themoviedb.org/3';
const trendingMoviesEndPoint =`${apiBaseUrl}/trending/movie/day?api_key=${apiKey}` ;
const upcomingMoviesEndPoint =`${apiBaseUrl}/movie/upcoming?api_key=${apiKey}` 
const topRatedMoviesEndPoint =`${apiBaseUrl}/movie/top_rated?api_key=${apiKey}` 

const movieDetailsEndPoint = id => `${apiBaseUrl}/movie/${id}?api_key=${apiKey}` ;
const movieCreditsEndPoint = id => `${apiBaseUrl}/movie/${id}/credits?api_key=${apiKey}` ;
const similarMoviesEndPoint = id => `${apiBaseUrl}/movie/${id}/similar?api_key=${apiKey}` ;

const searchMoviesEndPoint =  `${apiBaseUrl}/search/movie?api_key=${apiKey}` ;

const personDetailsEndPoint = id => `${apiBaseUrl}/person/${id}?api_key=${apiKey}` ;
const personMoviesEndPoint = id => `${apiBaseUrl}/person/${id}/movie_credits?api_key=${apiKey}` ;


export const image500 = path => path ? `https://image.tmdb.org/t/p/w500${path}` : null ;
export const image342 = path => path ? `https://image.tmdb.org/t/p/w342${path}` : null ;
export const image185 = path => path ? `https://image.tmdb.org/t/p/w185${path}` : null ;


const apiCall = async (endPoint, params) => {
        const options = {
            method : "GET",
            url : endPoint,
            params : params? params : {}
        }
        try {
            const res = await axios.request(options);
            return res.data;
            
        } catch (error) {
            console.log(error, "error");
            return {}
        }
}


export const fetchTrendingMovies = async () => {
    return await apiCall(trendingMoviesEndPoint);
}


export const fetchUpComingMovies = async () => {
    return await apiCall(upcomingMoviesEndPoint);
}

export const fetchTopRatedMovies = async () => {
    return await apiCall(topRatedMoviesEndPoint);
}

export const fetchMovieDetails = async (id) => {
    return await apiCall(movieDetailsEndPoint(id));
}

export const fetchMovieCredits = async (id) => {
    return await apiCall(movieCreditsEndPoint(id));
}

export const fetchSimilarMovies = async (id) => {
    return await apiCall(similarMoviesEndPoint(id));
}


export const fetchPersonDetails = async (id) => {
    return await apiCall(personDetailsEndPoint(id));
}

export const fetchPersonMovies = async (id) => {
    return await apiCall(personMoviesEndPoint(id));
}

export const searchMovies = async (params) => {
    return await apiCall(searchMoviesEndPoint, params);
}