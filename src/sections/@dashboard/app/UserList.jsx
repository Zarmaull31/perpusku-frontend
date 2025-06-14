import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useUserCount() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:8080/api/user/getAll')
      .then((res) => {
        if (Array.isArray(res.data.usersList)) {
          setCount(res.data.usersList.length);
        }
      })
      .catch((err) => {
        console.error('Gagal mengambil data user:', err);
      });
  }, []);

  return count;
}
