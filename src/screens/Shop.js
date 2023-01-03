import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductItem from '../components/Products/ProductItem';
import { fetchProducts } from '../store/actions/productAction';

function Shop() {

    const products = useSelector(state => state.product.products);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true)
        dispatch(fetchProducts())
    }, [])

    useEffect(() => {
        if (products.length > 0 || !products) {
            setLoading(false)
        }

    }, [products])


    if (loading) {
        return (
            <div className="untree_co-section product-section before-footer-section">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <p>Loading ....</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (

        <div className="untree_co-section product-section before-footer-section">
            <div className="container">
                <div className="row">
                    {
                        products.length > 0 && products.map(product => {
                            return (<ProductItem product={product} key={product.id} />)
                        })
                    }

                    {
                        products.length === 0 && <div className="col-12">
                            <p >No products found !</p>
                        </div>
                    }

                </div>
            </div>
        </div>
    );
}

export default Shop;