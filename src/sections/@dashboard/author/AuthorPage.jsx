// import { Helmet } from "react-helmet-async";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";

// import { Alert } from "@mui/lab";
// import {
//   Avatar,
//   Button,
//   Card,
//   CircularProgress,
//   Container,
//   Grid,
//   IconButton,
//   MenuItem,
//   Popover,
//   Stack,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TablePagination,
//   TableRow,
//   Typography
// } from "@mui/material";
// import { useAuth } from "../../../hooks/useAuth";

// import Iconify from "../../../components/iconify";
// import Scrollbar from "../../../components/scrollbar";

// import AuthorTableHead from "./AuthorListHead";
// import AuthorForm from "./AuthorForm";
// import AuthorDialog from "./AuthorDialog";
// import { applySortFilter, getComparator } from "../../../utils/tableOperations";
// import { apiUrl, methods, routes } from "../../../constants";

// // ----------------------------------------------------------------------

// const TABLE_HEAD = [{ id: "photo", label: "Photo", alignRight: false }, {
//   id: "name",
//   label: "Nama",
//   alignRight: false
// }, { id: "description", label: "Deskripsi", alignRight: false }, { id: "", label: "", alignRight: false }];

// // ----------------------------------------------------------------------

// const AuthorPage = () => {
//   const {user} = useAuth();
//   // State variables
//   // Table
//   const [page, setPage] = useState(0);
//   const [order, setOrder] = useState('asc');
//   const [orderBy, setOrderBy] = useState('name');
//   const [filterName, setFilterName] = useState('');
//   const [rowsPerPage, setRowsPerPage] = useState(5);

//   // Data
//   const [author, setAuthor] = useState({
//     id: "",
//     name: "",
//     description: "",
//     photoUrl: ""
//   })
//   const [authors, setAuthors] = useState([]);
//   const [selectedAuthorId, setSelectedAuthorId] = useState(null)
//   const [isTableLoading, setIsTableLoading] = useState(true)
//   const [isMenuOpen, setIsMenuOpen] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false)
//   const [isDialogOpen, setIsDialogOpen] = useState(false)
//   const [isUpdateForm, setIsUpdateForm] = useState(false)

//   // Load data on initial page load
//   useEffect(() => {
//     toast('Halaman ini menampilkan daftar penerbit (buku) E-library.', {
//           duration: 3000, // Notifikasi akan hilang setelah 2 detik
//           icon: '🔔',     // Menampilkan ikon informasi (opsional)
//           // Anda juga bisa menambahkan styling spesifik di sini jika perlu:
//           style: {
//             // border: '5px solid #713200',
//             background: '#3B82F6',
//             boxShadow: '0 3px 10px rgba(0, 0, 0, 0.2)',
//             borderRadius: '8px',
//             padding: '10px',
//             color: '#FFFFFF',
//           },
//           // Atau mengubah posisi khusus untuk toast ini:
//           position: "bottom-right",
//         });

//     getAllAuthors();
//   }, []);

//   // API operations

//   const getAllAuthors = () => {
//     axios.get(apiUrl(routes.AUTHOR, methods.GET_ALL))
//       .then((response) => {
//         // handle success
//         console.log(response.data)
//         setAuthors(response.data.authorsList)
//         setIsTableLoading(false)
//       })
//       .catch((error) => {
//         // handle error
//         console.log(error);
//       })
//   }

//   const addAuthor = () => {
//     axios.post(apiUrl(routes.AUTHOR, methods.POST), author)
//       .then((response) => {
//         toast.success("Penerbit ditambahkan");
//         console.log(response.data);
//         handleCloseModal();
//         getAllAuthors();
//         clearForm();
//       })
//       .catch((error) => {
//         console.log(error);
//         toast.error("Something went wrong, please try again")
//       });
//   }

//   const updateAuthor = () => {
//     axios.put(apiUrl(routes.AUTHOR, methods.PUT, selectedAuthorId), author)
//       .then((response) => {
//         toast.success("Penerbit diperbarui");
//         console.log(response.data);
//         handleCloseModal();
//         handleCloseMenu();
//         getAllAuthors();
//         clearForm();
//       })
//       .catch((error) => {
//         console.log(error);
//         toast.error("Something went wrong, please try again")
//       });
//   }

