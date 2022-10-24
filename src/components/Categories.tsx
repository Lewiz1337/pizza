import React from 'react';
import { useSelector } from 'react-redux';
// import { setCategotyId } from '../redux/slices/filterSlice';
import { RootState } from '../redux/store';

type CategoriesProps = {
  onChangeCategory: (i: number) => void;
};
const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

const Categories: React.FC<CategoriesProps> = React.memo(({ onChangeCategory }) => {
  const { categoryId }: { categoryId: number } = useSelector((state: RootState) => state.filter);

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
});

export default Categories;
