import React from 'react'
import { Card, Image, Icon, Button } from 'semantic-ui-react'
import { Project } from '../../models/Project'

interface Props {
    project: Project;
    cancelSelectProject: () => void;
    openForm: (id: number) => void;    
}
export default function ProjectDetails(props: Props) {
    function test() {
        props.openForm(props.project.id);
    }
    return (
        <Card fluid>

            <Image src='https://images.unsplash.com/photo-1620325867502-221cfb5faa5f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1157&q=80' wrapped ui={false} />
            <Card.Content>
                <Card.Header>{props.project.title}</Card.Header>
                <Card.Meta>
                    <span className='date'>{props.project.createdUtc.toString()}</span>
                </Card.Meta>
                <Card.Description>
                    {props.project.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <a>
                    <Icon name='tasks' />
                    {props.project.AppUserProjects && props.project.AppUserProjects.length}
                </a>
                <Button.Group>
                    <Button basic color='blue' content='Edit' onClick={() => props.openForm(props.project.id)} />
                    <Button basic color='grey' content='Cancel' onClick={props.cancelSelectProject} />
                </Button.Group>
            </Card.Content>
        </Card>
    )
}