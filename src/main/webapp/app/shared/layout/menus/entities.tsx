import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown
    icon="th-list"
    name={translate('global.menu.entities.main')}
    id="entity-menu"
    style={{ maxHeight: '80vh', overflow: 'auto' }}
  >
    <MenuItem icon="asterisk" to="/book">
      <Translate contentKey="global.menu.entities.bookBook" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/rental">
      <Translate contentKey="global.menu.entities.rentalRental" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/rented-item">
      <Translate contentKey="global.menu.entities.rentalRentedItem" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/returned-item">
      <Translate contentKey="global.menu.entities.rentalReturnedItem" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/overdue-item">
      <Translate contentKey="global.menu.entities.rentalOverdueItem" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/in-stock-book">
      <Translate contentKey="global.menu.entities.bookInStockBook" />
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
