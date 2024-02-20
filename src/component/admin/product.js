import React from 'react';
import { Card, Image, Text, Button, Group, Badge } from '@mantine/core';
import { Link } from 'react-router-dom';
import { Trash } from "tabler-icons-react";
import axios from 'axios';
import "../../css/product.css";
import "../../css/admin.css";

export default function Product({ id, img, brand, name, price, quantity,  setRender, render }) {


    function remove() {
        if (window.confirm(`Bạn muốn xóa ${name}?`)) {
            axios.delete(`http://localhost:8080/api/product/delete/${id}`)
                .then((response) => {
                    console.log(response);
                    setRender(!render);
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }
    return (
        <div style={{ width: "auto", marginLeft: 10, marginRight: 10 }}>
            <Card shadow="lg" p="lg">
                <Card.Section>
                    <Link to={`/admin/detail/${id}`}>
                        <Image src={img} height="50vh" alt="watch" className='product-img-zoom' />
                    </Link>
                </Card.Section>
                <Badge size="lg" color="red">
                    {brand}
                </Badge>
                <Link to="/admin/detail" style={{ textDecoration: 'none' }}>
                    <Text weight={500} className="product-name">{name}</Text>
                </Link>
                <Text>
                <Text weight={500} color="blue" align='left' size="xl">Số lượng tồn: {quantity} </Text>
                <Text weight={500} color="red" align='right' size="xl">${price} VNĐ</Text>
                </Text>
                
                <Group direction='row' grow style={{ marginTop: 10 }}>

                    <Button fullWidth leftIcon={<Trash />}
                        variant="outline" color="red"
                        className="product-card-btn admin__delete-btn"
                        onClick={() => remove()}
                    >
                        Xóa
                    </Button>

                </Group>

            </Card>
        </div>
    );
}


