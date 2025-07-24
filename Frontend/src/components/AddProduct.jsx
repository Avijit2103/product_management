import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [company, setCompany] = useState('');
  const [category, setCategory] = useState('');
  const [productImage, setProductImage] = useState(null); 
  const [quantity, setQuantity] = useState(''); 
  const [error, setError] = useState(false); 

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    // Set the selected file to state
    const file = e.target.files[0];
    if (file) {
      setProductImage(file);
    } else {
      setProductImage(null);
    }
  };

  const handleAddProduct = async () => {
    // --- Basic Validation ---
    // Check if all text fields are filled and quantity is valid
    if (!name || !price || !company || !category || quantity === '' || Number(quantity) < 0) {
      setError(true);
      alert("Please fill all product details, including a valid quantity (0 or more).");
      return false;
    }

    let finalImageUrl = 'https://via.placeholder.com/300x200?text=No+Image'; // Default placeholder URL

    // --- Step 1: Upload Image to Backend (if a file is selected) ---
    if (productImage) {
      const formData = new FormData();
      formData.append('productImage', productImage); // 'productImage' must match the backend's upload.single() field name

      try {
        // IMPORTANT: Use your backend's URL and PORT (e.g., http://localhost:8123)
        // If deployed on Render, use your Render backend's URL.
        const uploadResponse = await fetch('https://product-management-opy.onrender.com/upload-image', {
          method: 'POST',
          body: formData,
          // Do NOT set Content-Type header for FormData; fetch sets it automatically with correct boundary
        });

        if (!uploadResponse.ok) {
          const errorData = await uploadResponse.json();
          throw new Error(errorData.message || 'Image upload failed on backend.');
        }

        const uploadData = await uploadResponse.json();
        finalImageUrl = uploadData.imageUrl; // Get the Cloudinary URL from the backend response
      } catch (uploadError) {
        console.error('Error uploading image:', uploadError);
        alert(`Failed to upload image: ${uploadError.message}. Product will be added without a custom image.`);
        // Decide: either stop here or proceed with default image URL
        // For now, we proceed with the default placeholder if upload fails
      }
    }

    // --- Step 2: Add Product Details with Image URL and Quantity ---
    // Assuming userId is stored in localStorage after user login
    const auth = localStorage.getItem('user');
    const userId = auth ? JSON.parse(auth)._id : null; // Get userId if available

    try {
      const addProductResponse = await fetch('https://product-management-opy.onrender.com/add-product', { // Your backend API on Render
        method: 'POST',
        body: JSON.stringify({
          name,
          price: Number(price), // Convert to number
          company,
          category,
          userId,
          imageUrl: finalImageUrl, // Send the Cloudinary URL or placeholder
          quantity: Number(quantity), // Convert to number
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!addProductResponse.ok) {
        const errorData = await addProductResponse.json();
        throw new Error(errorData.message || 'Failed to add product.');
      }

      const addProductData = await addProductResponse.json();
      if (addProductData._id) { // Check if product was successfully added (assuming _id is returned)
        alert('Product added successfully!');
        navigate('/'); // Redirect to product list
      }
    } catch (addProductError) {
      console.error('Error adding product:', addProductError);
      alert(`Error adding product: ${addProductError.message}`);
    }
  };

  return (
    <div className='product'> {/* This 'product' class will be styled to be centered */}
      <h1>Add Product</h1>
      <input
        type='text'
        placeholder='Enter product name'
        className='inputBox'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {error && !name && <span className='invalid-input'>Enter valid name</span>}

      <input
        type='number' // Use type='number' for price
        placeholder='Enter product price'
        className='inputBox'
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      {error && !price && <span className='invalid-input'>Enter valid price</span>}

      <input
        type='text'
        placeholder='Enter product company'
        className='inputBox'
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />
      {error && !company && <span className='invalid-input'>Enter valid company</span>}

      <input
        type='text'
        placeholder='Enter product category'
        className='inputBox'
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      {error && !category && <span className='invalid-input'>Enter valid category</span>}

      {/* --- New Input for Quantity --- */}
      <input
        type='number' // Use type='number' for quantity
        placeholder='Enter quantity available'
        className='inputBox'
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      {error && (quantity === '' || Number(quantity) < 0) && <span className='invalid-input'>Enter valid quantity (0 or more)</span>}

      {/* --- New Input for Image Upload --- */}
      <label className="image-upload-label">
        Product Image:
        <input
          type='file'
          accept='image/*' // Restrict file selection to image types
          className='inputBox file-input'
          onChange={handleImageChange}
        />
      </label>
      {/* Display selected file name if available */}
      {productImage && <p className="selected-image-name">Selected: {productImage.name}</p>}

      <button onClick={handleAddProduct} className='appButton'>
        Add Product
      </button>
    </div>
  );
};

export default AddProduct;