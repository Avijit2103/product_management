import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const ProductsList = () => {
  const [products, setProducts] = useState([])
  useEffect(() => {
    getProduct();
  }, [])
  const getProduct = async () => {
    let result = await fetch('http://localhost:5000/products')
    result = await result.json()
    setProducts(result);

  }
  const deleteProduct = async (id) => {
    let result = await fetch(`http://localhost:5000/products/${id}`, {
      method: 'DELETE',
      headers: {
        "content-Type": "application/json",
      }
    })
    result = await result.json()
    if (result) {
      getProduct();
    }

  }
  return (
    <div className='productList' >
      <h1> Product List </h1>
      <ul >
        <li>index</li>
        <li>Name</li>
        <li>Price</li>
        <li>Company</li>
        <li>Category</li>
      </ul>
      {
        products.map((item, index) =>
          <>
            <ul key={item._id}>
              <li>{index + 1}</li>
              <li>{item.name}</li>
              <li>{item.price}</li>
              <li>{item.company}</li>
              <li>{item.category}</li>
              <li>
                <button onClick={() => deleteProduct(item._id)}>Delete</button>
                <Link to={`/update/${item._id}`}> Update </Link>
              </li>
            </ul>
          </>
        )
      }
    </div>


  )
}
export default ProductsList