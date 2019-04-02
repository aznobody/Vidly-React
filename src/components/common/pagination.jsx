import React, { Component } from 'react';
import _ from "lodash";
import PropTypes from "prop-types";
const Pagination = (props) => {
    const {moviesCount, pageSize,currentPage, onPageChange}= props; //movies count=9 pageSize=4
    const PageCount=Math.ceil(moviesCount/pageSize); //3
    console.log(currentPage);
    if(PageCount==1) return null;
    const pages=_.range(1,PageCount+1) //[1,2,3,4]

    return ( 
        <nav aria-label="Page navigation example">
        <ul className="pagination">
        {pages.map(page=> 
        <li key={page} className={currentPage==page?'page-item active':'page-item'}>
            <a onClick={()=>onPageChange(page)} 
            className="page-link">{page}</a>
        </li>)}
        </ul>
        </nav>
     );
}
Pagination.propTypes={
    moviesCount:PropTypes.number.isRequired, 
    pageSize:PropTypes.number.isRequired,
    currentPage:PropTypes.number.isRequired
}
 
export default Pagination;