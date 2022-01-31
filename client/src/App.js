import React, { useEffect, lazy, Suspense } from "react"
import { Routes, Route } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { auth } from "./firebase"
import { currentUser } from "./functions/auth"


const Home = lazy(() => import("./components/Home.js"))
const Profile = lazy(() => import("./components/Profile.js"))
const AdminDashBoard = lazy(() => import("./components/AdminDashBoard.js"))
const ProductDetails = lazy(() => import("./components/ProductDetails.js"))
const EditProduct = lazy(() => import("./components/EditProduct.js"))
const Orders = lazy(() => import("./components/Orders.js"))
const Cart = lazy(() => import("./components/Cart.js"))


const renderLoader = () => (
  <div className="spinner-container">
    <div className="spinner-border text-info" role="status">
      <span className="sr-only"></span>
    </div>
  </div>
);

function App() {
  
  const dispatch = useDispatch()
  // to check firebase auth state
  useEffect( () => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken();
        currentUser(token)
        .then((res) => {
          dispatch({
              type: "LOGGED_IN_USER",
              payload: res.data
          })
        }) 
      }

    });
    // cleanup
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <Suspense fallback={renderLoader()}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/admin/dashboard" element={<AdminDashBoard />} />
        <Route path="/admin/editproduct/:slug" element={<EditProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </Suspense>
  );
}

export default App;
