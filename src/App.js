import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import { RecoilRoot } from 'recoil';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import './styles/bootstrap.scss';
import './styles/global.scss';

import MainLayout from './components/layout/MainLayout/MainLayout';
import Homepage from './components/views/Homepage/Homepage';
import ProductList from './components/views/ProductList/ProductList';
import ProductPage from './components/views/ProductPage/ProductPage';
import ProductComparator from './components/features/ProductComparator/ProductComparator';
import Blog from './components/views/Blog/Blog';

const App = () => (
  <RecoilRoot>
    <Provider store={store}>
      <BrowserRouter>
        <MainLayout>
          <ToastContainer />
          <Routes>
            <Route exact path={'/'} element={<Homepage />} />
            <Route exact path={'/shop/:categoryId'} element={<ProductList />} />
            <Route exact path={'/product/:productId'} element={<ProductPage />} />
            <Route exact path={'/blog'} element={<Blog />} />
          </Routes>
          <ProductComparator />
        </MainLayout>
      </BrowserRouter>
    </Provider>
  </RecoilRoot>
);

export default App;
