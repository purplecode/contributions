import { combineReducers } from 'redux'
import Actions from './actions';


function projects(state = {
    isFetching: false,
    model: []
}, action) {
    switch (action.type) {
        case Actions.REQUEST_PROJECTS:
            return Object.assign({}, state, {
                isFetching: true
            });
        case Actions.RECEIVE_PROJECTS:
            return Object.assign({}, state, {
                isFetching: false,
                model: action.projects,
                lastUpdated: action.receivedAt
            });
        default:
            return state
    }
}

function contributors(state = {
    isFetching: false,
    model: []
}, action) {
    switch (action.type) {
        case Actions.REQUEST_CONTRIBUTORS:
            return Object.assign({}, state, {
                isFetching: true
            });
        case Actions.RECEIVE_CONTRIBUTORS:
            return Object.assign({}, state, {
                isFetching: false,
                model: action.contributors,
                lastUpdated: action.receivedAt
            });
        default:
            return state
    }
}

function contributions(state = {}, action) {
    switch (action.type) {
        case Actions.REQUEST_CONTRIBUTIONS:
            return Object.assign({}, state, {
                [action.projectKey]: {
                    isFetching: true,
                    model: {}
                }
            });
        case Actions.RECEIVE_CONTRIBUTIONS:
            return Object.assign({}, state, {
                [action.projectKey]: {
                    isFetching: false,
                    model: action.contributions,
                    lastUpdated: action.receivedAt
                }
            });
        default:
            return state
    }
}

export default combineReducers({
    projects,
    contributors,
    contributions
});