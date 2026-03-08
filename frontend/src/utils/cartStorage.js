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

  const existingIndex = cart.findIndex(
    (cartItem) => cartItem.id === item.id
  );

  if (existingIndex !== -1) {
    cart[existingIndex].quantity += 1;
  } else {
    cart.push({
      ...item,
      quantity: 1,
    });
  }

  saveCart(cart);
};

export const removeFromCart = (index) => {
  const cart = getCartItems();
  cart.splice(index, 1);
  saveCart(cart);
};

export const updateQuantity = (index, quantity) => {
  const cart = getCartItems();

  if (quantity <= 0) {
    cart.splice(index, 1);
  } else {
    cart[index].quantity = quantity;
  }

  saveCart(cart);
};

export const clearCart = () => {
  localStorage.removeItem(CART_KEY);
};