//   const deleteAuthor = (authorId) => {
//     axios.delete(apiUrl(routes.AUTHOR, methods.DELETE, authorId))
//       .then((response) => {
//         toast.success("Penerbit dihapus");
//         handleCloseDialog();
//         handleCloseMenu();
//         console.log(response.data);
//         getAllAuthors();
//       })
//       .catch((error) => {
//         console.log(error);
//         toast.error("Ada kesalahan saat menghapus penerbit, silakan coba lagi");
//       });
//   }

//   const getSelectedAuthorDetails = () => {
//     const selectedAuthor = authors.find((element) => element._id === selectedAuthorId)
//     setAuthor(selectedAuthor)
//   }

//   const clearForm = () => {
//     setAuthor({id: "", name: "", description: ""})
//   }

//   // Handler functions
//   const handleOpenMenu = (event) => {
//     setIsMenuOpen(event.currentTarget);
//   };

//   const handleCloseMenu = () => {
//     setIsMenuOpen(null);
//   };

//   const handleOpenDialog = () => {
//     setIsDialogOpen(true)
//   }

//   const handleCloseDialog = () => {
//     setIsDialogOpen(false)
//   }

//   // Table functions

//   const handleRequestSort = (event, property) => {
//     const isAsc = orderBy === property && order === 'asc';
//     setOrder(isAsc ? 'desc' : 'asc');
//     setOrderBy(property);
//     setAuthors(applySortFilter(authors, getComparator(order, orderBy), filterName));
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setPage(0);
//     setRowsPerPage(parseInt(event.target.value, 10));
//   };

//   const handleOpenModal = () => {
//     setIsModalOpen(true)
//   }

//   const handleCloseModal = () => {
//     setIsModalOpen(false)
//   }

//   return (<>
//     <Helmet>
//       <title>Penerbit</title>
//     </Helmet>


//     <Container>
//       <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
//         <Typography variant="h3" gutterBottom>
//           Penerbit
//         </Typography>
//         {user.isAdmin && <Button variant="contained" onClick={() => {
//           clearForm();
//           setIsUpdateForm(false);
//           handleOpenModal();
//         }} startIcon={<Iconify icon="eva:plus-fill"/>}>
//           Penerbit Baru
//         </Button>}
//       </Stack>
//       {isTableLoading ? <Grid padding={2} style={{"textAlign": "center"}}><CircularProgress/></Grid> : <Card>
//         <Scrollbar>
//           {authors.length > 0 ? <TableContainer sx={{minWidth: 800}}>
//             <Table>
//               <AuthorTableHead
//                 order={order}
//                 orderBy={orderBy}
//                 headLabel={TABLE_HEAD}
//                 rowCount={authors.length}
//                 onRequestSort={handleRequestSort}
//               /><TableBody>
//               {authors.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
//                 const {_id, name, description, photoUrl} = row;

//                 return (<TableRow hover key={_id} tabIndex={-1}>
//                   <TableCell align="center"><Stack direction="row"
//                                                    alignItems="center"
//                                                    spacing={4}>
//                     <Avatar alt={name} src={photoUrl}/>

//                   </Stack></TableCell>

//                   <TableCell align="left"><Typography variant="subtitle2"
//                                                       noWrap>
//                     {name}
//                   </Typography></TableCell>

//                   <TableCell align="left">{description}</TableCell>
//                   <TableCell align="right">
//                     {user.isAdmin &&
//                       <IconButton size="large" color="inherit" onClick={(e) => {
//                         setSelectedAuthorId(_id)
//                         handleOpenMenu(e)
//                       }}>
//                         <Iconify icon={'eva:more-vertical-fill'}/>
//                       </IconButton>
//                     }
//                   </TableCell>
//                 </TableRow>);
//               })}
//             </TableBody></Table>
//           </TableContainer> : <Alert severity="warning" color="warning">
//             No authors found
//           </Alert>}
//         </Scrollbar>
//         {authors.length > 0 && <TablePagination
//           rowsPerPageOptions={[5, 10, 25]}
//           component="div"
//           count={authors.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />}
//       </Card>}
//     </Container>

