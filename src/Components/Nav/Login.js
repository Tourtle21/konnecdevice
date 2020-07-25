import React, {useState, useEffect} from 'react';

const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

    const {loginType, loginFn, signupFn, exitFn} = props;
    
    useEffect(() => {
        setUsername('');
        setPassword('');
        setDisplayName('');
        setDescription('');
        setError('');
    }, [loginType])

    const handleSubmit = () => {
        setError('');
        if (loginType === 'login') loginFn(username, password);
        else {
            if (username && password && displayName) signupFn(username, password, displayName, description);
            else setError('Username, Password, and Display Name required');
        };
    }

    return (
        <div onKeyDown={(e) => e.key === 'Enter' ? handleSubmit() : null } onMouseDown={(e) => exitFn(e)} className='login'>
            <div className='login-box'>
                <h1>{loginType}</h1>
                <div className='info'>
                    <span className='error-message'>{error}{error}</span>
                    <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
                    <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                    {loginType === "signup" ? <><input value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Display Name" />
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Short description about yourself and your purpose on Konnecd'></textarea></> : null}
                    <button onClick={handleSubmit}>{loginType}</button>
                </div>
            </div>
        </div>
    )
};

export default Login;