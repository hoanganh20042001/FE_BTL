import React from "react";
import { Link } from "react-router-dom";
import {
    Button,
    Text,
    Popover,
    Group,
    TextInput,
    Container,
} from "@mantine/core";
import {
    HiOutlineShoppingBag,
    HiUserCircle,
    HiUser,
    HiOutlineLogout,
    HiOutlineLogin,
    HiOutlineSearch,
} from "react-icons/hi";
import Logo from "../general/logo";
import MenuModal from "../general/menuModal";
import { useViewportSize, useWindowScroll } from "@mantine/hooks";
import "../../css/nav-bar.css";

export default function Navbar() {
    const { height, width } = useViewportSize();
    const [scroll, scrollTo] = useWindowScroll();
    const [opened, setOpened] = React.useState(false);
    const user = sessionStorage.getItem("userName");

    return (
        <>
            <div className="nav-bar">
                {width > 1100 ? (
                    <>
                        <Logo
                            classname="nav-bar-btn"
                            onClick={() => scrollTo({ y: 0 })}
                        />
                        <Link to="/">
                            <Button
                                color="gray"
                                radius="xs"
                                uppercase
                                className="nav-bar-btn"
                                onClick={() => scrollTo({ y: 0 })}
                            >
                                <Text className="nav-bar-btn-text">
                                    Trang chủ
                                </Text>
                            </Button>
                        </Link>
                        <Link to="/products">
                            <Button
                                color="gray"
                                radius="xs"
                                uppercase
                                className="nav-bar-btn"
                                onClick={() => scrollTo({ y: 0 })}
                            >
                                <Text className="nav-bar-btn-text">
                                    Sản phẩm
                                </Text>
                            </Button>
                        </Link>
                        <Link to="/contact">
                            <Button
                                color="gray"
                                radius="xs"
                                uppercase
                                className="nav-bar-btn"
                                onClick={() => scrollTo({ y: 0 })}
                            >
                                <Text className="nav-bar-btn-text">
                                    Liên hệ
                                </Text>
                            </Button>
                        </Link>
                        <Link
                            to="/introduction"
                            onClick={() => scrollTo({ y: 0 })}
                        >
                            <Button
                                color="gray"
                                radius="xs"
                                uppercase
                                className="nav-bar-btn"
                            >
                                <Text className="nav-bar-btn-text">
                                    Giới thiệu
                                </Text>
                            </Button>
                        </Link>
                        <Link to="/news" onClick={() => scrollTo({ y: 0 })}>
                            <Button
                                color="gray"
                                radius="xs"
                                uppercase
                                className="nav-bar-btn"
                            >
                                <Text className="nav-bar-btn-text">
                                    Tin Tức
                                </Text>
                            </Button>
                        </Link>
                        {!user ? (
                            <Link to="/signin">
                                <Button
                                    color="gray"
                                    radius="xs"
                                    uppercase
                                    className="nav-bar-right nav-bar-btn"
                                    onClick={() => scrollTo({ y: 0 })}
                                >
                                    <Text className="nav-bar-btn-text">
                                        Đăng nhập/đăng ký
                                    </Text>
                                </Button>
                            </Link>
                        ) : (
                            <>
                                <Button
                                    color="gray"
                                    radius="xs"
                                    uppercase
                                    className="nav-bar-right nav-bar-btn"
                                    style={{ marginTop: 12 }}
                                    onClick={() => setOpened((o) => !o)}
                                >
                                    <Popover
                                        opened={opened}
                                        onClose={() => setOpened(false)}
                                        target={
                                            <Text className="nav-bar-btn-text">
                                                <HiUser size={30} />
                                            </Text>
                                        }
                                        width="auto"
                                        position="bottom"
                                    >
                                        <Group direction="column">
                                            <Text
                                                variant="link"
                                                component="a"
                                                href="/user_info"
                                                onClick={() =>
                                                    scrollTo({ y: 0 })
                                                }
                                            >
                                                Xem thông tin{" "}
                                                <HiUserCircle size={25} />
                                            </Text>
                                            <Text
                                                variant="link"
                                                component="a"
                                                href="/purch"
                                                onClick={() =>
                                                    scrollTo({ y: 0 })
                                                }
                                            >
                                                Đơn hàng mua{" "}
                                                <HiUserCircle size={25} />
                                            </Text>
                                            <Text
                                                variant="link"
                                                component="a"
                                                onClick={() =>
                                                    sessionStorage.clear()
                                                }
                                                href="/"
                                            >
                                                Đăng xuất{" "}
                                                <HiOutlineLogout size={25} />
                                            </Text>
                                            
                                        </Group>
                                    </Popover>
                                </Button>
                            </>
                        )}
                        <Link to="/cart">
                            <Button
                                color="gray"
                                radius="xs"
                                uppercase
                                className="nav-bar-right nav-bar-btn"
                                onClick={() => scrollTo({ y: 0 })}
                            >
                                <Text className="nav-bar-btn-text">
                                    <HiOutlineShoppingBag size={30} />{" "}
                                </Text>
                            </Button>
                        </Link>
                        <Link to="/products">
                            <Button
                                color="gray"
                                radius="xs"
                                uppercase
                                className="nav-bar-right nav-bar-btn"
                            >
                                <Text className="nav-bar-btn-text">
                                    <HiOutlineSearch size={30} />
                                </Text>
                            </Button>
                        </Link>
                    </>
                ) : (
                    <>
                        <MenuModal />
                        <Logo classname="nav-bar-center" />
                        <div className="nav-mobile-btn-group">
                            <Link to="/cart">
                                <Button
                                    color="gray"
                                    radius="xs"
                                    uppercase
                                    className="nav-bar-btn"
                                    onClick={() => scrollTo({ y: 0 })}
                                >
                                    <Text className="nav-bar-btn-text">
                                        <HiOutlineShoppingBag size={30} />{" "}
                                    </Text>
                                </Button>
                            </Link>
                            {!user ? (
                                <Link to="/signin">
                                    <Button
                                        color="gray"
                                        radius="xs"
                                        uppercase
                                        className="nav-bar-btn"
                                        onClick={() => scrollTo({ y: 0 })}
                                    >
                                        <Text className="nav-bar-btn-text">
                                            <HiOutlineLogin size={30} />
                                        </Text>
                                    </Button>
                                </Link>
                            ) : (
                                <Button
                                    color="gray"
                                    radius="xs"
                                    uppercase
                                    className="nav-bar-right nav-bar-btn"
                                    onClick={() => setOpened((o) => !o)}
                                >
                                    <Popover
                                        opened={opened}
                                        onClose={() => setOpened(false)}
                                        target={
                                            <Text className="nav-bar-btn-text">
                                                <HiUserCircle size={30} />
                                            </Text>
                                        }
                                        width="auto"
                                        position="bottom"
                                    >
                                        <Group direction="column">
                                            <Text
                                                variant="link"
                                                component="a"
                                                href="/user_info"
                                                onClick={() =>
                                                    scrollTo({ y: 0 })
                                                }
                                            >
                                                Xem thông tin{" "}
                                                <HiUserCircle size={25} />
                                            </Text>
                                            <Text
                                                variant="link"
                                                component="a"
                                                onClick={() =>
                                                    sessionStorage.clear()
                                                }
                                                href="/"
                                            >
                                                Đăng xuất{" "}
                                                <HiOutlineLogout size={25} />
                                            </Text>
                                        </Group>
                                    </Popover>
                                </Button>
                            )}
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
