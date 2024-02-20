import React from "react";
import {
    Card,
    Image,
    Text,
    Group,
    Grid,
    Pagination,
    Space,
    Spoiler,
    Title,
    Button
} from "@mantine/core";
import { Container, MediaQuery, TextInput, Box, Modal, Stack, Textarea } from '@mantine/core';
import "../../css/news.css";
import { useLocation } from "react-router-dom";
import { useViewportSize } from "@mantine/hooks";
import { Trash } from "tabler-icons-react";
import "../../css/product.css";
import axios from 'axios';


import { useForm } from '@mantine/form';

export default function News() {
    const [opened, setOpened] = React.useState(false);
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    const [activePage, setPage] = React.useState(1);
    const [data, setData] = React.useState([]);
    const maxItemPerPage = 6;
    const total = Math.ceil(arr.length / maxItemPerPage);
    let location = useLocation();
    const [render, setRender] = React.useState(true);
    const { height, width } = useViewportSize();

    React.useEffect(() => {
        axios
            .get(`http://localhost:8080/api/new/`)
            .then((response) => {
                console.log(response.data);
                setData(response.data);
                setOpened(false);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [render]);


    return (
        <>
            <Stack justify="space-around">
                <Group position="center" style={{ paddingBottom: "2%", margin: "2% 5% 0", borderBottom: "1px solid #000" }}>
                    <Title order={1} >Quản lý Tin Tức </Title>
                </Group>
                <Group position="apart" direction="row" style={{ padding: "5px 5%" }}>
                    <Button radius="xl" onClick={() => setOpened(true)}>Thêm tin tức</Button>
                </Group>
            </Stack>
            <div className="news">

                <Grid style={{ margin: 0 }}>
                    {data
                        .slice(
                            (activePage - 1) * maxItemPerPage,
                            activePage * maxItemPerPage
                        )
                        .map((item) => {
                            return (
                                <Grid.Col
                                    xl={4}
                                    lg={4}
                                    md={6}
                                    sm={6}
                                    xs={12}
                                    key={item.id}
                                >
                                    <Item
                                        render={render}
                                        setRender={setRender}
                                        id={item.id}
                                        title={item.title}
                                        date={item.newDate}
                                        content={item.content}
                                    />
                                </Grid.Col>
                            );
                        })}
                </Grid>
                <Pagination
                    onChange={(page) => {
                        setPage(page);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    total={total}
                    position="right"
                    withEdges
                    className="product-pagination"
                />
                ;
            </div>

            <Modal centered
                opened={opened}
                onClose={() => setOpened(false)}
                title="Thêm tin tức mới"
                size="lg"
            >
                <Grid>
                    <Grid.Col>
                        <NewsAdd render={render} setRender={setRender} />
                    </Grid.Col>
                </Grid>
            </Modal>

        </>
    );
}

function Item(props) {
    function remove() {
        if (window.confirm(`Bạn muốn xóa ${props.title}?`)) {
            axios.delete(`http://localhost:8080/api/new/delete/${props.id}`)
                .then((response) => {
                    console.log(response);
                    props.setRender(!props.render);
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }
    return (
        <div
            className="new-item"
            style={{ width: "auto", marginLeft: 10, marginRight: 10 }}
        >
            <Card shadow="sm" p="lg">
                <Card.Section>
                    <Image
                        src="https://bossluxurywatch.vn/uploads/san-pham/rolex/sky-dweller/rolex-sky-dweller-42mm-326938-0005.png"
                        height={300}
                        alt="watch"
                        className="product-img-zoom"
                    />
                </Card.Section>
                <Group position="apart" spacing="xs">
                    <Text weight={700} size="xl" className="news__title">
                        {props.title}
                    </Text>
                    <Button leftIcon={<Trash />}
                        variant="outline" color="red"
                        className="product-card-btn admin__delete-btn"
                        onClick={() => { remove() }}
                    >
                        Xóa
                    </Button>
                </Group>

                <Group direction="row" style={{ marginTop: 20 }}>
                    <Text weight={500}>{props.date}</Text>
                    <Space w="xs" />
                </Group>
                <Spoiler maxHeight={100} showLabel="Show more" hideLabel="Hide">
                    <Text weight={400} className="news__content">
                        {props.content}
                    </Text>
                </Spoiler>
            </Card>
        </div>
    );
}


function NewsAdd(param) {
    const { height, width } = useViewportSize();
    const form = useForm({
        initialValues: {
            title: '',
            content: '',
        },
        validate: {
            title: (value) => value,
            content: (value) => value
        },
    });

    function Add(value) {
        let data = {
            title: value.title,
            content: value.content,
            view: 0,
            like: 0,
            adminid: 1
        };
        console.log(JSON.stringify(data));
        axios.post(`http://localhost:8080/api/new/add`,data)
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
                            label="Title"
                            placeholder="Input title"
                            {...form.getInputProps('title')}
                        />
                        <Textarea
                            label="Content"
                            placeholder="Input content"
                            autosize
                            minRows={10}
                            maxRows={10}
                            {...form.getInputProps('content')}
                        />
                        <Group position="right" mt="md">
                            <Button color="green" type="submit">Thêm tin tức</Button>
                        </Group>
                    </form>
                </Box>
            </Grid.Col>
        </Grid>
    );
}

