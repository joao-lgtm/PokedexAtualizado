import React from 'react';
import ReactDOM from 'react-dom';
import { Home } from './pages/Home';
import { Header } from './components/header';
import './style/global.css';
import { Footer } from './components/footer';

ReactDOM.render(
  <React.StrictMode>
    <Header />
    <Home />
    <Footer />
  </React.StrictMode>,
  document.getElementById('root')
);