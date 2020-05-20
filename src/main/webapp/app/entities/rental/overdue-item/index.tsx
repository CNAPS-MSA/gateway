import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import OverdueItem from './overdue-item';
import OverdueItemDetail from './overdue-item-detail';
import OverdueItemUpdate from './overdue-item-update';
import OverdueItemDeleteDialog from './overdue-item-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={OverdueItemDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={OverdueItemUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={OverdueItemUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={OverdueItemDetail} />
      <ErrorBoundaryRoute path={match.url} component={OverdueItem} />
    </Switch>
  </>
);

export default Routes;
