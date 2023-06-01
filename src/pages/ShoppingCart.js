import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Fetch from '../common/useFetch';
import HTTP_REQUEST_LINK from '../common/Req_link';
import getToken from '../common/getToken';

export default function ShoppingCart() {
    const navigate = useNavigate();
    var conStyle = {
        backgroundColor: "white",
        borderRadius: 10,
        textAlign: 'center',
        alignSelf: 'center',
        margin: '10em',
        padding: "1vw",
        minHeight: "20rem"
    }
    var conStyle1 = {
        textAlign: 'center',
        alignSelf: 'center',
        margin: '10em',
        padding: "10em"
    }
    var buttonStyle = {

    }

    const [cartItems, setCartItems] = useState(() => {
        return JSON.parse(localStorage.getItem("items"));
    });

    useEffect(() => {
        localStorage.removeItem("items");
        localStorage.setItem("items", JSON.stringify(cartItems));
    }, [cartItems]);

    const purchase = () => {
        var i = 0;
        var l = cartItems.length;
        console.log(l);
        cartItems.forEach((o) => {
            const newo = o.order;
            const remaining = o.order.quantity - o.count;
            newo.quantity = remaining;
            console.log(newo);
            var options = {
                method: 'PUT',
                body: JSON.stringify(newo),
                headers: {
                    "Authorization": "Bearer " + getToken(),
                    'Content-Type': 'application/json'
                }
            }
           
            Fetch(HTTP_REQUEST_LINK + newo.productName + "/update/" + newo.productId, options).then()
            .catch(err => {
                if (err.message !== "") {
                    navigate("/error")
                }
            })
            i =i+ 1;
        });
        console.log(i);
        if (i === l) {
            localStorage.removeItem('items');
            setCartItems({});
        }
        else {
            alert('Problem in Product Updation!!')
        }
    }
    const cdelete = (o) => {
        setCartItems((cart) => cart.filter(o1 => o1.order !== o));
    }
    return (
        <div >{
            (cartItems.length > 0) ? <div style={conStyle}>
                <h2>Shopping Cart Items</h2>
                <Table striped bordered hover size="sm">
                    <thead >
                        <tr>
                            <th>Product ID</th>
                            <th>Product Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Features</th>
                            <th>No of quantity </th>
                            <th>Cancel</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map((row, index) => {
                            return <tr key={index}>
                                <td key={row.order.productId}>{row.order.productId}</td>
                                <td key={row.order.productName}>{row.order.productName}</td>
                                <td key={row.order.productDesc}>{row.order.productDesc}</td>
                                <td key={row.order.price}>{row.order.price}</td>
                                <td key={row.order.features}>{row.order.features}</td>
                                <td key={row.count}>{row.count}</td>
                                <td><Button variant="white" onClick={() => cdelete(row.order)}>X</Button></td>
                            </tr>;
                        })}
                    </tbody>
                </Table>
                <Button style={buttonStyle} onClick={() => purchase()}>Purchase</Button>
            </div> : <div style={conStyle1}><h1>No items in the cart.</h1></div>}
        </div>
    );
}
