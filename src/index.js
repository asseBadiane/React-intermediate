
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Error from './components/Error';
import Footer from './components/Footer';
import Header from './components/Header';
import Freelances from './pages/Freelances';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Result from './pages/Result';
import Survey from './pages/Survey'
import { SurveyProvider, ThemeProvider } from './utils/context';
import store from './utils/store';

import GlobalStyle from './utils/style/GlobalStyle';



// const GlobalStyle = createGlobalStyle`
//     div {
//         font-family: 'Trebuchet MS', Helvetica, sans-serif;
//     }
// `

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <SurveyProvider>
          <GlobalStyle />
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/survey/:questionNumber' element={<Survey />} />
            <Route path='/freelance' element={<Freelances />} />
            <Route path='/result' element={<Result />} />
            <Route path='/profile/:id' element={<Profile />}/>
            <Route path='*' element={<Error />} />
          </Routes>
          <Footer />
        </SurveyProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
  </Provider>
);

