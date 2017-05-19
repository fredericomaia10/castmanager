import React from 'react';
import { browserHistory } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';

const handleLogout = () => Meteor.logout(() => browserHistory.push('/'));

const userName = () => {
  const user = Meteor.user();
  return user && user.profile ? user.profile.name : '';
};

const AuthenticatedNavigation = () => (
  <div>
    <Nav>
      <LinkContainer to="/polls">
        <NavItem eventKey={ 3 } href="/polls">Votações</NavItem>
      </LinkContainer>
      <LinkContainer to="/proposals">
        <NavItem eventKey={ 2 } href="/proposals">Propostas</NavItem>
      </LinkContainer>
    </Nav>
    <Nav pullRight>
      <NavDropdown eventKey={ 4 } title={ userName() } id="basic-nav-dropdown">
        <MenuItem eventKey={ 4.1 } onClick={ handleLogout }>Sair</MenuItem>
      </NavDropdown>
    </Nav>
  </div>
);

export default AuthenticatedNavigation;
