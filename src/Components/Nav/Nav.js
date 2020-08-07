import React, {useState, useEffect} from 'react';
import Logo from '../../assets/logo.jpg';
import Login from './Login';

import {connect} from 'react-redux';
import {getUser, logoutUser} from '../../ducks/reducer';
import {changeBool} from '../../ducks/routeReducer';
import {Link} from 'react-router-dom';
import axios from 'axios';

const Nav = (props) => {
    const [login, setLogin] = useState('');
    const [error, setError] = useState('');
    const [toggleMenu, setToggleMenu] = useState('');
    const [loginButtons, setLoginButtons] = useState((<div className='sign-in'></div>))
    const [selected, setSelected] = useState(1);
    const [confirmation, setConfirmation] = useState(0);

    const {getUser, logoutUser} = props;
    const {username, display_name} = props.reducer

    useEffect(() => {
        if (props.routeReducer.myIdeas) setSelected(2);
        else setSelected(1);
    }, [props.routeReducer.myIdeas])

    useEffect(() => {
        axios.get('/auth/quickLogin')
        .then(res => {
            console.log(res.data);
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

    const sendEmail = (username) => {
        setLogin('confirmation');
        const randomNumber = Math.round(Math.random() * (99999 - 10000) + 10000);
        setConfirmation(randomNumber);
        axios.post('/auth/email', {number: randomNumber, email:username});
    }

    const handleSignup = (username, password, displayName, description, file) => {
        axios.post('/auth/register', {username, password, displayName, description, file})
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
    const profileImg = (<div onClick={profileMenu} className='profile' style={{backgroundImage: `url(${props.reducer.profile_img})`}}></div>);
    return (
        <div className='head-shadow'>
        <header className='header'>
            <div className='container'>
            <Link to='/'><img alt='' src={Logo} /></Link>
                <div className='nav'>
                    <nav>
                        <ul>
                            <Link className={selected === 1 ? 'selected' : ''} onClick={() => {props.changeBool(false); setSelected(1)}} to='/'><li>Ideas</li></Link>
                            <Link className={selected === 2 ? 'selected' : ''} onClick={() => {props.changeBool(true); setSelected(2)}} to='/ideas'><li>My Ideas</li></Link>
                            <Link className={selected === 3 ? 'selected' : ''} onClick={() => setSelected(3)} to='/projects'><li>Projects</li></Link>
                            <Link className={selected === 4 ? 'selected' : ''} onClick={() => setSelected(4)} to='/connect'><li>Connect</li></Link>
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
        {login ? <Login error={error} sendEmailFn={sendEmail} signupFn={handleSignup} confirmation={confirmation} loginFn={handleLogin} exitFn={handleExit} loginType={login} /> : null}
        </div>
    )
};

const mapStateToProps = reduxState => reduxState;
export default connect(mapStateToProps, {getUser, logoutUser, changeBool})(Nav);