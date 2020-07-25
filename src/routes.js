import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Landing from './Components/Display/Landing';
import Ideas from './Components/Display/Ideas';
import Projects from './Components/Display/Projects';
import EditIdea from './Components/Display/EditIdea';

export default (
    <Switch>
        <Route exact path='/' component={Landing} />
        <Route exact path='/ideas' component={Ideas} />
        <Route exact path='/projects' component={Projects} />
        <Route exact path='/ideas/:id' component={EditIdea} />
    </Switch>
);