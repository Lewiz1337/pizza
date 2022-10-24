import React from 'react';
import styles from './PageRouter.module.scss';
import ReactPaginate from 'react-paginate';
import { setPage } from '../../redux/slices/filterSlice';
import { useDispatch } from 'react-redux';

const PageRouter = ({ pagesCount }: { pagesCount: null[] }) => {
  const dispatch = useDispatch();

  const onChangePage = (e: { selected: number }) => {
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
        pageRangeDisplayed={5}
        pageCount={pagesCount.length}
        previousLabel="<"
      />
    </>
  );
};

export default PageRouter;
