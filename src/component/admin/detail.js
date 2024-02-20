import "../../css/detail.css";
import React from 'react';
import {
    Container,
    Grid,
    Image,
    Text,
    MediaQuery,
    Group,
    Button,
    Textarea,
    Select
} from "@mantine/core";
import { TextInput, NumberInput, Box, Avatar } from '@mantine/core';
import { useForm } from '@mantine/form';
import "../../css/detail.css";
import { useViewportSize } from "@mantine/hooks";
import { useParams } from "react-router-dom";
import axios from 'axios';

export default function Detail() {
    return (
        <Container className="detail-section-container" style={{ marginTop: 60 }}>
            <Grid style={{ marginTop: 60 }}>
                <Grid.Col>
                    <ProductDetail />
                </Grid.Col>
                <Grid.Col>
                    <CommentSection />
                </Grid.Col>
            </Grid>
        </Container>
    )
}

function ProductDetail() {
    let params = useParams();
    const { height, width } = useViewportSize();
    const [data, setData] = React.useState({});
    let form = useForm({
        initialValues: {
            name: "",
            image: "https://bossluxurywatch.vn/uploads/san-pham/rolex/sky-dweller/rolex-sky-dweller-42mm-326938-0005.png",
            brand: "",
            sex: "",
            category: "",
            price: "",
            descript: ""
        },
        validate: {
            name: (value) => value ? value : data.name,
            brand: (value) => value ? value : data.brand,
            sex: (value) => value ? value : data.sex,
            category: (value) => value ? value : data.category,
            price: (value) => value ? value : data.price,
            descript: (value) => value ? value : data.descript
        },
    });

    React.useEffect(() => {
        axios.get(`http://localhost:8080/Server/Controllers/product/getdetail.php?id=${params.id}`)
            .then((response) => {
                setData(() => response.data);
                form.setValues({
                    name: response.data.name,
                    brand: response.data.brand,
                    type: response.data.sex,
                    price: response.data.price,
                    category: response.data.category,
                    descript: response.data.descript,
                    image: response.data.image
                });
            }).catch((error) => {
                console.log(error);
            })
    }, [])


    const handleUpdateProduct = (values) => {
        console.log(values);
        const data = {
            id: params.id,
            name: values.name,
            image: values.image,
            brand: values.brand,
            sex: values.sex,
            category: values.category,
            price: values.price,
            descript: values.descript
        }
        console.log(JSON.stringify(data));
        axios.post("http://localhost:8080/Server/Controllers/product/update.php", JSON.stringify(data))
            .then((response) => {
                console.log(response);
                alert("Cập nhật thành công");
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
                            src={form.values.image}
                            alt="watch"
                            height="500px"
                            fit="contain"
                        />
                    </Container>
                </MediaQuery>
            </Grid.Col>
            <Grid.Col xl={6} lg={6} md={6} sm={6} xs={12}>

                <Box >
                    <form>
                        <TextInput
                            required
                            label="Name"
                            placeholder={data.name}
                            {...form.getInputProps('name')}
                        />
                        <TextInput
                            required
                            label="Link ảnh"
                            placeholder="Input Link"
                            {...form.getInputProps('image')}
                        />
                        <Select
                            label="Brand"
                            placeholder={data.brand}
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
                            label="Type"
                            placeholder={data.sex}
                            data={[
                                { value: 'Đồng hồ nam', label: 'Đồng hồ nam' },
                                { value: 'Đồng hồ nữ', label: 'Đồng hồ nữ' },
                                { value: 'Đồng hồ trẻ em', label: 'Đồng hồ trẻ em' },

                            ]}
                            {...form.getInputProps('sex')}
                        />

                        <Select
                            label="Category"
                            placeholder={data.category}
                            data={[
                                { value: 'Cơ-automatic', label: 'Cơ-automatic' },
                                { value: 'Điện tử', label: 'Điện tử' },
                                { value: 'Treo tường', label: 'Treo tường' },
                                { value: 'Năng lượng mặt trời', label: 'Năng lượng mặt trời' },

                            ]}
                            {...form.getInputProps('category')}
                        />

                        <NumberInput
                            required
                            label="Price"
                            placeholder={data.price}
                            {...form.getInputProps('price')}
                        />
                        <Textarea
                            label="Content"
                            placeholder={data.descript}
                            autosize
                            minRows={10}
                            maxRows={10}
                            {...form.getInputProps('content')}
                        />

                        <Group position="right" mt="md">
                            <Button onClick={() => handleUpdateProduct(form.values)}>Lưu</Button>
                        </Group>
                    </form>
                </Box>
            </Grid.Col>
        </Grid>
    );
}


function CommentSection() {
    const { height, width } = useViewportSize();
    const [comments, setComments] = React.useState([]);
    const [render, setRender] = React.useState(true);
    let params = useParams();
    React.useEffect(() => {
        axios
            .get(`http://localhost:8080/Server/controllers/comment/get.php?id=${params.id}`)
            .then((response) => {
                if (typeof response.data !== "string") {
                    setComments(response.data);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, [render]);

    return (
        <Grid>
            <Grid.Col>
                <MediaQuery
                    query="(max-width: 1800px) and (min-width: 900px)"
                    styles={{
                        fontSize: 36,
                        marginLeft: 40,
                        fontWeight: 600,
                    }}
                >
                    <Text className={width < 900 ? "detail-product-name" : ""}>
                        Bình luận
                    </Text>
                </MediaQuery>
            </Grid.Col>
            <Grid.Col>
                {comments.map((comment, i) => {
                    return <CommentCard
                        name={comment.userName}
                        date={comment.comDate}
                        content={comment.content}
                        id={comment.id}
                        productId={params.id}
                        key={i}
                    />;
                })}
            </Grid.Col>
        </Grid>
    );
}


function CommentCard({ name, date, content, id, productId }) {
    const [rend, setRend] = React.useState(false);
    const handleDelete = () => {
        if (window.confirm(`Bạn muốn xóa bình luận của ${name}?`)) {
            const obj = {
                "id": id,
                "productId": productId
            };
            axios.post(`http://localhost:8080/Server/Controllers/comment/delete.php`, JSON.stringify(obj))
                .then((response) => {
                    setRend(true);
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                })
        }

    }
    return (
        <>
            {rend ? <></> : (<Grid className="comment-card-container">
                <Grid.Col>
                    <Group direction="row">
                        <Avatar
                            src="https://scr.vn/wp-content/uploads/2020/07/Avatar-Facebook-tr%E1%BA%AFng.jpg"
                            alt="avatar"
                        />
                        <Group direction="column" spacing={1}>
                            <Text>{name}</Text>
                            <Text color="#cfcfcf">{date}</Text>
                        </Group>
                        <Button variant="outline" color="red" className="admin__delete-btn" onClick={() => handleDelete()}>Delete</Button>
                    </Group>
                </Grid.Col>
                <Grid.Col>
                    <Text>
                        {content}
                    </Text>
                </Grid.Col>
            </Grid>)}
        </>
    );
}
