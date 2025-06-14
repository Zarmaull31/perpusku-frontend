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
// File: client/src/pages/LoginPage.jsx (Versi Final)

import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { styled } from '@mui/material/styles';
import { Container, Typography } from '@mui/material';

import api from '../utils/api';
import { useAuth } from '../hooks/useAuth';
import Logo from '../components/logo';
import { LoginForm } from '../sections/auth/login';

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: { display: 'flex' },
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
  const { login, user } = useAuth();

  // Redirect jika user sudah login
  if (user) {
    return navigate(user.isAdmin ? '/dashboard/app' : '/dashboard/member', { replace: true });
  }

  const handleLogin = async (email, password) => {
    if (!email || !password) {
      toast.error("Email dan password harus diisi.");
      return;
    }
    
    try {
      const response = await api.post('/api/auth/login', { email, password });
      
      if (response.data.success) {
        toast.success(`Berhasil Login, Selamat Datang ${response.data.user.name}`);
        login(response.data.user);
        navigate(response.data.user.isAdmin ? '/dashboard/app' : '/dashboard/member', { replace: true });
      }
    } catch (error) {
      const message = error.response?.data?.message || "Login gagal, periksa kembali email dan password Anda.";
      toast.error(message);
      console.error(error);
    }
  };

  return (
    <>
      <Helmet>
        <title> Login | Perpusku </title>
      </Helmet>
      <StyledRoot>
        <Container maxWidth="sm">
          <StyledContent>
            <Logo sx={{ margin: "0 auto", width: "150px", marginBottom: 2 }} />
            <Typography variant="h4" sx={{ color: "#666666", fontWeight: "600" }} textAlign="center" gutterBottom>
              E-Library SMP Mahakarya Jakarta
            </Typography>
            <Typography variant="h3" textAlign="center" gutterBottom paddingBottom={3}>
              Login
            </Typography>
            
            {/* KUNCI PERBAIKAN: Mengirim fungsi 'handleLogin' melalui props 'onLogin' */}
            <LoginForm onLogin={handleLogin} />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}