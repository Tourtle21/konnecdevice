import React, {useState, useEffect} from 'react';
import Logo from '../../assets/logo.jpg';
import Profile from '../../assets/profile.JPG';
import Login from './Login';

import {connect} from 'react-redux';
import {getUser, logoutUser} from '../../ducks/reducer';
import {Link} from 'react-router-dom';
import axios from 'axios';

const Nav = (props) => {
    const [login, setLogin] = useState('');
    const [error, setError] = useState('');
    const [toggleMenu, setToggleMenu] = useState('');
    const [loginButtons, setLoginButtons] = useState((<div className='sign-in'></div>))

    const {getUser, logoutUser, username, display_name} = props;
    useEffect(() => {
        axios.get('/auth/quickLogin')
        .then(res => {
            getUser(res.data);
        }).catch(err => {
            setLoginButtons(<div className='sign-in'><button onClick={() => setLogin('login')}>Login</button><button onClick={() => setLogin('signup')}>Sign Up</button></div>);
        })
    }, [])

    const handleLogin = (username, password) => {
        setError('');
        axios.post('/auth/login', {username, password})
        .then(res => {
            getUser(res.data);
            setLogin('');
        }).catch(err => {
            setError(err.response.data);
        })
    }

    const handleSignup = (username, password, displayName, description) => {
        axios.post('/auth/register', {username, password, displayName, description})
        .then(res => {
            getUser(res.data);
            setLogin('');
        }).catch(err => {
            setError(err.response.data);
        })
    }

    const signOut = () => {
        axios.get('/auth/logout')
        .then(res => {
            logoutUser();
            setToggleMenu('');
        })
    }

    const profileMenu = () => {
        setToggleMenu(
            toggleMenu === '' ? 'open' : ''
        );
    }

    const handleExit = (e) => {
        if (e.target.className === 'login') setLogin('');
    }
    const profileImg = (<img onClick={profileMenu} className='profile' alt='' src={Profile} />);
    return (
        <div className='head-shadow'>
        <header className='header'>
            <div className='container'>
            <Link to='/'><img alt='' src={Logo} /></Link>
                <div className='nav'>
                    <nav>
                        <ul>
                            <Link to='/ideas'><li>Ideas</li></Link>
                            <Link to='/projects'><li>Projects</li></Link>
                            <Link to='/'><li>Connect</li></Link>
                        </ul>
                    </nav>
                    {username ? profileImg : loginButtons}
                <div className={`profile-menu ${toggleMenu}`}>
                    <ul>
                        <li>{display_name}</li>
                        <li onClick={signOut}>Sign out</li>
                    </ul>
                </div>
                </div>
            </div>
        </header>
        {login ? <Login error={error} signupFn={handleSignup} loginFn={handleLogin} exitFn={handleExit} loginType={login} /> : null}
        </div>
    )
};

const mapStateToProps = reduxState => reduxState;
export default connect(mapStateToProps, {getUser, logoutUser})(Nav);