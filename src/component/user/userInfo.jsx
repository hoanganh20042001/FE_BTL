import React from "react";
import {
    TextInput,
    Button,
    Container,
    PasswordInput,
    Grid,
    Space,
    Text,
    Modal,
} from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import BreadCrumbs from "../general/breadCrumb";
import { useForm } from "@mantine/form";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function UserInfo() {
    const { height, width } = useViewportSize();
    const [success, setSuccess] = React.useState(false);
    let location = useLocation();

    const form = useForm({
        initialValues: {
            userName: sessionStorage.getItem("userName"),
            password: sessionStorage.getItem("password"),
            fullName:
                sessionStorage.getItem("fullName") === "null"
                    ? null
                    : sessionStorage.getItem("fullName"),
            address:
                sessionStorage.getItem("address") === "null"
                    ? null
                    : sessionStorage.getItem("address"),
            phonenum: sessionStorage.getItem("phoneNum"),
        },

        validate: {
            fullName: (value) =>
                /[a-z0-9A-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]$/.test(
                    value
                )
                    ? null
                    : "Vui lòng nhập tên hợp lệ",
            phonenum: (value) =>
                /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/.test(
                    value
                )
                    ? null
                    : " Số điện thoại không hợp lệ",
        },
    });

    const handleUpdate = async (values) => {
        const data = {
            id: sessionStorage.getItem("id"),
            fullname: values.fullName,
            address: values.address,
            phonenum: values.phonenum,
            password: values.password,
        };

        await axios
            .post(
                `http://localhost:8080/api/customer/update`,
                data
            )
            .then((response) => {
                if (response.data === "success") {
                    console.log("Cập nhật thành công");
                    sessionStorage.setItem("fullName", values.fullName);
                    sessionStorage.setItem("address", values.address);
                    sessionStorage.setItem("phoneNum", values.phonenum);
                    sessionStorage.setItem("password", values.password);
                    setSuccess(true);
                } else {
                    console.log("Cập nhật thất bại");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <Grid style={{ marginTop: 60 }}>
            <BreadCrumbs location={location} size={width} />
            <Grid.Col>
                <Container mx="auto" className="form-signin-container">
                    <Text
                        style={
                            width > 768 ? { fontSize: 34 } : { fontSize: 24 }
                        }
                        weight={500}
                    >
                        Thông tin của bạn
                    </Text>
                    <Space h="md" />
                    <Modal
                        opened={success}
                        onClose={() => setSuccess(false)}
                        size={300}
                        withCloseButton={false}
                        centered
                    >
                        <Text>Cập nhật thành công !</Text>
                        <Space h="md" />
                        <Button
                            color="dark"
                            className="form-signin-submit-btn"
                            onClick={() => setSuccess(false)}
                        >
                            Đóng
                        </Button>
                    </Modal>
                    <form
                        onSubmit={form.onSubmit((values) =>
                            handleUpdate(values)
                        )}
                    >
                        <TextInput
                            label="Tài khoản"
                            placeholder="username"
                            className="form-username-input"
                            disabled
                            {...form.getInputProps("username")}
                        />
                        <Space h="md" />
                        <PasswordInput
                            label="Mật khẩu"
                            placeholder="password"
                            className="form-password-input"
                            {...form.getInputProps("password")}
                            disabled
                            onPaste={(e) => {
                                e.preventDefault();
                                return false;
                            }}
                            onCopy={(e) => {
                                e.preventDefault();
                                return false;
                            }}
                        />
                        <Space h="md" />
                        <TextInput
                            label="Tên"
                            placeholder="Tên của bạn"
                            className="form-username-input"
                            {...form.getInputProps("fullName")}
                        />
                        <Space h="md" />
                        <TextInput
                            label="Địa chỉ"
                            placeholder="Địa chỉ"
                            className="form-password-input"
                            {...form.getInputProps("address")}
                        />
                        <Space h="md" />
                        <TextInput
                            label="Số điện thoại"
                            placeholder="số điện thoại"
                            className="form-username-input"
                            {...form.getInputProps("phonenum")}
                        />

                        <Space h="md" />
                        <Button
                            type="submit"
                            color="dark"
                            className="form-signin-submit-btn"
                        >
                            Cập nhật
                        </Button>
                        <Space h="sm" />
                    </form>
                </Container>
            </Grid.Col>
        </Grid>
    );
}
