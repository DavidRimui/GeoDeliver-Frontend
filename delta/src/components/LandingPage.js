import React, { useEffect, useState } from 'react';
import './LandingPage.css';

const LandingPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchRecentProducts();
  }, []);

  const fetchRecentProducts = async () => {
    try {
      const response = await fetch('http://localhost:4567/products');
      const data = await response.json();
      setProducts(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching recent products:', error);
    }
  };

  const addToCart = async (productId) => {
    try {
      const response = await fetch('http://localhost:4567/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          productId: productId
        })
      });
      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  return (
    <div>
      <section>
        <h2>Most Recent Products</h2>
        <div className="product-grid">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>${product.price}</p>
              <p>{product.description}</p>
              <a className="add-to-cart-button" onClick={() => addToCart(product.id)}>
                Add to Cart
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
