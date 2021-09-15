import React, { useContext } from 'react';
import SessionContext from './session/SessionContext';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

export default function Header() {

    const {
        session: { user: { token, avatar, first_name } },
        actions: { logout }
    } = useContext(SessionContext);

    return (
        <header style={{position:"fixed",width:"100%",top:0,zIndex:20,height:50}}>

          <center></center> 

            {token && (
                <div className="nav">
                    <Link style={{textDecoration:"none"}} to="/profile">
                      My Profile
                    </Link>
                    <button onClick={logout}>logout</button>
                </div>
            )}

        </header>
    )
}