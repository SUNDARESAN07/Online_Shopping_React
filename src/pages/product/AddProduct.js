import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import getToken from '../../common/getToken';
import HTTP_REQUEST_LINK from '../../common/Req_link';
import Fetch from '../../common/useFetch';
function AddProduct(){
    const [validated, setValidated] = useState(false);
    const navigate = useNavigate();
    const [product, setProduct] = useState({});
    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case '_id':
                setProduct({ ...product, productId: value });
                break;
            case 'name':
                setProduct({ ...product, productName: value });
                break;
            case 'desc':
                setProduct({ ...product, productDesc: value });
                break;
            case 'features':
                setProduct({ ...product, features: value });
                break;
            case 'price':
                setProduct({ ...product, price: value });
                break;
            case 'quantity':
                setProduct({ ...product, quantity: value });
                break;

            default:
                break;
        }
    }

    const addProduct = (event) => {
        const form = event.currentTarget;
        console.log(product);
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else {
            const requestOptions = {
                method: 'POST',
                headers: {"Authorization": "Bearer " + getToken(), 'Content-Type': 'application/json' },
                body: JSON.stringify(product)
            };
              Fetch(HTTP_REQUEST_LINK+product.productName+"/add", requestOptions)
              .then((data)=>{
                   if(data){
                    alert('Product added successfully');
                    navigate("/product")
                   }
                   else{
                    alert('problem in adding record');
                   }
              }).catch((err)=>{
                if (err.message !== "") {
                    navigate("/error")
                }
              })
        }
        setValidated(true);
    }
        var cardStyle = {
            backgroundColor: 'white',
            borderRadius: 5,
            padding: "10px 15px",
            width: "30%",
            margin: "3vw"
        }
        var buttonStyle = {
            position: 'relative'
        }
        var alignStyle = {
            textAlign: 'center',
            margin:"10px"
        }
        return (

            <div style={cardStyle}>
                <h3 style={alignStyle}>ADD PRODUCT</h3>
                <Form noValidate validated={validated}>
                    <Form.Group className="mb-3" controlId="formBasicId">
                        <Form.Label>Product ID</Form.Label>
                        <Form.Control type="number"   onBlur={handleChange} name="_id" required/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control type="text" onBlur={handleChange} name="name" required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="textarea" onBlur={handleChange} name="desc" required/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPrice">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="number"  onBlur={handleChange} name="price" required step="0.001"/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicFeatures">
                        <Form.Label>Features</Form.Label>
                        <Form.Control type="textarea" onBlur={handleChange} name="features" required/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicQuantity">
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control type="number" onBlur={handleChange} name="quantity" required  />
                    </Form.Group>
                  
                    <Form.Group className="mb-3">
                        <Button style={buttonStyle} onClick={addProduct}> Add</Button>
                    </Form.Group>
                </Form>
            </div>

        );
    }

export default AddProduct;