import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Error from './components/Error';
import Header from './components/Header';
import Freelance from './pages/Freelances';
import Home from './pages/Home';
import Result from './pages/Result';
import Survey from './pages/Survey'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/survey/:questionNumber' element={<Survey />} />
        <Route path='/freelance' element={<Freelance />} />
        <Route path='/result' element={<Result />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

