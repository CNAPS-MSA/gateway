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
                <AvField id="book-title" type="text" name="title" />
              </AvGroup>
              <AvGroup>
                <Label id="descriptionLabel" for="book-description">
                  <Translate contentKey="gatewayApp.bookBook.description">Description</Translate>
                </Label>
                <AvField id="book-description" type="text" name="description" />
              </AvGroup>
              <AvGroup>
                <Label id="authorLabel" for="book-author">
                  <Translate contentKey="gatewayApp.bookBook.author">Author</Translate>
                </Label>
                <AvField id="book-author" type="text" name="author" />
              </AvGroup>
              <AvGroup>
                <Label id="publisherLabel" for="book-publisher">
                  <Translate contentKey="gatewayApp.bookBook.publisher">Publisher</Translate>
                </Label>
                <AvField id="book-publisher" type="text" name="publisher" />
              </AvGroup>
              <AvGroup>
                <Label id="isbnLabel" for="book-isbn">
                  <Translate contentKey="gatewayApp.bookBook.isbn">Isbn</Translate>
                </Label>
                <AvField id="book-isbn" type="string" className="form-control" name="isbn" />
              </AvGroup>
              <AvGroup>
                <Label id="publicationDateLabel" for="book-publicationDate">
                  <Translate contentKey="gatewayApp.bookBook.publicationDate">Publication Date</Translate>
                </Label>
                <AvField id="book-publicationDate" type="date" className="form-control" name="publicationDate" />
              </AvGroup>
              <AvGroup>
                <Label id="classificationLabel" for="book-classification">
                  <Translate contentKey="gatewayApp.bookBook.classification">Classification</Translate>
                </Label>
                <AvInput
                  id="book-classification"
                  type="select"
                  className="form-control"
                  name="classification"
                  value={(!isNew && bookEntity.classification) || 'Arts'}
                >
                  <option value="Arts">{translate('gatewayApp.Classification.Arts')}</option>
                  <option value="Photography">{translate('gatewayApp.Classification.Photography')}</option>
                  <option value="Biographies">{translate('gatewayApp.Classification.Biographies')}</option>
                  <option value="BusinessMoney">{translate('gatewayApp.Classification.BusinessMoney')}</option>
                  <option value="Children">{translate('gatewayApp.Classification.Children')}</option>
                  <option value="ComputerTechnology">{translate('gatewayApp.Classification.ComputerTechnology')}</option>
                  <option value="History">{translate('gatewayApp.Classification.History')}</option>
                  <option value="Medical">{translate('gatewayApp.Classification.Medical')}</option>
                  <option value="Travel">{translate('gatewayApp.Classification.Travel')}</option>
                  <option value="Romance">{translate('gatewayApp.Classification.Romance')}</option>
                  <option value="Science">{translate('gatewayApp.Classification.Science')}</option>
                  <option value="Math">{translate('gatewayApp.Classification.Math')}</option>
                  <option value="SelfHelp">{translate('gatewayApp.Classification.SelfHelp')}</option>
                </AvInput>
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
                <Label id="locationLabel" for="book-location">
                  <Translate contentKey="gatewayApp.bookBook.location">Location</Translate>
                </Label>
                <AvInput
                  id="book-location"
                  type="select"
                  className="form-control"
                  name="location"
                  value={(!isNew && bookEntity.location) || 'JEONGJA'}
                >
                  <option value="JEONGJA">{translate('gatewayApp.Location.JEONGJA')}</option>
                  <option value="PANGYO">{translate('gatewayApp.Location.PANGYO')}</option>
                </AvInput>
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
