import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './Redux/store'
import { BrowserRouter,Routes,Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </React.StrictMode>
    </BrowserRouter>
  </Provider>
);

reportWebVitals();
