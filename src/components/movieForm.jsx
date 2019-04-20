import React, { Component } from 'react';
import Form from './common/form';
import Joi from 'joi-browser';
import { getGenres } from '../services/genreService';
import { getMovie, saveMovie } from '../services/movieService';

class MovieForm extends Form {
    state = { 
        data:{
            title:'',
            genreId:'',
            numberInStock:'',
            dailyRentalRate:''
        },
        genres:[],
        errors:{}
     }
     schema={
         _id: Joi.string(),
         title:Joi.string().required().label('Title'),
         genreId:Joi.string().required().label('Genre'),
         numberInStock:Joi.number().min(0).max(100).required().label('Number In Stock'),
         dailyRentalRate:Joi.number().max(10).min(0).required().label('Daily Rental Rate')
     }

     async populateGenres(){
        const {data:genres}= await getGenres();
        this.setState({genres});
     }
     async populateMovies(){
         try{
            const movieId=this.props.match.params.id;
            if(movieId==='new') return;
             const {data:movie}= await getMovie(movieId);
             this.setState({data:this.mapToViewModel(movie)});

         } catch(ex){
             if(ex.response&&ex.response.status===404)
                 this.props.history.replace("/not-found");
         }
     }

     async componentDidMount(){
        await this.populateGenres();
        await this.populateMovies();           
    }

    mapToViewModel(movie){
        return {
            _id:movie._id,
            title:movie.title,
            genreId:movie.genre._id,
            numberInStock:movie.numberInStock,
            dailyRentalRate:movie.dailyRentalRate
        }
    }

    doSubmit=async ()=>{
        //call the server
        console.log(this.state.data);
        await saveMovie(this.state.data);
        this.props.history.push("/movies");
        console.log("submitted");
    }

    render() { 
        return (
            <div>
             <h1>Movie form</h1>
             <form onSubmit={this.handleSubmit}>
                {this.renderInput('title','Title')}
                {this.renderSelect('genreId','Genre',this.state.genres)}
                {this.renderInput('numberInStock','Number in Stock','number')}
                {this.renderInput('dailyRentalRate','Rate','number')}
                {this.renderButton('Save')}
            </form>
             {/* <button className="btn btn-primary" onClick={()=>history.push('/movies')}>Save</button> */}
             </div>
              );
    }
}
  
export default MovieForm;