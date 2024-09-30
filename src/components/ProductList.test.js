import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../store';
import ProductList from './ProductList';

test('renders Product List with products', () => {
  render(
    <Provider store={store}>
      <ProductList />
    </Provider>
  );

  // Kiểm tra tiêu đề "Product List" có hiển thị không
  expect(screen.getByText(/Product List/i)).toBeInTheDocument();
  
  // Kiểm tra một số sản phẩm giả định (bạn có thể thêm sản phẩm mẫu vào store để kiểm tra)
  // Ví dụ: expect(screen.getByText(/Sample Product/i)).toBeInTheDocument();
});
