import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IRental } from 'app/shared/model/rental/rental.model';
import { getEntities as getRentals } from 'app/entities/rental/rental/rental.reducer';
import { getEntity, updateEntity, createEntity, reset } from './overdue-item.reducer';
import { IOverdueItem } from 'app/shared/model/rental/overdue-item.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IOverdueItemUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const OverdueItemUpdate = (props: IOverdueItemUpdateProps) => {
  const [rentalId, setRentalId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { overdueItemEntity, rentals, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/overdue-item' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getRentals();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...overdueItemEntity,
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
          <h2 id="gatewayApp.rentalOverdueItem.home.createOrEditLabel">
            <Translate contentKey="gatewayApp.rentalOverdueItem.home.createOrEditLabel">Create or edit a OverdueItem</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : overdueItemEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="overdue-item-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="overdue-item-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="bookIdLabel" for="overdue-item-bookId">
                  <Translate contentKey="gatewayApp.rentalOverdueItem.bookId">Book Id</Translate>
                </Label>
                <AvField id="overdue-item-bookId" type="string" className="form-control" name="bookId" />
              </AvGroup>
              <AvGroup>
                <Label id="dueDateLabel" for="overdue-item-dueDate">
                  <Translate contentKey="gatewayApp.rentalOverdueItem.dueDate">Due Date</Translate>
                </Label>
                <AvField id="overdue-item-dueDate" type="date" className="form-control" name="dueDate" />
              </AvGroup>
              <AvGroup>
                <Label for="overdue-item-rental">
                  <Translate contentKey="gatewayApp.rentalOverdueItem.rental">Rental</Translate>
                </Label>
                <AvInput id="overdue-item-rental" type="select" className="form-control" name="rentalId">
                  <option value="" key="0" />
                  {rentals
                    ? rentals.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/overdue-item" replace color="info">
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
  rentals: storeState.rental.entities,
  overdueItemEntity: storeState.overdueItem.entity,
  loading: storeState.overdueItem.loading,
  updating: storeState.overdueItem.updating,
  updateSuccess: storeState.overdueItem.updateSuccess
});

const mapDispatchToProps = {
  getRentals,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(OverdueItemUpdate);
