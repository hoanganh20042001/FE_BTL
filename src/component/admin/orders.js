import React from 'react';
import CartCard from "../general/cartCard";
import { Grid } from "@mantine/core";
import axios from 'axios';

const paymentItems = [{
    id: 1,
    name: "Rolex-1AB",
    img: "https://cdn3.dhht.vn/wp-content/uploads/2021/01/dong-ho-rolex-nam-nu-chinh-hang-gia-bao-nhieu-danh-gia-chi-tiet.jpg",
    price: "3000000",
    quantity: 1,
    brand: "Rolex"
}]

export default function Orders() {
    const [total, setTotal] = React.useState(0);
    const [orders, setOrders] = React.useState([])
    React.useEffect(() => {
        axios.get('http://localhost:8080/api/payment/getordered/').then((response) => {
            console.log(response);
            setOrders(response.data)
        }).catch((error) => {
            console.log(error);
        })
    }, [])
    return <div>
        {orders.map((item) => (
            <Grid.Col>
                <CartCard
                    img={item.image}
                    name={item.name}
                    price={item.price}
                    quantity={
                        item.quantity ? item.quantity : item.count
                    }
                    setTotal={setTotal}
                    brand={item.brand}
                    payment={true}
                    username={item.userName}
                    date={item.orderDate}
                    order={true}
                    id={item.productId}
                    orderId={item.orderId}
                    ordCusId={item.customerId}
                />
            </Grid.Col>
        ))}
    </div>
}