import React, { Component } from 'react';
import { getMovies, getMovie } from '../services/fakeMovieService';
import Pagination from "./common/pagination";
import { paginate } from '../utils/pagination';
import ListGroup from './common/listGroup';
import { getGenres } from '../services/fakeGenreService';
import MoviesTable from './moviesTable';
import _ from 'lodash';
//check
class Movies extends Component {
    state = {
        movies: [],
        genres:[],
        pageSize:4,
        currentPage:1,
        sortColumn:{path:'title',order:'asc'}
    }

    componentDidMount(){
        this.setState({
            movies:getMovies(),
            genres:[{_id:'', name:'All Genres'},...getGenres()]
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
    handleSort=sortColumn=>{    
        this.setState({sortColumn});
    }
    getPagedData(){
        const {pageSize,currentPage,movies:allMovies,selectedGenre,sortColumn}=this.state;
        const filtered=selectedGenre&&selectedGenre._id?allMovies.filter(movie=>movie.genre._id==selectedGenre._id):allMovies;
        const sorted= _.orderBy(filtered,[sortColumn.path],[sortColumn.order]);
        const movies=paginate(sorted,currentPage,pageSize);
        
        return {totalCount:filtered.length, data:movies}

    }
    render() {
        const { length: count } = this.state.movies;
        const {pageSize,currentPage,sortColumn}=this.state;
        if (count == 0) {
            return <p>No Movies in the Database!</p>
        }
        const {totalCount, data:movies}= this.getPagedData();    
        return (
            <div className="row">
            <div className="col-2">
                <ListGroup 
                items={this.state.genres}
                selectedItem={this.state.selectedGenre}
                onItemSelect={this.handleGenreSelect}/>
            </div>
            <div className="col">
            <p>Showing {totalCount} Movies.</p>
                <MoviesTable 
                movies={movies}
                onLikeClick={this.likeClickedHandler}
                onDelete={this.handleDelete}
                sortColumn={sortColumn}
                onSort={this.handleSort}/>
                <Pagination
                moviesCount={totalCount}
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