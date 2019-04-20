import http from './httpService';
import {apiUrl} from '../config.json'

const api=apiUrl+"/movies";

function movieUrl(id){
    return api+"/"+id;
}
export function getMovies(){
    return http.get(api);
}

export function deleteMovie(movieId){
   return http.delete(movieUrl(movieId));
}

 
export function getMovie(movieId){
    return http.get(movieUrl(movieId));
}
export function saveMovie(movie){
    //dont pass id while posting movies
    //mongodb itself creates the id on save

    if(movie._id){//update
        const body={...movie}
        delete body._id;
       return http.put(movieUrl(movie._id),body);
    }
    //new movie
    return http.post(api,movie);
}