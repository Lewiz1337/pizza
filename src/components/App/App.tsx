import '../../scss/app.scss';

import Header from '../Header';
import React from 'react';
import SelectedPizza from '../pages/SelectedPizza';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import Cart from '../pages/Cart';
import { Routes, Route } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<SelectedPizza />} />
          <Route path="*" element={<NotFound />} />
          <Route path="cart" element={<Cart />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
