import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Rental from './rental/rental';
import RentedItem from './rental/rented-item';
import OverdueItem from './rental/overdue-item';
import ReturnedItem from './rental/returned-item';
import Book from './book/book';
import User from './user/user';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}rental`} component={Rental} />
      <ErrorBoundaryRoute path={`${match.url}rented-item`} component={RentedItem} />
      <ErrorBoundaryRoute path={`${match.url}overdue-item`} component={OverdueItem} />
      <ErrorBoundaryRoute path={`${match.url}returned-item`} component={ReturnedItem} />
      <ErrorBoundaryRoute path={`${match.url}book`} component={Book} />
      <ErrorBoundaryRoute path={`${match.url}user`} component={User} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
