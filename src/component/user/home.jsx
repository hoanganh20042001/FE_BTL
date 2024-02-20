import React from "react";
import "../../css/home.css";
import { Title, Group } from "@mantine/core";
import Slider from "../general/slider";
import ProductCard from "../general/productCard";
import HomeAds from "../general/homeAds";
import axios from "axios";

const items = [
    <HomeAds
        img={
            "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
        }
    />,
    <HomeAds
        img={
            "https://images.unsplash.com/photo-1639006570490-79c0c53f1080?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
        }
    />,
    <HomeAds
        img={
            "https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
        }
    />,
    <HomeAds
        img={
            "https://images.unsplash.com/photo-1613710774862-d813121e6d44?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
        }
    />,
];
export default function Home() {
    const [featuredProd, setFeaturedProd] = React.useState([]);
    const [newProd, setNewProd] = React.useState([]);
    React.useEffect(() => {
        axios
            .get("http://localhost:8080/api/product/")
            .then((response) => {
                response.data.slice(0, 7).map((product) => {
                    setFeaturedProd((o) => [
                        ...o,
                        <ProductCard
                            img={product.image}
                            brand={product.brand}
                            name={product.name}
                            price={product.price}
                            key={product.id}
                            id={product.id}
                        />,
                    ]);
                });

                response.data.slice(4, 11).map((product) => {
                    setNewProd((o) => [
                        ...o,
                        <ProductCard
                            img={product.image}
                            brand={product.brand}
                            name={product.name}
                            price={product.price}
                            key={product.id}
                            id={product.id}
                        />,
                    ]);
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <>
            <div className="home">
                <Slider type="homeads" items={items} />
                <div className="feature-products-site">
                    <Title align="center" order={2} className="home-title">
                        Sản phẩm nổi bật
                    </Title>
                    <Slider type="product" items={featuredProd} />
                </div>
                <div className="new-products-site">
                    <Title align="center" order={2} className="home-title">
                        Sản phẩm mới nhất
                    </Title>
                    <Slider type="product" items={newProd} />
                </div>
            </div>
        </>
    );
}
