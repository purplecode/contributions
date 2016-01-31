import _ from 'lodash';
import keyMirror from 'keymirror';

const Constants = keyMirror({
    REQUEST_PROJECTS: null,
    RECEIVE_PROJECTS: null
});

const Actions = {
    requestProjects() {
        return {
            type: Constants.REQUEST_PROJECTS
        };
    },
    receiveProjects(json) {
        return {
            type: Constants.RECEIVE_PROJECTS,
            projects: json,
            receivedAt: Date.now()
        };
    }
};


function fetchProjects() {
    return dispatch => {
        dispatch(Actions.requestProjects());
        return fetch(`/api/v1/projects`)
            .then(response => response.json())
            .then(json => dispatch(Actions.receiveProjects(json)))
    };
}

function shouldFetchProjects(state) {
    const projects = state.projects.projects;
    if (_.isEmpty(projects)) {
        return true;
    } else if (projects.isFetching) {
        return false;
    }
    return false;
}

export default {
    ...Constants,
    getProjects() {
        return (dispatch, getState) => {
            if (shouldFetchProjects(getState())) {
                return dispatch(fetchProjects())
            } else {
                return Promise.resolve()
            }
        }
    }
};

