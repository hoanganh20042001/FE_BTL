import React from 'react';
import { Card, Image, Text, Button, Group, Badge, Popover } from '@mantine/core';
import { Check, X } from 'tabler-icons-react';
import { useWindowScroll } from '@mantine/hooks';
import { Link } from 'react-router-dom';
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { SiCashapp } from "react-icons/si";
import { PaymentItemsContext } from '../general/paymentItemsContext';
import "../../css/product.css";
import axios from 'axios';

export default function ProductCard({ id, img, brand, name, price }) {
    const [scroll, scrollTo] = useWindowScroll();
    const [paymentItems, setPaymentItems] = React.useContext(PaymentItemsContext);
    const [reqLogin, setReqLogin] = React.useState(false);
    const [failed, setFailed] = React.useState(false);
    const [success, setSuccess] = React.useState(false);

    const handleAddToCart = () => {
        const userid = parseInt(sessionStorage.getItem(id));
        if (!userid) {
            if (!localStorage.getItem("cart")) {
                localStorage.setItem("cart", JSON.stringify([]));
            }
            let tempCart = JSON.parse(localStorage.getItem("cart"));
            for (let i = 0; i < tempCart.length; i++) {
                if (tempCart[i].id === id) {
                    console.log(tempCart[i].id);
                    setFailed(true);
                    return false;
                }
            }
            tempCart.push({ id: id, image: img, brand: brand, name: name, price: price, quantity: 1 });
            localStorage.setItem("cart", JSON.stringify(tempCart));
            setSuccess(true);
            return false;
        }
        const data = {
            customid: userid,
            productid: id,
            quantity: 1
        }
console.log(data);
        axios.post(`http://localhost:8080/api/cart/add`,data)
            .then((response) => {
                console.log(response);
                if (response.data !== "success") {
                    setFailed(true);
                }
                else {
                    setSuccess(true);
                }
            }).catch((error) => {
                console.log(error);
            })
    }

    return (
        <div style={{ width: "auto", marginLeft: 10, marginRight: 10 }}>
            <Card shadow="md" p="lg">
                <Card.Section style={{ marginBottom: 20, padding: 5 }}>
                    <Link to={`/detail/${id}`} onClick={() => scrollTo({ y: 0 })}>
                        <Image src={img} height="50vh" alt="watch" className='product-img-zoom' onClick={() => scrollTo({ y: 0 })} />
                    </Link>
                </Card.Section>
                <Popover
                    opened={!failed ? success : failed}
                    onClose={() => { setFailed(false); setSuccess(false) }}
                    target={<Badge size="lg" color="red">
                        {brand}
                    </Badge>}
                    width={260}
                    position="right"
                    withArrow
                >
                    {reqLogin ? <Text color="gray">Vui lòng đăng nhập để mua hàng <X color='red' /></Text> : failed ?
                        <Text color="gray">Sản phẩm đã có trong giỏ hàng <X color='red' /></Text> : success ?
                            <Text color="gray">Thêm thành công  <Check color='green' /></Text> : null}
                </Popover>

                <Link to={`/detail/${id}`} style={{ textDecoration: 'none' }} onClick={() => scrollTo({ y: 0 })}>
                    <Text weight={500} className="product-name" onClick={() => scrollTo({ y: 0 })}>{name}</Text>
                </Link>
                <Text weight={500} color="red" align='right' size="xl">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)}</Text>
                <Group direction='row' grow style={{ marginTop: 10 }}>
                    <Link to="/payment" style={{ textDecoration: 'none' }}>
                        <Button fullWidth leftIcon={<SiCashapp />}
                            variant="outline"
                            className="product-card-btn"
                            onClick={() => {
                                setPaymentItems([{
                                    id, img, brand, name, price, count: 1
                                }]); scrollTo({ y: 0 })
                            }}
                        >
                            Mua ngay
                        </Button>
                    </Link>
                    <Button fullWidth leftIcon={<MdOutlineAddShoppingCart />}
                        variant="outline"
                        className="product-card-btn"
                        onClick={handleAddToCart}
                    >
                        Thêm vào giỏ hàng
                    </Button>

                </Group>

            </Card>
        </div>
    );
}