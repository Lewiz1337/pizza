import { CartItem } from '../slices/cartSlice';

// type getCartItemsFromLSProps = {
//   totalPrice: number;
//   items: CartItem[]
// }

export const getCartItemsFromLS = () => {
  const data = localStorage.getItem('cart');
  let items: CartItem[] = [];
  if (data) {
    items = JSON.parse(data);
  }
  if (items.length !== 0) {
    let totalPrice = items.reduce((sum, item) => (sum += item.price * item.count), 0);
    return {
      totalPrice,
      items,
    };
  }
  return {
    totalPrice: 0,
    items: [],
  };
};
