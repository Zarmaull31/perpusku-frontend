// import { Helmet } from "react-helmet-async";
// // [FIX 1] Impor 'useCallback' dan gabungkan impor dari 'react' menjadi satu baris
// import { useEffect, useState, useCallback } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import TextField from '@mui/material/TextField';

// import {
//   Box,
//   Button,
//   Card,
//   CircularProgress,
//   Container,
//   Grid,
//   IconButton,
//   MenuItem,
//   Popover,
//   Stack,
//   Typography
// } from "@mui/material";
// import Alert from "@mui/material/Alert";
// import { styled } from "@mui/material/styles";
// import { useAuth } from "../../../hooks/useAuth";

// import Label from "../../../components/label";
// import BookDialog from "./BookDialog";
// import BookForm from "./BookForm";
// import Iconify from "../../../components/iconify";
// import { apiUrl, methods, routes } from "../../../constants";


// const StyledBookImage = styled("img")({
//   top: 0,
//   width: "100%",
//   height: "100%",
//   objectFit: "cover",
//   position: "absolute"
// });

// const BookPage = () => {
//   const { user } = useAuth();
//   // Data
//   const [book, setBook] = useState({
//     id: "", name: "", isbn: "", summary: "", isAvailable: true,
//     brokenBook: "", goodBook: "", publishYear: "", authorId: "", genreId: "",
//     photoUrl: "", authorName: "", genreName: ""
//   });

//   const [books, setBooks] = useState([]);
//   const [selectedBookId, setSelectedBookId] = useState(null)
//   const [isTableLoading, setIsTableLoading] = useState(true)
//   const [isMenuOpen, setIsMenuOpen] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false)
//   const [isDialogOpen, setIsDialogOpen] = useState(false)
//   const [isUpdateForm, setIsUpdateForm] = useState(false)
//   const [googleQuery, setGoogleQuery] = useState("");
//   const [googleBooks, setGoogleBooks] = useState([]);



//   // API operations

//   const getAllBooks = () => {
//     axios.get(apiUrl(routes.BOOK, methods.GET_ALL))
//       .then((response) => {
//         // handle success
//         console.log(response.data)
//         setBooks(response.data.booksList)
//         setIsTableLoading(false)
//       })
//       .catch((error) => {
//         // handle error
//         console.log(error);
//       })
//   }

//   const addBook = async () => {
//     try {
//       if (!book.genreName || !book.authorName) {
//         toast.error("Jenis buku atau nama penulis tidak boleh kosong.");
//         return;
//       }

//       const authorRes = await axios.post("http://localhost:8080/api/author/findOrCreate", {
//         name: book.authorName.trim()
//       });

//       const trimmedGenre = book.genreName?.trim();
//       if (!trimmedGenre) {
//         toast.error("Jenis Genre tidak boleh kosong.");
//         return;
//       }

//       console.log("Genre to send:", trimmedGenre);

//       const genreRes = await axios.post("http://localhost:8080/api/genre/findOrCreate", {
//         name: trimmedGenre
//       });

//       const newBook = {
//         ...book,
//         authorId: authorRes.data.author._id,
//         genreId: genreRes.data.genre._id
//       };

//       const response = await axios.post(apiUrl(routes.BOOK, methods.POST), newBook);
//       toast.success("Buku berhasil ditambahkan");
//       handleCloseModal();
//       getAllBooks();
//       clearForm();
//     } catch (error) {
//       console.log("Error adding book:", error.response?.data || error.message);
//       toast.error("Ada kesalahan saat menambahkan buku, silakan coba lagi");
//     }
//   };

//   const updateBook = async () => {
//     try {
//       // Cek apakah author sudah ada, jika belum, buat baru
//       const authorRes = await axios.post("http://localhost:8080/api/author/findOrCreate", {
//         name: book.authorName  // Ambil nama author dari form input
//       });

//       // Cek apakah genre sudah ada, jika belum, buat baru
//       const genreRes = await axios.post("http://localhost:8080/api/genre/findOrCreate", {
//         name: book.genreName?.trim() || ""  // Ambil nama genre dari form input
//       });

//       // Membuat buku dengan ID author dan genre yang sudah ada
//       const updatedBook = {
//         ...book,
//         authorId: authorRes.data.author._id,  // ID author dari respon
//         genreId: genreRes.data.genre._id     // ID genre dari respon
//       };

