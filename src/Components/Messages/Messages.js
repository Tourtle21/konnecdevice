import React from 'react';
import {connect} from 'react-redux';

const Messages = (props) => {
    return (
        <section className='messages'>
            <div className='profile-display'><div className='online'></div>{props.username ? props.display_name : 'Guest User'}</div>
        </section>
    )
};

const mapStateToProps = reduxState => reduxState;
export default connect(mapStateToProps)(Messages);