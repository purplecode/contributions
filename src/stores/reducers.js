import { combineReducers } from 'redux'

import {Reducer as ProjectsReducer} from './Projects';
import {Reducer as ContributorsReducer} from './Contributors';
import {Reducer as ContributionsReducer} from './Contributions';

export default combineReducers({
    projects : ProjectsReducer,
    contributions: ContributionsReducer,
    contributors: ContributorsReducer
});