import { Button } from 'react-bootstrap';
import { FiEdit } from 'react-icons/fi';
import { MdDelete } from 'react-icons/md'
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function Card({ data, show, index, addItem ,deleteItem}) {
    const [count, setCount] = useState(0);
    const navigate = useNavigate();
   
    var cardStyle = {
        borderRadius: 10,
        borderColor: "white",
        display: "inline-grid",
        textAlign: "center"
    }
    var headerStyle = {
        opacity: "0.6",
        padding: "1em",
        minHeight: "17em",
        backgroundColor: "white",
        borderTopLeftRadius: "10px",
        borderTopRightRadius: "10px"
    }
    var ButtonStyle = {
        margin: 10,
        display: "flex",
        alignItems: "center",
        padding: 3
    }
    var MButtonStyle = {
        display: "flex",
        alignItems: "center",
        margin: "auto",
        justifyContent: "center"
    }
    var imgStyle = {
        width: "7em",
        height: "7em",
        borderRadius: 50,
        margin: "auto"
    }
    var bodyStyle = {
        padding: "1em 0em",
        backgroundColor: 'white',
        borderBottomLeftRadius: "10px",
        borderBottomRightRadius: "10px"
    }

    function handleIncrement(data) {
        if (count < data.quantity) {
            setCount(count + 1);
        }
    };
    function handleDecrement() {
        if (count > 0) {
            setCount(count - 1);
        }
    };
    return (
        <div style={cardStyle} key={data.productName}>
            <div style={headerStyle}>
                <img src='shop-logo.png' style={imgStyle} alt="appLogo"></img>
                <h4>{data.productName}</h4>

            </div>
            <div style={bodyStyle}>
                <h6>Product ID:{data.productId}</h6>
                <h6>Description:{data.productDesc}</h6>
                <h6>Features:{data.features}</h6>
                <h6>Price: {data.price}$</h6>
                <h6>{(data.quantity > 0) ? "HURRY UP TO PURCHASE" : "OUT OF STOCK"}</h6>

                {show ? <div>
                    {(data.quantity > 0) ?
                        <div style={MButtonStyle}>
                            <Button onClick={() => handleIncrement(data)} style={ButtonStyle}>+</Button>
                            <span >{count}</span>
                            <Button onClick={handleDecrement} style={ButtonStyle}>-</Button>
                        </div> : null}
                    <div style={MButtonStyle} >
                        {(data.quantity > 0 && count > 0) ? <Button size="sm" style={ButtonStyle} onClick={() => addItem(data, count)}><AiOutlineShoppingCart /> Buy </Button> : null}
                        <Button size="sm" style={ButtonStyle} onClick={() => {
                            navigate('/product/update/' + data.productId, { state: { data } })
                        }} > <FiEdit /> Modify</Button>
                        <Button size="sm" style={ButtonStyle} onClick={()=>deleteItem(data.productId,data.productName)}><MdDelete /> Delete</Button>
                    </div></div>
                    : null}
            </div>
        </div>
    );
}