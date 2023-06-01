import React, { useEffect, useState } from 'react';
import Card from '../../components/Card';


function ProductData({products,user,deleteProduct}) {
    const [items, setItems] = useState([]);
    var Iorder = {
        order: {},
        count: 0
    }
    var [shopList, setShopList] = useState([]);
    var cardStyle = {
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        columnGap: "2em",
        rowGap: "2em",
        margin: "3vw"
    }
    const orders = (o, q) => {
        console.log(o["_id"]);
        console.log(q);
        if (items.includes(o)) {
            console.log("New count:" + q);
            setShopList((shop) => shop.filter(o1 => o1.order !== o))
            Iorder.order = o;
            Iorder.count = q;
            setShopList(shop => [...shop, Iorder]);
            console.log(shopList);
        }
        else {
            setItems(i => [...i, o]);
            Iorder.order = o;
            Iorder.count = q;
            setShopList(shop => [...shop, Iorder]);
            console.log(shopList);
        }
    }
    useEffect(() => {
        localStorage.removeItem('items');
        localStorage.setItem('items', JSON.stringify(shopList));
    }, [shopList]);

    return (
        <div style={cardStyle}>
            {products.map((row, i) => {
                return <Card data={row} show={user} index={i} addItem={orders} key={i} deleteItem={deleteProduct}/>
            })}
        </div>

    );

}

export default ProductData;