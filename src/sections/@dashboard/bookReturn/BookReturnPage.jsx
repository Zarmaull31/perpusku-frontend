// import { Helmet } from "react-helmet-async";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";

// import { Alert } from "@mui/lab";
// import {
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
// import Label from "../../../components/label";
// import Iconify from "../../../components/iconify";
// import Scrollbar from "../../../components/scrollbar";

// import BookReturnListHead from "./BookReturnListHead";
// import BookReturnForm from "./BookReturnForm";
// import BookReturnDialog from "./BookReturnDialog";
// import { applySortFilter, getComparator } from "../../../utils/tableOperations";
// import { apiUrl, methods, routes } from "../../../constants";

// // ----------------------------------------------------------------------

// const TABLE_HEAD = [{ id: "memberName", label: "Member Name", alignRight: false },
// { id: "bookName", label: "Book Name", alignRight: false },
// { id: "dueDate", label: "Due On", alignRight: false },
// { id: "status", label: "Status", alignRight: false },
// { id: "", label: "", alignRight: true }, { id: "", label: "", alignRight: false }];


// // ----------------------------------------------------------------------

// const BookReturnPage = () => {
//   const { user } = useAuth();
//   // State variables
//   // Table
//   const [page, setPage] = useState(0);
//   const [order, setOrder] = useState('asc');
//   const [orderBy, setOrderBy] = useState('name');
//   const [filterName, setFilterName] = useState('');
//   const [rowsPerPage, setRowsPerPage] = useState(5);

//   // Data
//   const [returnBook, setReturn] = useState({
//     bookName: "",
//     memberId: "",
//     dueDate: "",
//     status: ""
//   })
//   const [returnBooks, setReturns] = useState([]);
//   const [selectedReturnId, setSelectedReturnId] = useState(null)
//   const [isTableLoading, setIsTableLoading] = useState(true)
//   const [isMenuOpen, setIsMenuOpen] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false)
//   const [isDialogOpen, setIsDialogOpen] = useState(false)
//   const [isUpdateForm, setIsUpdateForm] = useState(false)

//   // Load data on initial page load
//   useEffect(() => {
//     toast('Halaman ini untuk mengajukan pengembalian buku Anda di E-library.', {
//       duration: 2700, // Notifikasi akan hilang setelah 2 detik
//       icon: '🔔',     // Menampilkan ikon informasi (opsional)
//       // Anda juga bisa menambahkan styling spesifik di sini jika perlu:
//       style: {
//         // border: '5px solid #713200',
//         background: '#3B82F6',
//         boxShadow: '0 3px 10px rgba(0, 0, 0, 0.2)',
//         borderRadius: '8px',
//         padding: '10px',
//         color: '#FFFFFF',
//       },
//       // Atau mengubah posisi khusus untuk toast ini:
//       position: "bottom-right",
//     });

//     getAllReturns();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   // API operations=

//   const getAllReturns = () => {
//     axios.get(apiUrl(routes.BOOKRETURN, methods.GET_ALL))
//       .then((response) => {
//         // handle success
//         console.log(response.data)
//         if (user.isAdmin) {
//           setReturns(response.data.returnsList)
//         } else {
//           setReturns(response.data.returnsList.filter((returnBook) => user._id === returnBook.memberId))
//         }
//         setIsTableLoading(false)
//       })
//       .catch((error) => {
//         // handle error
//         console.log(error);
//       })
//   }

//   const addReturn = () => {
//     axios.post(apiUrl(routes.BOOKRETURN, methods.POST), returnBook)
//       .then((response) => {
//         toast.success("Buku berhasil dikembalikan");
//         console.log(response.data);
//         handleCloseModal();
//         getAllReturns();
//         clearForm();
//       })
//       .catch((error) => {
//         console.log(error);
//         toast.error("ada yang salah, silakan coba lagi");
//       });
//   }

//   const updateReturn = () => {
//     axios.put(apiUrl(routes.BOOKRETURN, methods.PUT, selectedReturnId), returnBook)
//       .then((response) => {
//         toast.success("Pengembalian buku berhasil diperbarui");
//         console.log(response.data);
//         handleCloseModal();
//         handleCloseMenu();
//         getAllReturns();
//         clearForm();
//       })
//       .catch((error) => {
//         console.log(error);
//         toast.error("ada yang salah, silakan coba lagi");
//       });
//   }

//   const deleteReturn = () => {
//     axios.delete(apiUrl(routes.BOOKRETURN, methods.PUT, selectedReturnId))
//       .then((response) => {
//         toast.success("Pengembalian buku berhasil dihapus");
//         handleCloseDialog();
//         handleCloseMenu();
//         console.log(response.data);
//         getAllReturns();
//       })
//       .catch((error) => {
//         console.log(error);
//         toast.error("ada yang salah, silakan coba lagi");
//       });
//   }

//   const getSelectedReturnDetails = () => {
//     const selectedReturns = returnBooks.find((element) => element._id === selectedReturnId)
//     setReturn(selectedReturns)
//   }

