import React from 'react';
import Profile from '../../assets/profile.JPG';

const Idea = (props) => {
    const {title, display_name, description, img} = props.idea;
    console.log(props.idea);
    return (
        <div className='card'>
            <h1>{title}</h1>
            <img className='mini-profile' src={Profile} />
            <h3>{display_name}</h3>
            <p>{description}</p>
        </div>
    )
};

export default Idea;