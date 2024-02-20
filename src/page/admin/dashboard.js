import React from 'react';
import Sidebar from '../../component/general/sidebar'
import Chart from '../../component/admin/chart';
import { Container, Grid } from '@mantine/core';
import DashboardContent from '../../component/admin/DashbroadContent';
export default function DashboardPage() {
    return <Grid columns={12}>
        <Grid.Col style={{ padding: 0 }} xs={12} sm={3}><Sidebar selected={0} /></Grid.Col>
        <Grid.Col style={{ padding: 0 }} xs={12} sm={9}></Grid.Col>
    </Grid >
}