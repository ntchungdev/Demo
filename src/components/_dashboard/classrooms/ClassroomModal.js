import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Modal, Box, Typography, Stack, TextField } from '@mui/material';
import { useFormik, Form, FormikProvider } from 'formik';
import { LoadingButton } from '@mui/lab';
import { Icon } from '@iconify/react';

ClassroomModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  user: PropTypes.object
};

export default function ClassroomModal({ isOpen, handleClose, user }) {
  const UserSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    phoneNumber: Yup.number().required('Phone number is required')
  });

  const { firstName, lastName, email, phoneNumber, username } = user || {};
  const title = user ? 'Edit' : 'Create';

  const formik = useFormik({
    initialValues: {
      firstName: firstName || '',
      lastName: lastName || '',
      username: username || '',
      email: email || '',
      phoneNumber: phoneNumber || ''
    },
    validationSchema: UserSchema,
    onSubmit: (values) => {}
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleCloseModal = () => {
    formik.resetForm();
    handleClose();
  };
  return (
    <Modal open={isOpen} onClose={handleCloseModal}>
      <Box sx={styles.modalAdd}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={3}
          mb={2}
        >
          <Typography variant="h6" component="h2">
            {title} user
          </Typography>
          <Icon icon="akar-icons:cross" cursor="pointer" onClick={handleCloseModal} />
        </Stack>
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Stack spacing={3} mb={3}>
              <Stack direction="row" spacing={2}>
                <TextField
                  fullWidth
                  type="text"
                  label="First name"
                  {...getFieldProps('firstName')}
                  error={Boolean(touched.firstName && errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                />

                <TextField
                  fullWidth
                  type="text"
                  label="Last name"
                  {...getFieldProps('lastName')}
                  error={Boolean(touched.lastName && errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                />
              </Stack>

              <TextField
                fullWidth
                type="text"
                label="Username"
                {...getFieldProps('username')}
                error={Boolean(touched.username && errors.username)}
                helperText={touched.username && errors.username}
              />

              <TextField
                fullWidth
                autoComplete="email"
                type="email"
                label="Email"
                {...getFieldProps('email')}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
              />

              <TextField
                fullWidth
                type="number"
                label="Phone number"
                {...getFieldProps('phoneNumber')}
                error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                helperText={touched.phoneNumber && errors.phoneNumber}
              />
            </Stack>

            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              {title}
            </LoadingButton>
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
    bgcolor: 'background.paper',
    borderRadius: '5px',
    boxShadow: 24,
    p: 4
  }
};
