import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Categories from '../Categories';
import Sort, { sortType } from '../Sort';
import PizzaBlock from '../PizzaBLock/index';
import Skeleton from '../PizzaBLock/Skeleton';
import PageRouter from '../PageRouter';
import { useSelector, useDispatch } from 'react-redux';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { setFilter } from '../../redux/slices/filterSlice';

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categoryId, sort, orderByDesc, search, page } = useSelector((state) => state.filter);

  const [pizzaList, setPizzaList] = useState([...Array(6)]);
  const [isLoading, setLoading] = useState(true);

  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const fetchPizzas = () => {
    let _apiBase = 'https://633dbdc4f2b0e623dc7a9137.mockapi.io/api/v1/pizza?';
    let _sort = `&sortBy=${sort.sortProperty}${orderByDesc ? '&order=desc' : '&order=asc'}`;
    let _category = categoryId ? `&category=${categoryId}` : '';
    let _page = `&page=${page}&limit=6`;
    setLoading(true);
    axios.get(_apiBase + _sort + _category + _page).then((res) => {
      setPizzaList(res.data);
      setLoading(false);
    });
  };

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
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      fetchPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sort.sortProperty, page, orderByDesc]);

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
  }, [categoryId, sort.sortProperty, page, orderByDesc]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>

      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {pizzaList
          .filter((obj) => {
            return obj ? obj.title.includes(search) : <Skeleton />;
          })
          .map((obj, index) =>
            isLoading ? <Skeleton key={index} /> : <PizzaBlock key={obj.id} {...obj} />,
          )}
      </div>
      <PageRouter pagesCount={[...Array(2)]} />
    </div>
  );
}

export default Home;
