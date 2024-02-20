import React, { useState } from 'react';
import { Grid, Text, Image, Container, Table, Group, Button, Title } from '@mantine/core';
import axios from 'axios';
import "../../css/adminMember.css";
import Notification from '../general/notification';
import Modal from "react-modal";
import "../../css/notification.css"
export default function Member() {
    // const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    const [mems, setMems] = React.useState([]);
    const [render, setRender] = React.useState(false);
    const [message, setMessage] = useState('');
    React.useEffect(() => {
        axios
            .get(`http://localhost:8080/api/customer/`)
            .then((response) => {
                console.log(response.data);
                if (typeof response.data !== "string") {
                    setMems(response.data);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, [render]);
    const [isOpen, setIsOpen] = useState(false);
    const handleBan = (id) => {
        //setMessage(`Bạn có muốn block khách hàng ${name} này không`);
        // setType('warning');
        //setShowNotification(true)
        // if (setShowNotification(true)) {
        // const data = {
        //     id: proid,
        // };
        // setRender(!render);
        // console.log(JSON.stringify(data));
        axios.put(`http://localhost:8080/api/customer/block/${id}`)
            .then((response) => {

                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            })
        setIsOpen(false);
        // }
    };

    const [type, setType] = useState('');

    const handleDelete = (id, name) => {

        if (window.confirm(`Bạn muốn xóa ${name}?`)) {
            // const data = {
            //     id: proid,
            // }
            // setRender(!render);
            // console.log(JSON.stringify(data));

            console.log(id);
            axios.delete(`http://localhost:8080/api/customer/delete/${id}`)
                .then((response) => {
                    const data = mems.filter(mem => mem.id !== id)
                    setMems(data)
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    };
    console.log(mems)
    const rows = mems.map((element) => (
        <tr key={element.name}>
            <td>
                <Container className='member-image-container'>
                    <Image
                        src="https://bossluxurywatch.vn/uploads/san-pham/rolex/sky-dweller/rolex-sky-dweller-42mm-326938-0005.png"
                        alt="watch"
                        height="45px"
                        width="45px"
                        fit="contain"
                    />
                </Container>
            </td>
            <td> <Text>{element.username}</Text></td>
            <td>{element.fullname}</td>
            <td>{element.phonenum}</td>
            <td>{element.address}</td>
            <td>
                <Group>
                    <div>
                        <Button variant="filled" color="yellow" onClick={() => {
                            setIsOpen(true);
                        }}>Cấm</Button>
                        <Modal className={"model"} isOpen={isOpen} >
                            <h2>Bạn muốn xóa {element.username}?</h2>
                            <button onClick={() => setIsOpen(false)}>Hủy</button>
                            <button onClick={() => handleBan(element.id)}>Xóa</button>
                        </Modal>
                    </div>

                    <Button variant="filled" color="red" onClick={() => handleDelete(element.id, element.username)}>Xóa</Button>
                </Group>
            </td>
        </tr >
    ));

    // const [activePage, setPage] = React.useState(1);
    // const maxItemPerPage = 6;
    // const total = Math.ceil(arr.length / maxItemPerPage);
    return (
        <Container id="kh" className="detail-section-container" style={{ backgroundColor: "white" }}>
            <Grid style={{}}>
                <Grid.Col className="">
                    <Group position="center" style={{ paddingBottom: "2%", margin: "2% 5%", borderBottom: "1px solid #000" }}>
                        <Title order={1} >Quản lý khách hàng </Title>
                    </Group>
                </Grid.Col>
                <Grid.Col>
                    <Table highlightOnHover>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Tên tài khoản</th>
                                <th>Tên người dùng</th>
                                <th>Số điện thoại</th>
                                <th>Địa chỉ</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>{rows}</tbody>
                    </Table>

                    {/* <Grid style={{ marginTop: 30 }}>
                        <Grid.Col>
                            <Grid>
                                {arr.slice((activePage - 1) * maxItemPerPage, activePage * maxItemPerPage).map(x => {
                                    return (                                     
                                        <Grid.Col key={x} 
                                            <p>hi</p>
                                        </Grid.Col>
                                    );
                                })}
                            </Grid>
                        </Grid.Col>
                    </Grid> */}
                </Grid.Col>
            </Grid>
        </Container>
    )
}
