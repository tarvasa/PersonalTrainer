import React, { useState, useEffect, forwardRef } from 'react';
import MaterialTable from 'material-table';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import CloseIcon from '@material-ui/icons/Close';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import Addcustomer from './Addcustomer';
import Editcustomer from './Editcustomer';
import Addtraining from './Addtraining';

export default function Customerlist() {
  const [customers, setCustomers] = useState([]);
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  useEffect(() => fetchData(), []);

  const fetchData = () => {
    fetch('https://customerrest.herokuapp.com/api/customers')
      .then((response) => response.json())
      .then((data) => {
        setCustomers(data.content);
      })
      .catch((err) => console.error(err));
  };

  const deleteCustomer = (link) => {
    //console.log(link);
    if (window.confirm('Are you sure you want to delete customer info?')) {
      fetch(link, { method: 'DELETE' })
        .then((res) => fetchData())
        .catch((err) => console.error(err));
    }
  };

  const saveCustomer = (customer) => {
    fetch('https://customerrest.herokuapp.com/api/customers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customer),
    })
      .then((res) => fetchData())
      .catch((err) => console.error(err));
  };

  const updateCustomer = (customer, link) => {
    fetch(link, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customer),
    })
      .then((res) => fetchData())
      .catch((err) => console.error(err));
  };

  const saveTraining = (training) => {
    fetch('https://customerrest.herokuapp.com/api/trainings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(training),
    }).catch((err) => console.error(err));
    handleClick();
  };

  const columns = [
    {
      title: 'Actions',
      field: 'links',
      width: 10,
      align: 'center',
      render: ({ links }) => (
        <DeleteOutline onClick={() => deleteCustomer(links[1].href)} />
      ),
    },
    {
      title: '',
      field: 'links',
      width: 50,
      align: 'left',
      render: ({ links }) => (
        <Editcustomer
          updateCustomer={updateCustomer}
          customer={links[1].href}
        />
      ),
    },
    {
      title: '',
      field: 'links',
      render: ({ links }) => (
        <Addtraining saveTraining={saveTraining} customer={links[1].href} />
      ),
    },
    {
      title: 'First Name',
      field: 'firstname',
      align: 'center',
    },
    {
      title: 'Last Name',
      field: 'lastname',
      align: 'center',
    },
    {
      title: 'Email',
      field: 'email',
      align: 'center',
    },
    {
      title: 'Phone',
      field: 'phone',
      align: 'center',
    },
    {
      title: 'Street Address',
      field: 'streetaddress',
      align: 'center',
    },
    {
      title: 'Postcode',
      field: 'postcode',
      align: 'center',
    },
    {
      title: 'City',
      field: 'city',
      align: 'center',
    },
  ];

  const tableIcons = {
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
      <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => (
      <ArrowDownward {...props} ref={ref} />
    )),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  };

  return (
    <div>
      <Addcustomer saveCustomer={saveCustomer} />
      <MaterialTable
        icons={tableIcons}
        title="Customers"
        columns={columns}
        data={customers}
        options={{
          sorting: true,
        }}
      />
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        message="New training added"
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
}
