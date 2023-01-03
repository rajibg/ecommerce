import React from 'react';
import Navigation from './Navigation';
import Footer from './Footer';

function index(props) {
    return (
        <div className="App">
            <Navigation />
            {props.children}
            <Footer />
        </div>
    );
}

export default index;