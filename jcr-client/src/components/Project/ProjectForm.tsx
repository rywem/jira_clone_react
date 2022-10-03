import React from 'react';
import { Form, Segment, Button } from 'semantic-ui-react';

export default function ProjectForm() {
    return (
        <Segment clearing>
            <Form>
                <Form.Input placeholder='Title' />
                <Form.TextArea placeholder='Description' />
                <Form.Input placeholder='Category' />
                <Form.Input placeholder='URL' />
                <Button floated='right' positive type="submit" content="Submit" />
                <Button floated='right' positive type="button" content="Cancel" />
            </Form>
        </Segment>
    )
}