import React from 'react';
import { Project } from '../../models/Project';
import { Segment, Item, Button, Label } from 'semantic-ui-react';
interface Props {
    projects: Project[];
    selectProject: (id: number) => void;
}

export default function ProjectList(props: Props) {
    return (
        <Segment>
            <Item.Group divided>
                    {props.projects.map((project: Project) => (
                        <Item key={project.id}>
                            <Item.Content>
                                <Item.Header as='a'>{project.title}</Item.Header>
                                <Item.Meta>{project.createdUtc.toString()}</Item.Meta>
                                <Item.Description>
                                    <div>{project.description}</div>                                    
                                </Item.Description>
                            </Item.Content>
                            <Item.Extra>
                                <Button floated='right' content='View' color='blue'
                                    onClick={() => props.selectProject(project.id) }
                                />
                                <Label basic content={project.category} />
                            </Item.Extra>
                        </Item>
                    ))}
            </Item.Group>
        </Segment>
    )
}