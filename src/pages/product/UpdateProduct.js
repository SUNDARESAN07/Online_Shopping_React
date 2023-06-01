import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useLocation, useNavigate } from "react-router-dom";
import Fetch from '../../common/useFetch';
import getToken from '../../common/getToken';
import HTTP_REQUEST_LINK from '../../common/Req_link';
const UpdateProduct = () => {
    const [validated, setValidated] = useState(false);
    const navigate = useNavigate();
    const { state } = useLocation();
    const [product, setProduct] = useState(
        {
         "productId": state.data.productId,
         "productName": state.data.productName ,
         "productDesc":state.data.productDesc,
         "features":state.data.features,
         "price":state.data.price,
         "quantity":state.data.quantity
        }
        );
    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
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

    const updateProduct = (event) => {
        const form = event.currentTarget;
        console.log(product);
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else {
            var options = {
                    method: 'PUT',
                    body: JSON.stringify(product),
                    headers: {
                        "Authorization": "Bearer " + getToken(),
                        'Content-Type': 'application/json'
                    }
            }
            Fetch(HTTP_REQUEST_LINK+state.data.productName+"/update/"+state.data.productId, options).then((data) => {
                console.log(data);
               if(data!==""){
                alert('Product Updated successfully!!')
                navigate("/product");
            }
            else{
                alert('Problem in Product Updation!!')
                navigate("/product");
            }
            }).catch(err => {
               
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
        margin: "10px"
    }
    return (

        <div style={cardStyle}>
            <h3 style={alignStyle}>UPDATE PRODUCT</h3>
            <Form noValidate validated={validated} >
                <Form.Group className="mb-3" controlId="formBasicId">
                    <Form.Label>Product ID</Form.Label>
                    <Form.Control type="number" defaultValue={product.productId} disabled />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control type="text" defaultValue={product.productName} disabled />

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="textarea" defaultValue={product.productDesc} onBlur={handleChange} name="desc" required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPrice">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="number" defaultValue={product.price} onBlur={handleChange} name="price" required step="0.001"/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicFeatures">
                    <Form.Label>Features</Form.Label>
                    <Form.Control type="textarea" defaultValue={product.features} onBlur={handleChange} name="features" required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicQuantity">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control type="number" defaultValue={product.quantity} onBlur={handleChange} name="quantity" required />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Button  style={buttonStyle}  onClick={updateProduct} >Update</Button>
                </Form.Group>
            </Form>
        </div>

    );
}

export default UpdateProduct;