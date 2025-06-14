import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import PropTypes from "prop-types";

const AuthorDialog = ({isDialogOpen, handleCloseDialog, authorId, handleDeleteAuthor}) => <Dialog
      open={isDialogOpen}
      onClose={handleCloseDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Konfirmasi Hapus Penerbit
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Anda Yakin Ingin Menghapus Penerbit Ini?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog}>No</Button>
        <Button onClick={() => handleDeleteAuthor(authorId)} autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>

AuthorDialog.propTypes = {
  isDialogOpen: PropTypes.bool,
  handleCloseDialog: PropTypes.func,
  authorId: PropTypes.string,
  handleDeleteAuthor: PropTypes.func
};

export default AuthorDialog
