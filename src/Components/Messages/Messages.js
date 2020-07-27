import React, { useEffect } from 'react';
import {connect} from 'react-redux';
import {updateRequests, deleteRequest} from '../../ducks/reducer';
import axios from 'axios';

const Messages = (props) => {

    useEffect(() => {
        axios.get('/api/messages/all')
        .then(res => {
            props.updateRequests(res.data);
        })
    }, [])

    const cancelRequest = (id) => {
        axios.delete(`/api/messages/requests/${id}`)
        .then(res => {
            props.deleteRequest(id);
        })
    }

    const mappedRequests = props.requests.map(request => (request.request_id === props.id ? <div>You requested to {request.display_name} to collaborate on {request.title} <button onClick={() => cancelRequest(request.id)}>X</button></div> : <div>{request.display_name} requested to collaborate with you on {request.title}</div>))

    return (
        <section className='messages'>
            <div className='profile-display'><div className='online'></div>{props.username ? props.display_name : 'Guest User'}</div>
            {mappedRequests}
        </section>
    )
};

const mapStateToProps = reduxState => reduxState.reducer;
export default connect(mapStateToProps, {updateRequests, deleteRequest})(Messages);