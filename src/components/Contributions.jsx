import React from 'react';
import nanoajax from 'nanoajax';
import mui from 'material-ui';
import Chart from './Chart.jsx';
import Navbar from './Navbar.jsx';
import Project from './Project.jsx';
import Legend from './Legend.jsx';

import ThemeManager from 'material-ui/lib/styles/theme-manager';
import ThemeDecorator from 'material-ui/lib/styles/theme-decorator';
import Theme from '../styles/Theme';

@ThemeDecorator(ThemeManager.getMuiTheme(Theme))
class Contributions extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            total: {},
            projects: []
        };

        nanoajax.ajax({url: '/api/v1/projects'}, (code, results) => {
            this.setState({projects: JSON.parse(results)});
        });
    }

    render() {
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
}

export default Contributions;

