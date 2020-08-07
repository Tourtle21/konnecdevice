import React from 'react';

const PlanInput = (props) => {

    const {i, title, edit, value, handleChangeInput} = props;

    return (
        <div>
            <h1>{title}</h1>
            {edit ? <textarea onChange={e => handleChangeInput(e.target.value, i)} value={value}></textarea> : <pre className='plan-description'>{value ? value : 'Not Planned'}</pre>}
        </div>
    )
}
export default PlanInput;