import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Landing from './Components/Display/Landing';
import Projects from './Components/Display/Projects/Projects';
import Connect from './Components/Display/Connect/Connect';

export default (
    <Switch>
        <Route exact path='/' component={Landing} />
        <Route path='/ideas' component={Landing} />
        <Route path='/projects' component={Projects} />
        <Route path='/connect' component={Connect} />
    </Switch>
);