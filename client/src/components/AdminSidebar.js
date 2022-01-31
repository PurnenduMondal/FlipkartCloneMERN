import React, { useEffect } from 'react'
import './AdminSidebar.css'
import { auth } from '../firebase';
import { useDispatch, useSelector } from 'react-redux';

export default function AdminSidebar() {

    const { user } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch()
    //useEffect(() => console.log(user.user.first_name), [user])
    
    const logout = () => {
        auth.signOut();
        dispatch({
          type: "LOGOUT",
          payload: null
        })
    };

    return (
        
            <div style={{ width: '250px' }}>
                <div className="p-3" style={{ width: '250px' }}>
                    <a
                        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
                        <span className="fs-3">Admin Panel</span>
                    </a>
                    <hr />
                    <div className="dropdown">
                        <a href="#" className="d-flex align-items-center link-dark text-decoration-none dropdown-toggle"
                            id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src="https://avatars.githubusercontent.com/u/38310111?v=4" alt="" width="32" height="32"
                                className="rounded-circle me-2" />
                            <strong>{user ? user.first_name : ''}</strong>
                        </a>
                        <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2" >
                            <li>
                                <button className="dropdown-item" name="profileBtn" type="submit">Profile</button>
                            </li>
                            <li>
                                <hr className="dropdown-divider" />
                            </li>
                            <li>
                                <a name="signOutBtn" onClick={logout} className="dropdown-item">Log out</a>
                            </li>
                        </ul>
                    </div>
                    <hr />
                    <ul className="nav nav-pills flex-column mb-auto accordion">
                        <li>
                            <a href="" className="nav-link active">
                                Products
                            </a>
                        </li>
                        <li>
                            <a href="" className="nav-link link-dark">
                                Orders
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            
        
    );
}
