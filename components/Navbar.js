import Link from "next/link";
import { Navbar, Container, Nav } from "react-bootstrap";
import {FcMenu, FcHome, FcAbout} from 'react-icons/fc'
import {BsSearch} from 'react-icons/bs'
import {FiKey} from 'react-icons/fi'

const TopBar = ()=>{
return(
    <>
 <Navbar bg="light" expand="md" collapseOnSelect>
      <Container>
        <Navbar.Brand href="#home">Estate Plaza</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/"><FcHome/> Home</Nav.Link>
            <Nav.Link href="/search"><BsSearch/> Search</Nav.Link>
            <Nav.Link href="/search?purpose=for-sale"><FcAbout/> Buy a property</Nav.Link>
            <Nav.Link href="/search?purpose=for-rent"><FiKey/> Rent a Property</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
)
}

export default TopBar