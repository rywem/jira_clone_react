import React from 'react';
import { Project } from '../../models/Project';
import { Segment, Item, Button, Label } from 'semantic-ui-react';
import ProjectCategoryHelper from '../../helpers/ProjectCategoryHelper';
import CategoryEnumHelper from '../../helpers/ProjectCategoryHelper';
import { useStore } from '../../stores/store';

interface Props {
    projects: Project[];    
    deleteProject: (id: number) => void;
}

export default function ProjectList(props: Props) {
    
    const { projectStore }  = useStore();

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
                                    onClick={() => projectStore.selectProject(project.id) }
                                />
                                <Button floated='right' content='Delete' color='red'
                                    onClick={() => props.deleteProject(project.id) }
                                />
                                <Label basic content={CategoryEnumHelper.getCategoryName(project.category)} />
                            </Item.Extra>
                        </Item>
                    ))}
            </Item.Group>
        </Segment>
    )
}