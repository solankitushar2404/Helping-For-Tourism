import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import  AuthProvider  from './context/AuthContext'; // ✅ VERY IMPORTANT
import { Toaster } from 'react-hot-toast';
import { WishlistProvider } from './context/WishlistContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <Toaster position="top-center" reverseOrder={false} />
      <AuthProvider>  {/* ✅ ADD THIS */}
       <WishlistProvider>
          <App />
       </WishlistProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);