//       // Kirim data buku yang sudah diperbarui ke server
//       const response = await axios.put(apiUrl(routes.BOOK, methods.PUT, selectedBookId), updatedBook);
//       toast.success("Buku berhasil diperbarui");
//       console.log(response.data);
//       handleCloseModal();
//       handleCloseMenu();
//       getAllBooks();
//       clearForm();
//     } catch (error) {
//       console.log(error);
//       toast.error("Ada kesalahan saat memperbarui buku, silakan coba lagi");
//     }
//   };


//   const deleteBook = (bookId) => {
//     axios.delete(apiUrl(routes.BOOK, methods.DELETE, bookId))
//       .then((response) => {
//         toast.success("Buku berhasil dihapus");
//         handleCloseDialog();
//         handleCloseMenu();
//         console.log(response.data);
//         getAllBooks();
//       })
//       .catch((error) => {
//         console.log(error);
//         toast.error("Ada kesalahan saat menghapus buku, silakan coba lagi");
//       });
//   }

//   const getSelectedBookDetails = () => {
//     const selectedBook = books.find((element) => element._id === selectedBookId)
//     console.log(selectedBook)
//     setBook(selectedBook)
//   }

//   const clearForm = () => {
//     setBook({
//       id: "", name: "", isbn: "", summary: "", isAvailable: true,
//       brokenBook: "", goodBook: "", publishYear: "", authorId: "", genreId: "",
//       photoUrl: "", authorName: "", genreName: ""
//     });
//   };

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

//   // Load data on initial page load
//   useEffect(() => {
//     toast('Halaman ini menampilkan koleksi buku E-library.', {
//       duration: 3000,
//       icon: '🔔',
//       style: {
//         background: '#3B82F6',
//         boxShadow: '0 3px 10px rgba(0, 0, 0, 0.2)',
//         borderRadius: '8px',
//         padding: '10px',
//         color: '#FFFFFF',
//       },
//       position: "bottom-right",
//     });
//     getAllBooks();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const handleOpenModal = () => {
//     setIsModalOpen(true)
//   }

//   const handleCloseModal = () => {
//     setIsModalOpen(false)
//   }

//   // [FIX 2] Bungkus fungsi dengan useCallback
//   const fetchGoogleBooks = useCallback(() => {
//     if (!googleQuery) return;
//     axios
//       .get("https://www.googleapis.com/books/v1/volumes", {
//         params: {
//           q: googleQuery,
//           maxResults: 10,
//         },
//       })
//       .then((res) => {
//         setGoogleBooks(res.data.items || []);
//       })
//       .catch((err) => {
//         console.error("Gagal mengambil data dari Google Books:", err);
//         toast.error("Gagal ambil data Google Books");
//       });
//   }, [googleQuery]); // Tambahkan dependency `googleQuery`

//   // [FIX 3] Perbarui dependency array pada useEffect ini
//   useEffect(() => {
//     fetchGoogleBooks();
//   }, [fetchGoogleBooks]);


//   const handleUseGoogleBook = (googleBook) => {
//     const info = googleBook.volumeInfo;

//     const updatedBook = {
//       name: info.title || "",
//       summary: info.description ? `${info.description.substring(0, 50)}...` : "",
//       publishYear: info.publishedDate ? info.publishedDate.substring(0, 4) : "",
//       isbn: info.industryIdentifiers ? info.industryIdentifiers[0]?.identifier : "",
//       photoUrl: info.imageLinks?.thumbnail || "",
//       authorName: info.authors?.[0]?.trim() || "Unknown Author",
//       genreName: typeof info.categories?.[0] === "string" ? info.categories[0].trim() : "Uncategorized",
//     };
//     console.log("info.categories:", info.categories);

//     console.log("Genre Name dari Google Books:", updatedBook.genreName);

//     setBook((prev) => ({
//       ...prev,
//       ...updatedBook
//     }));

//     toast.success("Data buku berhasil dimuat ke form!");
//     setIsUpdateForm(false);
//     handleOpenModal();
//   };

//   return (
//     <>
//       <Helmet>
//         <title> Buku </title>
//       </Helmet>

