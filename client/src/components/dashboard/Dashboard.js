import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCurrentProfile } from '../../actions/profile'
import { useEffect } from 'react'
import Spinner from '../layout/Spinner';

const Dashboard = ({ getCurrentProfile, auth, profile: { profile, loading } }) => {

    useEffect(() => {
        getCurrentProfile()
    }, [])


    return (
       <div>{ loading && profile === null ? <Spinner /> : <Fragment>test</Fragment>}</div>
    )
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profiles: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard)
