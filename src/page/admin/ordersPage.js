import React from 'react';
import Sidebar from '../../component/general/sidebar'
import Orders from '../../component/admin/orders'
import { Container, Grid } from '@mantine/core';


export default function OrdersAdminPage() {
    return <Grid columns={12}>
        <Grid.Col style={{ padding: 0 }} xs={12} sm={3}><Sidebar selected={3} /></Grid.Col>
        <Grid.Col style={{ padding: 0 }} xs={12} sm={9}> <Orders /></Grid.Col>
    </Grid >
}