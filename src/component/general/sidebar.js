import React from 'react';
import { useNavigate } from "react-router-dom";
import { Stack, Button, Text, Anchor, Grid } from '@mantine/core';
import { SiClockify } from "react-icons/si";
import { Power } from "tabler-icons-react";
import '../../css/sidebar.css'


export default function SideBar({ selected }) {
    const navigate = useNavigate();
    const handleLogout = () => {
        sessionStorage.clear();
        navigate("/signin");
    }

    return (

        <Stack className="sidebar" maxHeight justify="space-between" spacing="xl" sx={(theme) => ({ backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0], height: 300 })}>
            <Stack className="sidebar__part">
                {/* <Title order={1} className="sidebar__title">BKlock</Title> */}
                <Button color="dark" radius="xs" uppercase style={{ height: 80 }}>
                    <Text
                        weight={700}
                        style={{
                            padding: 5,
                            border: "3px solid white",
                            borderRadius: 30,
                            fontSize: 30,
                        }}
                    >
                        MTA<SiClockify />
                        lock
                    </Text>
                </Button>
                <Anchor href="/admin" ><Button variant="subtle" className={selected === 0 ? "sidebar__item--selected sidebar__item" : "sidebar__item"}> Quản lý sản phẩm</Button></Anchor>
                <Anchor href="/admin/news"><Button variant="subtle" className={selected === 1 ? "sidebar__item--selected sidebar__item" : "sidebar__item"}> Quản lý tin tức </Button></Anchor>
                <Anchor href="/admin/member" ><Button variant="subtle" className={selected === 2 ? "sidebar__item--selected sidebar__item" : "sidebar__item"}> Quản lý thành viên</Button></Anchor>
                <Anchor href="/admin/orders" ><Button variant="subtle" className={selected === 3 ? "sidebar__item--selected sidebar__item" : "sidebar__item"}> Quản lý đơn hàng</Button></Anchor>
            </Stack>
            <Button className="sidebar__item sidebar__item--out sidebar__part" style={{ background: "transparent" }} onClick={() => handleLogout()}><Power />Log out</Button>
        </Stack>
    );
}