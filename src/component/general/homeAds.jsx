import React from "react";
import {
    Container,
    Image,
    Text,
    Button,
    Group,
    MediaQuery,
} from "@mantine/core";
import "../../css/homeAds.css";
import { Link } from "react-router-dom";

export default function HomeAds({ img }) {
    return (
        <Container className="home-ads-container" fluid>
            <Image src={img} className="home-ads-image" fit="contain" />
            <Group className="home-ads-group" direction="column">
                <MediaQuery
                    query="(max-width: 1800px) and (min-width: 768px)"
                    styles={{
                        fontSize: 40,
                    }}
                >
                    <Text className="home-ads-text">
                        Mang đến hơi hướng cổ điển và thanh lịch, đậm chất lịch
                        lãm
                    </Text>
                </MediaQuery>
                <Group direction="row">
                    <MediaQuery
                        query="(max-width: 768px) and (min-width: 0px)"
                        styles={{
                            transform: "scale(0.75, 0.75)",
                            marginLeft: "-6%",
                        }}
                    >
                        <Link to="/products">
                            <Button
                                variant="outline"
                                className="home-ads-btn"
                                uppercase
                            >
                                Xem thêm
                            </Button>
                        </Link>
                    </MediaQuery>
                </Group>
            </Group>
        </Container>
    );
}
