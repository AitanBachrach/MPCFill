import Nav from "react-bootstrap/Nav";
import BSNavbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <BSNavbar
      expand="lg"
      fixed="top"
      variant="dark"
      bg="primary"
      style={{ height: 50 + "px" }}
    >
      <Container
        className="justify-content-center fixed-top align-middle"
        style={{ maxWidth: 1200 + "px" }}
      >
        <BSNavbar.Brand href="/" as={Link}>
          <Image src="/logolowres.png" alt="logo" width="40" height="40" />{" "}
          <span className="align-middle">
            <b>MPC Autofill</b>
          </span>
        </BSNavbar.Brand>
        <BSNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BSNavbar.Collapse id="basic-navbar-nav" style={{ fontWeight: "bold" }}>
          <Nav className="me-auto">
            <Nav.Link as={Link} href="/editor">
              Editor (Temp)
            </Nav.Link>
            <Nav.Link as={Link} href="/guide">
              Guide
            </Nav.Link>
            <Nav.Link as={Link} href="/new">
              What&apos;s New?
            </Nav.Link>
            <Nav.Link as={Link} href="/contributions">
              Contributions
            </Nav.Link>
            <Nav.Link
              href="https://github.com/chilli-axe/mpc-autofill/releases"
              target="_blank"
            >
              Download
            </Nav.Link>
          </Nav>
          {/* <Nav className="ms-auto"> */}
          {/* </Nav> */}
        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>
  );
}
