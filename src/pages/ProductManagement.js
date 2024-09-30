import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Form, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, addProduct, updateProduct, deleteProduct } from '../features/products/productSlice';

const ProductManagement = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({ name: '', price: '', description: '' });

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleShowModal = (product) => {
    if (product) {
      setEditingProduct(product);
      setFormData({ name: product.name, price: product.price, description: product.description });
    } else {
      setEditingProduct(null);
      setFormData({ name: '', price: '', description: '' });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    if (editingProduct) {
      // Sửa sản phẩm
      dispatch(updateProduct({ id: editingProduct._id, ...formData }));
    } else {
      // Thêm sản phẩm mới
      dispatch(addProduct(formData));
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  return (
    <Container>
      <h2 className="my-4">Product Management</h2>
      <Button variant="primary" className="mb-3" onClick={() => handleShowModal()}>
        Add New Product
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product?._id}>
              <td>{product?.name}</td>
              <td>${product?.price}</td>
              <td>{product?.description}</td>
              <td>
                <Button variant="warning" className="me-2" onClick={() => handleShowModal(product)}>
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleDelete(product._id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal cho thêm và sửa sản phẩm */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editingProduct ? 'Edit Product' : 'Add Product'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="name" className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="price" className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={formData.price}
                onChange={handleFormChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="description" className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={formData.description}
                onChange={handleFormChange}
                rows={3}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {editingProduct ? 'Update Product' : 'Add Product'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ProductManagement;
