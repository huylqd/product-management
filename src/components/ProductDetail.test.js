import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../store';
import ProductDetail from './ProductDetail';
import { BrowserRouter } from 'react-router-dom';

test('renders Product Detail correctly', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <ProductDetail />
      </BrowserRouter>
    </Provider>
  );

  // Kiểm tra các chi tiết của sản phẩm
  // Ví dụ: expect(screen.getByText(/Product Details/i)).toBeInTheDocument();
});
