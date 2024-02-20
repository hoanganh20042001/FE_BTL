import React from 'react';
import Sidebar from '../../component/general/sidebar'
import News from '../../component/admin/news'
import { Container, Grid } from '@mantine/core';


export default function NewsAdminPage() {
    return <Grid columns={12}>
        <Grid.Col style={{ padding: 0 }} xs={12} sm={3}><Sidebar selected={1}/></Grid.Col>
        <Grid.Col style={{ padding: 0 }} xs={12} sm={9}> <News /></Grid.Col>
    </Grid >
}