import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


const ProductsList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    try {
      let result = await fetch('http://localhost:8123/products'); 
      if (!result.ok) {
        if (result.status === 404) {
          setProducts([]); 
          return;
        }
        throw new Error(`HTTP error! status: ${result.status}`);
      }
      const data = await result.json();
      setProducts(data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
      
    }
  };

  const deleteProduct = async (id) => {
    let result = await fetch(`http://localhost:8123/products/${id}`, { 
      method: 'DELETE',
    });
    const data = await result.json();
    if (data.message === "Product deleted successfully") { 
      alert('Product deleted successfully!');
      getProduct();
    } else {
      alert('Failed to delete product.');
    }
  };

  return (
    <div className='products-list-container'>
      <h1>Product List</h1>
      {products.length > 0 ? (
        <div className='product-cards-grid'>
          {products.map((item) => (
            <div className='product-card' key={item._id}>
              {/* --- Product Image --- */}
              <div className="product-image-container">
                 <img
                    src={item.imageUrl || 'https://via.placeholder.com/300x200?text=No+Image'} 
                    alt={item.name}
                    className="product-card-image"
                 />
              </div>

              <h3>{item.name}</h3>
              <p><strong>Price:</strong> ₹{item.price}</p>
              <p><strong>Company:</strong> {item.company}</p>
              <p><strong>Category:</strong> {item.category}</p>

              {/* --- Quantity and Stock Status --- */}
              <div className="product-quantity-status">
                {/* Ensure item.quantity is treated as a number for comparison */}
                {Number(item.quantity) > 0 ? (
                  <p className="in-stock"><strong>Quantity:</strong> {item.quantity}</p>
                ) : (
                  <p className="out-of-stock"><strong>Out of Stock</strong></p>
                )}
              </div>

              <div className='product-actions'>
                <button onClick={() => deleteProduct(item._id)}>Delete</button>
                <Link to={`/update/${item._id}`} className='update-link'>
                  Update
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className='no-products-message'>No products found. Please add some products!</p>
      )}
    </div>
  );
};

export default ProductsList;