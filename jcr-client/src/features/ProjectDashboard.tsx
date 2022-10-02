import React from 'react';
import { Grid, List } from 'semantic-ui-react';
import ProjectList from '../components/ProjectList';
import { Project } from '../models/Project';

interface Props {
    projects: Project[];
}

export default function ProjectDashboard(props: Props) {

    return (
        <Grid>
            <Grid.Column width='10'>                
                <ProjectList projects={props.projects}/>
            </Grid.Column>
        </Grid>
    )
}