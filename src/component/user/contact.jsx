import React from "react";
import "../../css/contact.css";
import Logo from "../general/logo";
import {
    Grid,
    TextInput,
    Button,
    Textarea,
    Container,
    Space,
    Text,
} from "@mantine/core";
import BreadCrumbs from "../general/breadCrumb";
import { useViewportSize } from "@mantine/hooks";
import { useLocation } from "react-router-dom";

export default function Contact() {
    let location = useLocation();
    const { height, width } = useViewportSize();
    return (
        <>
            <Grid style={{ paddingTop: 80 }}>
                <BreadCrumbs location={location} size={width} />
                <Grid.Col>
                    <Container className="contact-submit-container">
                        <Text
                            transform="capitalize"
                            className="contact-company-name"
                        >
                            Công ty cổ phần 4 thành viên
                            <Logo classname="contact-company-logo" />
                        </Text>
                    </Container>
                    <Container>
                        <Grid>
                            <Grid.Col>
                                <Text className="contact-description">
                                    Nếu có bất kì thắc mắc gì về sản phẩm, chính
                                    sách,... của công ty, xin quý khách vui lòng
                                    cho chúng tôi biết bằng cách điền vào mẫu
                                    dưới đây.
                                </Text>
                            </Grid.Col>
                            <Space h="xl" />
                            <Grid.Col xl={6} lg={6} md={6} sm={12} xs={12}>
                                <Container>
                                    <Space h="xs" />
                                    <TextInput
                                        placeholder="123@gmail.com"
                                        label="Email:"
                                        required
                                    />
                                </Container>
                            </Grid.Col>
                            <Grid.Col xl={6} lg={6} md={6} sm={12} xs={12}>
                                <Container>
                                    <Space h="xs" />
                                    <TextInput
                                        placeholder="0123456789"
                                        label="Số điện thoại:"
                                        required
                                    />
                                </Container>
                            </Grid.Col>
                            <Space h="xl" />
                            <Grid.Col xl={6} lg={6} md={6} sm={12} xs={12}>
                                <Container>
                                    <Space h="xs" />
                                    <TextInput
                                        placeholder="Nguyễn Văn A"
                                        label="Tên:"
                                        required
                                    />
                                </Container>
                            </Grid.Col>
                            <Grid.Col xl={6} lg={6} md={6} sm={12} xs={12}>
                                <Container>
                                    <Space h="xs" />
                                    <TextInput
                                        placeholder="268 Lý Thường Kiệt, Phường 14, Quận 10, TPHCM"
                                        label="Địa chỉ:"
                                        required
                                    />
                                </Container>
                            </Grid.Col>
                            <Space h="xl" />
                            <Grid.Col>
                                <Container>
                                    <Space h="xs" />
                                    <Textarea
                                        placeholder="Quý khách vui lòng điền thắc mắc của mình"
                                        label="Nội dung:"
                                        required
                                    />
                                </Container>
                            </Grid.Col>
                            <Space h="xl" />
                            <Grid.Col className="contact-submit-container">
                                <Button
                                    size="md"
                                    color="red"
                                    className="contact-submit-btn"
                                    variant="outline"
                                >
                                    Gửi
                                </Button>
                            </Grid.Col>
                            <Space h="xl" />
                        </Grid>
                    </Container>
                </Grid.Col>
            </Grid>
        </>
    );
}
