// import { Helmet } from "react-helmet-async";
// import { styled } from "@mui/material/styles";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { Container, Typography } from "@mui/material";
// import { Navigate } from "react-router-dom";
// import { useAuth } from "../../../hooks/useAuth";

// import Logo from "../../../components/logo";
// import { LoginForm } from "./index";

// // ----------------------------------------------------------------------

// const StyledRoot = styled("div")(({ theme }) => ({
//   [theme.breakpoints.up("md")]: {
//     display: "flex"
//   }
// }));

// const StyledContent = styled("div")(({ theme }) => ({
//   maxWidth: 480,
//   margin: "auto",
//   minHeight: "100vh",
//   display: "flex",
//   justifyContent: "center",
//   flexDirection: "column",
//   padding: theme.spacing(12, 0)
// }));

// // ----------------------------------------------------------------------

// export default function LoginPage() {
//   const { login, user } = useAuth();

//   if (user) {
//     if (user.isAdmin) {
//       return <Navigate to={"/dashboard"} replace />;
//     }
//     return <Navigate to={"/books"} replace />;
//   }

//   const loginUser = (email, password) => {
//     if (email === "" || password === "") {
//       toast.error("Please enter email and password");
//     } else {
//       axios.post(`http://localhost:8080/api/auth/login`, { email, password }, { withCredentials: false })
//         .then((response) => {
//           // handle success
//           if (response.status === 200) {
//             console.log(response.data);
//             toast.success(`Berhasil Login  ${response.data.user.name}`);
//             login(response.data.user);
//           }
//         })
//         .catch((error) => {
//           // handle error
//           toast.error(error.response.data.message);
//           console.log(error);
//         });
//     }
//   };


  
//   return (
//     <>
//       <Helmet>
//         <title> Login | Perpusku</title>
//       </Helmet>
  
//       <StyledRoot>
//         <Container maxWidth="sm">
//           <StyledContent>
  
//             {/* Logo di tengah atas */}
//             <Logo
//               sx={{
//                 margin: "0 auto",
//                 width: "200px",
//                 marginBottom: 2
//               }}
//             />
  
//             {/* Tulisan Online Library */}
//             <Typography
//               variant="h4"
//               sx={{ color: "#666666", fontWeight: "600" }}
//               textAlign="center"
//               gutterBottom
//               paddingBottom={0}
//             >
//               E-Libray SMP Mahakarya Jakarta
//             </Typography>
  
//             <Typography
//               variant="h3"
//               textAlign="center"
//               gutterBottom
//               paddingBottom={3}
//             >
//               Login
//             </Typography>
  
//             <LoginForm loginUser={loginUser} />
  
//           </StyledContent>
//         </Container>
//       </StyledRoot>
//     </>
//   );
  
// }


// File: src/pages/LoginPage.jsx (Versi FINAL)

import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Divider, Stack, Button } from '@mui/material';

import api from '../utils/api'; // <-- 1. GUNAKAN API TERPUSAT
import { useAuth } from '../hooks/useAuth';
import Iconify from '../components/iconify';
import Logo from '../components/logo';
import LoginForm from '../sections/auth/login/LoginForm';

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const loginUser = async (email, password) => {
    if (!email || !password) {
      return toast.error("Please enter email and password");
    }
    try {
      // 2. Ganti axios.post dengan api.post
      const response = await api.post('/api/auth/login', { email, password });
      
      if (response.data.success) {
        toast.success('Berhasil login!');
        login(response.data.user); // Panggil fungsi login dari context
        navigate('/dashboard', { replace: true });
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login gagal, silakan coba lagi.");
      console.log(err);
    }
  };

  return (
    <>
      <Helmet>
        <title> Login </title>
      </Helmet>

      <StyledRoot>
        <Logo sx={{ position: 'fixed', top: { xs: 16, sm: 24, md: 40 }, left: { xs: 16, sm: 24, md: 40 }, }} />
        <StyledSection>
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
            Hi, Selamat Datang!
          </Typography>
          <img src="/assets/illustrations/illustration_login.png" alt="login" />
        </StyledSection>

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              Sign in to E-Library
            </Typography>

            <Typography variant="body2" sx={{ mb: 5 }}>
              Belum punya akun? {''}
              <Link variant="subtitle2">Get started</Link>
            </Typography>

            <Stack direction="row" spacing={2}>
              <Button fullWidth size="large" color="inherit" variant="outlined">
                <Iconify icon="eva:google-fill" color="#DF3E30" width={22} height={22} />
              </Button>
              <Button fullWidth size="large" color="inherit" variant="outlined">
                <Iconify icon="eva:facebook-fill" color="#1877F2" width={22} height={22} />
              </Button>
              <Button fullWidth size="large" color="inherit" variant="outlined">
                <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={22} height={22} />
              </Button>
            </Stack>

            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>OR</Typography>
            </Divider>
            
            {/* Mengirim fungsi loginUser ke LoginForm */}
            <LoginForm onLogin={loginUser} />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}