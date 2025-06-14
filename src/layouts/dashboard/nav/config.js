// import {FiBookOpen, FiCheckCircle, FiHome, FiList, FiLock, FiUsers} from "react-icons/fi";

// const navConfig = [
//   {
//     title: 'Dashboard',
//     path: '/dashboard',
//     icon: <FiHome/>,
//   },
//   {
//     title: 'Kelola Data Buku',
//     path: '/books',
//     icon: <FiBookOpen/>,
//   },
//   {
//     title: 'Kelola Data Penulis',
//     path: '/authors',
//     icon: <FiUsers/>,
//   },
//   {
//     title: 'Kelola Data Genre',
//     path: '/genres',
//     icon: <FiList/>,
//   },
//   {
//     title: 'Kelola Transaksi Peminjaman',
//     path: '/borrowals',
//     icon: <FiCheckCircle/>,
//   },
//   {
//     title: 'Kelola Transaksi Pengembalian',
//     path: '/bookReturn',
//     icon: <FiCheckCircle/>,
//   },
//   {
//     title: 'Kelola Siswa',
//     path: '/users',
//     icon: <FiLock/>,
//   },

//     {
//     title: 'Dashboard',
//     path: '/dashboard',
//     icon: <FiHome />,
//   },
//   {
//     title: 'Katalog Buku',
//     path: '/books',
//     icon: <FiBook />,
//   },
//   {
//     title: 'Peminjaman Saya',
//     path: '/borrowals',
//     icon: <FiLogIn />,
//   },
//   {
//     title: 'Pengembalian Saya',
//     path: '/bookReturn',
//     icon: <FiLogOut />,
//   },

// ];

// export default navConfig;



// client\src\layouts\dashboard\nav\config.js (KODE LENGKAP & FINAL)

import { FiHome, FiBook, FiUsers, FiList, FiLogIn, FiLogOut, FiBookOpen, FiCheckCircle } from "react-icons/fi";

// Konfigurasi untuk Admin
export const adminNavConfig = [
  {
    title: 'Dashboard',
    path: '/dashboard', // Biarkan path lengkap untuk link pertama
    icon: <FiHome />,
  },
  {
    title: 'Kelola Data Buku',
    path: 'books', // Gunakan path relatif
    icon: <FiBookOpen />,
  },
  {
    title: 'Kelola Data Penulis',
    path: 'authors', // Gunakan path relatif
    icon: <FiUsers />,
  },
  {
    title: 'Kelola Data Genre',
    path: 'genres', // Gunakan path relatif
    icon: <FiList />,
  },
  {
    title: 'Kelola Peminjaman',
    path: 'borrowals', // Gunakan path relatif
    icon: <FiCheckCircle />,
  },
  {
    title: 'Kelola Pengembalian',
    path: 'bookReturn', // Gunakan path relatif
    icon: <FiCheckCircle />,
  },
  {
    title: 'Kelola Pengguna',
    path: 'users', // Gunakan path relatif
    icon: <FiUsers />,
  },
];

// Konfigurasi untuk Siswa (Member)
export const memberNavConfig = [
  {
    title: 'Dashboard',
    path: '/dashboard', // Biarkan path lengkap untuk link pertama
    icon: <FiHome />,
  },
  {
    title: 'Telusuri Buku',
    path: 'books', // Gunakan path relatif
    icon: <FiBook />,
  },
  {
    title: 'Ajukan Peminjaman',
    path: 'borrowals', // Gunakan path relatif
    icon: <FiLogIn />,
  },
  {
    title: 'Ajukan Pengembalian',
    path: 'bookReturn', // Gunakan path relatif
    icon: <FiLogOut />,
  },
];