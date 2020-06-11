import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './in-stock-book.reducer';
import { IInStockBook } from 'app/shared/model/book/in-stock-book.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IInStockBookUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const InStockBookUpdate = (props: IInStockBookUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { inStockBookEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/in-stock-book' + props.location.search);
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
        ...inStockBookEntity,
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
          <h2 id="gatewayApp.bookInStockBook.home.createOrEditLabel">
            <Translate contentKey="gatewayApp.bookInStockBook.home.createOrEditLabel">Create or edit a InStockBook</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : inStockBookEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="in-stock-book-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="in-stock-book-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="titleLabel" for="in-stock-book-title">
                  <Translate contentKey="gatewayApp.bookInStockBook.title">Title</Translate>
                </Label>
                <AvField id="in-stock-book-title" type="text" name="title" />
              </AvGroup>
              <AvGroup>
                <Label id="descriptionLabel" for="in-stock-book-description">
                  <Translate contentKey="gatewayApp.bookInStockBook.description">Description</Translate>
                </Label>
                <AvField id="in-stock-book-description" type="text" name="description" />
              </AvGroup>
              <AvGroup>
                <Label id="authorLabel" for="in-stock-book-author">
                  <Translate contentKey="gatewayApp.bookInStockBook.author">Author</Translate>
                </Label>
                <AvField id="in-stock-book-author" type="text" name="author" />
              </AvGroup>
              <AvGroup>
                <Label id="publisherLabel" for="in-stock-book-publisher">
                  <Translate contentKey="gatewayApp.bookInStockBook.publisher">Publisher</Translate>
                </Label>
                <AvField id="in-stock-book-publisher" type="text" name="publisher" />
              </AvGroup>
              <AvGroup>
                <Label id="isbnLabel" for="in-stock-book-isbn">
                  <Translate contentKey="gatewayApp.bookInStockBook.isbn">Isbn</Translate>
                </Label>
                <AvField id="in-stock-book-isbn" type="string" className="form-control" name="isbn" />
              </AvGroup>
              <AvGroup>
                <Label id="publicationDateLabel" for="in-stock-book-publicationDate">
                  <Translate contentKey="gatewayApp.bookInStockBook.publicationDate">Publication Date</Translate>
                </Label>
                <AvField id="in-stock-book-publicationDate" type="date" className="form-control" name="publicationDate" />
              </AvGroup>
              <AvGroup>
                <Label id="sourceLabel" for="in-stock-book-source">
                  <Translate contentKey="gatewayApp.bookInStockBook.source">Source</Translate>
                </Label>
                <AvInput
                  id="in-stock-book-source"
                  type="select"
                  className="form-control"
                  name="source"
                  value={(!isNew && inStockBookEntity.source) || 'Donated'}
                >
                  <option value="Donated">{translate('gatewayApp.Source.Donated')}</option>
                  <option value="Purchased">{translate('gatewayApp.Source.Purchased')}</option>
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/in-stock-book" replace color="info">
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
  inStockBookEntity: storeState.inStockBook.entity,
  loading: storeState.inStockBook.loading,
  updating: storeState.inStockBook.updating,
  updateSuccess: storeState.inStockBook.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(InStockBookUpdate);
