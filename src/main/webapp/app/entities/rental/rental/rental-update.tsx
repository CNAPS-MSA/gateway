import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './rental.reducer';
import { IRental } from 'app/shared/model/rental/rental.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IRentalUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const RentalUpdate = (props: IRentalUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { rentalEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/rental' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...rentalEntity,
        ...values
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gatewayApp.rentalRental.home.createOrEditLabel">
            <Translate contentKey="gatewayApp.rentalRental.home.createOrEditLabel">Create or edit a Rental</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : rentalEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="rental-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="rental-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="userIdLabel" for="rental-userId">
                  <Translate contentKey="gatewayApp.rentalRental.userId">User Id</Translate>
                </Label>
                <AvField id="rental-userId" type="string" className="form-control" name="userId" />
              </AvGroup>
              <AvGroup>
                <Label id="rentalStatusLabel" for="rental-rentalStatus">
                  <Translate contentKey="gatewayApp.rentalRental.rentalStatus">Rental Status</Translate>
                </Label>
                <AvInput
                  id="rental-rentalStatus"
                  type="select"
                  className="form-control"
                  name="rentalStatus"
                  value={(!isNew && rentalEntity.rentalStatus) || 'RENT_AVAILABLE'}
                >
                  <option value="RENT_AVAILABLE">{translate('gatewayApp.RentalStatus.RENT_AVAILABLE')}</option>
                  <option value="RENT_UNAVAILABLE">{translate('gatewayApp.RentalStatus.RENT_UNAVAILABLE')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="lateFeeLabel" for="rental-lateFee">
                  <Translate contentKey="gatewayApp.rentalRental.lateFee">Late Fee</Translate>
                </Label>
                <AvField id="rental-lateFee" type="string" className="form-control" name="lateFee" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/rental" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  rentalEntity: storeState.rental.entity,
  loading: storeState.rental.loading,
  updating: storeState.rental.updating,
  updateSuccess: storeState.rental.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(RentalUpdate);
