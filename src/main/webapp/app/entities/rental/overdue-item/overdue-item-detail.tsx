import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './overdue-item.reducer';
import { IOverdueItem } from 'app/shared/model/rental/overdue-item.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IOverdueItemDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const OverdueItemDetail = (props: IOverdueItemDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { overdueItemEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="gatewayApp.rentalOverdueItem.detail.title">OverdueItem</Translate> [<b>{overdueItemEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="bookId">
              <Translate contentKey="gatewayApp.rentalOverdueItem.bookId">Book Id</Translate>
            </span>
          </dt>
          <dd>{overdueItemEntity.bookId}</dd>
          <dt>
            <span id="dueDate">
              <Translate contentKey="gatewayApp.rentalOverdueItem.dueDate">Due Date</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={overdueItemEntity.dueDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <Translate contentKey="gatewayApp.rentalOverdueItem.rental">Rental</Translate>
          </dt>
          <dd>{overdueItemEntity.rentalId ? overdueItemEntity.rentalId : ''}</dd>
        </dl>
        <Button tag={Link} to="/overdue-item" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/overdue-item/${overdueItemEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ overdueItem }: IRootState) => ({
  overdueItemEntity: overdueItem.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(OverdueItemDetail);
