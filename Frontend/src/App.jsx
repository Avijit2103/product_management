import './App.css'
import Nav from './components/Nav'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Signup from './components/Sign-up'
import PrivateComp from './components/PrivateComponent.jsx'
import Login from './components/Login.jsx'
import AddProduct from './components/AddProduct.jsx'
import ProductsList from './components/ProductsList.jsx'
import UpdateProduct from './components/Updateproduct.jsx'
import Profile from './components/Profile.jsx'
function App() {

  return (
    <>
      <BrowserRouter>
      <Nav/>
      <Routes>
      <Route  element={<PrivateComp/>}>
       <Route path = "/" element = {<ProductsList/>}/>
       <Route path = "/add" element = {<AddProduct/>}/>
       <Route path = "/update/:id" element = {<UpdateProduct/>}/>
       <Route path = "/logout" element = {<h1>  logout  </h1>}/>
       <Route path = "/Profile" element = {<Profile/>}/>
       </Route>
       <Route path ="/Signup" element = {<Signup/>}/>
       <Route path='/login' element={<Login/>}/>
      </Routes>
      
      </BrowserRouter>
      
      
    </>
  )
}

export default App
