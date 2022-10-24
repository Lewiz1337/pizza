import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
  const style: {} = {
    'margin-top': '50px',
  };
  return (
    <div className="wrapper">
      <div className="container container--cart">
        <div className="cart cart--empty">
          <h2>
            Ошибка получения данных <span>😵</span>
          </h2>
          <p>
            Невозможно получить список пицц
            <br />
            Пожалйста, попробуйте позже...
          </p>
          <Link style={style} to="/" className="button button--black">
            <span>На главную</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Error;
