import { Nav, Navbar, Container, NavDropdown } from 'react-bootstrap';
const NavigationBar = () => {
    return (
        <>
       <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
  <Container>
  <Navbar.Brand href="/">GIYO TRAVELS</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="me-auto">
      <Nav.Link href="#features">Features</Nav.Link>
      <Nav.Link href="#pricing">Pricing</Nav.Link>
      <NavDropdown title="Manage Booking" id="collasible-nav-dropdown">
        <NavDropdown.Item href="/manageBooking">Bus Ticket</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Cancel</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Change Travel Date</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.4">Show My Ticket</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.5">Email/SMS</NavDropdown.Item>
      </NavDropdown>
    </Nav>
    <Nav>
      <Nav.Link href="/login">Log In</Nav.Link>
      <Nav.Link href= '/signup'>
        Register
      </Nav.Link>
    </Nav>
  </Navbar.Collapse>
  </Container>
</Navbar>
        </>
    );
  }

  export default NavigationBar;