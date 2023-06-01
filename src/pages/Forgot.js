import Form from 'react-bootstrap/Form';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Fetch from '../common/useFetch';
import HTTP_REQUEST_LINK from '../common/Req_link';

export default function Forgot() {
    const [validated, setValidated] = useState(false);
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [res, setResponse] = useState({});
    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'name':
                setUser({ ...user, name: value });
                break;
            case 'password':
                setUser({ ...user, password: value });

                break;
            case 'cpassword':
                setUser({ ...user, cpassword: value });
                break;
            default:
                break;
        }
    }
    var cardStyle = {
        backgroundColor: 'white',
        borderRadius: 5,
        padding: "1vw",
        margin: "7em",
    }
    var alignStyle = {
        textAlign: 'center',
        margin: "10px"
    }
    var buttonStyle = {
        position: 'relative',
        marginLeft: "10.5vw"

    }
    const reset = (event) => {
        const form = event.currentTarget;
        console.log(user);
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else if(user.password===user.cpassword){
            event.preventDefault();
            console.log(user.name);
            Fetch(HTTP_REQUEST_LINK+user.name+"/get").then((vuser)=>{
            if(vuser.name!==null){
                console.log(vuser);
                var resetpass={}
                resetpass.id=vuser.id;
                resetpass.email=vuser.email;
                resetpass.password=user.password;
                const requestOptions = {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(resetpass)
                };
                Fetch(HTTP_REQUEST_LINK+user.name+"/forgot",requestOptions).then((res)=>setResponse(res));
                
                if(res.name!==""){
                    alert('Password changed!!!');
                    navigate("/login");
                }
                else{
                    alert('There is a problem in reset password !! try later');
                    setUser({});
                }
            }
            else{
                alert("User name not found!!");
               form.reset();
            }}).catch((err)=>{
                if(err.message!==""){
                    navigate("/error");
                }
                console.log(err.message);
            });
        }
        else{
            console.log("Not same password");
        }
        setValidated(true);
    }
    return (
        <div style={cardStyle}>
            <h1 style={alignStyle}>New Password Setup</h1>
            <Form noValidate validated={validated}  onSubmit={reset}>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter Username" required  onBlur={handleChange} name="name" />
                    <Form.Control.Feedback type="invalid">please provide username</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" required   onBlur={handleChange} name="password"/>
                    <Form.Control.Feedback type="invalid">please provide password</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword1">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm Password" required  onBlur={handleChange} name="cpassword" pattern={user.password} />
                    <Form.Control.Feedback type="invalid">please provide same password</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Button style={buttonStyle} type="submit">Reset password</Button>
                </Form.Group>
            </Form>
        </div>
    );
}