//       <Container>
//         <Box display="flex" gap={2} mb={4}>
//           <TextField
//             fullWidth
//             label="Cari Buku dari Google Books"
//             variant="outlined"
//             value={googleQuery}
//             onChange={(e) => setGoogleQuery(e.target.value)}
//           />
//           <Button variant="contained" onClick={fetchGoogleBooks}>
//             Cari
//           </Button>
//         </Box>

//         <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
//           <Typography variant="h3" sx={{ mb: 5 }}>
//             Buku
//           </Typography>
//           {user.isAdmin && <Button variant="contained" onClick={() => {
//             clearForm();
//             setIsUpdateForm(false);
//             handleOpenModal();
//           }} startIcon={<Iconify icon="eva:plus-fill" />}>
//             Tambah Buku
//           </Button>}
//         </Stack>

//         {isTableLoading ? <Grid padding={2} style={{ "textAlign": "center" }}><CircularProgress /></Grid> :

//           books.length > 0 ? <Grid container spacing={4}>
//             {books.map((book) => (
//               <Grid key={book._id} item xs={12} sm={6} md={4}>
//                 <Card>
//                   <Box sx={{ pt: '80%', position: 'relative' }}>
//                     <Label
//                       variant="filled"
//                       sx={{
//                         zIndex: 9,
//                         top: 16,
//                         left: 16,
//                         position: 'absolute',
//                         textTransform: 'uppercase',
//                         color: 'primary.main',
//                       }}
//                     >
//                       {book.genre.name}
//                     </Label>
//                     {user.isAdmin && <Label
//                       variant="filled"
//                       sx={{
//                         zIndex: 9,
//                         top: 12,
//                         right: 16,
//                         position: 'absolute',
//                         borderRadius: "100%",
//                         width: "30px",
//                         height: "30px",
//                         color: "white",
//                         backgroundColor: "white"
//                       }}
//                     >
//                       <IconButton size="small" color="primary" onClick={(e) => {
//                         setSelectedBookId(book._id)
//                         handleOpenMenu(e)
//                       }}>
//                         <Iconify icon={'eva:more-vertical-fill'} />
//                       </IconButton>
//                     </Label>}

//                     <StyledBookImage alt={book.name} src={book.photoUrl || "https://i.ibb.co/g9fP9vQ/download-4.jpg"} />

//                   </Box>

//                   <Stack spacing={1} sx={{ p: 2 }}>
//                     <Typography textAlign="center" variant="h5" margin={0} noWrap>{book.name}</Typography>
//                     <Typography variant="subtitle1" sx={{ color: "#888888" }} paddingBottom={1} noWrap
//                       textAlign="center">{book.author.name}</Typography>
//                     <Label color={book.isAvailable ? "success" : "error"}
//                       sx={{ padding: 2 }}>{book.isAvailable ? 'Available' : 'Not available'}</Label>

//                     <Typography variant="subtitle2" textAlign="center" paddingTop={1}>ISBN: {book.isbn}</Typography>
//                     <Typography variant="subtitle2" textAlign="center" paddingTop={1}>Publish Year: {book.publishYear}</Typography>
//                     <Typography variant="subtitle2" textAlign="center" paddingTop={1}>Number of Broken Books: {book.brokenBook}</Typography>
//                     <Typography variant="subtitle2" textAlign="center" paddingTop={1}>Number of Good Books: {book.goodBook}</Typography>
//                     <Typography variant="subtitle1" textAlign="center">{book.summary}</Typography>
//                   </Stack>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid> : <Alert severity="warning" color="warning">
//             No books found
//           </Alert>
//         }

//         {/* Render Google Books */}
//         {googleBooks.length > 0 && (
//           <>
//             <Typography variant="h5" mt={5} mb={2}>Hasil dari Google Books</Typography>

//             <Grid container spacing={3}>
//               {googleBooks.map((book) => {
//                 const info = book.volumeInfo;
//                 return (
//                   <Grid item xs={12} sm={6} md={4} key={book.id}>
//                     <Card>
//                       {info.imageLinks?.thumbnail && (
//                         <Box
//                           component="img"
//                           src={info.imageLinks.thumbnail}
//                           alt={info.title}
//                           sx={{ width: "100%", height: 200, objectFit: "cover" }}
//                         />
//                       )}
//                       <Stack spacing={1} sx={{ p: 2 }}>
//                         <Typography variant="h6">{info.title}</Typography>
//                         <Typography variant="body2" color="text.secondary">
//                           {info.authors?.join(", ") || "Tanpa Penulis"}
//                         </Typography>
//                         <Typography variant="body2">
//                           {info.description?.substring(0, 100) || "Tidak ada deskripsi."}
//                         </Typography>
//                         <Button variant="outlined" onClick={() => handleUseGoogleBook(book)}>Gunakan Data Ini</Button>
//                       </Stack>
//                     </Card>
//                   </Grid>
//                 );
//               })}
//             </Grid>
//           </>
//         )}

