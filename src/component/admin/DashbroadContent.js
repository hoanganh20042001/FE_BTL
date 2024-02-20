// import React, { useEffect, useRef } from 'react';
// import { Container, Grid } from '@mantine/core';
// import Chart from 'chart.js';

// export default function DashboardContent() {
//   const chartRef = useRef(null);

//   useEffect(() => {
//     const ctx = chartRef.current.getContext('2d');
//     const chart = new Chart(ctx, {
//       type: 'bar',
//       data: {
//         labels: ['January', 'February', 'March', 'April', 'May', 'June'],
//         datasets: [
//           {
//             label: 'Sales',
//             data: [12, 19, 3, 5, 2, 3],
//             backgroundColor: 'rgba(75, 192, 192, 0.6)',
//           },
//         ],
//       },
//       options: {
//         responsive: true,
//         maintainAspectRatio: false,
//       },
//     });

//     return () => {
//       chart.destroy();
//     };
//   }, []);

//   return (
//     <Container size="lg">
//       <Grid gutter="lg">
//         <Grid.Col span={8}>
//           <h1>Dashboard</h1>
//           <canvas ref={chartRef} />
//         </Grid.Col>
//         <Grid.Col span={4}>
//           <h2>Statistics</h2>
//           <p>Total Sales: $1000</p>
//           <p>New Customers: 20</p>
//           <p>Orders: 50</p>
//         </Grid.Col>
//       </Grid>
//     </Container>
//   );
// }
