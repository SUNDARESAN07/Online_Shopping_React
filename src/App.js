import './App.css';
import Header from './components/Header';
import Content from './components/content';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Main from './pages/Main';
import NoPage from './pages/NoPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Product from './pages/Product';
import AddProduct from './pages/product/AddProduct'; 
import UpdateProduct from './pages/product/UpdateProduct';
import ShoppingCart from './pages/ShoppingCart';
import Forgot from './pages/Forgot';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route  element={ <Content /> }>
          <Route path="/" element={<Main />} />
          <Route path="*" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/product" element={<Product />} />
          <Route path="/product/add" element={<AddProduct />} />
          <Route path="/product/update/:id" element={<UpdateProduct />} />
          <Route path="/error" element={<NoPage />} />
          </Route>  
        </Routes>        
      </BrowserRouter>     
    </div>
  );
}

export default App;
