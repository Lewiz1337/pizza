import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SelectedPizza: React.FC = () => {
  const [pizza, setPizza] = React.useState<{ title: string; imageUrl: string; price: number }>();
  const { id } = useParams();

  const navigate = useNavigate();

  React.useEffect(() => {
    axios
      .get(`https://633dbdc4f2b0e623dc7a9137.mockapi.io/api/v1/pizza/${id}`)
      .then((res) => setPizza(res.data))
      .catch(() => {
        alert('Не удалось получить пиццу!');
        navigate('/');
      });
  });

  if (!pizza) {
    return (
      <div className="container">
        <h2>Загрузка...</h2>
      </div>
    );
  }

  return (
    <div className="selected__pizza">
      <h2>{pizza.title}</h2>
      <img src={pizza.imageUrl} alt="pizza_image" />
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi quaerat recusandae, quo
        eaque doloribus fuga blanditiis autem. Laborum vitae doloribus cupiditate! Nemo perspiciatis
        possimus numquam iusto suscipit, eos ab assumenda.
      </p>
      <h4>{pizza.price} ₽ </h4>
    </div>
  );
};

export default SelectedPizza;
