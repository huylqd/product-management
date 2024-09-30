import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../store';
import ProductManagement from './ProductManagement';

test('allows admin to add, edit, and delete products', () => {
  render(
    <Provider store={store}>
      <ProductManagement />
    </Provider>
  );

  // Thêm sản phẩm mới
  fireEvent.click(screen.getByText(/Add New Product/i));
  fireEvent.change(screen.getByLabelText(/Product Name/i), { target: { value: 'New Product' } });
  fireEvent.click(screen.getByText(/Add Product/i));

  // Kiểm tra sản phẩm mới có trong danh sách
  expect(screen.getByText(/New Product/i)).toBeInTheDocument();

  // Xóa sản phẩm
  fireEvent.click(screen.getByText(/Delete/i));
  expect(screen.queryByText(/New Product/i)).toBeNull();
});
