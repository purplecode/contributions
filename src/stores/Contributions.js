import _ from 'lodash';
import keyMirror from 'keymirror';

const Constants = keyMirror({
    REQUEST_CONTRIBUTIONS: null,
    RECEIVE_CONTRIBUTIONS: null
});

const Actions = {
    actions: {
        requestContributions(projectKey) {
            return {
                type: Constants.REQUEST_CONTRIBUTIONS,
                projectKey: projectKey
            };
        },
        receiveContributions(projectKey, json) {
            return {
                type: Constants.RECEIVE_CONTRIBUTIONS,
                projectKey: projectKey,
                contributions: json,
                receivedAt: Date.now()
            };
        }
    },
    fetchContributions(projectKey) {
        return dispatch => {
            dispatch(this.actions.requestContributions(projectKey));
            return fetch( `/api/v1/contributions/${projectKey}`, {credentials: 'include'})
                .then(response => response.json())
                .then(json => dispatch(this.actions.receiveContributions(projectKey, json)))
        };
    }
};


const Reducer = function (state = {}, action) {
    switch (action.type) {
        case Constants.REQUEST_CONTRIBUTIONS:
            return Object.assign({}, state, {
                [action.projectKey]: {
                    isFetching: true,
                    model: {}
                }
            });
        case Constants.RECEIVE_CONTRIBUTIONS:
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
};

export {Reducer};

export default {
    getContributions(projectKey) {
        return (dispatch, getState) => {
            let state = getState().contributions[projectKey];
            let shouldFetch = (!state || (_.isEmpty(state.model) && !state.isFetching));
            let promise = shouldFetch ? dispatch(Actions.fetchContributions(projectKey)) : Promise.resolve();
            return promise.then(() => {
                let contributions = getState().contributions[projectKey].model;
                return getState().filtering === 'ALL' ? contributions : _.pick(contributions, getState().filtering);
            });
        }
    }
};

