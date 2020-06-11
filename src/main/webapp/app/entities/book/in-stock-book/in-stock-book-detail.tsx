import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './in-stock-book.reducer';
import { IInStockBook } from 'app/shared/model/book/in-stock-book.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IInStockBookDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const InStockBookDetail = (props: IInStockBookDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { inStockBookEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="gatewayApp.bookInStockBook.detail.title">InStockBook</Translate> [<b>{inStockBookEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="title">
              <Translate contentKey="gatewayApp.bookInStockBook.title">Title</Translate>
            </span>
          </dt>
          <dd>{inStockBookEntity.title}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="gatewayApp.bookInStockBook.description">Description</Translate>
            </span>
          </dt>
          <dd>{inStockBookEntity.description}</dd>
          <dt>
            <span id="author">
              <Translate contentKey="gatewayApp.bookInStockBook.author">Author</Translate>
            </span>
          </dt>
          <dd>{inStockBookEntity.author}</dd>
          <dt>
            <span id="publisher">
              <Translate contentKey="gatewayApp.bookInStockBook.publisher">Publisher</Translate>
            </span>
          </dt>
          <dd>{inStockBookEntity.publisher}</dd>
          <dt>
            <span id="isbn">
              <Translate contentKey="gatewayApp.bookInStockBook.isbn">Isbn</Translate>
            </span>
          </dt>
          <dd>{inStockBookEntity.isbn}</dd>
          <dt>
            <span id="publicationDate">
              <Translate contentKey="gatewayApp.bookInStockBook.publicationDate">Publication Date</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={inStockBookEntity.publicationDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="source">
              <Translate contentKey="gatewayApp.bookInStockBook.source">Source</Translate>
            </span>
          </dt>
          <dd>{inStockBookEntity.source}</dd>
        </dl>
        <Button tag={Link} to="/in-stock-book" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/in-stock-book/${inStockBookEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ inStockBook }: IRootState) => ({
  inStockBookEntity: inStockBook.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(InStockBookDetail);
