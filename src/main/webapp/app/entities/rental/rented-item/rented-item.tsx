import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat, getSortState, IPaginationBaseState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './rented-item.reducer';
import { IRentedItem } from 'app/shared/model/rental/rented-item.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IRentedItemProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const RentedItem = (props: IRentedItemProps) => {
  const [paginationState, setPaginationState] = useState(getSortState(props.location, ITEMS_PER_PAGE));

  const getAllEntities = () => {
    props.getEntities(paginationState.activePage - 1, paginationState.itemsPerPage, `${paginationState.sort},${paginationState.order}`);
  };

  const sortEntities = () => {
    getAllEntities();
    props.history.push(
      `${props.location.pathname}?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`
    );
  };

  useEffect(() => {
    sortEntities();
  }, [paginationState.activePage, paginationState.order, paginationState.sort]);

  const sort = p => () => {
    setPaginationState({
      ...paginationState,
      order: paginationState.order === 'asc' ? 'desc' : 'asc',
      sort: p
    });
  };

  const handlePagination = currentPage =>
    setPaginationState({
      ...paginationState,
      activePage: currentPage
    });

  const { rentedItemList, match, loading, totalItems } = props;
  return (
    <div>
      <h2 id="rented-item-heading">
        <Translate contentKey="gatewayApp.rentalRentedItem.home.title">Rented Items</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="gatewayApp.rentalRentedItem.home.createLabel">Create new Rented Item</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {rentedItemList && rentedItemList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('bookId')}>
                  <Translate contentKey="gatewayApp.rentalRentedItem.bookId">Book Id</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('rentedDate')}>
                  <Translate contentKey="gatewayApp.rentalRentedItem.rentedDate">Rented Date</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('dueDate')}>
                  <Translate contentKey="gatewayApp.rentalRentedItem.dueDate">Due Date</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('bookTitle')}>
                  <Translate contentKey="gatewayApp.rentalRentedItem.bookTitle">Book Title</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="gatewayApp.rentalRentedItem.rental">Rental</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {rentedItemList.map((rentedItem, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${rentedItem.id}`} color="link" size="sm">
                      {rentedItem.id}
                    </Button>
                  </td>
                  <td>{rentedItem.bookId}</td>
                  <td>
                    <TextFormat type="date" value={rentedItem.rentedDate} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>
                    <TextFormat type="date" value={rentedItem.dueDate} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{rentedItem.bookTitle}</td>
                  <td>{rentedItem.rentalId ? <Link to={`rental/${rentedItem.rentalId}`}>{rentedItem.rentalId}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${rentedItem.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${rentedItem.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="primary"
                        size="sm"
                      >
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${rentedItem.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="danger"
                        size="sm"
                      >
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="gatewayApp.rentalRentedItem.home.notFound">No Rented Items found</Translate>
            </div>
          )
        )}
      </div>
      <div className={rentedItemList && rentedItemList.length > 0 ? '' : 'd-none'}>
        <Row className="justify-content-center">
          <JhiItemCount page={paginationState.activePage} total={totalItems} itemsPerPage={paginationState.itemsPerPage} i18nEnabled />
        </Row>
        <Row className="justify-content-center">
          <JhiPagination
            activePage={paginationState.activePage}
            onSelect={handlePagination}
            maxButtons={5}
            itemsPerPage={paginationState.itemsPerPage}
            totalItems={props.totalItems}
          />
        </Row>
      </div>
    </div>
  );
};

const mapStateToProps = ({ rentedItem }: IRootState) => ({
  rentedItemList: rentedItem.entities,
  loading: rentedItem.loading,
  totalItems: rentedItem.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(RentedItem);
