import { Navigate, useRoutes } from 'react-router-dom';
import LibraryApp from './layouts/dashboard';
import AuthorPage from './sections/@dashboard/author/AuthorPage';
import LoginPage from './sections/auth/login/LoginPage';
import Page404 from './pages/Page404';
import BorrowalPage from './sections/@dashboard/borrowal/BorrowalPage';
import BookReturnPage from './sections/@dashboard/bookReturn/BookReturnPage';
import BookPage from './sections/@dashboard/book/BookPage';
import DashboardAppPage from './sections/@dashboard/app/DashboardAppPage';
import UsersPage from './sections/@dashboard/user/UserPage';
import GenrePage from './sections/@dashboard/genre/GenrePage';
import { useAuth } from './hooks/useAuth';

// [FIX 1] Impor kedua halaman dashboard
// import DashboardAppPage from "./sections/@dashboard/app/DashboardAppPage";
import DashboardMemberPage from './sections/@dashboard/app/DashboardMemberPage';

// ----------------------------------------------------------------------

// export default function Router() {
//   const { user } = useAuth();
//   const adminRoutes = useRoutes([
//     {
//       path: "/",
//       element: <LibraryApp />,
//       children: [
//         { element: <Navigate to="/dashboard" />, index: true },
//         { path: "dashboard", element: <DashboardAppPage /> },
//         { path: "authors", element: <AuthorPage /> },
//         { path: "books", element: <BookPage /> },
//         { path: "borrowals", element: <BorrowalPage /> },
//         { path: "bookReturn", element: <BookReturnPage /> },
//         { path: "genres", element: <GenrePage /> },
//         { path: "users", element: <UsersPage /> }
//       ]
//     },
//     {
//       path: "login",
//       element: <LoginPage />
//     },
//     {
//       path: "404",
//       element: <Page404 />
//     },
//     {
//       path: "*",
//       element: <Navigate to="/404" replace />
//     }
//   ]);

//   const memberRoutes = useRoutes([
//     {
//       path: "/",
//       element: <LibraryApp />,
//       children: [
//         { element: <Navigate to="/books" />, index: true },
//         { path: "books", element: <BookPage /> },
//         { path: "authors", element: <AuthorPage /> },
//         { path: "genres", element: <GenrePage /> },
//         { path: "borrowals", element: <BorrowalPage /> },
//         { path: "bookReturn", element: <BookReturnPage /> }
//       ]
//     },
//     {
//       path: "login",
//       element: <LoginPage />
//     },
//     {
//       path: "404",
//       element: <Page404 />
//     },
//     {
//       path: "*",
//       element: <Navigate to="/404" replace />
//     }
//   ]);

//   const guestRoutes = useRoutes([
//     {
//       path: "login",
//       element: <LoginPage />
//     },
//     {
//       path: "404",
//       element: <Page404 />
//     },
//     {
//       path: "*",
//       element: <Navigate to="/login" replace />
//     }
//   ]);

//   if (user) {
//     if (user.isAdmin) {
//       return adminRoutes;

//     }
//     return memberRoutes;
//   }
//   return guestRoutes;
// }

export default function Router() {
  const { user } = useAuth();

  const adminRoutes = useRoutes([
    {
      path: '/dashboard', // Menggunakan base path '/dashboard'
      element: <LibraryApp />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> }, // Dashboard untuk Admin
        { path: 'authors', element: <AuthorPage /> },
        { path: 'books', element: <BookPage /> },
        { path: 'borrowals', element: <BorrowalPage /> },
        { path: 'bookReturn', element: <BookReturnPage /> },
        { path: 'genres', element: <GenrePage /> },
        { path: 'users', element: <UsersPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '/',
      element: <Navigate to="/dashboard" replace />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  // --- Alur untuk Siswa/Member (Bagian yang Diperbaiki) ---
  const memberRoutes = useRoutes([
    {
      path: '/',
      element: <LibraryApp />,
      children: [
        // [FIX 1] Arahkan pengguna ke '/dashboard' setelah login
        { element: <Navigate to="/dashboard" />, index: true },

        // [FIX 2] Daftarkan rute '/dashboard' untuk menampilkan halaman dashboard member
        { path: 'dashboard', element: <DashboardMemberPage /> },

        // Rute lain yang bisa diakses member
        { path: 'books', element: <BookPage /> },
        { path: 'authors', element: <AuthorPage /> },
        { path: 'genres', element: <GenrePage /> },
        { path: 'borrowals', element: <BorrowalPage /> },
        { path: 'bookReturn', element: <BookReturnPage /> },
      ],
    },
    { path: 'login', element: <LoginPage /> },
    { path: '404', element: <Page404 /> },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);

  
  const guestRoutes = useRoutes([
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/login" replace />,
    },
  ]);

  if (user) {
    if (user.isAdmin) {
      return adminRoutes;
    }
    return memberRoutes;
  }
  return guestRoutes;
}
