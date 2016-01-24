import { combineReducers } from 'redux'
import Actions from './actions';


function projects(state = {
    isFetching: false,
    projects: []
}, action) {
    switch (action.type) {
        case Actions.REQUEST_PROJECTS:
            return Object.assign({}, state, {
                isFetching: true
            });
        case Actions.RECEIVE_PROJECTS:
            return Object.assign({}, state, {
                isFetching: false,
                projects: action.projects,
                lastUpdated: action.receivedAt
            });
        default:
            return state
    }
}

export default combineReducers({
    projects
});