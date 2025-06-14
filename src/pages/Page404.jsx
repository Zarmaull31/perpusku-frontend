import { Helmet } from "react-helmet-async";
import { Link as RouterLink } from "react-router-dom";
// @mui
import { styled } from "@mui/material/styles";
import { Box, Button, Container, Typography } from "@mui/material";

// ----------------------------------------------------------------------

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Page404() {
  return (
    <>
      <Helmet>
        <title> 404 Halaman Tidak Ditemukan </title>
      </Helmet>

      <Container>
        <StyledContent sx={{ textAlign: 'center', alignItems: 'center' }}>

          {/* [EDIT 1] Mengganti Judul Utama */}
          <Typography variant="h3" paragraph>
            Oops! Sepertinya Anda Tersesat
          </Typography>

          {/* [EDIT 2] Mengganti Teks Deskripsi */}
          <Typography sx={{ color: 'text.secondary' }}>
            Halaman yang Anda cari sepertinya tidak ada dalam katalog kami. Coba periksa kembali ejaan pada alamat URL atau kembali ke halaman utama.
          </Typography>

          {/* [EDIT 3] Mengganti Gambar dengan Logo SMP dan Menyesuaikan Gaya */}
          <Box
            component="img"
            src="/assets/logoSmpMahakarya.jpeg"
            sx={{
              width: 180,
              height: 180,
              borderRadius: '50%', // Membuat logo menjadi bulat
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)', // Memberi efek bayangan lembut
              mx: 'auto',
              my: { xs: 4, sm: 8 }
            }}
          />

          {/* [EDIT 4] Mengganti Teks Tombol */}
          <Button to="/" size="large" variant="contained" component={RouterLink}>
            Kembali ke Halaman Utama
          </Button>
        </StyledContent>
      </Container>
    </>
  );
}