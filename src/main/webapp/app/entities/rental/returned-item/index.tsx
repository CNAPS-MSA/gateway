import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ReturnedItem from './returned-item';
import ReturnedItemDetail from './returned-item-detail';
import ReturnedItemUpdate from './returned-item-update';
import ReturnedItemDeleteDialog from './returned-item-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={ReturnedItemDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ReturnedItemUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ReturnedItemUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ReturnedItemDetail} />
      <ErrorBoundaryRoute path={match.url} component={ReturnedItem} />
    </Switch>
  </>
);

export default Routes;
