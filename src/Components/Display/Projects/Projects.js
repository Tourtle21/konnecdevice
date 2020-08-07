import React, { useEffect, useState } from 'react';
import Project from './Project';
import axios from 'axios';
const Projects = (props) => {

    const [projects, setProjects] = useState([]);
    const [selected, setSelected] = useState(0);

    useEffect(() => {
        axios.get('api/ideas/projects')
        .then(res => {
            setProjects(res.data);
        })
    }, [])

    

    const mappedProjects = selected === 0 ? projects.map(project => <Project project={project} selected={selected} setSelected={setSelected} />) : (<Project selected={selected} setSelected={setSelected} project={projects.find(project => project.id === selected)} />);

    return (
        <main className={`project-main ${selected !== 0 ? 'closed' : ''}`}>
            {mappedProjects}
        </main>
    )
};

export default Projects;