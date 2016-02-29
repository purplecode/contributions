import React, {PropTypes} from "react";
import mui from 'material-ui';
import Chart from './Chart.jsx';
import Project from './Project.jsx';
import styleable from 'react-styleable';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import ThemeDecorator from 'material-ui/lib/styles/theme-decorator';
import Theme from '../styles/Theme';
import store from '../stores/store';
import ProjectsStore from '../stores/Projects';

import css from './projects.css';

@ThemeDecorator(ThemeManager.getMuiTheme(Theme))
@styleable(css)
class Projects extends React.Component {

    static propTypes = {
        css: PropTypes.object,
        params: PropTypes.object
    };

    constructor(props) {
        super(props);

        this.state = {
            projects: []
        };

        store.dispatch(ProjectsStore.getProjects()).then((projects) => {
                this.setState({projects: projects});
            }
        );
    }

    render() {
        return (
            <div className={this.props.css.app}>
                <div className={this.props.css.content}>
                    <Project definition={{key: 'total', name: 'Total'}} statistic={this.props.params.statistic}/>
                    {
                        this.state.projects.map((project) => {
                            return (
                                <Project key={project.key}
                                         definition={project}
                                         statistic={this.props.params.statistic}
                                />
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}

export default Projects;

