import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [company, setCompany] = useState('');
  const [category, setCategory] = useState('');
  const [productImage, setProductImage] = useState(null); // State for new selected image file
  const [imageUrl, setImageUrl] = useState(''); // State to hold the current/new image URL
  const [quantity, setQuantity] = useState(''); // State to hold the quantity

  const params = useParams(); // Gets URL parameters (like product ID)
  const navigate = useNavigate();

  // Fetch product details when component mounts or ID changes
  useEffect(() => {
    getProductDetails();
  }, [params.id]); // Dependency array includes params.id to refetch if ID changes

  const getProductDetails = async () => {
    try {
      let result = await fetch(`http://localhost:8123/products/${params.id}`); // Your backend API
      if (!result.ok) {
        throw new Error(`Failed to fetch product details: ${result.statusText}`);
      }
      const product = await result.json();
      setName(product.name);
      setPrice(product.price);
      setCompany(product.company);
      setCategory(product.category);
      setImageUrl(product.imageUrl || 'https://via.placeholder.com/300x200?text=No+Image'); // Set existing image URL or fallback
      setQuantity(product.quantity); // Set existing quantity
    } catch (error) {
      console.error('Error fetching product details:', error);
      alert(`Could not load product details: ${error.message}`);
      navigate('/'); // Redirect if details can't be fetched
    }
  };

  const handleImageChange = (e) => {
    setProductImage(e.target.files[0]);
  };

  const handleUpdateProduct = async () => {
    // --- Basic Validation ---
    if (!name || !price || !company || !category || quantity === '' || Number(quantity) < 0) {
      alert("Please fill all fields correctly and provide a valid quantity (0 or more).");
      return false;
    }

    let updatedImageUrl = imageUrl; 

  
    if (productImage) { 
      const formData = new FormData();
      formData.append('productImage', productImage);

      try {
        const uploadResponse = await fetch('http://localhost:8123/upload-image', { 
          method: 'POST',
          body: formData,
        });

        if (!uploadResponse.ok) {
          const errorData = await uploadResponse.json();
          throw new Error(errorData.message || 'Image upload failed on backend.');
        }

        const uploadData = await uploadResponse.json();
        updatedImageUrl = uploadData.imageUrl; 
      } catch (uploadError) {
        console.error('Error uploading new image:', uploadError);
        alert(`Failed to upload new image: ${uploadError.message}. Product will be updated with the old image or default.`);
       
      }
    }

    
    try {
      const updateProductResponse = await fetch(`http://localhost:8123/products/${params.id}`, { // Your backend API
        method: 'PUT',
        body: JSON.stringify({
          name,
          price: Number(price),
          company,
          category,
          imageUrl: updatedImageUrl, // Send the new or existing image URL
          quantity: Number(quantity), // Send the updated quantity
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!updateProductResponse.ok) {
        const errorData = await updateProductResponse.json();
        throw new Error(errorData.message || 'Failed to update product.');
      }

      const updateProductData = await updateProductResponse.json();
      if (updateProductData.message === "Product updated successfully") { // Check success message from backend
        alert('Product updated successfully!');
        navigate('/');
      }
    } catch (updateProductError) {
      console.error('Error updating product:', updateProductError);
      alert(`Error updating product: ${updateProductError.message}`);
    }
  };

  return (
    <div className='product'>
      <h1>Update Product</h1>
      <input
        type='text'
        placeholder='Enter product name'
        className='inputBox'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type='number'
        placeholder='Enter product price'
        className='inputBox'
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        type='text'
        placeholder='Enter product company'
        className='inputBox'
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />
      <input
        type='text'
        placeholder='Enter product category'
        className='inputBox'
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      {/* --- Input for Quantity --- */}
      <input
        type='number'
        placeholder='Enter quantity available'
        className='inputBox'
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />

      {/* --- Current Image Display and New Image Upload --- */}
      <div className="current-image-preview">
        <p>Current Image:</p>
        {imageUrl && <img src={imageUrl} alt="Current Product" className="product-image-thumbnail" />}
        <label className="image-upload-label">
          Change Product Image:
          <input
            type='file'
            accept='image/*'
            className='inputBox file-input'
            onChange={handleImageChange}
          />
        </label>
        {productImage && <p className="selected-image-name">New selected: {productImage.name}</p>}
      </div>

      <button onClick={handleUpdateProduct} className='appButton'>
        Update Product
      </button>
    </div>
  );
};

export default UpdateProduct;