//     <Popover
//       open={Boolean(isMenuOpen)}
//       anchorEl={isMenuOpen}
//       onClose={handleCloseMenu}
//       anchorOrigin={{vertical: 'top', horizontal: 'left'}}
//       transformOrigin={{vertical: 'top', horizontal: 'right'}}
//       PaperProps={{
//         sx: {
//           p: 1, width: 140, '& .MuiMenuItem-root': {
//             px: 1, typography: 'body2', borderRadius: 0.75,
//           },
//         },
//       }}
//     >
//       <MenuItem onClick={() => {
//         setIsUpdateForm(true);
//         getSelectedAuthorDetails();
//         handleCloseMenu();
//         handleOpenModal();
//       }}>
//         <Iconify icon={'eva:edit-fill'} sx={{mr: 2}}/>
//         Edit
//       </MenuItem>

//       <MenuItem sx={{color: 'error.main'}} onClick={handleOpenDialog}>
//         <Iconify icon={'eva:trash-2-outline'} sx={{mr: 2}}/>
//         Delete
//       </MenuItem>
//     </Popover>

//     <AuthorForm isUpdateForm={isUpdateForm} isModalOpen={isModalOpen} handleCloseModal={handleCloseModal}
//                 id={selectedAuthorId} author={author} setAuthor={setAuthor}
//                 handleAddAuthor={addAuthor} handleUpdateAuthor={updateAuthor}/>

//     <AuthorDialog isDialogOpen={isDialogOpen} authorId={selectedAuthorId} handleDeleteAuthor={deleteAuthor}
//                   handleCloseDialog={handleCloseDialog}/>


//   </>);
// }

// export default AuthorPage


import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Alert } from "@mui/lab";
import {
  Avatar, Button, Card, CircularProgress, Container, Grid, IconButton,
  MenuItem, Popover, Stack, Table, TableBody, TableCell,
  TableContainer, TablePagination, TableRow, Typography
} from "@mui/material";

import { useAuth } from "../../../hooks/useAuth";
import api from "../../../utils/api"; // <-- GUNAKAN INI
import Iconify from "../../../components/iconify";
import Scrollbar from "../../../components/scrollbar";
import AuthorTableHead from "./AuthorListHead";
import AuthorForm from "./AuthorForm";
import AuthorDialog from "./AuthorDialog";
import { applySortFilter, getComparator } from "../../../utils/tableOperations";

const TABLE_HEAD = [
  { id: "photo", label: "Photo", alignRight: false },
  { id: "name", label: "Nama", alignRight: false },
  { id: "description", label: "Deskripsi", alignRight: false },
  { id: "", label: "", alignRight: false }
];

