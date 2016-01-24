import _ from 'lodash';
import keyMirror from 'keymirror';

const Constants = keyMirror({
    REQUEST_PROJECTS: null,
    RECEIVE_PROJECTS: null,
    REQUEST_PROJECT_CONTRIBUTIONS: null,
    RECEIVE_PROJECT_CONTRIBUTIONS: null
});

function requestProjects() {
    return {
        type: Constants.REQUEST_PROJECTS
    };
}

function receiveProjects(json) {
    return {
        type: Constants.RECEIVE_PROJECTS,
        projects: json,
        receivedAt: Date.now()
    };
}

function fetchProjects() {
    return dispatch => {
        dispatch(requestProjects())
        return fetch(`/api/v1/projects`)
            .then(response => response.json())
            .then(json => dispatch(receiveProjects(json)))
    };
}

function shouldFetchProjects(state) {
    const projects = state.projects.projects
    if (_.isEmpty(projects)) {
        return true;
    } else if (projects.isFetching) {
        return false;
    }
    return false;
}

export function fetchProjectsIfNeeded() {
    return (dispatch, getState) => {
        if (shouldFetchProjects(getState())) {
            return dispatch(fetchProjects())
        } else {
            return Promise.resolve()
        }
    }
}

export default {
    ...Constants,
    fetchProjectsIfNeeded() {
        return (dispatch, getState) => {
            if (shouldFetchProjects(getState())) {
                return dispatch(fetchProjects())
            } else {
                return Promise.resolve()
            }
        }
    }
};

