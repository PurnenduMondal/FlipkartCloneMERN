import React from 'react';
import { Link } from 'react-router-dom';
import "./Product.css"

function Product({ product }) {
    return (
        <Link to={`product/${product.slug}`} style={{ textDecoration: 'none' }}>
            <div className="productSlider__item">
                <div className="productSlider__itemImage">
                    <img src={product.images[0].url} />
                </div>

                <div className="productSlider__itemText1">
                    {product.name}
                </div>
                <div className="productSlider__itemText2">

                    <span className="product__sellingPrice">&#8377;{product.selling_price}</span>
                    <span className="product__actualPrice">&#8377;{product.actual_price}</span>
                    <span className="product__discount">{product.discount}% off</span>
                </div>
            </div>
        </Link>

    );
}

export default Product;

