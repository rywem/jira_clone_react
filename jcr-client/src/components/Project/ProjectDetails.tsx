import React from 'react'
import { Card, Image, Icon, Button } from 'semantic-ui-react'
import { Project } from '../../models/Project'
import { useStore } from '../../stores/store';
import LoadingComponent from '../LoadingComponent';


export default function ProjectDetails() {    

    const { projectStore } = useStore();
    const { selectedProject: project, openForm, cancelSelectedProject} = projectStore;
    if(!project) {
        return <LoadingComponent />;
    }
    return (
        <Card fluid>

            <Image src='https://images.unsplash.com/photo-1620325867502-221cfb5faa5f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1157&q=80' wrapped ui={false} />
            <Card.Content>
                <Card.Header>{project.title}</Card.Header>
                <Card.Meta>
                    <span className='date'>{project.createdUtc.toString()}</span>
                </Card.Meta>
                <Card.Description>
                    {project.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <a>
                    <Icon name='tasks' />
                    {project.appUserProjects && project.appUserProjects.length}
                </a>
                <Button.Group>
                    <Button basic color='blue' content='Edit' onClick={() => openForm(project.id)} />
                    <Button basic color='grey' content='Cancel' onClick={cancelSelectedProject} />
                </Button.Group>
            </Card.Content>
        </Card>
    )
}