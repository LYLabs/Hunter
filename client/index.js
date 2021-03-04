import React from 'react';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { render } from 'react-dom';
import { ProvideAuth } from './routes/useAuth';
import './style/style.css';

render(
  <BrowserRouter>
    <ProvideAuth>
      <App />
    </ProvideAuth>
  </BrowserRouter>,
  document.getElementById('app')
);
