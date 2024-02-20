import {
    Badge,
    Button,
    Grid,
    Group,
    Image,
    Text,
    Tooltip,
    Checkbox,
} from "@mantine/core";
import { BiDownArrow, BiUpArrow } from "react-icons/bi";
import React from "react";
import { PaymentItemsContext } from "../general/paymentItemsContext";
import "../../css/cart.css";
import axios from "axios";

export default function CartCard({
    id,
    img,
    name,
    price,
    quantity,
    brand,
    setTotal,
    payment,
    cartList,
    setCartList,
    order,
    username,
    date,
    orderId,
    ordCusId,
}) {
    const [paymentItems, setPaymentItems] =
        React.useContext(PaymentItemsContext);
    const [count, setCount] = React.useState(parseInt(quantity));
    const [totalLocal, setTotalLocal] = React.useState(0);
    const [checked, setChecked] = React.useState(false);
    const [tooltip1, setTooltip1] = React.useState(false);
    const [tooltip2, setTooltip2] = React.useState(false);
    const [exist, setExist] = React.useState(true);

    const handleIncrement = () => {
        setCount(count + 1);
        for (let i = 0; i < cartList.length; i++) {
            if (cartList[i].id === id) {
                let carts = [...cartList];
                let newCart = cartList[i];
                newCart.quantity = (parseInt(newCart.quantity) + 1).toString();
                cartList[i] = newCart;
                setCartList(carts);
            }
        }
    };

    const handleDecrement = () => {
        count > 0 ? setCount(count - 1) : setCount(0);
        for (let i = 0; i < cartList.length; i++) {
            if (cartList[i].id === id) {
                let carts = [...cartList];
                let newCart = cartList[i];
                newCart.quantity = (
                    parseInt(newCart.quantity) > 0
                        ? parseInt(newCart.quantity) - 1
                        : 0
                ).toString();
                cartList[i] = newCart;
                setCartList(carts);
            }
        }
    };

    const handleDelete = async () => {
        const data = {          
            "customid": parseInt(sessionStorage.getItem("id")),
            "productid": id
        };
        console.log(data);
        await axios.post(`http://localhost:8080/api/cart/delete`,data)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });

        setTotalLocal((money) => count * price);
        setTotal((money) => money - totalLocal);
        const newCart = cartList.filter((item) => item.id !== id);
        setCartList(newCart);
        if (localStorage.getItem("cart")) {
            localStorage.setItem("cart", JSON.stringify(newCart));
        }
    };

    const handleDeleteOrder = () => {
        const body = {
            ordItemId: orderId,
            ordCusId: ordCusId,
            productId: id,
            
        };
        console.log(JSON.stringify(body));
        axios
            .post(
                `http://localhost:8080/api/payment/delete`,
                body
            )
            .then((response) => {
                console.log(response);
                setExist(false);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    React.useEffect(() => {
        for (var i = 0; i < paymentItems.length; i++) {
            if (paymentItems[i].name == name) {
                setChecked(true);
                break;
            }
        }
    }, []);

    React.useEffect(() => {
        setTotalLocal(parseInt(quantity) * parseInt(price));
        setTotal(
            (money) => money + parseInt(quantity) * parseInt(price) - totalLocal
        );
    }, [cartList]);

    return exist ? (
        <Grid className="cart-card-container" align="center">
            <Grid.Col xl={2} lg={2} md={2} className="cart-card-img-container">
                <Image
                    src={img}
                    className="cart-card-img"
                    height="25vh"
                    width="100%"
                    fit="contain"
                />
            </Grid.Col>
            <Grid.Col xl={2} lg={2} md={2}>
                <Grid className="cart-card-product-container">
                    <Grid.Col>
                        <Badge size="lg" color="red">
                            {brand}
                        </Badge>
                    </Grid.Col>
                    <Grid.Col>
                        <Text weight={600} size="xl">
                            {name}
                        </Text>
                    </Grid.Col>
                </Grid>
            </Grid.Col>
            <Grid.Col xl={2} lg={2} md={2}>
                <Text weight={600} size="lg">
                    Số lượng
                </Text>
                <Group direction="row" className="cart-card-quantity-container">
                    <Text weight={600} size="lg">
                        {quantity}
                    </Text>
                    {!payment ? (
                        <Group direction="column" align="center">
                            <Button
                                onClick={() => handleIncrement()}
                                variant="light"
                                color="dark"
                                size="xs"
                            >
                                <BiUpArrow />
                            </Button>
                            <Button
                                onClick={() => handleDecrement()}
                                variant="light"
                                color="dark"
                                size="xs"
                            >
                                <BiDownArrow />
                            </Button>
                        </Group>
                    ) : null}
                </Group>
            </Grid.Col>
            <Grid.Col xl={3} lg={3} md={3}>
                <Group direction="column">
                    <Text weight={500} color="red" align="right" size="lg">
                        Giá:{" "}
                        <b>
                            {new Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                            }).format(price)}
                        </b>
                    </Text>
                    <Text weight={500} color="red" align="right" size="lg">
                        Thành tiền:{" "}
                        <b>
                            {new Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                            }).format(totalLocal)}
                        </b>
                    </Text>
                </Group>
            </Grid.Col>
            <Grid.Col xl={3} lg={3} md={3}>
                {!payment ? (
                    <Group direction="column">
                        {!checked ? (
                            <Tooltip label="Xác nhận" opened={tooltip1}>
                                <Button
                                    color="green"
                                    variant="outline"
                                    className="cart-card-btn-check"
                                    onMouseEnter={() => setTooltip1(true)}
                                    onMouseLeave={() => setTooltip1(false)}
                                    onClick={() => {
                                        setChecked(true);
                                        setPaymentItems((o) => [
                                            ...o,
                                            {
                                                id,
                                                img,
                                                name,
                                                price,
                                                count,
                                                brand,
                                            },
                                        ]);
                                    }}
                                >
                                    <Text size="lg">Xác nhận</Text>
                                </Button>
                            </Tooltip>
                        ) : (
                            <Checkbox
                                checked={true}
                                className="cart-card-checkbox"
                                color="green"
                            />
                        )}
                        <Tooltip label="Xóa" opened={tooltip2}>
                            <Button
                                color="red"
                                variant="outline"
                                className="cart-card-btn-delete"
                                onMouseEnter={() => setTooltip2(true)}
                                onMouseLeave={() => setTooltip2(false)}
                                onClick={() => handleDelete()}
                            >
                                <Text size="lg">Xóa</Text>
                            </Button>
                        </Tooltip>
                    </Group>
                ) : order ? (
                    <Group direction="column">
                        <Text>Người mua: {username}</Text>
                        <Text>Ngày mua: {date}</Text>
                        <Button
                            variant="outline"
                            color="red"
                            onClick={() => handleDeleteOrder()}
                        >
                            Xóa
                        </Button>
                    </Group>
                ) : null}
            </Grid.Col>
        </Grid>
    ) : null;
}
