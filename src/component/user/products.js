import React from 'react';
import ProductCard from '../../component/general/productCard';
import { Grid, Pagination, Text, Image, MediaQuery, TextInput } from '@mantine/core';
import Slider from '../general/slider';
import FilterForm from '../../component/general/filterForm';
import { useLocation } from 'react-router-dom';
import { useWindowScroll } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import BreadCrumbs from '../general/breadCrumb';
import axios from 'axios';
import "../../css/product.css";


export default function Products() {
    let location = useLocation();
    const [scroll, scrollTo] = useWindowScroll();
    const [size, setSize] = React.useState([0, 0]);
    const [data, setData] = React.useState([]);
    const [activePage, setPage] = React.useState(1);
    const maxItemPerPage = 6;
    const total = Math.ceil(data.length / maxItemPerPage);
    const items = [
        "https://cdn.watchstore.vn/uploads/brands/orient-logo.jpg",
        "https://cdn.watchstore.vn/uploads/brands/tissot-logo.jpg",
        "https://cdn.watchstore.vn/uploads/brands/casio-logo.jpg",
        "https://cdn.watchstore.vn/uploads/brands/seiko-logo.jpg",
        "https://cdn.watchstore.vn/uploads/brands/citizen-logo.jpg",
    ];

    const form = useForm({
        initialValues: {
            search: '',
        }
    });

    React.useLayoutEffect(() => {
        function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
        }
        window.addEventListener("resize", updateSize);
        updateSize();
        return () => window.removeEventListener("resize", updateSize);
    }, []);

    React.useEffect(() => {
        axios.get("http://localhost:8080/api/product/")
            .then((response) => {
                console.log(response);
                setData(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    const handleSearch = (values) => {
        axios.get(`http://localhost:8080/api/product/search/${values.search}`)
            .then((response) => {
                console.log(response);
                setData(response.data);
            }).catch((error) => {
                console.log(error);
            })
    }

    return <>
        <Grid style={{ marginTop: 60 }}>
            <Grid.Col lg={12} className="product-ad-container">
                <Image src={"https://images.unsplash.com/photo-1461141346587-763ab02bced9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&q=80"} height="30vh" className="product-ad-image" />
                <Text className="product-ads-text">
                    Products
                </Text>
            </Grid.Col>
            <BreadCrumbs location={location} size={size[0]} />
            <Grid.Col>
                <MediaQuery
                    query="(max-width: 1800px) and (min-width: 1200px)"
                    styles={{ marginLeft: 50, marginRight: 50 }}
                >
                    <Grid>
                        <Grid.Col lg={2}>
                            <FilterForm setData={setData} />
                        </Grid.Col>
                        <Grid.Col lg={10}>
                            <Grid>
                                <Grid.Col>
                                    <Slider type="image" items={items} />
                                </Grid.Col>
                                <Grid.Col>
                                    <form onSubmit={form.onSubmit((values) => handleSearch(values))}>
                                        <TextInput
                                            style={{ marginLeft: 10, marginRight: 10 }}
                                            placeholder="Tên sản phẩm"
                                            label="Tìm kiếm sản phẩm"
                                            {...form.getInputProps('search')}
                                        />
                                    </form>
                                </Grid.Col>
                                <Grid.Col>
                                    <Grid>
                                        {data.length > 0 ? data.slice((activePage - 1) * maxItemPerPage, activePage * maxItemPerPage).map(product => {
                                            return (
                                                <Grid.Col xl={4} lg={4} md={6} sm={6} xs={12} key={product.id}>
                                                    <ProductCard id={product.id} img={product.image} brand={product.brand} name={product.name} price={product.price} />
                                                </Grid.Col>
                                            );
                                        }) : <Text size='lg' weight={500} style={{ marginLeft: 20 }}>Không có sản phẩm phù hợp</Text>}
                                    </Grid>
                                </Grid.Col>
                            </Grid>

                        </Grid.Col>
                    </Grid>
                </MediaQuery>
            </Grid.Col>
        </Grid>
        <Pagination onChange={(page) => {
            setPage(page);
            scrollTo({ y: 0 })
        }} total={total} position="right" withEdges className='product-pagination'
        />;
    </>
}