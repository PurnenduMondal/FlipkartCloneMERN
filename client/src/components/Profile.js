import React, { lazy, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../firebase';
import { createOrUpdateUser } from '../functions/auth';
import './Profile.css'
import { useNavigate } from "react-router-dom";

function Profile() {

    const [userInfo, setUserInfo] = useState({ first_name: '', last_name: '', email: '', address: '', gender: '' })
    const [isPersonalInfoDisabled, setIsPersonalInfoDisabled] = useState(true)
    const [isEmailDisabled, setIsEmailDisabled] = useState(true)
    const [isAddressDisabled, setIsAddressDisabled] = useState(true)
    const Header = lazy(() => import("./Header.js"))
    const { user } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch()
    const navigate = useNavigate()
    //const dispatch = useDispatch();
    


    useEffect(() => {
        if(!user) navigate("/")

        if (user) setUserInfo(user)
    }, [user,isPersonalInfoDisabled, isEmailDisabled, isAddressDisabled])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const idToken = await auth.currentUser.getIdToken();

            createOrUpdateUser(idToken, userInfo)
            .then((res) => {
                dispatch({
                    type: "LOGGED_IN_USER",
                    payload: res.data
                })
            })
            setIsPersonalInfoDisabled(true)
            setIsEmailDisabled(true) 
            setIsAddressDisabled(true)
            
        } catch (error) {
            console.log(error);
        }
    }

    const handleInputChange = (e) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div>
        <Header/>
            <div className="profileContainer">
                <div className="profile__sidebar">
                    <div className="profile__name">
                        <img
                            src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/profile-pic-male_4811a1.svg" />
                        <div>
                            <p style={{ fontSize: '12px', marginBottom: '0' }}>Hello,</p>
                            <p style={{ fontWeight: '500', marginBottom: '0' }}>{user ? user.first_name + " " + user.last_name
                                : ''}</p>
                        </div>
                    </div>
                    <a className="profile__sidebarItem" href="{{route('view_orders')}}">
                        <div>
                            <img src="https://res.cloudinary.com/dj1rgwak8/image/upload/v1642616022/orders.svg" />
                            MY ORDERS
                        </div>
                        <div>
                            <span className="material-icons">
                                chevron_right
                            </span>
                        </div>
                    </a>
                    <div className="profile__sidebarItem" style={{ color: '#2874f0' }}>
                        <div>
                            <img src="https://res.cloudinary.com/dj1rgwak8/image/upload/v1642616021/account.svg" />
                            ACCOUNT SETTINGS
                        </div>
                        <div>
                            <span className="material-icons">
                                chevron_right
                            </span>
                        </div>
                    </div>
                </div>

                <div className="profile__content">
                    <form onSubmit={handleSubmit} >
                        <div className="profile__contentTitle">
                            <div>Personal Information</div>
                            <span onClick={() => setIsPersonalInfoDisabled(!isPersonalInfoDisabled)}>
                                {isPersonalInfoDisabled ? "Edit" : "Cancel"}
                            </span>
                        </div>
                        <div className="profile__inputContainer">
                            <div className="profile__input" style={{ margin: '0' }}>
                                <div className="profile__nameInput">
                                    <input type="text" name="first_name" value={userInfo.first_name} onChange={handleInputChange} disabled={isPersonalInfoDisabled} required />
                                    <label className={isPersonalInfoDisabled ? 'd-none' : 'd-block'}>First Name</label>
                                </div>
                                <div className="profile__nameInput">
                                    <input type="text" name="last_name" value={userInfo.last_name} onChange={handleInputChange} disabled={isPersonalInfoDisabled} required />
                                    <label className={isPersonalInfoDisabled ? 'd-none' : 'd-block'}>Last Name</label>
                                </div>
                                <input type="submit" value="SAVE" className={isPersonalInfoDisabled ? 'd-none' : 'd-block'} />
                            </div>

                            <div className="profile_gender" >
                                <div>Your Gender</div>
                                <input type="radio" name="gender" value="male"
                                    id="male" checked={userInfo.gender == 'male'} onChange={handleInputChange} disabled={isPersonalInfoDisabled} />
                                <label htmlFor="male" style={{ paddingRight: '32px', cursor: 'pointer' }}>Male</label>
                                <input type="radio"
                                    name="gender" value="female" id="female" checked={userInfo.gender == 'female'} onChange={handleInputChange} disabled={isPersonalInfoDisabled} />
                                <label htmlFor="female" style={{ cursor: 'pointer' }}>Female</label>
                            </div>
                        </div>
                    </form>


                    <form onSubmit={handleSubmit}>

                        <div className="profile__contentTitle">
                            <div>Email Address</div>
                            <span onClick={() => setIsEmailDisabled(!isEmailDisabled)}>
                                {isEmailDisabled ? "Edit" : "Cancel"}
                            </span>
                        </div>

                        <div className="profile__input">
                            <div method="post" className="profile__nameInput">
                                <input type="email" name="email" id="" required value={userInfo.email} onChange={handleInputChange} disabled={isEmailDisabled} />
                                <label className={isEmailDisabled ? 'd-none' : 'd-block'}>Email Address</label>
                            </div>
                            {/* <div className="profile__nameInput">
                        <input type="text" name="" id="" required >
                        <label >Password</label>
                    </div> */}
                            <input type="submit" value="SAVE" className={isEmailDisabled ? 'd-none' : 'd-block'} />
                        </div>
                    </form>

                    <form onSubmit={handleSubmit}>

                        <div className="profile__contentTitle">
                            <div>Address</div>
                            <span onClick={() => setIsAddressDisabled(!isAddressDisabled)}>
                                {isAddressDisabled ? "Edit" : "Cancel"}
                            </span>
                        </div>
                        <div className="profile__inputContainer">

                            <div className="profile__input">
                                <div className="profile__nameInput" style={{ width: '530px' }}>
                                    <input type="text" name="address" id="" required value={userInfo.address} onChange={handleInputChange} disabled={isAddressDisabled} />
                                    <label className={isAddressDisabled ? 'd-none' : 'd-block'}>Address</label>
                                </div>
                                <input type="submit" value="SAVE" className={isAddressDisabled ? 'd-none' : 'd-block'} />
                            </div>
                        </div>
                    </form>


                    <div className="profile__faqs">
                        <div className="profile__contentTitle">
                            <div>FAQs</div>
                        </div>
                        <div>What happens when I update my email address (or mobile number)?</div>
                        <p>Your login email id (or mobile number) changes, likewise. You'll receive all your account related
                            communication on your updated email address (or mobile number).</p>
                        <div>When will my Flipkart account be updated with the new email address (or mobile number)?</div>
                        <p>It happens as soon as you confirm the verification code sent to your email (or mobile) and save the
                            changes.</p>
                        <div>What happens to my existing Flipkart account when I update my email address (or mobile
                            number)?</div>
                        <p>Updating your email address (or mobile number) doesn't invalidate your account. Your account remains
                            fully functional. You'll continue seeing your Order history, saved information and personal details.
                        </p>
                        <div>Does my Seller account get affected when I update my email address?</div>
                        <p>Flipkart has a 'single sign-on' policy. Any changes will reflect in your Seller account also.</p>
                    </div>
                    <img src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/myProfileFooter_4e9fe2.png" />
                </div>
            </div>
        </div>
    );
}

export default Profile;
