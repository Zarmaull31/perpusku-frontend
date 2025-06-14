// import { useState } from "react";
// import { IconButton, InputAdornment, Stack, TextField } from "@mui/material";
// import { LoadingButton } from "@mui/lab";
// import PropTypes from "prop-types";
// import Iconify from "../../../components/iconify";

// // ----------------------------------------------------------------------

// const LoginForm = ({loginUser}) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);

//   return (
//     <>
//       <Stack spacing={3} sx={{mb: 2}}>
//         <TextField name="email" label="Email address" value={email} required onChange={
//           (event) => {
//             setEmail(event.target.value);
//           }
//         }/>

//         <TextField
//           name="password"
//           required
//           label="Password"
//           value={password}
//           type={showPassword ? 'text' : 'password'}
//           onChange={(event) => setPassword(event.target.value)}
//           InputProps={{
//             endAdornment: (
//               <InputAdornment position="end">
//                 <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
//                   <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}/>
//                 </IconButton>
//               </InputAdornment>
//             ),
//           }}
//         />
//       </Stack>

//       {/* <Typography variant="body2" sx={{mb: 5, mt: 3}} textAlign="center" */}
//       {/* > */}
//       {/*  Don’t have an account? {''} */}
//       {/*  <Link variant="subtitle2">Get started</Link> */}
//       {/* </Typography> */}

//       <LoadingButton sx={{mt: 4}} fullWidth size="large" type="submit" variant="contained"
//                      onClick={() => loginUser(email, password)}>
//         Login
//       </LoadingButton>
//     </>
//   );
// }

// LoginForm.propTypes = {
//   loginUser: PropTypes.func,
// };

// export default LoginForm


// File: client/src/sections/auth/login/LoginForm.js (Versi Final)

import { useState } from "react";
import PropTypes from "prop-types";
import { IconButton, InputAdornment, Stack, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import Iconify from "../../../components/iconify";

export default function LoginForm({ onLogin }) { // KUNCI PERBAIKAN: Menerima 'onLogin'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault(); // Mencegah form submit me-refresh halaman
    onLogin(email, password); // Memanggil fungsi dari parent
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={3} sx={{mb: 2}}>
        <TextField 
          name="email" 
          label="Email address" 
          value={email} 
          required 
          onChange={(event) => setEmail(event.target.value)}
        />
        <TextField
          name="password"
          required
          label="Password"
          value={password}
          type={showPassword ? 'text' : 'password'}
          onChange={(event) => setPassword(event.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}/>
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <LoadingButton 
        sx={{mt: 4}} 
        fullWidth 
        size="large" 
        type="submit" // Type 'submit' akan memicu 'onSubmit' pada form
        variant="contained"
      >
        Login
      </LoadingButton>
    </form>
  );
}

LoginForm.propTypes = {
  onLogin: PropTypes.func, // Memvalidasi bahwa onLogin adalah sebuah fungsi
};