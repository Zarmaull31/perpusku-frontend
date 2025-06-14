// // src/sections/@dashboard/app/DashboardMemberPage.jsx

// import { Helmet } from "react-helmet-async";
// import { Link as RouterLink } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Container,
//   Grid,
//   Typography,
//   Card,
//   CardHeader,
//   List,
//   ListItem,
//   ListItemText,
//   ListItemIcon,
//   Button,
//   Box,
//   CircularProgress
// } from "@mui/material";

// import { useAuth } from "../../../hooks/useAuth";
// import { AppWidgetSummary } from "./index"; // Menggunakan kembali widget summary
// import Iconify from "../../../components/iconify";
// import { apiUrl, methods, routes } from "../../../constants";

// // ----------------------------------------------------------------------

// export default function DashboardMemberPage() {
//   const { user } = useAuth();
//   const [myBorrowals, setMyBorrowals] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     // Ambil data peminjaman HANYA untuk user yang sedang login
//     axios.get(apiUrl(routes.BORROWAL, methods.GET_ALL))
//       .then(res => {
//         const allBorrowals = res.data.borrowalsList;
//         // Filter data di frontend
//         const userBorrowals = allBorrowals.filter(borrowal => borrowal.member._id === user._id);
//         setMyBorrowals(userBorrowals);
//         setIsLoading(false);
//       })
//       .catch(err => {
//         console.error("Gagal mengambil data peminjaman pribadi: ", err);
//         setIsLoading(false);
//       });
//   }, [user._id]); // Jalankan ulang jika user ID berubah

//   // Hitung statistik untuk widget
//   const currentlyBorrowed = myBorrowals.filter(b => b.status === 'Borrowed').length;
//   const totalHistory = myBorrowals.length;

//   return (
//     <>
//       <Helmet>
//         <title> Dashboard Siswa </title>
//       </Helmet>

//       <Container maxWidth="xl">
//         <Typography variant="h4" sx={{ mb: 5 }}>
//           Hi {user.name.split(' ')[0]}, Selamat Datang!
//         </Typography>

//         <Grid container spacing={3}>
//           {/* Widget untuk buku yang sedang dipinjam */}
//           <Grid item xs={12} sm={6} md={6}>
//             <AppWidgetSummary
//               title="Buku Sedang Dipinjam"
//               total={currentlyBorrowed}
//               color="info"
//               icon={'material-symbols:book-outline-rounded'}
//             />
//           </Grid>

//           {/* Widget untuk total riwayat peminjaman */}
//           <Grid item xs={12} sm={6} md={6}>
//             <AppWidgetSummary
//               title="Total Riwayat Pinjaman"
//               total={totalHistory}
//               color="warning"
//               icon={'material-symbols:history-rounded'}
//             />
//           </Grid>

//           {/* Daftar Buku yang Sedang Dipinjam */}
//           <Grid item xs={12} md={12} lg={12}>
//             <Card>
//               <CardHeader title="Buku yang Perlu Dikembalikan" />
//               <Box sx={{ p: 3, pb: 1 }}>
//                 {isLoading ? (
//                   <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
//                     <CircularProgress />
//                   </Box>
//                 ) : (
//                   <List>
//                     {myBorrowals.filter(b => b.status === 'Borrowed').length > 0 ? (
//                       myBorrowals.filter(b => b.status === 'Borrowed').map((borrowal) => (
//                         <ListItem key={borrowal._id}>
//                           <ListItemIcon>
//                             <Iconify icon={'icon-park-outline:book-open'} sx={{ width: 24, height: 24 }} />
//                           </ListItemIcon>
//                           <ListItemText 
//                             primary={borrowal.bookName} 
//                             secondary={`Batas Pengembalian: ${new Date(borrowal.dueDate).toLocaleDateString('id-ID')}`} 
//                           />
//                         </ListItem>
//                       ))
//                     ) : (
//                       <Typography sx={{ px: 2, color: 'text.secondary' }}>
//                         Tidak ada buku yang sedang Anda pinjam saat ini.
//                       </Typography>
//                     )}
//                   </List>
//                 )}
//               </Box>
//               <Box sx={{ p: 2, textAlign: 'right' }}>
//                   <Button component={RouterLink} to="/books" size="small" color="primary" endIcon={<Iconify icon={'eva:arrow-ios-forward-fill'} />}>
//                       Lihat Katalog Buku
//                   </Button>
//               </Box>
//             </Card>
//           </Grid>
//         </Grid>
//       </Container>
//     </>
//   );
// }

import { Helmet } from "react-helmet-async";
import { Link as RouterLink } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Container, Grid, Typography, Card, CardHeader,
  List, ListItem, ListItemText, ListItemIcon, Button, Box, CircularProgress
} from "@mui/material";

// Semua import dari library diletakkan di atas import lokal
import { useAuth } from "../../../hooks/useAuth";
import api from "../../../utils/api"; // <-- Import lokal setelah library
import { AppWidgetSummary } from "./index";
import Iconify from "../../../components/iconify";

export default function DashboardMemberPage() {
  const { user } = useAuth();
  const [myBorrowals, setMyBorrowals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user?._id) {
      api.get('/api/borrowal/getAll')
        .then(res => {
          const allBorrowals = res.data.borrowalsList || [];
          const userBorrowals = allBorrowals.filter(borrowal => borrowal.memberId?._id === user._id);
          setMyBorrowals(userBorrowals);
          setIsLoading(false);
        })
        .catch(err => {
          console.error("Gagal mengambil data peminjaman pribadi: ", err);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [user?._id]);

  const currentlyBorrowed = myBorrowals.filter(b => b.status === 'BORROWED').length;
  const totalHistory = myBorrowals.length;

  return (
    <>
      <Helmet><title> Dashboard Anggota </title></Helmet>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>Hi {user?.name?.split(' ')[0]}, Selamat Datang!</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={6}>
            <AppWidgetSummary title="Buku Sedang Dipinjam" total={currentlyBorrowed} color="info" icon={'material-symbols:book-outline-rounded'} />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <AppWidgetSummary title="Total Riwayat Pinjaman" total={totalHistory} color="warning" icon={'material-symbols:history-rounded'} />
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Buku yang Perlu Dikembalikan" />
              <Box sx={{ p: 3, pb: 1 }}>
                {isLoading ? (
                  <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}><CircularProgress /></Box>
                ) : (
                  <List>
                    {myBorrowals.filter(b => b.status === 'BORROWED').length > 0 ? (
                      myBorrowals.filter(b => b.status === 'BORROWED').map((borrowal) => (
                        <ListItem key={borrowal._id}>
                          <ListItemIcon><Iconify icon={'icon-park-outline:book-open'} sx={{ width: 24, height: 24 }} /></ListItemIcon>
                          <ListItemText primary={borrowal.bookId?.name || "Nama Buku Tidak Ditemukan"} secondary={`Status: ${borrowal.status}`} />
                        </ListItem>
                      ))
                    ) : ( <Typography sx={{ px: 2, color: 'text.secondary' }}>Tidak ada buku yang sedang Anda pinjam.</Typography>)}
                  </List>
                )}
              </Box>
              <Box sx={{ p: 2, textAlign: 'right' }}>
                <Button component={RouterLink} to="/dashboard/books" size="small" color="primary" endIcon={<Iconify icon={'eva:arrow-ios-forward-fill'} />}>Lihat Katalog Buku</Button>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}