import React from 'react';
import nanoajax from 'nanoajax';
import mui from 'material-ui';
import Table from './Table.jsx';
import Chart from './Chart.jsx';
import Navbar from './Navbar.jsx';
import Project from './Project.jsx';
import Legend from './Legend.jsx';

import ThemeManager from 'material-ui/lib/styles/theme-manager';
import Theme from './Theme';

var Contributions = React.createClass({

    childContextTypes: {
        muiTheme: React.PropTypes.object
    },

    getChildContext() {
        return {
            muiTheme: ThemeManager.getMuiTheme(Theme)
        };
    },

    getInitialState: function () {

        nanoajax.ajax({url: '/api/v1/projects'}, (code, results) => {
            if (this.isMounted()) {
                this.setState({projects: JSON.parse(results)});
            }
        });

        return {
            total: {},
            projects: []
        };
    },

    render: function () {
        return (
            <div>
                <Navbar/>
                <div className='content'>
                    <div className='content__left-panel'>
                        <Project definition={{key: 'total', name: 'Total'}}/>
                        {
                            this.state.projects.map(function (project) {
                                return <Project key={project.key} definition={project}/>;
                            })
                        }
                    </div>
                    <div className='content__right-panel'>
                        <Legend/>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Contributions;



