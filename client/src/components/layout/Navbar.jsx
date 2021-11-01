import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import Logout from '@mui/icons-material/Logout';
// import User from '@mui/icons-material/VerifiedUser';
import User1 from '@mui/icons-material/PersonOutlineRounded';



const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
    const authLinks = (
        <ul>
            <li>
                <NavLink  style={{ display: 'flex' }}  to="/dashboard">
                    <User1 style={{ marginRight: 10 }} /> <div>DashBoard</div>
                </NavLink>
            </li>

            <li>
                <NavLink style={{ display: 'flex' }} onClick={logout} to="/">
                    {/* <i style={{top:10}} className="fas fa-sign-out-alt"></i>{' '} */}
                    <Logout style={{ marginRight: 10 }} /> <div>Logout</div>
                    {/* <div><Logout style={{marginTop:10,fontSize:20,marginRight:10}} />{' '}Logout</div> */}
                    {/* <span className="hide-sm"></span> */}
                </NavLink>
            </li>
        </ul>
    )

    const guestLinks = (
        <ul>
            <li><NavLink to="#!">Developers</NavLink></li>
            <li><NavLink to="/register">Register</NavLink></li>
            <li><NavLink to="/login">Login</NavLink></li>
        </ul>
    )
    return (
        <nav className="navbar bg-dark">
            <h1>
                <NavLink to="/"><i className="fas fa-code"></i> DevConnector</NavLink>
            </h1>
            {!loading && (<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>)}
        </nav>
    )
}
Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
}



const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logout })(Navbar)
