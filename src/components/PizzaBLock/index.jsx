import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from '../../redux/slices/cartSlice';

const PizzaBlock = ({ price = 600, id, imageUrl, title, types, sizes }) => {
  const [pizzaPrice, setPizzaPrice] = useState(price);
  const [selectedType, setSelectedType] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);

  const countItem = useSelector((state) =>
    state.cart.items.find((obj) => String(obj.id) === `${id}-${selectedType}-${selectedSize}`),
  );

  const dispatch = useDispatch();

  const onClickAdd = () => {
    dispatch(
      addItem({
        id: `${id}-${selectedType}-${selectedSize}`,
        title,
        type: typesArr[selectedType],
        size: sizes[selectedSize],
        imageUrl,
        price: pizzaPrice,
      }),
    );
  };

  const onChangeSize = (i) => {
    setSelectedSize(i);
    switch (sizes[i]) {
      case 26:
        setPizzaPrice(price);
        break;
      case 30:
        setPizzaPrice(Math.floor(price * 1.44));
        break;
      case 40:
        setPizzaPrice(Math.floor(price * 2.56));
        break;
      default:
        break;
    }
  };

  const typesArr = ['тонкое', 'традиционное'];
  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <img className="pizza-block__image" src={imageUrl} alt={`Pizza_${title}`} />
        <h4 className="pizza-block__title">{title}</h4>
        <div className="pizza-block__selector">
          <ul>
            {types.map((_, index) => (
              <li
                key={index}
                onClick={() => setSelectedType(index)}
                className={index === selectedType ? 'active' : ''}>
                {typesArr[index]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((_, index) => (
              <li
                key={index}
                onClick={() => onChangeSize(index)}
                className={index === selectedSize ? 'active' : ''}>
                {sizes[index]} см
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {pizzaPrice} ₽</div>
          <div onClick={() => onClickAdd()} className="button button--outline button--add">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            {countItem && <i>{countItem.count}</i>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PizzaBlock;
