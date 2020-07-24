import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Customerlist from './Customerlist';
import Traininglist from './Traininglist';
import Trainingcalendar from './Trainingcalendar';

export default function Router() {
  return (
    <div>
      <div>
        <Switch>
          <Route exact path="/" component={Customerlist} />
          <Route path="/customerlist">
            <Customerlist />
          </Route>
          <Route path="/traininglist">
            <Traininglist />
          </Route>
          <Route path="/trainingcalendar">
            <Trainingcalendar />
          </Route>
          <Route render={() => <h1>Page not found</h1>} />
        </Switch>
      </div>
    </div>
  );
}
