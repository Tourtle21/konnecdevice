import React, {useState, useEffect} from 'react';
import PlanInput from './PlanInput';
import axios from 'axios';

const plans = ['Problem:', 'Solution:', 'Target Audience:', 'MVP (minimum viable product) Features:', 'Bonus Features:'];

const Plan = (props) => {
    const [edit, setEdit] = useState(false);
    const [fullPlan, setFullPlan] = useState({})

    useEffect(() => {
        axios.get(`/api/ideas/${props.match.params.id}`)
        .then(res => {
            console.log(res.data);
            if (res.data.plan) setFullPlan(JSON.parse(res.data.plan));
            else setFullPlan(['', '', '', '', '']);
        })
    }, []) 

    const handleChangeInput = (val, i) => {
        let newFullPlan = fullPlan.slice();
        newFullPlan[i] = val;
        setFullPlan(newFullPlan);
    }

    const savePlan = () => {
        console.log(fullPlan);
        axios.put(`/api/ideas/plan/${props.match.params.id}`, {plan:JSON.stringify(fullPlan)})
        .then(res => {
           
        })
    }

    const mappedPlans = plans.map((plan, i)=> (<PlanInput title={plan} i={i} handleChangeInput={handleChangeInput} value={fullPlan[i]} edit={edit} />))

    return (
        <div className="plan">
            <div className='planning-container'>
                {mappedPlans}
            </div>
            <button onClick={() => {if (edit) savePlan(); setEdit(!edit)}}>{edit ? 'Save' : 'Edit'}</button>
        </div>
    )
}
export default Plan;