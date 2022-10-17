import React from 'react';
import styles from './PageRouter.module.scss';
import ReactPaginate from 'react-paginate';
import { setPage } from '../../redux/slices/filterSlice';
import { useDispatch } from 'react-redux';

function PageRouter({ pagesCount }) {
  const dispatch = useDispatch();

  const onChangePage = (e) => {
    dispatch(setPage(e.selected + 1));
  };

  return (
    <>
      <ReactPaginate
        className={styles.root}
        breakLabel="..."
        nextLabel=">"
        onPageChange={onChangePage}
        activeClassName={styles.active}
        // onPageActive={console.log(1)}
        pageRangeDisplayed={5}
        pageCount={pagesCount.length}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    </>
  );
}

export default PageRouter;
