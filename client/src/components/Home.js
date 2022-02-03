import React, { lazy, useEffect, useState } from "react"
import { getAllProducts } from "../functions/product"
import "./Home.css"
const Header = lazy(() => import("./Header.js"))
const Product = lazy(() => import("./Product.js"))

function Home() {

    const [products, setProducts] = useState([])
    const [sliderImageIndex, setSliderImageIndex] = useState(0)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        getAllProducts({}).then(res => {
            setProducts(res.data)
            setIsLoading(false)
        })
    }, [])

    let sliderImages = [
        "https://rukminim1.flixcart.com/flap/1680/280/image/b47ca8ef99c54b4a.jpeg?q=50",
        "https://rukminim1.flixcart.com/flap/1680/280/image/72ade6c1b48d2539.jpg?q=50",
        "https://rukminim1.flixcart.com/flap/1680/280/image/5e130368e516d7c1.jpeg?q=50"
    ]

    return (
        <div className="home">
            <Header />
            <div className="category">
                <div className="category__item">
                    <img
                        src="https://rukminim1.flixcart.com/flap/64/64/image/f15c02bfeb02d15d.png?q=100"
                        className="category__itemImage"
                    />
                    Top Offers
                </div>
                <div className="category__item">
                    <img
                        src="https://rukminim1.flixcart.com/flap/64/64/image/29327f40e9c4d26b.png?q=100"
                        className="category__itemImage"
                    />
                    Grocery
                </div>
                <div className="category__item">
                    <img
                        src="https://rukminim1.flixcart.com/flap/64/64/image/22fddf3c7da4c4f4.png?q=100"
                        className="category__itemImage"
                    />
                    Mobiles
                </div>
                <div className="category__item">
                    <img
                        src="https://rukminim1.flixcart.com/flap/64/64/image/82b3ca5fb2301045.png?q=100"
                        className="category__itemImage"
                    />
                    Fashion
                </div>
                <div className="category__item">
                    <img
                        src="https://rukminim1.flixcart.com/flap/64/64/image/69c6589653afdb9a.png?q=100"
                        className="category__itemImage"
                    />
                    Electronics
                </div>
                <div className="category__item">
                    <img
                        src="https://rukminim1.flixcart.com/flap/64/64/image/ab7e2b022a4587dd.jpg?q=100"
                        className="category__itemImage"
                    />
                    Home
                </div>
                <div className="category__item">
                    <img
                        src="https://rukminim1.flixcart.com/flap/64/64/image/0ff199d1bd27eb98.png?q=100"
                        className="category__itemImage"
                    />
                    Appliances
                </div>
                <div className="category__item">
                    <img
                        src="https://rukminim1.flixcart.com/flap/64/64/image/71050627a56b4693.png?q=100"
                        className="category__itemImage"
                    />
                    Travel
                </div>
                <div className="category__item">
                    <img
                        src="https://rukminim1.flixcart.com/flap/64/64/image/dff3f7adcf3a90c6.png?q=100"
                        className="category__itemImage"
                    />
                    Beauty, Toys & More
                </div>
            </div>
            <div className="mainContents">
                <div className="slideshow">
                    <img className="slideshow__image slideshow__imageFade"
                        src={sliderImages[sliderImageIndex]} />

                    <a className="slideshow__prevButton" onClick={() => setSliderImageIndex(sliderImageIndex == 0 ? sliderImages.length - 1 : sliderImageIndex - 1)}>
                        <span className="material-icons" >
                            chevron_left
                        </span>
                    </a>
                    <a className="slideshow__nextButton" onClick={() => setSliderImageIndex(sliderImageIndex == sliderImages.length - 1 ? 0 : sliderImageIndex + 1)}>
                        <span className="material-icons">
                            chevron_right
                        </span>
                    </a>
                </div>

                <div className="subcategory">
                    <h4>Deals of the Day</h4>
                    <div className="productSlider">
                        {isLoading ?
                            <div>
                            <div className="spinner-container">
                                <div className="spinner-border text-info" role="status">
                                    <span className="sr-only"></span>
                                </div>
                            </div>
                            Please wait
                            </div> :
                            products.map((product, i) => (<Product product={product} key={i} />))
                        }
                    </div>
                    <a className="subcategory__prevButton" >
                        <span className="material-icons">
                            chevron_left
                        </span>
                    </a>
                    <a className="subcategory__nextButton" >
                        <span className="material-icons">
                            chevron_right
                        </span>
                    </a>
                    {/* <script>
                function goleft() {
                    var scrollLeft = $(".productSlider").scrollLeft();
                    $(".productSlider").animate({
                        scrollLeft: scrollLeft - 600
                    }, 400);
                }

                function goright() {
                    var scrollLeft = $(".productSlider").scrollLeft();
                    $(".productSlider").animate({
                        scrollLeft: scrollLeft + 600
                    }, 400);
                }
            </script> */}
                </div>
            </div>
        </div>

    );
}

export default Home;
