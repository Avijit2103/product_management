import React, { useEffect, useState } from 'react';
import { useParams ,useNavigate} from 'react-router-dom';

const UpdateProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const [error, setError] = useState(false)
    const { id } = useParams()
    const navigate = useNavigate()

    const getProductDetails = async () => {
        //console.log(name,price,category,company)
        let res = await fetch(`http://localhost:5000/products/${id}`);
        res = await res.json()
        setName(res.name)
        setPrice(res.price)
        setCategory(res.category)
        setCompany(res.company)
    }

    useEffect(() => {
        console.log(id);
        getProductDetails();
    }, [])

    const UpdateProduct = async () => {
        let res = await fetch(`http://localhost:5000/products/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                price: price,
                category: category,
                company: company
            })
        })
        res = await res.json()
        console.log(res);
        navigate('/')
    }

    return (
        <div className='form'> {/* Changed className from 'product' to 'form' for consistent styling */}
            <h1>Update Product</h1>
            <input type='text' placeholder='enter product name' className='inputBox'
                value={name}
                onChange={(e) => {
                    setName(e.target.value);
                }} />
            {error && !name && <span className='errorBox'>*Enter a valid name*</span>}
            <input type='text' placeholder='enter product price' className='inputBox'
                value={price}
                onChange={(e) => {
                    setPrice(e.target.value);
                }} />
            {error && !price && <span className='errorBox'>*Enter a valid price*</span>}
            <input type='text' placeholder='enter product category' className='inputBox'
                value={category}
                onChange={(e) => {
                    setCategory(e.target.value);
                }} />
            {error && !category && <span className='errorBox'>*Enter a valid category*</span>}
            <input type='text' placeholder='enter product company' className='inputBox'
                value={company}
                onChange={(e) => {
                    setCompany(e.target.value);
                }} />
            {error && !company && <span className='errorBox'>*Enter a valid company*</span>}
            <button className='submit'
                onClick={UpdateProduct}
            >Update Product</button>
        </div>
    )
}
export default UpdateProduct;
