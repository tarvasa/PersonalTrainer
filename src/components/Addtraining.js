import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function Addtraining(props) {
  const [open, setOpen] = React.useState(false);
  const [training, setTraining] = React.useState({
    date: '',
    activity: '',
    duration: '',
    customer: props.customer,
  });

  const handleClickOpen = () => {
    console.log(training);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event) => {
    setTraining({ ...training, [event.target.name]: event.target.value });
  };

  const addTraining = () => {
    //console.log(training);
    props.saveTraining(training);
    handleClose();
  };

  return (
    <div>
      <Button color="primary" onClick={handleClickOpen}>
        Add Training
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">New Training</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="date"
            type="datetime-local"
            value={training.date}
            onChange={(e) => handleInputChange(e)}
            fullWidth
          />
          <TextField
            margin="dense"
            name="activity"
            label="Activity"
            value={training.activity}
            onChange={(e) => handleInputChange(e)}
            fullWidth
          />
          <TextField
            margin="dense"
            name="duration"
            label="Duration"
            value={training.duration}
            onChange={(e) => handleInputChange(e)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={addTraining} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
