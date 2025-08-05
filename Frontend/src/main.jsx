import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { CartProvider}  from "./components/cart/cartContext.jsx"
import 'bootstrap/dist/css/bootstrap.min.css';  // Bootstrap styles
import 'bootstrap/dist/js/bootstrap.bundle.min.js';  // Bootstrap JS

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </StrictMode>,
);
