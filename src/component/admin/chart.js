// import React, { useEffect, useRef } from 'react';
// import { Col } from 'react-bootstrap';
// import Chart from 'chart.js';

// const ChartComponent = () => {
//   const chartRef = useRef(null);

//   useEffect(() => {
//     if (chartRef.current) {
//       const ctx = chartRef.current.getContext('2d');

//       if (ctx) {
//         const data = {
//           labels: ['Sản phẩm A', 'Sản phẩm B', 'Sản phẩm C', 'Sản phẩm D', 'Sản phẩm E'],
//           datasets: [
//             {
//               label: 'Doanh thu',
//               data: [500, 1000, 750, 900, 1200],
//               backgroundColor: 'rgba(75, 192, 192, 0.6)', // Màu nền của cột
//               borderColor: 'rgba(75, 192, 192, 1)', // Màu viền của cột
//               borderWidth: 1, // Độ dày viền
//             },
//           ],
//         };

//         const options = {
//           scales: {
//             y: {
//               beginAtZero: true,
//               min: 0,
//               max: 1500,
//             },
//           },
//         };

//         new Chart(ctx, {
//           type: 'bar',
//           data,
//           options,
//         });
//       }
//     }
//   }, []);

//   return (
//     <Col style={{ padding: 0 }} xs={12} sm={9}>
//       <canvas ref={chartRef} />
//     </Col>
//   );
// };

// export default ChartComponent;
