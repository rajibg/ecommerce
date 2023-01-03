import React, { useState } from 'react';
import userIcon from '../../images/user.svg'
import cartIcon from '../../images/cart.svg'
import { Link, matchPath, useLocation, useSearchParams } from 'react-router-dom';
import Notification from './Notification';
import { useSelector } from 'react-redux';

function Navigation() {
    const location = useLocation();
    const cartCount = useSelector(state => state.cart.total)
    const [shownav, setShowNav] = useState(false);
    const handleShowNavber = () => {
        setShowNav(!shownav)
    }
    const checkIsActiveLink = (checkpathname) => (matchPath({ path: checkpathname }, location.pathname)) ? true : false;

    return (
        <>
            <nav
                className="custom-navbar navbar navbar navbar-expand-md navbar-dark bg-dark"
                arial-label="Furni navigation bar"
            >
                <div className="container">
                    <a className="navbar-brand" href="index.html">Furni<span>.</span></a>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarsFurni"
                        aria-controls="navbarsFurni"
                        aria-expanded={shownav}
                        aria-label="Toggle navigation"
                        onClick={handleShowNavber}
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className={"collapse navbar-collapse " + (shownav ? 'show' : '')} id="navbarsFurni" >
                        <ul className="custom-navbar-nav navbar-nav ms-auto mb-2 mb-md-0">
                            <li className={`nav-item ${checkIsActiveLink('/') ? 'active' : ''}`}>
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                            <li className={`nav-item ${checkIsActiveLink('shop') ? 'active' : ''}`}>
                                <Link className="nav-link" to="/shop">Shop</Link>
                            </li>
                            {/* <li><a className="nav-link" href="about.html">About us</a></li>
                    <li><a className="nav-link" href="services.html">Services</a></li>
                    <li><a className="nav-link" href="blog.html">Blog</a></li> */}
                            <li className={`nav-item ${checkIsActiveLink('contact-us') ? 'active' : ''}`}>
                                <Link className="nav-link" to="contact-us">Contact us</Link>
                            </li>
                        </ul>

                        <ul className="custom-navbar-cta navbar-nav mb-2 mb-md-0 ms-5">
                            <li>
                                <a className="nav-link" href="#"><img src={userIcon} /></a>
                            </li>
                            <li>
                                <Link className="nav-link" to="/cart"><img src={cartIcon} />
                                    <span>{cartCount}</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav >
            <Notification />
        </>
    );
}

export default Navigation;