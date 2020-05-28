import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './book.reducer';
import { IBook } from 'app/shared/model/book/book.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IBookUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const BookUpdate = (props: IBookUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { bookEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/book' + props.location.search);
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
        ...bookEntity,
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
          <h2 id="gatewayApp.bookBook.home.createOrEditLabel">
            <Translate contentKey="gatewayApp.bookBook.home.createOrEditLabel">Create or edit a Book</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : bookEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="book-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="book-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="titleLabel" for="book-title">
                  <Translate contentKey="gatewayApp.bookBook.title">Title</Translate>
                </Label>
                <AvField
                  id="book-title"
                  type="text"
                  name="title"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="authorLabel" for="book-author">
                  <Translate contentKey="gatewayApp.bookBook.author">Author</Translate>
                </Label>
                <AvField
                  id="book-author"
                  type="text"
                  name="author"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="descriptionLabel" for="book-description">
                  <Translate contentKey="gatewayApp.bookBook.description">Description</Translate>
                </Label>
                <AvField
                  id="book-description"
                  type="text"
                  name="description"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="bookStatusLabel" for="book-bookStatus">
                  <Translate contentKey="gatewayApp.bookBook.bookStatus">Book Status</Translate>
                </Label>
                <AvInput
                  id="book-bookStatus"
                  type="select"
                  className="form-control"
                  name="bookStatus"
                  value={(!isNew && bookEntity.bookStatus) || 'AVAILABLE'}
                >
                  <option value="AVAILABLE">{translate('gatewayApp.BookStatus.AVAILABLE')}</option>
                  <option value="UNAVAILABLE">{translate('gatewayApp.BookStatus.UNAVAILABLE')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="categoryLabel" for="book-category">
                  <Translate contentKey="gatewayApp.bookBook.category">Category</Translate>
                </Label>
                <AvInput
                  id="book-category"
                  type="select"
                  className="form-control"
                  name="category"
                  value={(!isNew && bookEntity.category) || 'IT'}
                >
                  <option value="IT">{translate('gatewayApp.Categories.IT')}</option>
                  <option value="LITERATURE">{translate('gatewayApp.Categories.LITERATURE')}</option>
                  <option value="HISTORY">{translate('gatewayApp.Categories.HISTORY')}</option>
                  <option value="SCIENCE">{translate('gatewayApp.Categories.SCIENCE')}</option>
                  <option value="ART">{translate('gatewayApp.Categories.ART')}</option>
                  <option value="LANGUAGE">{translate('gatewayApp.Categories.LANGUAGE')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="barcodeLabel" for="book-barcode">
                  <Translate contentKey="gatewayApp.bookBook.barcode">Barcode</Translate>
                </Label>
                <AvField id="book-barcode" type="string" className="form-control" name="barcode" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/book" replace color="info">
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
  bookEntity: storeState.book.entity,
  loading: storeState.book.loading,
  updating: storeState.book.updating,
  updateSuccess: storeState.book.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(BookUpdate);