//   const clearForm = () => {
//     setReturn({
//       bookName: "",
//       memberId: "",
//       dueDate: "",
//       status: ""
//     })
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
//     setReturn(applySortFilter(returnBook, getComparator(order, orderBy), filterName));
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
//       <title>Book Return</title>
//     </Helmet>


//     <Container>
//       <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
//         <Typography variant="h3" gutterBottom>
//           Pengembalian Buku
//         </Typography>
//         <Button variant="contained" onClick={() => {
//           setIsUpdateForm(false);
//           handleOpenModal();
//         }} startIcon={<Iconify icon="eva:plus-fill" />}>
//           Ajukan Pengembalian
//         </Button>
//       </Stack>
//       {isTableLoading ? <Grid style={{ "textAlign": "center" }}><CircularProgress size="lg" /></Grid> : <Card>
//         <Scrollbar>
//           {returnBooks.length > 0 ? <TableContainer sx={{ minWidth: 800 }}>
//             <Table>
//               <BookReturnListHead
//                 order={order}
//                 orderBy={orderBy}
//                 headLabel={TABLE_HEAD}
//                 rowCount={returnBook.length}
//                 onRequestSort={handleRequestSort}
//               /><TableBody>
//                 {returnBooks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((returnBook) => <TableRow hover key={returnBook._id} tabIndex={-1}>


//                   <TableCell align="left"> {returnBook.member.name} </TableCell>

//                   <TableCell align="left">{returnBook.bookName}</TableCell>
//                   <TableCell align="left"> {(new Date(returnBook.dueDate)).toLocaleDateString("en-US")} </TableCell>

//                   <TableCell align="left">{returnBook.status}</TableCell>
//                   <TableCell align="right">
//                     {user.isAdmin && // <--- TAMBAHKAN KONDISI INI
//                       <IconButton size="large" color="inherit" onClick={(e) => {
//                         setSelectedReturnId(returnBook._id)
//                         handleOpenMenu(e)
//                       }}>
//                         <Iconify icon={'eva:more-vertical-fill'} />
//                       </IconButton>
//                     }
//                   </TableCell>
//                 </TableRow>)}
//               </TableBody></Table>
//           </TableContainer> : <Alert severity="warning" color="warning">
//             Tidak ada pengembalian buku yang ditemukan.
//           </Alert>}
//         </Scrollbar>
//         {returnBooks.length > 0 && <TablePagination
//           rowsPerPageOptions={[5, 10, 25]}
//           component="div"
//           count={returnBooks.length}
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
//       anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
//       transformOrigin={{ vertical: 'top', horizontal: 'right' }}
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
//         getSelectedReturnDetails();
//         handleCloseMenu();
//         handleOpenModal();
//       }}>
//         <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
//         Edit
//       </MenuItem>

//       <MenuItem sx={{ color: 'error.main' }} onClick={handleOpenDialog}>
//         <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
//         Delete
//       </MenuItem>
//     </Popover>

//     <BookReturnForm isUpdateForm={isUpdateForm} isModalOpen={isModalOpen} handleCloseModal={handleCloseModal}
//       id={selectedReturnId} returnBook={returnBook} setReturn={setReturn}
//       handleAddReturn={addReturn} handleUpdateReturn={updateReturn} />

//     <BookReturnDialog isDialogOpen={isDialogOpen} returnId={selectedReturnId}
//       handleDeleteReturn={deleteReturn}
//       handleCloseDialog={handleCloseDialog} />


//   </>);
// }

// export default BookReturnPage



import { Helmet } from "react-helmet-async";
// import { useEffect, useState } from "react";
import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import { Alert } from "@mui/lab";
import {
  Button, Card, CircularProgress, Container, Grid, IconButton,
  MenuItem, Popover, Stack, Table, TableBody, TableCell,
  TableContainer, TablePagination, TableRow, Typography
} from "@mui/material";

import { useAuth } from "../../../hooks/useAuth";
import api from "../../../utils/api"; // <-- GUNAKAN INI
import Iconify from "../../../components/iconify";
import Scrollbar from "../../../components/scrollbar";
import BookReturnListHead from "./BookReturnListHead";
import BookReturnForm from "./BookReturnForm";
import BookReturnDialog from "./BookReturnDialog";
import { applySortFilter, getComparator } from "../../../utils/tableOperations";

const TABLE_HEAD = [
  { id: "memberName", label: "Member Name", alignRight: false },
  { id: "bookName", label: "Book Name", alignRight: false },
  { id: "dueDate", label: "Due On", alignRight: false },
  { id: "status", label: "Status", alignRight: false },
  { id: "", label: "", alignRight: false }
];

