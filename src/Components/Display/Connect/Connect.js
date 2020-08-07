import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import User from './User';

const Connect = (props) => {

    const [allUsers, setAllUsers] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('/api/users')
        .then(res => {
            setAllUsers(res.data);
            setUsers(res.data);
        })
    }, [])

    const updateUsers = (val) => setUsers(allUsers.filter(user => user.display_name.includes(val)))
    const mappedUsers = users.map((user, i) => user.id !== props.id ? (<User key={i} user={user} />):null);
    return (
        <main>
            <input onChange={(e) => updateUsers(e.target.value)} placeholder="Filter" />
            {mappedUsers}
        </main>
    )
};

const mapStateToProps = reduxState => reduxState.reducer;
export default connect(mapStateToProps)(Connect);