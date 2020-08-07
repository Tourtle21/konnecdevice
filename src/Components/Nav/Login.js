import React, {useState, useEffect} from 'react';
import {useDropzone} from 'react-dropzone';
import ReactS3 from 'react-s3';

const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [description, setDescription] = useState('');

    const [error, setError] = useState('');

    const [file, setFile] = useState('https://konnecdevice.s3.amazonaws.com/download.png');

    const config = {
        bucketName: 'konnecdevice',
        albumName: 'photos',
        region: 'us-west-1',
        accessKeyId: 'AKIAJLRJDH72QU62UUAA',
        secretAccessKey: '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'
    }

    const {getRootProps, getInputProps} = useDropzone({
        accept: "image/*",
        onDrop: (acceptedFiles) => {
            ReactS3.uploadFile(acceptedFiles[0], config)
            .then( data =>
                setFile(data.location)
            ).catch( err => alert(err))
        }
    })
    const image = (
       <div className='add-profile' style={{backgroundImage: `url(${file})`}}></div>
    )

    const {loginType, loginFn, signupFn, exitFn, sendEmailFn, confirmation} = props;
    useEffect(() => {
        if (loginType !== 'confirmation') {
            setUsername('');
            setPassword('');
            setDisplayName('');
            setDescription('');
            setError('');
        }
    }, [loginType])

    const handleSubmit = () => {
        setError('');
        if (loginType === 'login') loginFn(username, password);
        else {
            if (username && password && displayName) sendEmailFn(username);
            else setError('Username, Password, and Display Name required');
        };
    }

    const handleInput = (val) => {
        if (parseInt(val) === confirmation) {
            signupFn(username, password, displayName, description, file);
        }
    }
    return (
        <div onKeyDown={(e) => e.key === 'Enter' ? handleSubmit() : null } onMouseDown={(e) => exitFn(e)} className='login'>
            <div className='login-box'>
                {loginType !== 'confirmation' ? <>
                <h1>{loginType}</h1>
                <div className='info'>
                    <span className='error-message'>{error}{props.error}</span>
                    <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Email" />
                    <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                    {loginType === "signup" ? <><input value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Display Name" />
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Short description about yourself and your purpose on Konnecd'></textarea>
                    <div className='drop-box' {...getRootProps()}>
                        <input {...getInputProps()} />
                        <div>{image}</div>
                    </div>
                    <p className='instructions'>Add or Drop profile image here</p>
                    </> : null}
                    <button onClick={handleSubmit}>{loginType}</button>
                </div>
                </>:
                <><div>Request has been sent to your email enter the code to confirm</div><input onChange={(e) => handleInput(e.target.value)} /></>}
            </div>
        </div>
    )
};

export default Login;