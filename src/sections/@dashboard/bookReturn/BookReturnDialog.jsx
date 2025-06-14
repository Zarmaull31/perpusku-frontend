import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import PropTypes from "prop-types";

const BookReturnDialog = ({isDialogOpen, handleCloseDialog, returnId, handleDeleteReturn}) =>
    <Dialog
      open={isDialogOpen}
      onClose={handleCloseDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Hapus Pengembalian Buku
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Anda yakin ingin menghapus pengembalian buku ini?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog}>No</Button>
        <Button onClick={() => handleDeleteReturn(returnId)} autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>

BookReturnDialog.propTypes = {
  isDialogOpen: PropTypes.bool,
  handleCloseDialog: PropTypes.func,
  returnId: PropTypes.string,
  handleDeleteReturn: PropTypes.func
};

export default BookReturnDialog