const BookReturnPage = () => {
  const { user } = useAuth();
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [returnBook, setReturn] = useState({ bookId: "", memberId: "", dueDate: "", status: "" });
  const [returnBooks, setReturns] = useState([]);
  const [selectedReturnId, setSelectedReturnId] = useState(null);
  const [isTableLoading, setIsTableLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isUpdateForm, setIsUpdateForm] = useState(false);

  const getAllReturns = useCallback(() => {
    setIsTableLoading(true);
    api.get('/api/bookReturn/getAll')
      .then((response) => {
        const returnsData = response.data.returnsList || [];
        if (user.isAdmin) {
          setReturns(returnsData);
        } else {
          setReturns(returnsData.filter((item) => item.memberId?._id === user._id));
        }
        setIsTableLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsTableLoading(false);
      });
  }, [user]);

  useEffect(() => {
    getAllReturns();
  }, [getAllReturns]);

  const addReturn = () => {
    api.post('/api/bookReturn/add', returnBook)
      .then(() => {
        toast.success("Buku berhasil dikembalikan");
        handleCloseModal();
        getAllReturns();
        clearForm();
      })
      .catch(() => toast.error("Gagal, silakan coba lagi"));
  };

  const updateReturn = () => {
    api.put(`/api/bookReturn/update/${selectedReturnId}`, returnBook)
      .then(() => {
        toast.success("Pengembalian berhasil diperbarui");
        handleCloseModal();
        handleCloseMenu();
        getAllReturns();
        clearForm();
      })
      .catch(() => toast.error("Gagal, silakan coba lagi"));
  };

  const deleteReturn = () => {
    api.delete(`/api/bookReturn/delete/${selectedReturnId}`)
      .then(() => {
        toast.success("Pengembalian berhasil dihapus");
        handleCloseDialog();
        handleCloseMenu();
        getAllReturns();

      })
      .catch(() => toast.error("Gagal, silakan coba lagi"));
  };

  const getSelectedReturnDetails = () => {
    const selectedReturn = returnBooks.find((element) => element._id === selectedReturnId);
    setReturn(selectedReturn);
  };

  const clearForm = () => setReturn({ bookId: "", memberId: "", dueDate: "", status: "" });
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

  const sortedReturns = applySortFilter(returnBooks, getComparator(order, orderBy));

  return (
    <>
      <Helmet><title>Book Return</title></Helmet>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h3" gutterBottom>Pengembalian Buku</Typography>
          <Button variant="contained" onClick={() => { setIsUpdateForm(false); clearForm(); handleOpenModal(); }} startIcon={<Iconify icon="eva:plus-fill" />}>Ajukan Pengembalian</Button>
        </Stack>
        {isTableLoading ? <Grid style={{ "textAlign": "center" }}><CircularProgress /></Grid> : (
          <Card>
            <Scrollbar>
              {sortedReturns.length > 0 ? (
                <TableContainer sx={{ minWidth: 800 }}>
                  <Table>
                    <BookReturnListHead order={order} orderBy={orderBy} headLabel={TABLE_HEAD} rowCount={returnBooks.length} onRequestSort={handleRequestSort} />
                    <TableBody>
                      {sortedReturns.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                        <TableRow hover key={row._id} tabIndex={-1}>
                          <TableCell align="left">{row.memberId?.name || "N/A"}</TableCell>
                          <TableCell align="left">{row.bookId?.name || "N/A"}</TableCell>
                          <TableCell align="left">{(new Date(row.dueDate)).toLocaleDateString("id-ID")}</TableCell>
                          <TableCell align="left">{row.status}</TableCell>
                          <TableCell align="right">
                            {user.isAdmin && (
                              <IconButton size="large" color="inherit" onClick={(e) => { setSelectedReturnId(row._id); handleOpenMenu(e); }}>
                                <Iconify icon={'eva:more-vertical-fill'} />
                              </IconButton>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : <Alert severity="warning" color="warning">Tidak ada data pengembalian buku.</Alert>}
            </Scrollbar>
            {returnBooks.length > 0 && <TablePagination rowsPerPageOptions={[5, 10, 25]} component="div" count={returnBooks.length} rowsPerPage={rowsPerPage} page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} />}
          </Card>
        )}
      </Container>

      <Popover open={Boolean(isMenuOpen)} anchorEl={isMenuOpen} onClose={handleCloseMenu} anchorOrigin={{ vertical: 'top', horizontal: 'left' }} transformOrigin={{ vertical: 'top', horizontal: 'right' }} PaperProps={{ sx: { p: 1, width: 140, '& .MuiMenuItem-root': { px: 1, typography: 'body2', borderRadius: 0.75, }, }, }}>
        <MenuItem onClick={() => { setIsUpdateForm(true); getSelectedReturnDetails(); handleCloseMenu(); handleOpenModal(); }}>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />Edit
        </MenuItem>
        <MenuItem sx={{ color: 'error.main' }} onClick={handleOpenDialog}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />Delete
        </MenuItem>
      </Popover>

      <BookReturnForm isUpdateForm={isUpdateForm} isModalOpen={isModalOpen} handleCloseModal={handleCloseModal} id={selectedReturnId} returnBook={returnBook} setReturn={setReturn} handleAddReturn={addReturn} handleUpdateReturn={updateReturn} />
      <BookReturnDialog isDialogOpen={isDialogOpen} returnId={selectedReturnId} handleDeleteReturn={deleteReturn} handleCloseDialog={handleCloseDialog} />
    </>
  );
}

export default BookReturnPage;