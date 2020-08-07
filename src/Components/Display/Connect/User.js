import React, {useState} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {updateRequests} from '../../../ducks/reducer';



const User = (props) => {
    const [myIdeas, setMyIdeas] = useState([]);

    const {id, display_name, profile_img, description } = props.user;

    const openRequests = () => {
        axios.get('/api/myIdeas')
        .then(res => {
            setMyIdeas(res.data);
        })
    }
    
    const sendRequest = (idea_id) => {
        axios.post('/api/messages/requests', {id:idea_id, recepient_id: id, user_request: true})
        .then(res => {
            setMyIdeas([]);
            props.updateRequests(res.data);
        })
    }

    const mappedIdeas = myIdeas.filter(idea => idea.is_live).map(idea => (<div onClick={() => sendRequest(idea.id)} className='connect-idea'>{idea.title}</div>))
    return (
        <div className='card'>
            <div className='author'>
                <h3 className='connect-name'>{display_name}</h3>
                <div className='connect-profile' style={{backgroundImage: `url(${profile_img})`}}></div>
            </div>
            <button onClick={openRequests}>+</button>
            <p>{description}</p>
            <div className='connect-ideas'>
                {mappedIdeas}
            </div>
        </div>
        )
    };


export default connect(null, {updateRequests})(User);