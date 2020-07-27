import React from 'react';
import Profile from '../../assets/profile.JPG';
import {connect} from 'react-redux';
import {changeBool} from '../../ducks/routeReducer';
import {updateRequests} from '../../ducks/reducer';
import axios from 'axios';

const Idea = (props) => {
    const {id, title, display_name, description, img, is_live, user_id} = props.idea;
    const {myIdea, changeSelectedFn, selected} = props;
    console.log(is_live);
    const toggleLive = (e) => {
        e.stopPropagation();
        axios.put(`/api/ideas/live/${id}`)
        .then(res => {
            props.changeBool(false);
        })
    }

    const sendRequest = (e) => {
        axios.post('/api/messages/requests', {id, recepient_id: user_id})
        .then(res => {
            props.updateRequests(res.data);
        })
    }

    return (
        <div onClick={() => changeSelectedFn(selected === id ? 0 : id)} className={`card ${selected === id ? 'expand' : ''}`}>
            <h1>{title}</h1>
            <div className='author'>
                <h3>{display_name ? display_name : props.display_name}</h3>
                <img className='mini-profile' src={Profile} />
            </div>
            <p style={myIdea ? {width:"80%"} : {width:"100%"}}>{description}</p>
            {myIdea ? <span>Set Live: <input onClick={(e) => toggleLive(e)} checked={is_live} type='checkbox'/></span> : null}
            {selected === id && user_id !== props.id ? 
                <div>
                    <button onClick={e => sendRequest(e)}>+</button>
                </div>
                : null
            }
        </div>
    )
};

const mapStateToProps = reduxState => reduxState.reducer;
export default connect(mapStateToProps, {changeBool, updateRequests})(Idea);