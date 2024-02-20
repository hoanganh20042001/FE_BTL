import React from 'react';
import { Button, Container, Grid, Group, Text, Title } from '@mantine/core';
import '../../css/cart.css';
import { useState, useContext, useEffect } from 'react';
import CartCard from '../general/cartCard';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Cart() {
    const [total, setTotal] = useState(0);
    const [cartList, setCartList] = useState([])

    const handlePayment = async () => {
        const products = cartList.map((cartItem) => {
            return {
                id: cartItem.id,
                quantity: cartItem.quantity,
            };
        });

        const newCart = {
            userid:parseInt(sessionStorage.getItem("id")),
            product:products,       
        };

        console.log(newCart);
        await axios.post(`http://localhost:8080/api/cart/update`, newCart)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    React.useEffect(() => {
        if (localStorage.getItem("cart")) {
            setCartList(JSON.parse(localStorage.getItem("cart")));
        } else {
            const id =  parseInt(sessionStorage.getItem('id'));
            console.log(id);
            axios.get(`http://localhost:8080/api/cart/${id}`)
                .then((response) => {
                    console.log(response.data);
                    setCartList(response.data)
                }).catch((error) => {
                    console.log(error);
                })
        }
    }, [])

    React.useEffect(() => {
        if (cartList.length > 0) {
            const totals = cartList.reduce((total, item) => total + parseInt(item.quantity) * parseInt(item.price), 0)
            setTotal(totals);
        }
        else {
            setTotal(0);
        }
        console.log(total);
    }, [cartList])

    return (
        <Container style={{ marginTop: 80 }} className="cart-container">
            <Grid >
                <Grid.Col>
                    <Title order={1} style={{ textAlign: "center" }}>
                        Giỏ hàng
                    </Title>
                </Grid.Col>
                {cartList.map(item => <Grid.Col>
                    <CartCard id={item.id} img={item.image} name={item.name} price={item.price} quantity={item.quantity} brand={item.brand} setTotal={setTotal} cartList={cartList} setCartList={setCartList} />
                </Grid.Col>)}
                <Grid.Col>
                    <Group direction="row" position="right">
                        <Text style={{ fontSize: 30, fontWeight: '500' }}>Tổng tiền: {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                        }).format(total)}</Text>
                        <Link to="/payment">
                            <Button variant='outline' color="#339af0" size='lg' onClick={() => handlePayment()}>Thanh toán</Button>
                        </Link>
                    </Group>
                </Grid.Col>
            </Grid>
        </Container >
    );
}