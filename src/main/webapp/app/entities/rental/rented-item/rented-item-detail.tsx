import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './rented-item.reducer';
import { IRentedItem } from 'app/shared/model/rental/rented-item.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IRentedItemDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const RentedItemDetail = (props: IRentedItemDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { rentedItemEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="gatewayApp.rentalRentedItem.detail.title">RentedItem</Translate> [<b>{rentedItemEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="bookId">
              <Translate contentKey="gatewayApp.rentalRentedItem.bookId">Book Id</Translate>
            </span>
          </dt>
          <dd>{rentedItemEntity.bookId}</dd>
          <dt>
            <span id="rentedDate">
              <Translate contentKey="gatewayApp.rentalRentedItem.rentedDate">Rented Date</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={rentedItemEntity.rentedDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="dueDate">
              <Translate contentKey="gatewayApp.rentalRentedItem.dueDate">Due Date</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={rentedItemEntity.dueDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <Translate contentKey="gatewayApp.rentalRentedItem.rental">Rental</Translate>
          </dt>
          <dd>{rentedItemEntity.rentalId ? rentedItemEntity.rentalId : ''}</dd>
        </dl>
        <Button tag={Link} to="/rented-item" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/rented-item/${rentedItemEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ rentedItem }: IRootState) => ({
  rentedItemEntity: rentedItem.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(RentedItemDetail);
