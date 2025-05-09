import React from 'react';
import ReactPaginate from 'react-paginate';
import './Pagination.css'
import HomeCarousel from '../Carousel/Carousel';
import { useState } from 'react';
function Pagination({movies,query}) {
  const [len,setLen] = useState()
    let itemsPerPage = 5;
    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + itemsPerPage;
    // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems = movies.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(movies.length / itemsPerPage);
    const movieSize = movies.length;
    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % movies.length;
      setItemOffset(newOffset);
    };
  //console.log(len,'len')
    return (
      <>
        <HomeCarousel movies={currentItems} query={query} lenfn={setLen}/>
        {len > 0 && (
          <ReactPaginate 
            breakLabel="..."
            nextLabel=" next"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={len > 6 ? len : pageCount}  // Conditional pageCount
            previousLabel="previous "
            renderOnZeroPageCount={null}
            containerClassName='pagination'
            pageLinkClassName='paginate-items'
            previousLinkClassName='paginate-items'
            nextLinkClassName='paginate-items'
            activeClassName='active'
          />
        )}

        {/* {len >6 ?(
        <ReactPaginate 
          breakLabel="..."
          nextLabel=" next"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={len}
          previousLabel="previous "
          renderOnZeroPageCount={null}
          containerClassName='pagination'
          pageLinkClassName='paginate-items'
          previousLinkClassName='paginate-items'
          nextLinkClassName='paginate-items'
          activeClassName='active'
        />):(<ReactPaginate 
          breakLabel="..."
          nextLabel=" next"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="previous "
          renderOnZeroPageCount={null}
          containerClassName='pagination'
          pageLinkClassName='paginate-items'
          previousLinkClassName='paginate-items'
          nextLinkClassName='paginate-items'
          activeClassName='active'
        />)} */}
        
      </>
    );
  }
  

export default Pagination;