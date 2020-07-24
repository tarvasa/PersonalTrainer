import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const views = ['month', 'week', 'day', 'agenda'];

export default function Trainingcalendar() {
  const [events, setEvents] = useState([]);

  useEffect(() => fetchData(), []);

  const fetchData = () => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
      .then((response) => response.json())
      .then((data) => {
        setEvents(
          data.map((item) => ({
            start: moment.utc(item.date).toDate(),
            title: `${item.activity} / ${item.customer.firstname} ${item.customer.lastname}`,
            end: moment.utc(item.date).add(item.duration, 'minutes').toDate(),
          }))
        );
      })
      .catch((err) => console.error(err));
  };

  return (
    <div style={{ height: 700 }}>
      <Calendar
        localizer={localizer}
        culture="en-GB"
        showMultiDayTimes
        defaultDate={new Date()}
        defaultView="month"
        views={views}
        events={events}
      />
    </div>
  );
}
