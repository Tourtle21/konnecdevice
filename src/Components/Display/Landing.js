import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import Idea from './Idea';

const Landing = (props) => {
    const [allIdeas, setAllIdeas] = useState([]);
    const [ideas, setIdeas] = useState([]);
    const [selected, setSelected] = useState(0);

    const {myIdeas} = props.routeReducer;

    useEffect(() => {
        console.log("RAN");
        if (!myIdeas) {
            axios.get('/api/ideas')
            .then(res => {
                setAllIdeas(res.data);
                setIdeas(res.data);
            })
        } else {
            axios.get('/api/myideas')
            .then(res => {
                setAllIdeas(res.data);
                setIdeas(res.data);
            })
        }
    }, [myIdeas])

    const updateIdeas = (val) => {
        setIdeas(allIdeas.filter(idea => idea.title.includes(val)));
    }

    const mappedIdeas = myIdeas ? ideas.filter(idea => (idea.user_id === props.reducer.id)).map(idea => (<Idea changeSelectedFn={setSelected} selected={selected} idea={idea} myIdea={true} />)) : ideas.map(idea => (<Idea changeSelectedFn={setSelected} selected={selected} idea={idea} />));

    return (
        <main>
            <input onChange={(e) => updateIdeas(e.target.value)} placeholder="Filter" />
            {mappedIdeas}
        </main>
    )
};

const mapStateToProps = reduxState => reduxState;
export default connect(mapStateToProps)(Landing);