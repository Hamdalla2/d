import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import Footer from './Pages/Footer';
import Header from './Pages/Header';
import HomePage from './Pages/HomePage';

export default function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route index path="/" element={<HomePage />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);