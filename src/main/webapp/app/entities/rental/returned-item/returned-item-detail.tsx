import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './returned-item.reducer';
import { IReturnedItem } from 'app/shared/model/rental/returned-item.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IReturnedItemDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ReturnedItemDetail = (props: IReturnedItemDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { returnedItemEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="gatewayApp.rentalReturnedItem.detail.title">ReturnedItem</Translate> [<b>{returnedItemEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="bookId">
              <Translate contentKey="gatewayApp.rentalReturnedItem.bookId">Book Id</Translate>
            </span>
          </dt>
          <dd>{returnedItemEntity.bookId}</dd>
          <dt>
            <span id="returnedDate">
              <Translate contentKey="gatewayApp.rentalReturnedItem.returnedDate">Returned Date</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={returnedItemEntity.returnedDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="bookTitle">
              <Translate contentKey="gatewayApp.rentalReturnedItem.bookTitle">Book Title</Translate>
            </span>
          </dt>
          <dd>{returnedItemEntity.bookTitle}</dd>
          <dt>
            <Translate contentKey="gatewayApp.rentalReturnedItem.rental">Rental</Translate>
          </dt>
          <dd>{returnedItemEntity.rentalId ? returnedItemEntity.rentalId : ''}</dd>
        </dl>
        <Button tag={Link} to="/returned-item" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/returned-item/${returnedItemEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ returnedItem }: IRootState) => ({
  returnedItemEntity: returnedItem.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ReturnedItemDetail);