//       </Container>
//       {/* Modal, Dialog, Popover */}
//       <Popover
//         open={Boolean(isMenuOpen)}
//         anchorEl={isMenuOpen}
//         onClose={handleCloseMenu}
//         anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
//         transformOrigin={{ vertical: 'top', horizontal: 'right' }}
//         PaperProps={{
//           sx: {
//             p: 1, width: 140, '& .MuiMenuItem-root': {
//               px: 1, typography: 'body2', borderRadius: 0.75,
//             },
//           },
//         }}
//       >
//         <MenuItem onClick={() => {
//           setIsUpdateForm(true);
//           getSelectedBookDetails();
//           handleCloseMenu();
//           handleOpenModal();
//         }}>
//           <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
//           Edit
//         </MenuItem>

//         <MenuItem sx={{ color: 'error.main' }} onClick={handleOpenDialog}>
//           <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
//           Delete
//         </MenuItem>
//       </Popover>

//       <BookForm isUpdateForm={isUpdateForm} isModalOpen={isModalOpen} handleCloseModal={handleCloseModal}
//         id={selectedBookId} book={book} setBook={setBook}
//         handleAddBook={addBook} handleUpdateBook={updateBook} />

//       <BookDialog isDialogOpen={isDialogOpen} bookId={selectedBookId} handleDeleteBook={deleteBook}
//         handleCloseDialog={handleCloseDialog} />
//     </>
//   );
// }

// export default BookPage;


import { Helmet } from "react-helmet-async";
import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import {
  Box, Button, Card, CircularProgress, Container, Grid, IconButton,
  MenuItem, Popover, Stack, Typography, TextField, Alert
} from "@mui/material";
import { styled } from "@mui/material/styles";

import { useAuth } from "../../../hooks/useAuth";
import api from "../../../utils/api"; // <-- GUNAKAN INI
import Label from "../../../components/label";
import BookDialog from "./BookDialog";
import BookForm from "./BookForm";
import Iconify from "../../../components/iconify";

const StyledBookImage = styled("img")({
  top: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute"
});

