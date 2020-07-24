import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Edit from '@material-ui/icons/Edit';

export default function Editcustomer(props) {
  const [open, setOpen] = React.useState(false);
  const [customer, setCustomer] = React.useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    streetaddress: '',
    postcode: '',
    city: '',
  });

  const handleClickOpen = () => {
    //console.log(props.customer);
    fetch(props.customer)
      .then((response) => response.json())
      .then((data) => {
        setCustomer(data);
      })
      .catch((err) => console.error(err));
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event) => {
    setCustomer({ ...customer, [event.target.name]: event.target.value });
  };

  const updateCustomer = () => {
    props.updateCustomer(customer, props.customer);
    handleClose();
  };

  return (
    <div>
      <Edit onClick={handleClickOpen} />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit Customer</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="firstname"
            label="First Name"
            value={customer.firstname}
            onChange={(e) => handleInputChange(e)}
            fullWidth
          />
          <TextField
            margin="dense"
            name="lastname"
            label="Last Name"
            value={customer.lastname}
            onChange={(e) => handleInputChange(e)}
            fullWidth
          />
          <TextField
            margin="dense"
            name="email"
            label="Email"
            value={customer.email}
            onChange={(e) => handleInputChange(e)}
            fullWidth
          />
          <TextField
            margin="dense"
            name="phone"
            label="Phone"
            value={customer.phone}
            onChange={(e) => handleInputChange(e)}
            fullWidth
          />
          <TextField
            margin="dense"
            name="streetaddress"
            label="Street Address"
            value={customer.streetaddress}
            onChange={(e) => handleInputChange(e)}
            fullWidth
          />
          <TextField
            margin="dense"
            name="postcode"
            label="Postcode"
            value={customer.postcode}
            onChange={(e) => handleInputChange(e)}
            fullWidth
          />
          <TextField
            margin="dense"
            name="city"
            label="City"
            value={customer.city}
            onChange={(e) => handleInputChange(e)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={updateCustomer} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
