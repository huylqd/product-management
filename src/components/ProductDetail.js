import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const ProductDetails = () => {
  const { id } = useParams(); // Lấy ID từ URL
  console.log(id);
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product details');
        }
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return <Container><p>Loading...</p></Container>;
  }

  if (error) {
    return <Container><p className="text-danger">{error}</p></Container>;
  }

  return (
    <Container className="my-4">
      {product && (
        <Row className="justify-content-md-center">
          <Col xs={12} md={8}>
            <Card>
              <Card.Img
                variant="top"
                src={`https://via.placeholder.com/600x400?text=${product.name}`}
                alt={product.name}
              />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>
                  <strong>Price: </strong>${product.price}
                </Card.Text>
                <Card.Text>{product.description}</Card.Text>
                <Button variant="primary" href="/">Back to Product List</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default ProductDetails;
