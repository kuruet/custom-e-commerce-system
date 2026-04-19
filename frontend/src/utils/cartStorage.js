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

  const existingIndex = cart.findIndex((c) => c.id === item.id);

  if (existingIndex !== -1) {
    cart[existingIndex].quantity += item.quantity || 1;
  } else {
    cart.push({
      ...item,
      quantity: item.quantity || 1,
      size: item.size || null,
    });
  }

  saveCart(cart);
};

export const removeFromCart = (id) => {
  const cart = getCartItems().filter((item) => item.id !== id);
  saveCart(cart);
};

export const updateQuantity = (id, quantity) => {
  const cart = getCartItems();

  const item = cart.find((c) => c.id === id);

  if (!item) return;

  if (quantity <= 0) {
    removeFromCart(id);
    return;
  }

  item.quantity = quantity;

  saveCart(cart);
};

export const updateItemSize = (id, size) => {
  const cart = getCartItems();
  const item = cart.find((c) => c.id === id);
  if (item) {
    item.size = size;
    saveCart(cart);
  }
};

export const clearCart = () => {
  localStorage.removeItem(CART_KEY);
};