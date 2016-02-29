import _ from 'lodash';
import keyMirror from 'keymirror';

const Constants = keyMirror({
    REQUEST_CONTRIBUTORS: null,
    RECEIVE_CONTRIBUTORS: null
});

const Actions = {
    actions: {
        requestContributors() {
            return {
                type: Constants.REQUEST_CONTRIBUTORS
            };
        },
        receiveContributors(json) {
            return {
                type: Constants.RECEIVE_CONTRIBUTORS,
                contributors: json,
                receivedAt: Date.now()
            };
        }
    },
    fetchContributors() {
        return dispatch => {
            dispatch(this.actions.requestContributors());
            return fetch(`/api/v1/contributors`, {credentials: 'include'})
                .then(response => response.json())
                .then(json => dispatch(this.actions.receiveContributors(json)))
        };
    }
};

const Reducer = function (state = {
    isFetching: false,
    model: []
}, action) {
    switch (action.type) {
        case Constants.REQUEST_CONTRIBUTORS:
            return Object.assign({}, state, {
                isFetching: true
            });
        case Constants.RECEIVE_CONTRIBUTORS:
            return Object.assign({}, state, {
                isFetching: false,
                model: _.sortBy(action.contributors, c => c.toLowerCase()),
                lastUpdated: action.receivedAt
            });
        default:
            return state
    }
};

export {Reducer};

export default {
    getContributors() {
        return (dispatch, getState) => {
            let state = getState().contributors;
            let shouldFetch = _.isEmpty(state.model) && !state.isFetching;
            let promise = shouldFetch ? dispatch(Actions.fetchContributors()) : Promise.resolve();
            return promise.then(() => {
                return getState().contributors.model;
            });
        }
    }
};

