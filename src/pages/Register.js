import React from 'react';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Fetch from '../common/useFetch';
import HTTP_REQUEST_LINK from '../common/Req_link';
function Register() {
    var cardStyle = {
        backgroundColor: 'white',
        borderRadius: 5,
        margin: "4vw",
        padding: "1vw"
    }
    var table = {
        borderCollapse: "separate",
        borderSpacing: "1em",
        width: "60vw",
    }
    var alignStyle = {
        textAlign: 'center'
    }
    var buttonStyle = {
        position: 'relative',
    }
    var registerStyle = {
        textAlign: "end"
    }
    
    const ilength=['101','102','103'];
    const elength=["sam@gmail.com","abc@gmail.com"];
    const [validated, setValidated] = useState(false);
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [errors,setErrors]=useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'fname':
                setUser({ ...user, fname: value });
                break;
            case 'lname':
                setUser({ ...user, lname: value });
                break;
            case 'email':
                setUser({ ...user, email: value });
                setErrors({});
                break;
            case 'password':
                setUser({ ...user, password: value });
                break;
            case 'cpassword':
                setUser({ ...user, cpassword: value });
                break;
            case 'id':
                setUser({ ...user, id: value });
                setErrors({});
                break;
            case 'contact':
                setUser({ ...user, contactno: value });
                break;
            default:
                break;
        }
       
    }
    const emailfindErrors=()=>{
        const email=user.email;
        var newErrors="";
        if(!email||email==="") newErrors="Please provide email"
        else if(elength.includes(email)) newErrors="email must be unique"  
        return newErrors;
    }

    const idfindErrors=()=>{
        const id=user.id;
        var newErrors="";
        if(!id||id==="") newErrors="Please provide Login ID"
        else if(ilength.includes(id)) newErrors="ID must be unique"
        return newErrors;
    }

    const register = (event) => {
        const form = event.currentTarget;
        console.log(user);
        const newErrors={}
        newErrors.id=idfindErrors();
        newErrors.email=emailfindErrors();
         if (form.checkValidity() === false||newErrors.id!==""||newErrors.email!=="") {
            event.preventDefault();
            event.stopPropagation();
            setErrors(newErrors);
        }  
        else if (user.password === user.cpassword) {
            event.preventDefault();
            event.stopPropagation();
            user.type="customer";
            user.name=user.fname+" "+user.lname;
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user)
            };
            Fetch(HTTP_REQUEST_LINK+"register", requestOptions).then((data)=>{
            if (data.username) {   
                alert('New Customer account created successfully!!');
                navigate("/login");
            }
            else {
                 alert('Problem in creating account')
            }
        }).catch((err)=>{
            if(err.message!==""){
                navigate("/error");
            }
            console.log(err.message);
        });         
        }
        else {
            console.log("Not same password");
        }
        console.log(errors);
        setValidated(true);
    }


    return (
        <div style={cardStyle}>
            <h1 style={alignStyle}>Customer Registration </h1>
            <Form noValidate validated={validated} onSubmit={register}>
                <table style={table}>
                    <tbody>
                        <tr>
                            <td>
                                <Form.Group className="mb-3" controlId="formBasicName1">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter First name" required  onBlur={handleChange} name="fname"  />
                                    <Form.Control.Feedback type="invalid">please provide first name</Form.Control.Feedback>
                                </Form.Group>
                            </td>
                            <td>
                                <Form.Group className="mb-3" controlId="formBasicName2">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Last Name" required  onBlur={handleChange} name="lname" />
                                    <Form.Control.Feedback type="invalid">please provide last name</Form.Control.Feedback>
                                </Form.Group>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" required  onBlur={handleChange} name="email"  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" isInvalid={!!errors.email} isValid={errors.email}/>
                                    <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                                </Form.Group>
                            </td>

                            <td>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" required  onBlur={handleChange} name="password"  />
                                    <Form.Control.Feedback type="invalid">please provide  password</Form.Control.Feedback>
                                </Form.Group>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Form.Group className="mb-3" controlId="formBasicId">
                                    <Form.Label>Login ID</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Login Id" required  onBlur={handleChange} name="id" isInvalid={!!errors.id} isValid={errors.id} />
                                    <Form.Control.Feedback type="invalid">{errors.id}</Form.Control.Feedback>
                                </Form.Group>
                            </td>
                            <td>
                                <Form.Group className="mb-3" controlId="formBasicPassword1">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control type="password" placeholder="Confirm Password" required  onBlur={handleChange} name="cpassword" pattern={user.password}/>
                                    <Form.Control.Feedback type="invalid">please provide same password</Form.Control.Feedback>
                                </Form.Group>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Form.Group className="mb-3" controlId="formBasicContact">
                                    <Form.Label>Contact No </Form.Label>
                                    <Form.Control type="text" placeholder="Contact Number" required  onBlur={handleChange} name="contact" pattern="(7\d|8\d|9\d)\d{8}$"/>
                                    <Form.Control.Feedback type="invalid">please provide a valid phone no</Form.Control.Feedback>
                                </Form.Group>
                            </td>
                            <td style={registerStyle}>
                                <Form.Group className="mb-3">
                                    <Button style={buttonStyle} type="submit" >Register</Button>
                                </Form.Group>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </Form>
        </div>

    );
}


export default Register;