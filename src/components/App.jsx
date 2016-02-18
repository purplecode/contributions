import React from 'react';
import mui from 'material-ui';
import Chart from './Chart.jsx';
import Navbar from './Navbar.jsx';
import Project from './Project.jsx';
import styleable from 'react-styleable';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import ThemeDecorator from 'material-ui/lib/styles/theme-decorator';
import Theme from '../styles/Theme';
import store from '../stores/store';
import Projects from '../stores/Projects';

import css from './app.css';

@ThemeDecorator(ThemeManager.getMuiTheme(Theme))
@styleable(css)
class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            projects: []
        };

        store.dispatch(Projects.getProjects()).then((projects) => {
                this.setState({projects: projects});
            }
        );
    }

    render() {
        return (
            <div className={this.props.css.app}>
                <Navbar/>
                <div className={this.props.css.content}>
                    <Project definition={{key: 'total', name: 'Total'}}/>
                    {
                        this.state.projects.map(function (project) {
                            return <Project key={project.key} definition={project}/>;
                        })
                    }
                </div>
            </div>
        );
    }
}

export default App;

