import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import crossIcon from '../../images/cross.svg'
import { addProductInCart } from '../../services/fakerService';
import { errorMsg, successMsg } from '../../services/notificationService';
import { addToCart } from '../../store/actions/productAction';
import actionType from '../../store/actionType';

function ProductItem({ product }) {
    const cartData = useSelector((state) => state.cart.cart)
    const dispatch = useDispatch();

    const handleAddtoCart = async (e) => {
        e.preventDefault()
        dispatch({
            type: actionType.ADD_TO_CART_LOADING,
        })
        dispatch(addToCart({
            id: product.id,
            title: product.title,
            image: product.image,
            price: product.price,
            quantity: 1
        }))
        successMsg("Cart added successfully.");
        localStorage.setItem('cartData', JSON.stringify(cartData))
        // const response = await addProductInCart({
        //     productId: product.id, quantity: 1
        // });
        // if (response) {
        //     successMsg("Cart added successfully.");
        // } else {
        //     errorMsg("Cart added failed!");
        // }

    }


    return (
        <div className="col-12 col-md-4 col-lg-3 mb-5">
            <a className="product-item" href="#" onClick={handleAddtoCart}>
                <img
                    src={product.image}
                    className="img-fluid product-thumbnail"
                />
                <h3 className="product-title">{product.title}</h3>
                <strong className="product-price">${product.price}</strong>

                <span className="icon-cross">
                    <img src={crossIcon} className="img-fluid" />
                </span>
            </a>
        </div>
    );
}

export default ProductItem;