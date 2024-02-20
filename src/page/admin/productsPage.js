import React from 'react';
import Sidebar from '../../component/general/sidebar'
import Products from '../../component/admin/products'
import { Container, Grid } from '@mantine/core';

export default function ProductsAdminPage() {
    return <Grid columns={12}>
        <Grid.Col style={{ padding: 0 }} xs={12} sm={3}><Sidebar selected={0} /></Grid.Col>
        <Grid.Col style={{ padding: 0 }} xs={12} sm={9}> <Products /></Grid.Col>
    </Grid >
}