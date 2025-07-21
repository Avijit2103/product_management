import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    // State variables for product details
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const navigate = useNavigate();

    // Function to handle adding a new product
    const handleAddProduct = async () => {
        // Basic client-side validation
        if (!name || !price || !category || !company) {
            alert('Please fill in all fields to add a product.');
            return;
        }

        // Assuming user data is stored in localStorage for authorization
        const auth = localStorage.getItem('userdata');
        let userId = '';
        if (auth) {
            userId = JSON.parse(auth)._id; // Extract user ID if available
        } else {
            alert('You must be logged in to add a product.');
            navigate('/login'); // Redirect to login if not authenticated
            return;
        }

        try {
            // Make a POST request to the add product API endpoint
            let result = await fetch('https://product-management-opy.onrender.com/add-product', {
                method: 'POST',
                body: JSON.stringify({ name, price, category, company, userId }),
                headers: {
                    'Content-Type': 'application/json',
                    // You might need an Authorization header here if your backend requires it
                    // 'Authorization': `Bearer ${JSON.parse(auth).token}`
                },
            });

            // Check for HTTP errors
            if (!result.ok) {
                const errorData = await result.json();
                alert(errorData.message || 'Failed to add product. Please try again.');
                return;
            }

            result = await result.json();
            console.log(result);

            if (result) {
                alert('Product added successfully!');
                navigate('/'); // Redirect to product list after successful addition
            } else {
                alert('Product could not be added.');
            }
        } catch (error) {
            console.error('Error adding product:', error);
            alert('An error occurred while adding the product. Please try again later.');
        }
    };

    return (
        <div className='form'> {/* Use the 'form' class for consistent styling */}
            <h1>Add Product</h1> {/* Heading for the form */}
            <input
                type="text"
                className='inputBox' // Use 'inputBox' class for consistent input styling
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='Enter Product Name'
                aria-label='Product Name'
            />
            <input
                type="text"
                className='inputBox' // Use 'inputBox' class
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder='Enter Product Price'
                aria-label='Product Price'
            />
            <input
                type="text"
                className='inputBox' // Use 'inputBox' class
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder='Enter Product Category'
                aria-label='Product Category'
            />
            <input
                type="text"
                className='inputBox' // Use 'inputBox' class
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder='Enter Product Company'
                aria-label='Product Company'
            />
            <button
                type='submit'
                onClick={handleAddProduct}
                className='submit' // Use 'submit' class for consistent button styling
            >
                Add Product
            </button>
        </div>
    );
};

export default AddProduct;
