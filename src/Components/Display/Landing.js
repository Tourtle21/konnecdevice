import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import Idea from './Idea';

const Landing = (props) => {
    const [allIdeas, setAllIdeas] = useState([]);
    const [ideas, setIdeas] = useState([]);
    const [selected, setSelected] = useState(0);
    const [creating, setCreating] = useState(false);

    const {myIdeas} = props.routeReducer;

    useEffect(() => {
        if (creating) {
            deleteCreateIdea();
        }
    }, [selected])

    useEffect(() => {
        setCreating(false);
        setSelected(0);
        if (!myIdeas) {
            axios.get('/api/ideas')
            .then(res => {
                resetIdeas(res.data);
            })
        } else {
            axios.get('/api/myideas')
            .then(res => {
                resetIdeas(res.data);
            })
        }
    }, [myIdeas])

    const updateIdeas = (val) => {
        setIdeas(allIdeas.filter(idea => idea.title.includes(val)));
    }

    const editIdea = (id, body) => {
        setSelected(0);
        axios.put(`/api/ideas/${id}`, body)
        .then(res => {
            resetIdeas(res.data);
        })
    }

    const deleteIdea = (id, e) => {
        e.stopPropagation();
        axios.delete(`/api/ideas/${id}`)
        .then(res => {
            resetIdeas(res.data);
        })
    }

    const createNewIdea = () => {
        if (!creating) {
            let newIdeas = ideas.slice();
            console.log(props)
            newIdeas.push({title:'', description:'', id:0, editing:true, display_name:props.reducer.display_name, user_id:props.reducer.id});
            setSelected(0);
            setCreating(true);
            setIdeas(newIdeas);
        }
    }

    const resetIdeas = (data) => {
        const newData = data.sort((a, b) => a.id - b.id );
        setAllIdeas(newData);
        setIdeas(newData);
    }

    const deleteCreateIdea = () => {
        let newIdeas = ideas.slice();
        let index = newIdeas.findIndex(idea => idea.id === 0);
        newIdeas.splice(index, 1);
        setIdeas(newIdeas);
        setCreating(false);
    }

    const createIdea = (body) => {
        axios.post('/api/ideas', body)
        .then(res => {
            resetIdeas(res.data);
        })
    }

    const mappedIdeas = myIdeas ? ideas.filter(idea => (idea.user_id === props.reducer.id)).map((idea, i) => (<Idea key={i} createIdeaFn={createIdea} changeSelectedFn={setSelected} deleteCreateIdeaFn={deleteCreateIdea} deleteIdeaFn={deleteIdea} editIdeaFn={editIdea} selected={selected} idea={idea} myIdea={true} />)) : ideas.map((idea, i) => (<Idea key={i} createIdeaFn={createIdea} changeSelectedFn={setSelected} deleteCreateIdeaFn={deleteCreateIdea} deleteIdeaFn={deleteIdea} editIdeaFn={editIdea} selected={selected} idea={idea} />));
    console.log(ideas);
    return (
        <main>
            <nav><input onChange={(e) => updateIdeas(e.target.value)} placeholder="Filter" />{myIdeas ? <button onClick={createNewIdea} className='create-new'>CREATE NEW</button> : null}</nav>
            {mappedIdeas}
        </main>
    )
};

const mapStateToProps = reduxState => reduxState;
export default connect(mapStateToProps)(Landing);