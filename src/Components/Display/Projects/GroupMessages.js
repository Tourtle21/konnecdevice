import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import ScrollToBottom from 'react-scroll-to-bottom';
import axios from 'axios';
import io from 'socket.io-client';

let socket;

const GroupMessages = (props) => {
    // const  ENDPOINT = 'http://167.172.193.114:3030';
    const  ENDPOINT = 'http://167.172.193.114:3030';
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        console.log(messages);
        axios.get(`/api/messages/${props.match.params.id}`)
        .then(res => {
            setMessages(res.data);
        }).catch(err => console.log(err));
        socket = io(ENDPOINT);
        socket.emit('join', props.match.params.id);

        socket.on('message', newMessage => {
            console.log(messages, newMessage, [...messages, newMessage])
            setMessages(messages => [...messages, newMessage]);
        });
    }, []);


    const sendMessage = (e) => {
        e.preventDefault();
        axios.post(`/api/messages/${props.match.params.id}`, {message})
        .then(res => {
            setMessage('');
            console.log(res.data);
            socket.emit('sendMessage', {room:props.match.params.id, message:res.data});
        }).catch(err => console.log(err));
    }
    console.log(messages);
    const mappedMessages = messages.map(message => (<div className={`message ${message.display_name !== props.display_name ? 'my-message' : ''}`}><div className='mini-profile' style={{backgroundImage: `url(${message.profile_img})`}}></div><div className='text'><h1>{message.display_name}</h1><p>{message.message}</p></div></div>))
    return (
        <div className='group-messages'>
            <ScrollToBottom className='message-list'>
                {mappedMessages}
            </ScrollToBottom>
            <div className='group-message-submit'>
                <input value={message} onKeyPress={(e) => e.key === 'Enter' ? sendMessage(e) : null} onChange={(e) => setMessage(e.target.value)} className='group-message-input' />
                <button onClick={(e) => sendMessage(e)} className='group-message-button'>Send</button>
            </div>
        </div>
    )
}

const mapStateToProps = reduxState => reduxState.reducer;
export default connect(mapStateToProps)(GroupMessages);