const AuthorPage = () => {
  const { user } = useAuth();
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [author, setAuthor] = useState({ id: "", name: "", description: "", photoUrl: "" });
  const [authors, setAuthors] = useState([]);
  const [selectedAuthorId, setSelectedAuthorId] = useState(null);
  const [isTableLoading, setIsTableLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isUpdateForm, setIsUpdateForm] = useState(false);

  const getAllAuthors = () => {
    api.get('/api/author/getAll')
      .then((response) => {
        setAuthors(response.data.authorsList);
        setIsTableLoading(false);
      })
      .catch((error) => console.log(error));
  };

  const addAuthor = () => {
    api.post('/api/author/add', author)
      .then(() => {
        toast.success("Penerbit ditambahkan");
        handleCloseModal();
        getAllAuthors();
        clearForm();
      })
      .catch(() => toast.error("Gagal menambahkan, silakan coba lagi"));
  };

  const updateAuthor = () => {
    api.put(`/api/author/update/${selectedAuthorId}`, author)
      .then(() => {
        toast.success("Penerbit diperbarui");
        handleCloseModal();
        handleCloseMenu();
        getAllAuthors();
        clearForm();
      })
      .catch(() => toast.error("Gagal memperbarui, silakan coba lagi"));
  };

  const deleteAuthor = (authorId) => {
    api.delete(`/api/author/delete/${authorId}`)
      .then(() => {
        toast.success("Penerbit dihapus");
        handleCloseDialog();
        handleCloseMenu();
        getAllAuthors();
      })
      .catch(() => toast.error("Gagal menghapus, silakan coba lagi"));
  };

  useEffect(() => {
    getAllAuthors();
  }, []);

  const getSelectedAuthorDetails = () => {
    const selectedAuthor = authors.find((element) => element._id === selectedAuthorId);
    setAuthor(selectedAuthor);
  };

  const clearForm = () => setAuthor({ id: "", name: "", description: "" });
  const handleOpenMenu = (event) => setIsMenuOpen(event.currentTarget);
  const handleCloseMenu = () => setIsMenuOpen(null);
  const handleOpenDialog = () => setIsDialogOpen(true);
  const handleCloseDialog = () => setIsDialogOpen(false);
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const sortedAuthors = applySortFilter(authors, getComparator(order, orderBy));

  return (
    <>
      <Helmet><title>Penerbit</title></Helmet>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h3" gutterBottom>Penerbit</Typography>
          {user.isAdmin && <Button variant="contained" onClick={() => {
            clearForm();
            setIsUpdateForm(false);
            handleOpenModal();
          }} startIcon={<Iconify icon="eva:plus-fill" />}>
            Penerbit Baru
          </Button>}
        </Stack>
        {isTableLoading ? <Grid padding={2} style={{ "textAlign": "center" }}><CircularProgress /></Grid> : (
          <Card>
            <Scrollbar>
              {sortedAuthors.length > 0 ? (
                <TableContainer sx={{ minWidth: 800 }}>
                  <Table>
                    <AuthorTableHead
                      order={order}
                      orderBy={orderBy}
                      headLabel={TABLE_HEAD}
                      rowCount={authors.length}
                      onRequestSort={handleRequestSort}
                    />
                    <TableBody>
                      {sortedAuthors.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                        const { _id, name, description, photoUrl } = row;
                        return (
                          <TableRow hover key={_id} tabIndex={-1}>
                            <TableCell><Stack direction="row" alignItems="center" spacing={4}><Avatar alt={name} src={photoUrl} /></Stack></TableCell>
                            <TableCell align="left"><Typography variant="subtitle2" noWrap>{name}</Typography></TableCell>
                            <TableCell align="left">{description}</TableCell>
                            <TableCell align="right">
                              {user.isAdmin &&
                                <IconButton size="large" color="inherit" onClick={(e) => {
                                  setSelectedAuthorId(_id);
                                  handleOpenMenu(e);
                                }}>
                                  <Iconify icon={'eva:more-vertical-fill'} />
                                </IconButton>
                              }
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : <Alert severity="warning" color="warning">No authors found</Alert>}
            </Scrollbar>
            {authors.length > 0 && <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={authors.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />}
          </Card>
        )}
      </Container>

      <Popover open={Boolean(isMenuOpen)} anchorEl={isMenuOpen} onClose={handleCloseMenu} anchorOrigin={{ vertical: 'top', horizontal: 'left' }} transformOrigin={{ vertical: 'top', horizontal: 'right' }} PaperProps={{ sx: { p: 1, width: 140, '& .MuiMenuItem-root': { px: 1, typography: 'body2', borderRadius: 0.75, }, }, }}>
        <MenuItem onClick={() => { setIsUpdateForm(true); getSelectedAuthorDetails(); handleCloseMenu(); handleOpenModal(); }}>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} /> Edit
        </MenuItem>
        <MenuItem sx={{ color: 'error.main' }} onClick={handleOpenDialog}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} /> Delete
        </MenuItem>
      </Popover>

      <AuthorForm isUpdateForm={isUpdateForm} isModalOpen={isModalOpen} handleCloseModal={handleCloseModal} id={selectedAuthorId} author={author} setAuthor={setAuthor} handleAddAuthor={addAuthor} handleUpdateAuthor={updateAuthor} />
      <AuthorDialog isDialogOpen={isDialogOpen} authorId={selectedAuthorId} handleDeleteAuthor={deleteAuthor} handleCloseDialog={handleCloseDialog} />
    </>
  );
}

export default AuthorPage;