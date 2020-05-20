import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import RentedItem from './rented-item';
import RentedItemDetail from './rented-item-detail';
import RentedItemUpdate from './rented-item-update';
import RentedItemDeleteDialog from './rented-item-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={RentedItemDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={RentedItemUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={RentedItemUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={RentedItemDetail} />
      <ErrorBoundaryRoute path={match.url} component={RentedItem} />
    </Switch>
  </>
);

export default Routes;
