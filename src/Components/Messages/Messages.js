import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {updateRequests, deleteRequest} from '../../ducks/reducer';
import axios from 'axios';

const Messages = (props) => {

    useEffect(() => {
        if (props.display_name) {
            axios.get('/api/messages/all')
            .then(res => {
                props.updateRequests(res.data);
            })
        }
    }, [props.username])

    const cancelRequest = (id) => {
        axios.delete(`/api/messages/requests/${id}`)
        .then(res => {
            props.deleteRequest(id);
        })
    }

    const acceptRequest = (id) => {
        axios.put(`/api/messages/requests/${id}`)
        .then(res => {
            props.deleteRequest(id);
        })
    }
    const mappedRequests = props.requests.map(request => 
        (request.request_id === props.id ?
        <div>You requested to {request.display_name} to collaborate on {request.title} <button onClick={() => cancelRequest(request.id)}>X</button></div> : 
        <div>{request.display_name}<br />{request.title}<br /><button onClick={() => cancelRequest(request.id)}>X</button><button onClick={() => acceptRequest(request.id)}>√</button></div>))

    return (
        <section className='messages'>
            <div className='profile-display'><div className='online'></div>{props.username ? props.display_name : 'Guest User'}</div>
            <div className='message-section'>
                <h1>Requests</h1>
                {mappedRequests}
            </div>
            <div className='message-section'>
                <h1>People</h1>
            </div>
            <div className='message-section'>
                <h1>Projects</h1>
            </div>
        </section>
    )
};

const mapStateToProps = reduxState => reduxState.reducer;
export default connect(mapStateToProps, {updateRequests, deleteRequest})(Messages);