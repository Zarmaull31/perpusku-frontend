
// import { Helmet } from "react-helmet-async";
// import { useTheme } from "@mui/material/styles";
// import { Container, Grid, Typography } from "@mui/material";
// import { useEffect, useState } from "react";
// import axios from "axios";

// import { AppCurrentVisits, AppWebsiteVisits, AppWidgetSummary } from "./index";
// import { useAuth } from "../../../hooks/useAuth";
// import UserList from './UserList'; // Import komponen UserList
// import useUserCount from '../../../hooks/useUserCount'; // sesuaikan path relatif




// // ----------------------------------------------------------------------

// export default function DashboardAppPage() {
//   const { user } = useAuth();
//   const theme = useTheme();
//   const [totalPinjaman, setTotalPinjaman] = useState(0);
//   const [totalPengembalian, setTotalPengembalian] = useState(0); // <-- Tambahan
//   const [totalDenda, setTotalDenda] = useState(0);
//   const userCount = useUserCount();


//    // useEffect untuk mengambil data dari API backend
//    useEffect(() => {
//     // Ambil total pinjaman
//     axios.get('http://localhost:8080/api/borrowals/total')
//       .then(res => {
//         setTotalPinjaman(res.data.total);
//       })
//       .catch(err => {
//         console.error("Gagal mengambil data pinjaman buku: ", err);
//       });

//     // Ambil total pengembalian
//     axios.get('http://localhost:8080/api/bookReturn/total')
//       .then(res => {
//         setTotalPengembalian(res.data.total);
//       })
//       .catch(err => {
//         console.error("Gagal mengambil data pengembalian buku: ", err);
//       });
//   }, []);


// const [chartLabels, setChartLabels] = useState([]);
// const [chartData, setChartData] = useState([]);
// // useEffect untuk mengambil data statistik harian
// useEffect(() => {
//   axios.get("http://localhost:8080/api/statistik/harian")
//     .then((res) => {
//       const result = res.data; // ← Pastikan ini array seperti [{ date, pinjam, kembali, user }]

//       setChartLabels(result.map(item => item.date));

//       setChartData([
//         {
//           name: "Peminjaman",
//           type: "column",
//           fill: "solid",
//           data: result.map(item => item.pinjam),
//         },
//         {
//           name: "Pengembalian",
//           type: "area",
//           fill: "gradient",
//           data: result.map(item => item.kembali),
//         },
//         {
//           name: "User Baru",
//           type: "line",
//           fill: "solid",
//           data: result.map(item => item.user),
//         },
//       ]);
//     })
//     .catch((err) => {
//       console.error("Gagal mengambil data statistik harian:", err);
//     });
// }, []);


//   return (
//     <>
//       <Helmet>
//         <title> Dashboard </title>
//       </Helmet>

//       <Container maxWidth="xl">
//         <Typography variant="h4" sx={{mb: 5}}>
//           Hi {user.name.split(' ')[0]}, Selamat Datang Kembali!
//         </Typography>


//            <Grid container spacing={3}>
//           {/* Pinjaman Buku Widget */}
//           <Grid item xs={12} sm={6} md={4}>
//             <AppWidgetSummary
//               title="Pinjaman Buku"
//               total={totalPinjaman} // Menggunakan state totalPinjaman
//               icon={'material-symbols:library-books-rounded'} // Ganti icon sesuai kebutuhan
//             />
//           </Grid>

//           <Grid item xs={12} sm={6} md={4}>
//             <AppWidgetSummary
//               title="Total Pengembalian"
//               total={totalPengembalian}
//               color="success"
//               icon={'mdi:check-decagram-outline'} // Icon buku dengan tanda centang
//             />
//           </Grid>

//          <Grid item xs={12} sm={6} md={4}>
//           <AppWidgetSummary
//             title="User List"
//             color="info"
//             icon={'material-symbols:group'}
//             total={userCount}
//                 />
//          </Grid>


//           {/* <Grid item xs={12} sm={6} md={4}>
//             <AppWidgetSummary title="Bug Reports" total={234} color="error" icon={'ant-design:bug-filled'} />
//           </Grid> */}

//           <Grid item xs={12} md={6} lg={8}>
//            <AppWebsiteVisits
//               title="Aktivitas Harian"
//               subheader="Statistik pinjam, kembali, dan user"
//               chartLabels={chartLabels}
//               chartData={chartData}
//             />
//           </Grid>

//           <Grid item xs={12} md={6} lg={4}>
//             <AppCurrentVisits
//               title="Grafik Perpustakaan"
//               chartData={[
//                 { label: 'Peminjaman', value: totalPinjaman }, 
//                 { label: 'Pengembalian', value: totalPengembalian },
//                 { label: 'Jumlah User Aktif', value: userCount },
//               ]}
//               chartColors={[
//                 theme.palette.primary.main,
//                 theme.palette.warning.main,
//                 theme.palette.success.main,
//               ]}
//             />
//           </Grid>

//         </Grid>
//       </Container>
//     </>
//   );
// }


import { Helmet } from "react-helmet-async";
import { useTheme } from "@mui/material/styles";
import { Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import api from "../../../utils/api"; // <-- MENGGUNAKAN API TERPUSAT

import { AppCurrentVisits, AppWebsiteVisits, AppWidgetSummary } from "./index";
import { useAuth } from "../../../hooks/useAuth";
import useUserCount from '../../../hooks/useUserCount';

export default function DashboardAppPage() {
  const { user } = useAuth();
  const theme = useTheme();
  const [totalPinjaman, setTotalPinjaman] = useState(0);
  const [totalPengembalian, setTotalPengembalian] = useState(0);
  const userCount = useUserCount();
  const [chartLabels, setChartLabels] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Menggunakan 'api' untuk semua panggilan
    api.get('/api/borrowal/total')
      .then(res => setTotalPinjaman(res.data.total || 0))
      .catch(err => console.error("Gagal mengambil data pinjaman buku: ", err));

    api.get('/api/bookReturn/total')
      .then(res => setTotalPengembalian(res.data.total || 0))
      .catch(err => console.error("Gagal mengambil data pengembalian buku: ", err));

    api.get("/api/statistik/harian")
      .then((res) => {
        const result = res.data.data || [];
        setChartLabels(result.map(item => item.date));
        setChartData([
          { name: "Peminjaman", type: "column", fill: "solid", data: result.map(item => item.pinjam) },
          { name: "Pengembalian", type: "area", fill: "gradient", data: result.map(item => item.kembali) },
          { name: "User Baru", type: "line", fill: "solid", data: result.map(item => item.user) },
        ]);
      })
      .catch((err) => console.error("Gagal mengambil data statistik harian:", err));
  }, []);

  return (
    <>
      <Helmet><title> Dashboard </title></Helmet>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>Hi {user.name.split(' ')[0]}, Selamat Datang Kembali!</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary title="Pinjaman Buku" total={totalPinjaman} icon={'material-symbols:library-books-rounded'} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary title="Total Pengembalian" total={totalPengembalian} color="success" icon={'mdi:check-decagram-outline'} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary title="User List" color="info" icon={'material-symbols:group'} total={userCount} />
          </Grid>
          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits title="Aktivitas Harian" subheader="Statistik pinjam, kembali, dan user" chartLabels={chartLabels} chartData={chartData} />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits title="Grafik Perpustakaan" chartData={[
              { label: 'Peminjaman', value: totalPinjaman },
              { label: 'Pengembalian', value: totalPengembalian },
              { label: 'Jumlah User Aktif', value: userCount },
            ]} chartColors={[theme.palette.primary.main, theme.palette.warning.main, theme.palette.success.main]} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}