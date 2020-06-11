import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import InStockBook from './in-stock-book';
import InStockBookDetail from './in-stock-book-detail';
import InStockBookUpdate from './in-stock-book-update';
import InStockBookDeleteDialog from './in-stock-book-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={InStockBookDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={InStockBookUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={InStockBookUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={InStockBookDetail} />
      <ErrorBoundaryRoute path={match.url} component={InStockBook} />
    </Switch>
  </>
);

export default Routes;
