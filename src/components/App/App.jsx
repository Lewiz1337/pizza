import '../../scss/app.scss';

import Header from '../Header';

import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import Cart from '../pages/Cart';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="cart" element={<Cart />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
