import React from 'react';
import { Grid, List } from 'semantic-ui-react';
import ProjectDetails from './ProjectDetails';
import ProjectList from './ProjectList';
import { Project } from '../../models/Project';
import ProjectForm from './ProjectForm';
import { useStore } from '../../stores/store';
import { observer } from 'mobx-react-lite';

interface Props {
    projects: Project[];            
    deleteProject: (id: number) => void;    
}

export default observer( function ProjectDashboard(props: Props) {
        const { projectStore } = useStore();
        const {selectedProject, editMode } = projectStore; 
        return (
            <Grid>
                <Grid.Column width='10'>                
                    <ProjectList projects={props.projects} deleteProject={props.deleteProject} />
                </Grid.Column>
                <Grid.Column width='6'>
                    {selectedProject && !editMode &&
                    <ProjectDetails />}                
                    {editMode && 
                    <ProjectForm />}                
                </Grid.Column>
            </Grid>
        )
    }
)