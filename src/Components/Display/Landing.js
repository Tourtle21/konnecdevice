import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Idea from './Idea';

const Landing = (props) => {
    const [ideas, setIdeas] = useState([]);


    useEffect(() => {
        axios.get('/api/ideas')
        .then(res => {
            setIdeas(res.data);
        })
    }, [])


    const mappedIdeas = ideas.map(idea => (<Idea idea={idea} />));
    return (
        <main>
            {mappedIdeas}
            {mappedIdeas}
            {mappedIdeas}
            {mappedIdeas}
            {mappedIdeas}
            {mappedIdeas}
            {mappedIdeas}
        </main>
    )
};

export default Landing;