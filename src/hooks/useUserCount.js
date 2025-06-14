// import { useEffect, useState } from 'react';
// import axios from 'axios';

// export default function useUserCount() {
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     axios.get('http://localhost:8080/api/user/getAll')
//       .then((res) => {
//         if (Array.isArray(res.data.usersList)) {
//           setCount(res.data.usersList.length);
//         } else {
//           console.error('Data bukan array:', res.data);
//         }
//       })
//       .catch((err) => {
//         console.error('Gagal mengambil data user:', err);
//       });
//   }, []);

//   return count;
// }

import { useEffect, useState } from 'react';
import api from '../utils/api'; // <-- GUNAKAN API TERPUSAT

export default function useUserCount() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Ganti axios.get dengan api.get dan hapus URL lengkapnya
    api.get('/api/user/getAll')
      .then((res) => {
        if (Array.isArray(res.data.usersList)) {
          setCount(res.data.usersList.length);
        } else {
          console.error('Data bukan array:', res.data);
        }
      })
      .catch((err) => {
        console.error('Gagal mengambil data user:', err);
      });
  }, []);

  return count;
}