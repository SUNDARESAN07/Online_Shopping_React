import React from 'react';
import Form from 'react-bootstrap/Form';
import NavigateButton from '../components/NavigateButton';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Fetch from '../common/useFetch';
import HTTP_REQUEST_LINK from '../common/Req_link';

function Login() {
    const [validated, setValidated] = useState(false);
    const navigate = useNavigate();
    const [user, setUser] = useState({});

    var cardStyle = {
        backgroundColor: 'white',
        borderRadius: 5,
        padding: "10px 15px",
        width: "30%",
        margin: "4vw"
    }
    var alignStyle = {
        textAlign: 'center',
        margin: "10px"
    }
    var buttonStyle = {
        position: 'relative',
        marginLeft: "10.5vw"

    }
    var buttonStyle1 = {
        position: 'relative',
        padding: "0px"

    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'id':
                setUser({ ...user, id: value });
                break;
            case 'email':
                setUser({ ...user, email: value });

                break;
            case 'password':
                setUser({ ...user, password: value });
                break;
            default:
                break;
        }
    }
    const login = (event) => {
        const form = event.currentTarget;
        console.log(user);
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else {
            event.preventDefault();
            event.stopPropagation();
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user)
            };
            Fetch(HTTP_REQUEST_LINK+"login", requestOptions).then((data)=>{
           
            if (data.valid) {
                console.log(data);
                localStorage.setItem("auth_user",JSON.stringify(data));
                alert('Login Successfully');
                navigate("/product");
            }
            else {
                 console.log(data);
                 alert('Invalid User')
            }
        }).catch((err)=>{
            if(err.message!==""){
                navigate("/error");
            }
            console.log(err.message);
        });
        }
        setValidated(true);
    }
    
    return (
        <div style={cardStyle}>
            <h1 style={alignStyle}>Login</h1>
            <Form noValidate validated={validated} onSubmit={login}>
                <Form.Group className="mb-3" controlId="formBasicId">
                    <Form.Label>Login ID</Form.Label>
                    <Form.Control type="number" placeholder="Enter Login id"
                        max="9999" required onBlur={handleChange} name="id" test="id"/>
                    <Form.Control.Feedback type="invalid">
                        Please type valid id - [Max 4 digits ].
                    </Form.Control.Feedback>
                    <p></p>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email"
                        required onBlur={handleChange} name="email" test="email"/>
                    <Form.Control.Feedback type="invalid">
                        Please type a valid email.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" required minLength="4" onBlur={handleChange} name="password" test="password" />
                    <Form.Control.Feedback type="invalid">
                        Password must be atleast 4 chars.
                    </Form.Control.Feedback>
                </Form.Group>
                <NavigateButton buttonTitle={"forgot password?"} buttonStyle={buttonStyle1} variant={"link"} route={'/forgot'} isReplaced={false} /><br /><br />
                <Form.Group className="mb-3">
                    <Button style={buttonStyle} type="submit" data-cy="signin" >Sign In</Button>

                    <p style={alignStyle}>To Create an account</p>
                    <NavigateButton buttonTitle={"Sign up"} buttonStyle={buttonStyle} variant={"danger"} route={'/register'} isReplaced={false} />
                </Form.Group>
            </Form>
        </div>
    );
}


export default Login;