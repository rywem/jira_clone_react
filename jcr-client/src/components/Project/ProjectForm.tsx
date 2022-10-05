import React, { ChangeEvent, SyntheticEvent, useState } from 'react';
import { Form, Segment, Button, Dropdown, DropdownProps } from 'semantic-ui-react';
import { ProjectCategory } from '../../enums/ProjectCategory';
import { Project } from '../../models/Project';

interface Props {
    project: Project | undefined;
    closeForm: () => void;
}

const categoryOptions = function() {
    let results = [];
    let items = Object.keys(ProjectCategory);
    let keys = items.filter(v => !isNaN(Number(v)));
    let values = items.filter(v => isNaN(Number(v)));
    
    for(let i = 0; i < keys.length; i++) {
        results.push({key: keys[i], value: values[i], text: values[i]})
    }

    return results;
}

export default function ProjectForm(props: Props) {
    const initialState = props.project ?? {
        id: '',
        title: '',
        category: '',
        description: '',
        url: '',
        createdUtc: '',
        updatedUtc: ''
    }
    const [project, setProject] = useState(initialState);

    function handleSubmit(){        
        console.log("submit project", project);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target;
        setProject({...project, [name]: value});
    }

    function handleDropdownChange(event: SyntheticEvent<HTMLElement, Event>, data: DropdownProps ) {
        console.log(event);
        const { value } = data;
        const  key = categoryOptions().find(o => o.value === value);
        let keyId = key?.key;
        let category = 'category';
        setProject({...project, [category]: key?.key.toString()})        
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' value={project.title} name='title' onChange={handleInputChange} />
                <Form.TextArea placeholder='Description' value={project.description} name='description' onChange={handleInputChange} />
                {/* <Form.Input placeholder='Category' value={project.category} name='category' onChange={handleInputChange} /> */}
                {/* <Select placeholder='Select Category' options={categoryOptions()} onChange={handleSelectChange} /> */}
                <Dropdown placeholder="Select Category"
                    fluid
                    selection
                    onChange={handleDropdownChange}
                    options={categoryOptions()}
                />
                <Form.Input placeholder='URL' value={project.url} name='url' onChange={handleInputChange} />
                <Button floated='right' positive type="submit" content="Submit" />
                <Button floated='right' positive type="button" content="Cancel" onClick={props.closeForm} />
            </Form>
        </Segment>
    )
}