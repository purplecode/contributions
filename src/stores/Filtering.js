import _ from 'lodash';
import keyMirror from 'keymirror';

const Constants = keyMirror({
    ALL: null,
    FILTER_BY_CONTRIBUTORS: null
});

const Reducer = function (state = Constants.ALL, action) {
    switch (action.type) {
        case Constants.FILTER_BY_CONTRIBUTORS:
            return action.contributors;
        default:
            return state
    }
};

export {Constants};
export {Reducer};

export default {
    filterByContributors(contributors) {
        return {
            type: Constants.FILTER_BY_CONTRIBUTORS,
            contributors
        };
    },
    getSelectedContributors() {
        return (dispatch, getState) => {
            return Promise.resolve(getState().filtering);
        }
    }
};

