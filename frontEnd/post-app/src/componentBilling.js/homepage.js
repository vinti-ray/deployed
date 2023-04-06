import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

function Sidebar() {
  return (
    <Navbar bg="light" expand="lg" className="flex-column">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="flex-column">
          <Nav.Link href="#">Link 1</Nav.Link>
          <Nav.Link href="#">Link 2</Nav.Link>
          <Nav.Link href="#">Link 3</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Sidebar;
