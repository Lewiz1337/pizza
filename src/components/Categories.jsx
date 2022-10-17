import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategotyId } from '../redux/slices/filterSlice';
const Categories = () => {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  const { categoryId } = useSelector((state) => state.filter);

  const dispatch = useDispatch();
  const onChangeCategory = (id) => {
    dispatch(setCategotyId(id));
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => {
          return (
            <li
              key={index}
              onClick={() => onChangeCategory(index)}
              className={categoryId === index ? 'active' : ''}>
              {category}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Categories;
