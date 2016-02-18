import { combineReducers } from 'redux'

import {Reducer as ProjectsReducer} from './Projects';
import {Reducer as ContributorsReducer} from './Contributors';
import {Reducer as ContributionsReducer} from './Contributions';
import {Reducer as FilteringReducer} from './Filtering';

export default combineReducers({
    projects : ProjectsReducer,
    contributions: ContributionsReducer,
    contributors: ContributorsReducer,
    filtering: FilteringReducer
});