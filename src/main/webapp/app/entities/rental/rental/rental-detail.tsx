import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './rental.reducer';
import { IRental } from 'app/shared/model/rental/rental.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IRentalDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const RentalDetail = (props: IRentalDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { rentalEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="gatewayApp.rentalRental.detail.title">Rental</Translate> [<b>{rentalEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="userId">
              <Translate contentKey="gatewayApp.rentalRental.userId">User Id</Translate>
            </span>
          </dt>
          <dd>{rentalEntity.userId}</dd>
          <dt>
            <span id="lateFee">
              <Translate contentKey="gatewayApp.rentalRental.lateFee">Late Fee</Translate>
            </span>
          </dt>
          <dd>{rentalEntity.lateFee}</dd>
          <dt>
            <span id="rentalStatus">
              <Translate contentKey="gatewayApp.rentalRental.rentalStatus">Rental Status</Translate>
            </span>
          </dt>
          <dd>{rentalEntity.rentalStatus}</dd>
        </dl>
        <Button tag={Link} to="/rental" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/rental/${rentalEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ rental }: IRootState) => ({
  rentalEntity: rental.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(RentalDetail);
