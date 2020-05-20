import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Rental from './rental';
import RentalDetail from './rental-detail';
import RentalUpdate from './rental-update';
import RentalDeleteDialog from './rental-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={RentalDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={RentalUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={RentalUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={RentalDetail} />
      <ErrorBoundaryRoute path={match.url} component={Rental} />
    </Switch>
  </>
);

export default Routes;
