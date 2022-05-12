import React, { useEffect } from 'react';
/** React Bootstrap */
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
/** React Router */
import { useNavigate } from 'react-router-dom';
/** Apollo client */
import { useQuery } from '@apollo/client';
/** GraphQL */
import { GET_AUTHORS } from '../../GraphQL/Users/queries';

const NaviBar = ({ isHomePage, isUserDashboard }) => {

    const navigate = useNavigate();
    const { loading, error, data, refetch } = useQuery(GET_AUTHORS);

    // useEffect(() => {
    //     if (loading === false && data !== undefined) {
    //         const img = data.blogs_users.filter(item => item.id === JSON.parse(localStorage.getItem('user')).id);
    //         console.log(img);
    //     }
    // }, []);

    const handlePostButton = () => {
        navigate('/dashboard');
    }

    const handleAuthorButton = () => {
        navigate('/dashboard/authors');
    }

    const handleLogoutButton = () => {
        localStorage.removeItem('user');
        navigate('/login');
    }

    const handleHomeButton = () => {
        navigate('/');
    }

    const handleKategoriAgama = () => {
        navigate('/agama');
    }

    const handleKategoriBudaya = () => {
        navigate('/budaya');
    }

    const handleKategoriPolitik = () => {
        navigate('/politik');
    }

    const handleKategoriSosial = () => {
        navigate('/sosial');
    }

    return (
        <div>
            {
                isHomePage ? (
                    <Navbar className='shadow px-3' bg="light" variant="light">
                        <Navbar.Brand className='logo_text' onClick={handleHomeButton}>Mari<span className='logo'>Baca.co</span></Navbar.Brand>
                        <Navbar.Toggle />
                        <Navbar.Collapse className="justify-content-end">
                            <Nav>
                                <Nav.Link onClick={handleKategoriSosial}>Sosial</Nav.Link>
                                <Nav.Link onClick={handleKategoriPolitik} >Politik</Nav.Link>
                                <Nav.Link onClick={handleKategoriAgama} >Agama</Nav.Link>
                                <Nav.Link onClick={handleKategoriBudaya} >Budaya</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                ) : (
                    <Navbar className='shadow px-3' bg="light" variant="light">
                        <Navbar.Brand className='logo_text' href="#home">Mari<span className='logo'>Baca.co</span></Navbar.Brand>
                        <Nav className="me-auto">
                            <Nav.Link onClick={handlePostButton}>Post</Nav.Link>
                            {
                                isUserDashboard ? ("")
                                    : (
                                        <Nav.Link onClick={handleAuthorButton} >Penulis</Nav.Link>
                                    )
                            }
                        </Nav>
                        <Nav className='d-flex-justify-content-end align-items-center'>
                            {
                                localStorage.getItem('user') !== null ? (
                                    <>
                                        <Nav.Link>
                                            <div className='px-0 py-1 bg_primary rounded-pill row'>
                                                <div className='col'>
                                                    <img className='rounded-circle' src={JSON.parse(localStorage.getItem('user')).profile_pic} style={{ height: '20px', width: '20px' }} alt="oke" />
                                                </div>
                                                <p className='col'>{JSON.parse(localStorage.getItem('user')).nama}</p>
                                            </div>
                                        </Nav.Link>
                                        <Nav.Link>
                                            <button className='btn btn-sm btn-outline-danger rounded-pill' onClick={handleLogoutButton} >Logout</button>
                                        </Nav.Link>
                                    </>
                                ) : ("")
                            }
                        </Nav>
                    </Navbar>
                )
            }
        </div>
    );
}

export default NaviBar;
