import React, { Component } from 'react';
import { getMovies, getMovie } from '../services/fakeMovieService';
import Like from "./common/like";
import Pagination from "./common/pagination";
import { paginate } from '../utils/pagination';
import ListGroup from './common/listGroup';
import { getGenres } from '../services/fakeGenreService';

class Movies extends Component {
    state = {
        movies: [],
        genres:[],
        pageSize:4,
        currentPage:1
    }

    componentDidMount(){
        this.setState({
            movies:getMovies(),
            genres:[{name:'All Genres'},...getGenres()]
        });
    }

    handleDelete = (movie) => {
        const movies = this.state.movies.filter(m => m._id !== movie._id);
        this.setState({ movies });

    }
    likeClickedHandler=movie=>{
        const movies=[...this.state.movies];
        const index=movies.indexOf(movie);
        movies[index].liked=!movies[index].liked;
        this.setState({movies});
    }
    handlePageChange=page=>{
        console.log(page);
        this.setState({currentPage:page})
    }
    handleGenreSelect=(genre)=>{
        console.log(genre);
        this.setState({selectedGenre:genre, currentPage:1})
    }
    render() {
        const { length: count } = this.state.movies;
        const {pageSize,currentPage,movies:allMovies,selectedGenre}=this.state;
        if (count == 0) {
            return <p>No Movies in the Database!</p>
        }
        
        const filtered=selectedGenre&&selectedGenre._id?allMovies.filter(movie=>movie.genre._id==selectedGenre._id):allMovies;
        const movies=paginate(filtered,currentPage,pageSize);
        return (
            <div className="row">
            <div className="col-2">
                <ListGroup 
                items={this.state.genres}
                selectedItem={this.state.selectedGenre}
                onItemSelect={this.handleGenreSelect}/>
            </div>
            <div className="col">
            <p>Showing {filtered.length} Movies.</p>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Genre</th>
                            <th>Stock</th>
                            <th>Rate</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>

                        {movies.map(movie => (
                            <tr key={movie._id}>
                                <td>{movie.title}</td>
                                <td>{movie.genre.name}</td>
                                <td>{movie.numberInStock}</td>
                                <td>{movie.dailyRentalRate}</td>
                                <td>
                                    <Like 
                                    liked={movie.liked}
                                    onLikeClick={()=>this.likeClickedHandler(movie)}
                                    />
                                </td>
                                <td><button onClick={() => this.handleDelete(movie)} className="btn btn-danger btn-sm">Delete</button></td>
                            </tr>
                        ))}

                    </tbody>
                </table>
                <Pagination
                moviesCount={filtered.length}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={this.handlePageChange}
                />
            </div>
               
            </div>

        );
    }
}

export default Movies;