const BookPage = () => {
  const { user } = useAuth();
  const [book, setBook] = useState({ id: "", name: "", isbn: "", summary: "", isAvailable: true, stock: 1, publishYear: "", authorId: "", genreId: "", photoUrl: "", authorName: "", genreName: "" });
  const [books, setBooks] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [isTableLoading, setIsTableLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isUpdateForm, setIsUpdateForm] = useState(false);
  const [googleQuery, setGoogleQuery] = useState("");
  const [googleBooks, setGoogleBooks] = useState([]);

  const getAllBooks = useCallback(() => {
    setIsTableLoading(true);
    api.get('/api/book/getAll')
      .then((response) => {
        setBooks(response.data.booksList);
        setIsTableLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsTableLoading(false);
      });
  }, []);

  const addBook = async () => {
    try {
      if (!book.genreName || !book.authorName) return toast.error("Jenis buku atau nama penulis tidak boleh kosong.");
      
      const authorRes = await api.post("/api/author/findOrCreate", { name: book.authorName.trim() });
      const genreRes = await api.post("/api/genre/findOrCreate", { name: book.genreName.trim() });

      const newBook = { ...book, authorId: authorRes.data.author._id, genreId: genreRes.data.genre._id };
      
      await api.post('/api/book/add', newBook);
      toast.success("Buku berhasil ditambahkan");
      handleCloseModal();
      getAllBooks();
      clearForm();
    } catch (error) {
      console.log("Error adding book:", error.response?.data || error.message);
      toast.error("Gagal menambahkan buku, silakan coba lagi");
    }
  };

  const updateBook = async () => {
    try {
      if (!book.genreName || !book.authorName) return toast.error("Jenis buku atau nama penulis tidak boleh kosong.");
      
      const authorRes = await api.post("/api/author/findOrCreate", { name: book.authorName.trim() });
      const genreRes = await api.post("/api/genre/findOrCreate", { name: book.genreName.trim() });

      const updatedBookData = { ...book, authorId: authorRes.data.author._id, genreId: genreRes.data.genre._id };

      await api.put(`/api/book/update/${selectedBookId}`, updatedBookData);
      toast.success("Buku berhasil diperbarui");
      handleCloseModal();
      handleCloseMenu();
      getAllBooks();
      clearForm();
    } catch (error) {
      console.log(error);
      toast.error("Gagal memperbarui buku, silakan coba lagi");
    }
  };

  const deleteBook = (bookId) => {
    api.delete(`/api/book/delete/${bookId}`)
      .then(() => {
        toast.success("Buku berhasil dihapus");
        handleCloseDialog();
        handleCloseMenu();
        getAllBooks();
      })
      .catch(() => toast.error("Gagal menghapus buku, silakan coba lagi"));
  };
  
  const fetchGoogleBooks = useCallback(() => {
    if (!googleQuery) return;
    axios.get("https://www.googleapis.com/books/v1/volumes", { params: { q: googleQuery, maxResults: 10 } })
      .then((res) => setGoogleBooks(res.data.items || []))
      .catch(() => toast.error("Gagal mengambil data dari Google Books"));
  }, [googleQuery]);
  
  useEffect(() => {
    getAllBooks();
  }, [getAllBooks]);

  useEffect(() => {
    fetchGoogleBooks();
  }, [fetchGoogleBooks]);

  const getSelectedBookDetails = () => {
    const selectedBook = books.find((element) => element._id === selectedBookId);
    if (selectedBook) {
        setBook({ ...selectedBook, authorName: selectedBook.authorId.name, genreName: selectedBook.genreId.name });
    }
  };
  
  const clearForm = () => setBook({ id: "", name: "", isbn: "", summary: "", isAvailable: true, stock: 1, publishYear: "", authorId: "", genreId: "", photoUrl: "", authorName: "", genreName: "" });
  const handleOpenMenu = (event) => setIsMenuOpen(event.currentTarget);
  const handleCloseMenu = () => setIsMenuOpen(null);
  const handleOpenDialog = () => setIsDialogOpen(true);
  const handleCloseDialog = () => setIsDialogOpen(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleUseGoogleBook = (googleBook) => {
    const info = googleBook.volumeInfo;
    const updatedBook = {
      name: info.title || "",
      summary: info.description ? `${info.description.substring(0, 150)}...` : "",
      publishYear: info.publishedDate ? info.publishedDate.substring(0, 4) : "",
      isbn: info.industryIdentifiers ? info.industryIdentifiers[0]?.identifier : "",
      photoUrl: info.imageLinks?.thumbnail || "",
      authorName: info.authors?.[0]?.trim() || "Unknown Author",
      genreName: typeof info.categories?.[0] === "string" ? info.categories[0].trim() : "Uncategorized",
    };
    setBook((prev) => ({ ...prev, ...updatedBook }));
    toast.success("Data buku berhasil dimuat ke form!");
    setIsUpdateForm(false);
    handleOpenModal();
  };

  return (
    <>
      <Helmet><title>Buku</title></Helmet>
      <Container>
        <Box display="flex" gap={2} mb={4}>
          <TextField fullWidth label="Cari Buku dari Google Books" variant="outlined" value={googleQuery} onChange={(e) => setGoogleQuery(e.target.value)} />
          <Button variant="contained" onClick={fetchGoogleBooks}>Cari</Button>
        </Box>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h3" sx={{ mb: 5 }}>Buku</Typography>
          {user.isAdmin && <Button variant="contained" onClick={() => { clearForm(); setIsUpdateForm(false); handleOpenModal(); }} startIcon={<Iconify icon="eva:plus-fill" />}>Tambah Buku</Button>}
        </Stack>
        
        {isTableLoading ? <Grid padding={2} style={{ "textAlign": "center" }}><CircularProgress /></Grid> : (
          books.length > 0 ? (
            <Grid container spacing={4}>
              {books.map((book) => (
                <Grid key={book._id} item xs={12} sm={6} md={4}>
                  <Card>
                    <Box sx={{ pt: '80%', position: 'relative' }}>
                      <Label variant="filled" sx={{ zIndex: 9, top: 16, left: 16, position: 'absolute', textTransform: 'uppercase', color: 'primary.main' }}>
                        {book.genreId?.name || 'No Genre'}
                      </Label>
                      {user.isAdmin && (
                        <Label variant="filled" sx={{ zIndex: 9, top: 12, right: 16, position: 'absolute', borderRadius: "100%", width: "30px", height: "30px", color: "white", backgroundColor: "white" }}>
                          <IconButton size="small" color="primary" onClick={(e) => { setSelectedBookId(book._id); handleOpenMenu(e); }}>
                            <Iconify icon={'eva:more-vertical-fill'} />
                          </IconButton>
                        </Label>
                      )}
                      <StyledBookImage alt={book.name} src={book.photoUrl || "https://i.ibb.co/g9fP9vQ/download-4.jpg"} />
                    </Box>
                    <Stack spacing={1} sx={{ p: 2 }}>
                      <Typography textAlign="center" variant="h5" margin={0} noWrap>{book.name}</Typography>
                      <Typography variant="subtitle1" sx={{ color: "#888888" }} paddingBottom={1} noWrap textAlign="center">{book.authorId?.name || 'No Author'}</Typography>
                      <Label color={book.isAvailable ? "success" : "error"} sx={{ padding: 2 }}>{book.isAvailable ? 'Available' : 'Not available'}</Label>
                      <Typography variant="subtitle2" textAlign="center" paddingTop={1}>ISBN: {book.isbn}</Typography>
                      <Typography variant="subtitle2" textAlign="center" paddingTop={1}>Stock: {book.stock}</Typography>
                    </Stack>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : <Alert severity="warning" color="warning">No books found</Alert>
        )}

        {googleBooks.length > 0 && (
          <>
            <Typography variant="h5" mt={5} mb={2}>Hasil dari Google Books</Typography>
            <Grid container spacing={3}>
              {googleBooks.map((gBook) => (
                <Grid item xs={12} sm={6} md={4} key={gBook.id}>
                  <Card>
                    {gBook.volumeInfo.imageLinks?.thumbnail && <Box component="img" src={gBook.volumeInfo.imageLinks.thumbnail} alt={gBook.volumeInfo.title} sx={{ width: "100%", height: 200, objectFit: "cover" }} />}
                    <Stack spacing={1} sx={{ p: 2 }}>
                      <Typography variant="h6">{gBook.volumeInfo.title}</Typography>
                      <Typography variant="body2" color="text.secondary">{gBook.volumeInfo.authors?.join(", ") || "Tanpa Penulis"}</Typography>
                      <Typography variant="body2">{gBook.volumeInfo.description?.substring(0, 100) || "Tidak ada deskripsi."}...</Typography>
                      <Button variant="outlined" onClick={() => handleUseGoogleBook(gBook)}>Gunakan Data Ini</Button>
                    </Stack>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Container>
      
      <Popover open={Boolean(isMenuOpen)} anchorEl={isMenuOpen} onClose={handleCloseMenu} anchorOrigin={{ vertical: 'top', horizontal: 'left' }} transformOrigin={{ vertical: 'top', horizontal: 'right' }} PaperProps={{ sx: { p: 1, width: 140, '& .MuiMenuItem-root': { px: 1, typography: 'body2', borderRadius: 0.75, }, }, }}>
        <MenuItem onClick={() => { setIsUpdateForm(true); getSelectedBookDetails(); handleCloseMenu(); handleOpenModal(); }}>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />Edit
        </MenuItem>
        <MenuItem sx={{ color: 'error.main' }} onClick={handleOpenDialog}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />Delete
        </MenuItem>
      </Popover>

      <BookForm isUpdateForm={isUpdateForm} isModalOpen={isModalOpen} handleCloseModal={handleCloseModal} id={selectedBookId} book={book} setBook={setBook} handleAddBook={addBook} handleUpdateBook={updateBook} />
      <BookDialog isDialogOpen={isDialogOpen} bookId={selectedBookId} handleDeleteBook={deleteBook} handleCloseDialog={handleCloseDialog} />
    </>
  );
};

export default BookPage;