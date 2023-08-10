import React, { useContext } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import './Header.css';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const logOut = () => {
        setLoggedInUser({})
        localStorage.clear()
    }
    return (
        <div className="header container mb-5">
            <Navbar collapseOnSelect expand="lg" bg="" variant="light">
                <Navbar.Brand href="/home" className="brand">Trip Advisor</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav ">
                    <Nav className="mr-auto nav-items" variant="secondary">
                        {loggedInUser.isSignedIn ? 
                            <>
                                <Nav.Link ><Link className="nav-link" to="/home">Home</Link></Nav.Link>
                                <Nav.Link><Link className="nav-link" to="/home">Destination</Link></Nav.Link>
                                <Nav.Link><Link className="nav-link" to="/order">Order</Link></Nav.Link>
                                <Nav.Link ><Link className="nav-link" to="/">Blog</Link></Nav.Link>
                                <Nav.Link ><Link className="nav-link" to="/">Contact</Link></Nav.Link>
                                <Nav.Link onClick={() => logOut()} className=""><Link className="nav-link login-button" to="/login">log out</Link></Nav.Link>
                            </>
                            : 
                                <>
                                    <Nav.Link ><Link className="nav-link" to="/home">Home</Link></Nav.Link>
                                    <Nav.Link><Link className="nav-link" to="/home">Destination</Link></Nav.Link>
                                    <Nav.Link ><Link className="nav-link" to="/">Blog</Link></Nav.Link>
                                    <Nav.Link ><Link className="nav-link" to="/">Contact</Link></Nav.Link>
                                    <Nav.Link className=""><Link className="nav-link login-button" to="/login">log In</Link></Nav.Link>
                                </>
                        }
    
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};

export default Header;