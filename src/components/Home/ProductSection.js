import React from 'react';
import { Link } from 'react-router-dom';
import crossIcon from '../../images/cross.svg'
import product1Img from '../../images/product-1.png'
import product2Img from '../../images/product-2.png'
import product3Img from '../../images/product-3.png'

function ProductSection() {
    return (
        <div className="product-section">
            <div className="container">
                <div className="row">
                    <div className="col-md-12 col-lg-3 mb-5 mb-lg-0">
                        <h2 className="mb-4 section-title">Crafted with excellent material.</h2>
                        <p className="mb-4">
                            Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet
                            velit. Aliquam vulputate velit imperdiet dolor tempor tristique.
                        </p>
                        <p><Link to="/shop" className="btn">Explore</Link></p>
                    </div>

                    <div className="col-12 col-md-4 col-lg-3 mb-5 mb-md-0">
                        <a className="product-item" href="cart.html">
                            <img
                                src={product1Img}
                                className="img-fluid product-thumbnail"
                            />
                            <h3 className="product-title">Nordic Chair</h3>
                            <strong className="product-price">$50.00</strong>

                            <span className="icon-cross">
                                <img src={crossIcon} className="img-fluid" />
                            </span>
                        </a>
                    </div>

                    <div className="col-12 col-md-4 col-lg-3 mb-5 mb-md-0">
                        <a className="product-item" href="cart.html">
                            <img
                                src={product2Img}
                                className="img-fluid product-thumbnail"
                            />
                            <h3 className="product-title">Kruzo Aero Chair</h3>
                            <strong className="product-price">$78.00</strong>

                            <span className="icon-cross">
                                <img src={crossIcon} className="img-fluid" />
                            </span>
                        </a>
                    </div>

                    <div className="col-12 col-md-4 col-lg-3 mb-5 mb-md-0">
                        <a className="product-item" href="cart.html">
                            <img
                                src={product3Img}
                                className="img-fluid product-thumbnail"
                            />
                            <h3 className="product-title">Ergonomic Chair</h3>
                            <strong className="product-price">$43.00</strong>

                            <span className="icon-cross">
                                <img src={crossIcon} className="img-fluid" />
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductSection;