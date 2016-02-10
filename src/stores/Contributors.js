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
            return fetch(`/api/v1/contributors`)
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
                model: action.contributors,
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
            if (_.isEmpty(state.model) && !state.isFetching) {
                return dispatch(Actions.fetchContributors())
            } else {
                return Promise.resolve()
            }
        }
    }
};

