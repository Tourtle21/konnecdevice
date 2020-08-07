import React from 'react';
import Tasks from './Tasks';
import Plan from './Plan';
import GroupMessages from './GroupMessages';
import {Route, Switch, Link} from 'react-router-dom';
const Project = (props) => {
    const {title, id} = props.project;
    const {setSelected, selected} = props;
    return (
        <li onClick={() => setSelected(id)} className={`project-card ${selected === id ? 'expand-project' : ''}`}>
            {id === selected ? <>
            <nav>
                <ul>
                    <Link to={`/projects/plan/${id}`}>Plan</Link>
                    <Link to={`/projects/messages/${id}`}>Messages</Link>
                    <Link to={`/projects/tasks/${id}`}>Tasks</Link>
                    <button onClick={(e) => {e.stopPropagation(); setSelected(0)}}>x</button>
                </ul>
            </nav>
            <h1>{title}</h1>
            <Switch>
                <Route path='/projects/plan/:id' component={Plan} />
                <Route path='/projects/messages/:id' component={GroupMessages} />
                <Route path='/projects/tasks/:id' component={Tasks} />
            </Switch>
            </> :
            <h1>{title}</h1>}
        </li>
    )
};

export default Project;