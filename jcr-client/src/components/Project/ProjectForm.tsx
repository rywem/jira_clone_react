import React from 'react';
import { Form, Segment, Button } from 'semantic-ui-react';
import { Project } from '../../models/Project';

interface Props {
    project: Project | undefined;
    closeForm: () => void;
}

export default function ProjectForm(props: Props) {
    return (
        <Segment clearing>
            <Form>
                <Form.Input placeholder='Title' />
                <Form.TextArea placeholder='Description' />
                <Form.Input placeholder='Category' />
                <Form.Input placeholder='URL' />
                <Button floated='right' positive type="submit" content="Submit" />
                <Button floated='right' positive type="button" content="Cancel" onClick={props.closeForm} />
            </Form>
        </Segment>
    )
}