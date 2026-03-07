const CART_KEY = "cart";

export const getCartItems = () => {
  const cart = localStorage.getItem(CART_KEY);
  return cart ? JSON.parse(cart) : [];
};

const saveCart = (items) => {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
};

export const addToCart = (item) => {
  const cart = getCartItems();
  cart.push(item);
  saveCart(cart);
};

export const removeFromCart = (index) => {
  const cart = getCartItems();
  cart.splice(index, 1);
  saveCart(cart);
};

export const updateQuantity = (index, quantity) => {
  const cart = getCartItems();

  cart[index].quantity = quantity;

  saveCart(cart);
};

export const clearCart = () => {
  localStorage.removeItem(CART_KEY);
};