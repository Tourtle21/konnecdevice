import React, { useEffect, useState } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

const Tasks = (props) => {
    const [collaborators, setCollaborators] = useState([]);
    const [admin, setAdmin] = useState(0);
    const [tasks, setTasks] = useState({});
    const [task, setTask] = useState('');
    const [edit, setEdit] = useState(0);

    useEffect(() => {
        axios.get(`/api/ideas/collaborators/${props.match.params.id}`)
        .then(res => {
            setCollaborators(res.data);
        })
        axios.get(`/auth/isAdmin/${props.match.params.id}`)
        .then(res => {
            console.log(res.data);
            setAdmin(res.data.id);
        })
        axios.get(`/api/ideas/tasks/${props.match.params.id}`)
        .then(res => {
            let newTasks = {};
            console.log(res.data);
            res.data.forEach(task => {
                console.log(task)
                if (!newTasks[task.coll_id]) newTasks[task.coll_id] = [];
                newTasks[task.coll_id].push(task);
            })
            setTasks(newTasks);
        })
    }, []);

    const createTask = (id, e) => {
        e.stopPropagation();
        axios.post(`/api/ideas/tasks/${props.match.params.id}`, {coll_id:id, task})
        .then(res => {
            setTask('');
            const collId = res.data.coll_id;
            let newTasks = [];
            console.log(tasks[collId])
            if (tasks[collId]) newTasks = tasks[collId].slice();
            newTasks.push(res.data);
            setTasks({...tasks, [collId]: newTasks});
        })
    }

    const deleteTask = (id, collId) => {
        axios.delete(`/api/ideas/tasks/${id}`)
        .then(res => {
            const index = tasks[collId].findIndex(task => task.id === id);
            const newTasks = tasks[collId];
            newTasks.splice(index, 1);
            setTasks({...tasks, [collId]: newTasks})
        })
    }

    const toggleCompleted = (id, collId) => {
        axios.put(`/api/ideas/tasks/${id}`)
        .then(res => {
            console.log(res.data);
            const index = tasks[collId].findIndex(task => task.id === id);
            const newTasks = tasks[collId].slice();
            newTasks[index].completed = res.data.completed;
            setTasks({...tasks, [collId]: newTasks})
        })
    }

    const mappedCollaborators = collaborators.map(col => {
        let mappedTasks;
        console.log(tasks);
        if (tasks[col.id]) {
            mappedTasks = tasks[col.id].map(task => (<li className={task.completed ? 'complete' : ''}>{props.id === col.id ? <input onChange={() => toggleCompleted(task.id, col.id)} className='task-check' checked={task.completed} type='checkbox' /> : null} {task.task} {props.id === col.id ? <button onClick={() => deleteTask(task.id, col.id)} className='task-delete'>-</button> : null}</li>));
        } else  {
            mappedTasks = [];
        }

    return (<div className='task'><h1 className='task-title'>{col.display_name}</h1>{mappedTasks}{props.id === col.id || props.id === admin ? <li onClick={() => setEdit(col.id)}><button onClick={(e) => createTask(col.id, e)}>+</button>{edit === col.id ? <input value={task} onChange={(e) => setTask(e.target.value)} className='edit-task-input' autoFocus='true' /> : <span>Add New</span>}</li>:null}</div>)
    })
    return (
        <div className='tasks'>
            {mappedCollaborators}
        </div>
    )
}

const mapStateToProps = reduxState => reduxState.reducer;
export default connect(mapStateToProps)(Tasks);