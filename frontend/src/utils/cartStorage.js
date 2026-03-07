// frontend/src/utils/cartStorage.js

const CART_KEY = "cart";

/*
Get all cart items
*/
export const getCartItems = () => {
  const cart = localStorage.getItem(CART_KEY);
  return cart ? JSON.parse(cart) : [];
};

/*
Save cart array
*/
const saveCart = (cartItems) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
};

/*
Add item to cart
*/
export const addToCart = (item) => {
  const cart = getCartItems();
  cart.push(item);
  saveCart(cart);
};

/*
Remove item from cart
*/
export const removeFromCart = (productId) => {
  const cart = getCartItems();
  const updatedCart = cart.filter((item) => item.productId !== productId);
  saveCart(updatedCart);
};

/*
Clear entire cart
*/
export const clearCart = () => {
  localStorage.removeItem(CART_KEY);
};

/*
Update quantity
*/
export const updateQuantity = (productId, quantity) => {
  const cart = getCartItems();

  const updatedCart = cart.map((item) =>
    item.productId === productId
      ? { ...item, quantity }
      : item
  );

  saveCart(updatedCart);
};