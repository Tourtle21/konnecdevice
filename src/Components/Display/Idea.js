import React, {useState, useEffect} from 'react';
import Profile from '../../assets/profile.JPG';
import EditIdea from './EditIdea';
import {connect} from 'react-redux';
import {changeBool} from '../../ducks/routeReducer';
import {updateRequests} from '../../ducks/reducer';
import axios from 'axios';

const Idea = (props) => {
    const {id, title, display_name, description, img, is_live, user_id} = props.idea;
    const {myIdea, changeSelectedFn, selected, deleteIdeaFn, editIdeaFn, deleteCreateIdeaFn, createIdeaFn} = props;

    const [editing, setEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(title);
    const [newDescription, setNewDescription] = useState(description);
    const [isLive, setIsLive] = useState(is_live);

    const toggleLive = (e) => {
        e.stopPropagation();
        axios.put(`/api/ideas/live/${id}`)
        .then(res => {
            setIsLive(!isLive);
        })
    }

    const cancelEdit = () => {
        setEditing(false);
        setNewTitle(title);
        setNewDescription(description);
        changeSelectedFn(0);
    }


    const sendRequest = (e) => {
        axios.post('/api/messages/requests', {id, recepient_id: user_id})
        .then(res => {
            props.updateRequests(res.data);
        })
    }
    return (editing && selected == id) || (props.idea.editing && selected == id) ?  ( <div className={`card ${selected === id ? 'expand' : ''}`}>
    <input onChange={(e) => setNewTitle(e.target.value)} className='title-input' value={newTitle} />
    <div className='author'>
        <h3>{display_name ? display_name : props.display_name}</h3>
        <img className='mini-profile' src={Profile} />
    </div>
    <textarea className='description-input' onChange={(e) => setNewDescription(e.target.value)} value={newDescription} style={myIdea ? {width:"80%"} : {width:"100%"}}></textarea>

    {myIdea ? 
    <>
    {!props.idea.editing ? <span>Set Live: <input onClick={(e) => toggleLive(e)} checked={is_live} type='checkbox'/></span> : null}
    <div className='edit-buttons'> 
        {!props.idea.editing ? <><button onClick={() => {editIdeaFn(id, {title: newTitle, description: newDescription}); setEditing(false)}}>Save</button><button onClick={cancelEdit}>Cancel</button></> 
        : <><button onClick={() => createIdeaFn({title: newTitle, description: newDescription})}>Create</button><button onClick={deleteCreateIdeaFn}>Cancel</button></>}
    </div>
    </>
    : null}

    {selected === id && user_id !== props.id ? 
        <div>
            <button onClick={e => sendRequest(e)}>+</button>
        </div>
        : null
    }
</div>) : (
        <div onClick={() => changeSelectedFn(selected === id ? 0 : id)} className={`card ${selected === id ? 'expand' : ''}`}>
            <h1>{title}</h1>
            <div className='author'>
                <h3>{display_name ? display_name : props.display_name}</h3>
                <img className='mini-profile' src={Profile} />
            </div>
            <p style={myIdea ? {width:"80%"} : {width:"100%"}}>{description}</p>

            {myIdea ? 
            <>
            <span>Set Live: <input onClick={(e) => toggleLive(e)} checked={isLive} type='checkbox'/></span>
            <div className='edit-buttons'> 
                <button onClick={() => setEditing(true)}>Edit</button>
                <button onClick={(e) => deleteIdeaFn(id, e)}>Delete</button>
            </div>
            </>
            : null}

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