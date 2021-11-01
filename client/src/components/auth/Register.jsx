import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { NavLink ,Redirect} from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';

import PropTypes from 'prop-types'

// import axios from 'axios';

const Register = ({ setAlert, register,isAuthenticated }) => {

    const [formData, setFormData] = useState({
        name: '',
        email: "",
        password: "",
        password2: ''
    });

    const { name, email, password, password2 } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = async (e) => {
        e.preventDefault();
        if (password !== password2) {
            setAlert('Passwords did not match, please check both passwords are the same', 'danger');
        } else {
            register({ name, email, password })
            // const newUser = {
            //     name,
            //     email,
            //     password
            // }
            // try {
            //    const config = {
            //         headers:{
            //             'Content-Type':"application/json"
            //         }
            //     }
            //     const body = JSON.stringify(newUser);

            //     const res = await axios.post('/api/users',body,config);

            //     console.log(res.data);
            // } catch (err) {
            //     console.error(err.response.data);
            // }
        }
    }

    
    if(isAuthenticated){
        return <Redirect exact to='/dashboard' />
    }

    return (
        <Fragment>
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
            <form  className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Name"
                        name="name"
                        onChange={e => onChange(e)}
                        value={name}
                        // required 
                        />
                </div>
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        onChange={e => onChange(e)}
                        value={email}
                        // required
                    />
                    <small className="form-text"
                    >This site uses Gravatar so if you want a profile image, use a
                        Gravatar email</small
                    >
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        // minLength="6"
                        onChange={e => onChange(e)}
                        value={password}
                        // required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="password2"
                        // minLength="6"
                        onChange={e => onChange(e)}
                        value={password2}
                        // required
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Register" />
            </form>
            <p className="my-1">
                Already have an account? <NavLink to="/login">Sign In</NavLink>
            </p>
        </Fragment>
    )
}
Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated:PropTypes.bool,
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})


export default connect(mapStateToProps, { setAlert, register })(Register);
