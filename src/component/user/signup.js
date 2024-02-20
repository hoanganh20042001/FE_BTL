import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { TextInput, Button, Container, PasswordInput, Grid, Image, Space, Text, Popover } from '@mantine/core';
import { useForm } from '@mantine/form';
import Logo from "../general/logo";
import { X } from 'tabler-icons-react';
import { useViewportSize } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../css/signin.css";

export default function Signup() {
  const { height, width } = useViewportSize();
  const navigate = useNavigate();
  const [failed, setFailed] = useState(false);
  const form = useForm({
    initialValues: {
      username: '',
      password: '',
      repassword: '',
      phonenumber: ''
    },

    validate: {
      username: (value) => value.length === 0 ? "Vui lòng nhập tên đăng nhập" : null,
      password: (value) => value.length === 0 ? "Vui lòng nhập mật khẩu" : null,
      repassword: (value, values) =>
        value !== values.password ? 'Mật khẩu không chính xác' : null,
      phonenumber: (value) => /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/.test(value) ? null : " Số điện thoại không hợp lệ"
    }
  });

  const handleSignup = (values) => {
    const obj = { "username": values.username, "password": values.password, "phonenum": values.phonenumber };
    console.log(obj);
    axios.post(`http://localhost:8080/api/customer/signup`, obj).then((response) => {
      console.log(response);
      if (response.data === 'success') {
        console.log("signup successful");
        navigate("/signin");
      } else {
        console.log("signup failed");
        setFailed(true);
      }
    }).catch((error) => {
      console.log(error);
    })
  }

  return (
    <Grid>
      <Grid.Col xl={4} lg={4} md={5} sm={6} xs={12} style={{ display: "flex" }}>
        <Container mx="auto" className="form-signin-container">
          <Logo classname="form-company-logo" />
          <Text style={width > 768 ? { fontSize: 34 } : { fontSize: 24 }} weight={500}>Đăng kí</Text>
          <Space h="md" />
          <form onSubmit={form.onSubmit((values) => handleSignup(values))}>
            <TextInput
              label="Tài khoản"
              placeholder="username"
              {...form.getInputProps('username')}
              className="form-username-input"
            />
            <Space h="md" />
            <PasswordInput
              label="Mật khẩu"
              placeholder="password"
              {...form.getInputProps('password')}
              className="form-password-input"
              onPaste={(e) => {
                e.preventDefault()
                return false;
              }} onCopy={(e) => {
                e.preventDefault()
                return false;
              }}
            />
            <Space h="md" />
            <PasswordInput
              label="Nhập lại mật khẩu"
              placeholder="password"
              {...form.getInputProps('repassword')}
              className="form-password-input"
              onPaste={(e) => {
                e.preventDefault()
                return false;
              }} onCopy={(e) => {
                e.preventDefault()
                return false;
              }}
            />
            <Space h="md" />
            <TextInput
              label="Số điện thoại"
              placeholder="phone number"
              {...form.getInputProps('phonenumber')}
              className="form-username-input"
            />
            <Space h="md" />
            <Popover
              opened={failed}
              onClose={() => setFailed(false)}
              target={<Button type="submit" color="dark" className="form-signin-submit-btn" onClick={() => setFailed(false)} fullWidth>ĐĂNG KÍ</Button>}
              width={200}
              position="bottom"
              withArrow
            >
              <Text color="gray">Tài khoản đã tồn tại <X size={20} color="red" /></Text>
            </Popover>
            <Space h="sm" />
            <Text color="gray">Đã có tài khoản ? Đăng nhập ngay <Link to="/signin">tại đây</Link></Text>
          </form>
        </Container>
      </Grid.Col>
      {width > 768 ? <Grid.Col xl={8} lg={8} md={7} sm={6}>
        <Image src="https://images.unsplash.com/photo-1533139502658-0198f920d8e8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=742&q=80"
          height="100vh"
          style={{ marginBottom: "-10px" }}
          fit="cover"
        />
      </Grid.Col> : null}
    </Grid >
  );
}