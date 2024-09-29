import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../features/products/productSlice';
import { Link, useNavigate  } from 'react-router-dom';
import { Navbar, Nav, Card, Button, Container, Row, Col } from 'react-bootstrap';
import { logout } from '../features/products/userSlice';
const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const status = useSelector((state) => state.products.status);
  const userInfo = useSelector((state) => state.user.userInfo);
  console.log(userInfo);
  
  const navigate = useNavigate();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

const handleRegister = () => {
    navigate('/register');
  };

  // Xử lý chuyển hướng đến trang đăng nhập
  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const handleProductManagement = () => {
    navigate('/admin');
  };

  return (
    <>
    
         
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
          <Container>
            <Navbar.Brand href="#">Product Management</Navbar.Brand>
            <Nav className="ml-auto">
            {!userInfo ? (
            <>
              <Button variant="outline-light" className="me-2" onClick={handleRegister}>
                Register
              </Button>
              <Button variant="outline-light" onClick={handleLogin}>
                Login
              </Button>
            </>
          ) : (
            <>
              {userInfo.isAdmin === true && (
                <Button variant="outline-light" className="me-2" onClick={handleProductManagement}>
                  Product Management
                </Button>
              )}
              <Button variant="outline-light" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
            </Nav>
          </Container>
    </Navbar>
    <Container>
    <h2 className="my-4 text-center">Product List</h2>
    <Row>
      {products.map((product) => (
        <Col key={product._id} sm={12} md={6} lg={4} xl={3} className="mb-4">
          <Card className="h-100">
            <Card.Img
              variant="top"
              src={`https://via.placeholder.com/150?text=${product.name}`}
              alt={product.name}
            />
            <Card.Body className="d-flex flex-column">
              <Card.Title>{product.name}</Card.Title>
              <Card.Text className="mb-4">
                <strong>Price: </strong>${product.price}
              </Card.Text>
              <Card.Text className="text-muted">{product.description}</Card.Text>
              <Button
                as={Link}
                to={`/product/${product._id}`}
                variant="primary"
                className="mt-auto"
              >
                View Details
              </Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  </Container>
  </>
  );
};

export default ProductList;