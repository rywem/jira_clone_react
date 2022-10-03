import React from 'react';
import { Grid, List } from 'semantic-ui-react';
import ProjectDetails from './ProjectDetails';
import ProjectList from './ProjectList';
import { Project } from '../../models/Project';
import ProjectForm from './ProjectForm';

interface Props {
    projects: Project[];
    selectedProject: Project | undefined;
    selectProject: (id: number) => void;
    cancelSelectProject: () => void;
}

export default function ProjectDashboard(props: Props) {

    return (
        <Grid>
            <Grid.Column width='10'>                
                <ProjectList projects={props.projects} selectProject={props.selectProject}/>
            </Grid.Column>
            <Grid.Column width='6'>
                {props.selectedProject &&
                <ProjectDetails project={props.selectedProject} cancelSelectProject={props.cancelSelectProject} />}
                <ProjectForm />
            </Grid.Column>
        </Grid>
    )
}