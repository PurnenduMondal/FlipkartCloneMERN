import React, { useEffect, useState } from 'react'
import './Header.css'
import Modal from "react-bootstrap/Modal"
import { auth } from "./../firebase"
import { useSelector, useDispatch } from "react-redux"
import { createOrUpdateUser, currentUser } from "../functions/auth"
import { Link, useNavigate } from 'react-router-dom'


function Header() {

    //const [user, setUser] = useState(false)
    const [formType, setFormType] = useState({ userType: "", userAction: "" })
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [address, setAddress] = useState('')
    const { user } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false)
    

    useEffect(() => {
        if (user && user.role == "Admin") navigate("/admin/dashboard")
    }, [user])




    const signIn = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        await auth.signInWithEmailAndPassword(email, password)
        const idToken = await auth.currentUser.getIdToken();
        currentUser(idToken)
            .then((res) => {
                dispatch({
                    type: "LOGGED_IN_USER",
                    payload: res.data,
                })
                setIsLoading(false)
                if (res.data.role == "Admin") navigate("/admin/dashboard")
                setFormType({ userType: "", userAction: "" })
            })
    }

    const register = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        let newUser = {
            email: email,
            first_name: firstName,
            last_name: lastName,
            address: address,
            gender: "male",
            role: formType.userType
        }

        try {

            await auth.createUserWithEmailAndPassword(email, password)
            const idToken = await auth.currentUser.getIdToken();

            createOrUpdateUser(idToken, newUser)
                .then((res) => {
                    dispatch({
                        type: "LOGGED_IN_USER",
                        payload: res.data,
                    })
                })
            setIsLoading(false)
        } catch (error) {
            console.log(error);
        }
    }

    const logout = () => {
        auth.signOut();
        dispatch({
            type: "LOGOUT",
            payload:  null 
        })
    };


    return (
        <div className="header">
            {/* Login Modal */}
            <Modal show={formType.userType !== "" && formType.userAction !== ""} onHide={() => setFormType({ userType: "", userAction: "" })}>
                <div className="modal-content">
                    {/* action attribute added using Header.js  */}
                    <div className="loginForm">
                        {formType.userAction == "Login" ?
                            <div className="loginForm__body">
                                <div className="loginForm__bodyImage">
                                    <img src="https://res.cloudinary.com/dj1rgwak8/image/upload/v1642616021/loginimg.jpg" alt="" />
                                </div>
                                <form className="loginForm__content">
                                    <div className="loginForm__input">
                                        <input value={email}
                                            onChange={(e) => setEmail(e.target.value)} type="text" required />
                                        <label>Enter Email Address</label>
                                    </div>
                                    <div className="loginForm__input">
                                        <input value={password}
                                            onChange={(e) => setPassword(e.target.value)} type="password" required />
                                        <label>Enter Password</label>
                                    </div>
                                    <button className="loginForm_submit" onClick={signIn} disabled={isLoading}>
                                        {isLoading ?
                                            <div className="spinner-container">
                                                <div className="spinner-border text-light" role="status">
                                                    <span className="sr-only"></span>
                                                </div>
                                            </div> :
                                            "Login"
                                        }
                                    </button>
                                    <a onClick={() => setFormType({ userType: formType.userType, userAction: "Register" })} className="login_link" style={{ textDecoration: 'none', fontWeight: '500', cursor: 'pointer' }}>
                                        Create an account
                                    </a>
                                </form>
                                <div className="login__text1">{formType.userType} Login</div>
                                <div className="login__text2">Get access to your Orders, Wishlist and Recommendations</div>
                            </div>
                            :
                            <div className="loginForm__body">
                                <div className="loginForm__bodyImage">
                                    <img src="https://res.cloudinary.com/dj1rgwak8/image/upload/v1642616021/loginimg.jpg" alt="" />
                                </div>
                                <form className="loginForm__content">
                                    <div className="loginForm__input">
                                        <input value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)} type="text" required />
                                        <label>Enter Your First Name</label>
                                    </div>
                                    <div className="loginForm__input">
                                        <input
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            type="text" required />
                                        <label>Enter Your Last Name</label>
                                    </div>
                                    <div className="loginForm__input">
                                        <input value={address}
                                            onChange={(e) => setAddress(e.target.value)} type="text" required />
                                        <label>Enter Your Address</label>
                                    </div>
                                    <div className="loginForm__input">
                                        <input value={email}
                                            onChange={(e) => setEmail(e.target.value)} type="text" required />
                                        <label>Enter Email Address</label>
                                    </div>
                                    <div className="loginForm__input">
                                        <input
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)} type="password" required />
                                        <label>Enter Password</label>
                                    </div>
                                    <button className="loginForm_submit" onClick={register} disabled={isLoading}>
                                        {isLoading ?
                                            <div className="spinner-container">
                                                <div className="spinner-border text-light" role="status">
                                                    <span className="sr-only"></span>
                                                </div>
                                            </div> :
                                            "Register"
                                        }
                                    </button>

                                    <a className="login_link" style={{ textDecoration: 'none', fontWeight: '500', cursor: 'pointer' }}
                                        onClick={() => setFormType({ userType: formType.userType, userAction: "Login" })}
                                    >
                                        Login to your account
                                    </a>
                                </form>
                                <div className="login__text1">{formType.userType} Sign Up</div>
                                <div className="login__text2">Sign up with your email address to get started</div>
                            </div>
                        }
                        <button type="button"
                            onClick={() => setFormType({ userType: "", userAction: "" })} className="loginForm_close">
                            <span className="material-icons">close</span>
                        </button>
                    </div>
                </div>
            </Modal>

            <a className="header__logo" href="/">
                <img className="header__logoImage"
                    src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/flipkart-plus_8d85f4.png" alt="" />
                <div className="header__logoText">
                    Explore <span>Plus<img
                        src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/plus_aef861.png" alt="" /></span>
                </div>
            </a>

            <form className="header__search">
                <input className="header__searchInput" type="text" placeholder="Search for products, brands and more" />
                <input className="header__searchIcon material-icons" type="submit" value="search" />
            </form>

            <div className="header__userLogin">
                {/* a Button to trigger the login modal */}
                <button
                    className="header__userLoginBtn"
                    onClick={() => !user ? setFormType({ userType: "User", userAction: "Login" }) : setFormType({ userType: "", userAction: "" })}
                    style={user ? { color: 'white', backgroundColor: '#2874F0', border: 'none', display: 'flex', alignItems: 'center', padding: '3px 20px' } : {}}
                >
                    {user ? (<div>{user.first_name} <span style={{ fontSize: '16px', padding: '3px 2px' }} className='material-icons'>keyboard_arrow_down</span></div>) : 'Login'
                    }
                </button>
                <div className="header__dropdown" style={{ left: '-35px' }}>
                    <div style={{ height: '17px', display: 'flex', justifyContent: 'center', color: 'white' }}>
                        <span className="material-icons" style={{ fontSize: '30px' }}>eject</span>
                    </div>
                    <div style={{ boxShadow: '0 0px 10px 0 rgb(0 0 0 / 20%)' }}>

                        {!user ?
                            <div className="header__dropdownItem">
                                New customer?<a className='login_link' onClick={() => setFormType({ userType: "User", userAction: "Register" })} >Sign Up</a>
                            </div> : ''
                        }
                        <Link className="header__dropdownItem" to="/profile">
                            <span className="material-icons">account_circle</span> My Profile
                        </Link>
                        <div className="header__dropdownItem">
                            <span className="material-icons">drive_folder_upload</span> Orders
                        </div>
                        <div className="header__dropdownItem">
                            <span className="material-icons">favorite</span> Wishlists
                        </div>

                        {user ?
                            <form>
                                <div className="header__dropdownItem adminLoginBtn" onClick={logout}>
                                    <span className="material-icons">power_settings_new</span> Log out
                                </div>
                            </form>
                            :
                            <div className="header__dropdownItem adminLoginBtn" onClick={() => setFormType({ userType: "Admin", userAction: "Login" })}>
                                <span className="material-icons">admin_panel_settings</span> Admin Login
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div className="header__moreOptions">
                More<span className="material-icons">keyboard_arrow_down</span>

                <div className="header__dropdown">
                    <div style={{ height: '17px', display: 'flex', justifyContent: 'center', color: 'white' }}>
                        <span style={{ fontSize: '30px' }} className="material-icons">eject</span>
                    </div>
                    <div style={{ boxShadow: '0 0px 10px 0 rgb(0 0 0 / 20%)' }}>
                        <div className="header__dropdownItem">
                            <span className="material-icons">notifications</span> Notification Preferences
                        </div>
                        <div className="header__dropdownItem">
                            <span className="material-icons">work</span> Sell On Flipkart
                        </div>
                        <div className="header__dropdownItem">
                            <span className="material-icons">live_help</span> 24x7 Customer Support
                        </div>
                        <div className="header__dropdownItem">
                            <span className="material-icons">trending_up</span> Advertise
                        </div>
                        <div className="header__dropdownItem">
                            <span className="material-icons">file_download</span> Download App
                        </div>
                    </div>
                </div>
            </div>
            <div className="header__cart">
                <a href="{{ route('display_cart') }}">
                    <span className="header__cartIcon material-icons">shopping_cart</span>Cart
                </a>
            </div>
        </div>
    );
}

export default Header;
