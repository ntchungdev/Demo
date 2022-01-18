import PropTypes from 'prop-types';
import { Modal, Box, Typography, Stack, Button } from '@mui/material';
import { useFormik, Form, FormikProvider } from 'formik';
import { LoadingButton } from '@mui/lab';

DeleteModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  id: PropTypes.string
};

export default function DeleteModal({ isOpen, handleClose, id }) {
  const formik = useFormik({
    initialValues: {
      id
    },
    onSubmit: (values) => {}
  });

  const { isSubmitting, handleSubmit } = formik;

  const handleCloseModal = () => {
    formik.resetForm();
    handleClose();
  };
  return (
    <Modal open={isOpen} onClose={handleCloseModal}>
      <Box sx={styles.modalAdd}>
        <Typography variant="h6" component="h2">
          Are you sure to delete it?
        </Typography>
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Stack direction="row" spacing={2} mt={2} ml="50%">
              <Button size="medium" variant="text" fullWidth onClick={handleClose}>
                No
              </Button>
              <LoadingButton
                fullWidth
                size="medium"
                type="submit"
                variant="contained"
                loading={isSubmitting}
              >
                Yes
              </LoadingButton>
            </Stack>
          </Form>
        </FormikProvider>
      </Box>
    </Modal>
  );
}

const styles = {
  modalAdd: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    borderRadius: '5px',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4
  }
};
