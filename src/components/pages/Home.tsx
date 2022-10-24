import React, { useEffect } from 'react';

import Categories from '../Categories';
import Sort, { sortType } from '../Sort';
import PizzaBlock from '../PizzaBLock/index';
import Skeleton from '../PizzaBLock/Skeleton';
import PageRouter from '../PageRouter';
import { useSelector, useDispatch } from 'react-redux';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { setCategotyId, setFilter } from '../../redux/slices/filterSlice';
import { fetchPizzas } from '../../redux/slices/pizzaSlice';
import Error from '../Error';
import { RootState } from '../../redux/store';

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categoryId, sort, orderByDesc, search, page } = useSelector(
    (state: RootState) => state.filter,
  );
  const { items, status } = useSelector((state: RootState) => state.pizza);

  const onChangeCategory = React.useCallback((id: number) => {
    dispatch(setCategotyId(id));
  }, []);

  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortType.find((obj) => obj.sortProperty === params.sortProperty);
      dispatch(
        setFilter({
          ...params,
          sort,
        }),
      );
      isSearch.current = true;
    }
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      dispatch(
        // @ts-ignore
        fetchPizzas({
          categoryId,
          sort,
          orderByDesc,
          page,
          search,
        }),
      );
    }
    isSearch.current = false;
  }, [categoryId, sort.sortProperty, page, orderByDesc, dispatch, sort, search]);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId: categoryId,
        orderByDesc: orderByDesc,
        page: page,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, page, orderByDesc, navigate]);

  if (status === 'error') {
    return <Error />;
  }

  return (
    <div className="container">
      <div className="content__top">
        <Categories onChangeCategory={onChangeCategory} />
        <Sort />
      </div>

      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {items
          .filter((obj) => {
            return obj ? obj.title.toUpperCase().includes(search.toUpperCase()) : <Skeleton />;
          })
          .map((obj, index) =>
            status === 'loading' ? <Skeleton key={index} /> : <PizzaBlock key={obj.id} {...obj} />,
          )}
      </div>
      <PageRouter pagesCount={[...Array(2)]} />
    </div>
  );
}

export default Home;
