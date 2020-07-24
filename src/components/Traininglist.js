import React, { useState, useEffect, forwardRef } from 'react';
import MaterialTable from 'material-table';
import moment from 'moment';
import 'moment/locale/fi';
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

export default function Traininglist() {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => fetchData(), []);

  const fetchData = () => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
      .then((response) => response.json())
      .then((data) => {
        setTrainings(data);
        //console.log(data);
      })
      .catch((err) => console.error(err));
  };

  const deleteTraining = (id) => {
    console.log(id);
    if (window.confirm('Are you sure you want to delete training info?')) {
      fetch(`https://customerrest.herokuapp.com/api/trainings/${id}`, {
        method: 'DELETE',
      })
        .then((res) => fetchData())
        .catch((err) => console.error(err));
    }
  };

  const columns = [
    {
      title: 'Actions',
      field: 'id',
      width: 10,
      render: ({ id }) => <DeleteOutline onClick={() => deleteTraining(id)} />,
    },
    {
      title: 'Date',
      field: 'date',
      //type: 'date',
      render: ({ date }) => {
        return moment.utc(date).format('DD.MM.YYYY, hh:mm a');
      },
      align: 'center',
    },
    {
      title: 'Activity',
      field: 'activity',
      align: 'center',
    },
    {
      title: 'Duration (min)',
      field: 'duration',
      type: 'numeric',
      align: 'center',
    },
    {
      title: 'Customer',
      field: 'customer',
      render: ({ customer }) => {
        return `${customer.firstname} ${customer.lastname}`;
      },
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
    <MaterialTable
      icons={tableIcons}
      title="Trainings"
      columns={columns}
      data={trainings}
      options={{
        sorting: true,
      }}
    />
  );
}
