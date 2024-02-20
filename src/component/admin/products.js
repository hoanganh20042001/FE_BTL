import React from 'react';
import Product from '../../component/admin/product';

import { Container, MediaQuery, Image, Modal, Select, Textarea } from '@mantine/core';
import { Grid, Pagination, Group, Input, Button, Title, Stack } from '@mantine/core';
import { TextInput, NumberInput, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useViewportSize } from "@mantine/hooks";
import { useLocation } from 'react-router-dom';
import { useWindowScroll } from '@mantine/hooks';
import { Search } from "tabler-icons-react";
import axios from 'axios';


export default function Products() {
    let location = useLocation();
    const [data, setData] = React.useState([]);
    const [scroll, scrollTo] = useWindowScroll();
    const [size, setSize] = React.useState([0, 0]);
    const [render, setRender] = React.useState(true);
    const [opened, setOpened] = React.useState(false);
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    const [activePage, setPage] = React.useState(1);
    const maxItemPerPage = 6;
    const total = Math.ceil(arr.length / maxItemPerPage);


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
                setOpened(false);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [render])
    const form = useForm({
        initialValues: {
            search: '',
        }
    });

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
        <Stack justify="space-around">
            <Group position="center" style={{ paddingBottom: "2%", margin: "2% 5% 0", borderBottom: "1px solid #000" }}>
                <Title order={1} >Quản lý Sản Phẩm </Title>
            </Group>
            <Group position="apart" direction="row" style={{ padding: "5px 5%" }}>
                <Button radius="xl" onClick={() => setOpened(true)}>Thêm mới </Button>
                <form onSubmit={form.onSubmit((values) => handleSearch(values))} style={{ width: 300 }}>
                    <Group direction="row" >
                        <Input
                            placeholder="Tìm kiếm"
                            radius="xl"
                            style={{ marginRight: '3%', width: '30%', minWidth: '200px' }}
                            {...form.getInputProps('search')}
                        />
                        <Button radius="xl" type="submit" ><Search /></Button>
                    </Group>
                </form>
            </Group>
        </Stack>
        <Grid style={{ marginTop: 30 }}>
            <Grid.Col>
                <Grid>
                    {data.slice((activePage - 1) * maxItemPerPage, activePage * maxItemPerPage).map(product => {
                        return (
                            <Grid.Col xl={4} lg={4} md={6} sm={6} xs={12} key={product.id}>
                                <Product id={product.id} img={product.image} brand={product.brand} name={product.name} price={product.price} quantity={product.quantity} setRender={setRender} render={render} />
                            </Grid.Col>
                        );
                    })}
                </Grid>
            </Grid.Col>
            <Grid.Col>
                <Modal centered
                    opened={opened}
                    onClose={() => setOpened(false)}
                    title="Thêm sản phẩm mới"
                    size="lg"
                >
                    <Grid>
                        <Grid.Col>
                            <ProductAdd render={render} setRender={setRender} />
                        </Grid.Col>
                    </Grid>
                </Modal>

            </Grid.Col>
        </Grid>
        <Pagination onChange={(page) => {
            setPage(page);
            scrollTo({ y: 0 })
        }} total={total} position="right" withEdges className='product-pagination'
        />;
    </>

}

function ProductAdd(param) {
    const { height, width } = useViewportSize();
    const form = useForm({
        initialValues: {
            name: '',
            image: '',
            brand: 'Rolex',
            sex: 'Đồng hồ nam',
            category: 'Cơ - automatic',
            price: 0,
            descript: '',
        }
    });

    function Add(values) {
        const data = {
            name: values.name,
            image: values.image,
            brand: values.brand,
            sex: values.sex,
            category: values.category,
            price: values.price,
            descript: values.descript
        }
        console.log(JSON.stringify(data));
        axios.post(`http://localhost:8080/api/product/add`,data)
        // post("http://localhost:8080/Server/Controllers/product/add.php", JSON.stringify(data))
            .then((response) => {
                console.log(response);
                param.setRender(!param.render);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <Grid>
            <Grid.Col xl={6} lg={6} md={6} sm={6} xs={12}>
                <MediaQuery
                    query="(max-width: 1800px) and (min-width: 900px)"
                    styles={{
                        border: "1px solid #f1f1f1",
                    }}
                >
                    <Container className="detail-image-container">
                        <Image
                            src="https://bossluxurywatch.vn/uploads/san-pham/rolex/sky-dweller/rolex-sky-dweller-42mm-326938-0005.png"
                            alt="watch"
                            height="320px"
                            fit="contain"
                        />
                    </Container>
                </MediaQuery>
                <Group position="left" mt="md">
                    <Button variant="outline" color="dark">Chọn ảnh</Button>
                </Group>
            </Grid.Col>
            <Grid.Col xl={6} lg={6} md={6} sm={6} xs={12}>

                <Box >
                    <form onSubmit={form.onSubmit((values) => Add(values))}>
                        <TextInput
                            required
                            label="Tên"
                            placeholder="Input Name"
                            {...form.getInputProps('name')}
                        />

                        <TextInput
                            required
                            label="Link ảnh"
                            placeholder="Input Link"
                            {...form.getInputProps('image')}
                        />

                        <Select
                            label="Thương hiệu"
                            data={[
                                { value: 'Rolex', label: 'Rolex' },
                                { value: 'Seiko', label: 'Seiko' },
                                { value: 'Casio', label: 'Casio' },
                                { value: 'Citizen', label: 'Citizen' },
                                { value: 'Fossil', label: 'Fossil' },

                            ]}
                            {...form.getInputProps('brand')}
                        />

                        <Select
                            label="Loại"
                            data={[
                                { value: 'Đồng hồ nam', label: 'Đồng hồ nam' },
                                { value: 'Đồng hồ nữ', label: 'Đồng hồ nữ' },
                                { value: 'Đồng hồ trẻ em', label: 'Đồng hồ trẻ em' },

                            ]}
                            {...form.getInputProps('type')}
                        />

                        <Select
                            label="Động cơ"
                            data={[
                                { value: 'Cơ - automatic', label: 'Cơ-automatic' },
                                { value: 'Điện tử', label: 'Điện tử' },
                                { value: 'Treo tường', label: 'Treo tường' },
                                { value: 'Năng lượng mặt trời', label: 'Năng lượng mặt trời' },

                            ]}
                            {...form.getInputProps('category')}
                        />

                        <NumberInput
                            required
                            label="Price"
                            placeholder="Input Price"
                            {...form.getInputProps('price')}
                        />

                        <Textarea
                            label="Mô tả"
                            placeholder="Input content"
                            autosize
                            minRows={3}
                            maxRows={6}
                            {...form.getInputProps('descript')}
                        />


                        <Group position="right" mt="md">
                            <Button color="green" type="submit">Thêm sản phẩm</Button>
                        </Group>
                    </form>
                </Box>
            </Grid.Col>
        </Grid>
    );
}