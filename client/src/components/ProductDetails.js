import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getAllProducts } from '../functions/product';
import Header from './Header';
import './ProductDetails.css'


function ProductDetails() {
  const params = useParams();

  const { cart } = useSelector(state => ({ ...state }))
  const dispatch = useDispatch()
  const initialProductStates = { _id: "", name: "", category: "", subcategory: "", selling_price: "", actual_price: "", discount: "", images: [{ url: "" }], slug: "" }
  const [product, setProduct] = useState(initialProductStates)
  const navigate = useNavigate()

  useEffect(() => {
    getAllProducts({ slug: params.slug }).then(res => setProduct(res.data[0]))
  }, [])




  const handleAddToCart = () => {

    let cartItems = JSON.parse(cart)
    if (cartItems.find(item => item._id === product._id) === undefined) {

      product['quantity'] = 1
      cartItems.push(product)

      console.log(cartItems)

      dispatch({
        type: "ADD_TO_CART",
        payload: JSON.stringify(cartItems),
      })
    }

    navigate('/cart');
  }

  return (
    <div>
      <Header />
      <div className="productdetails">
        <div className="product__imageColumn">

          {product.images.map((image, i) =>
            <div className="product__smallImage" key={i}>
              <img src={image.url} alt="" />
            </div>
          )}

        </div>
        <div>
          <div className="product__largeImage">

            <div id="img-container">
              <img id="largeImage" src={product.images[0].url} />

            </div>
            {/* <!-- <div id="zoomed-img-result-id" className="img-zoom-result"></div> --> */}
          </div>
          <div className="product__actionButtons">
            <a className="product__addToCartButton" onClick={handleAddToCart} >
              <span className="material-icons">
                shopping_cart
              </span>
              <span>ADD TO CART</span>
            </a>
            <a className="product__buyButton" onClick={handleAddToCart} >
              <span className="material-icons">
                flash_on
              </span>
              <span>BUY NOW</span>
            </a>
          </div>
        </div>

        <div className="product__textContainer">
          <p> Home <span className="material-icons">chevron_right</span> Mobiles </p>
          <h1>{product.name}</h1>
          <span className="productDetails__sellingPrice">&#8377;{product.selling_price}</span>
          <span className="productDetails__actualPrice">&#8377;{product.actual_price}</span>
          <span className="productDetails__discount">{product.discount}% off</span>

          <h6>Available offers</h6>
          <div className="product__offer">
            <img
              src="https://rukminim1.flixcart.com/www/18/18/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90" />
            Special Price Get extra 50% off (price inclusive of discount)
          </div>
          <div className="product__offer">
            <img
              src="https://rukminim1.flixcart.com/www/18/18/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90" />
            Bank Offer 5% Unlimited Cashback on Flipkart Axis Bank Credit Card
          </div>
          <div className="product__offer">
            <img
              src="https://rukminim1.flixcart.com/www/18/18/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90" />
            Bank Offer Flat ₹75 off on first Flipkart Pay Later order of ₹500 and above
          </div>
          <div className="product__offer">
            <img
              src="https://rukminim1.flixcart.com/www/18/18/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90" />
            Bank Offer 20% off on 1st txn with Amex Network Cards issued by SBI Cards and Mobikwik
          </div>
          <div className="more_infoContrainer" style={{ paddingTop: '24px' }}>
            <div className="d-flex">
              <div style={{ width: '110px' }}>Highlights</div>
              <div>
                <ul>
                  <li>Top Quality Product</li>
                  <li>Excellent Brand Support</li>
                  <li>Durable</li>
                </ul>
              </div>
            </div>
            <div className="d-flex">
              <div style={{ width: '110px' }}>Services</div>
              <div>
                <ul>
                  <li>Cash on Delivery</li>
                  <li>Net banking & Credit/ Debit/ ATM card</li>
                  <li>14 Days Return Policy</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
