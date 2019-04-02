import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import Like from "./common/like";
import Pagination from "./common/pagination";
import { paginate } from '../utils/pagination';

class Movies extends Component {
    state = {
        movies: getMovies(),
        pageSize:4,
        currentPage:1
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
    render() {
        const { length: count } = this.state.movies;
        const {pageSize,currentPage,movies:allMovies}=this.state;
        if (count == 0) {
            return <p>No Movies in the Database!</p>
        }
        const movies=paginate(allMovies,currentPage,pageSize);
        return (
            <React.Fragment>
                <p>Showing {count} Movies.</p>
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
                moviesCount={count}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={this.handlePageChange}
                />
            </React.Fragment>

        );
    }
}

export default Movies;