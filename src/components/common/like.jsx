import React from 'react';
const Like=(props)=>{
    let likeClass="fa fa-heart";
        if(!props.liked)
        likeClass+="-o";
        return ( <i onClick={props.onLikeClick} className={likeClass}></i> );
} 
 
export default Like;