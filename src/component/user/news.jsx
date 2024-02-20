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
} from "@mantine/core";
import "../../css/news.css";
import { useLocation } from "react-router-dom";
import { useViewportSize } from "@mantine/hooks";
import BreadCrumbs from "../general/breadCrumb";
import axios from "axios";

export default function News() {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    const [data, setData] = React.useState([]);
    const [activePage, setPage] = React.useState(1);
    const maxItemPerPage = 6;
    const total = Math.ceil(data.length / maxItemPerPage);
    let location = useLocation();
    const { height, width } = useViewportSize();

    React.useEffect(() => {
        axios
            .get(`http://localhost:8080/api/new/`)
            .then((response) => {
                console.log(response.data);
                setData(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <>
            <div className="news">
                <Image src="https://mir-s3-cdn-cf.behance.net/project_modules/2800_opt_1/063d76103685569.5f523c7f1b265.jpg" />
                <Grid style={{ marginTop: "10px" }}>
                    <BreadCrumbs location={location} size={width} />
                </Grid>
                <Title order={1} style={{ textAlign: "center" }}>
                    Tin tức
                </Title>
                <Space h="xl" />
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
                                        id={item.id}
                                        title={item.title}
                                        view={item.view}
                                        like={item.liked}
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
        </>
    );
}

function Item({ id, title, date, view, like, content }) {
    return (
        <div
            className="new-item"
            style={{ width: "auto", marginLeft: 10, marginRight: 10 }}
        >
            <Card shadow="sm" p="lg">
                <Card.Section>
                    <Image
                        src="https://cdn.tgdd.vn/Files/2020/07/11/1269604/16_800x450.jpg"
                        height={300}
                        alt="watch"
                        className="product-img-zoom"
                    />
                </Card.Section>
                <Text weight={500} size="md" className="news__title">
                    {title}
                </Text>
                <Group direction="row" style={{ marginTop: 20 }}>
                    <Text weight={500}>{date}</Text>
                    <Space w="xl" />
                    <Text weight={500}>{view} views</Text>
                    <Space w="xl" />
                    <Text weight={500}>{like} likes</Text>
                </Group>

                <Spoiler maxHeight={100} showLabel="Show more" hideLabel="Hide">
                    <Text weight={500} className="news__content">
                        {content}
                    </Text>
                </Spoiler>
            </Card>
        </div>
    );
}
