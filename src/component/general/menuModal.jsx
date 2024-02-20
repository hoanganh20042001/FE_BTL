import React from "react";
import { Modal, Burger, Stack, Button, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import "../../css/menuModal.css";

export default function MenuModal() {
    const [opened, setOpened] = React.useState(false);
    const title = opened ? "Close navigation" : "Open navigation";

    return (
        <>
            <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                color="#fff"
                title={title}
            />
            <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                className="menu-modal-container"
            >
                <Stack
                    sx={(theme) => ({
                        backgroundColor:
                            theme.colorScheme === "dark"
                                ? theme.colors.dark[8]
                                : theme.colors.gray[0],
                        height: 300,
                    })}
                    spacing={0}
                >
                    <Link to="/">
                        <Button
                            color="gray"
                            radius="xs"
                            uppercase
                            className="nav-bar-btn"
                        >
                            <Text className="nav-bar-btn-text">Trang chủ</Text>
                        </Button>
                    </Link>

                    <Link to="/products">
                        <Button
                            color="gray"
                            radius="xs"
                            uppercase
                            className="nav-bar-btn"
                        >
                            <Text className="nav-bar-btn-text">Sản phẩm</Text>
                        </Button>
                    </Link>
                    <Link to="/contact">
                        <Button
                            color="gray"
                            radius="xs"
                            uppercase
                            className="nav-bar-btn"
                        >
                            <Text className="nav-bar-btn-text">Liên hệ</Text>
                        </Button>
                    </Link>

                    <Link to="/introduction">
                        <Button
                            color="gray"
                            radius="xs"
                            uppercase
                            className="nav-bar-btn"
                        >
                            <Text className="nav-bar-btn-text">Giới thiệu</Text>
                        </Button>
                    </Link>

                    <Link to="/news">
                        <Button
                            color="gray"
                            radius="xs"
                            uppercase
                            className="nav-bar-btn"
                        >
                            <Text className="nav-bar-btn-text">Tin Tức</Text>
                        </Button>
                    </Link>
                    
                </Stack>
            </Modal>
        </>
    );
}
