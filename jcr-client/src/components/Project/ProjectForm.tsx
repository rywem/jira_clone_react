import React, { ChangeEvent, SyntheticEvent, useState } from 'react';
import { Form, Segment, Button, Dropdown, DropdownProps } from 'semantic-ui-react';
import { ProjectCategory } from '../../enums/ProjectCategory';
import { Project } from '../../models/Project';
import CategoryEnumHelper from '../../helpers/ProjectCategoryHelper';
interface Props {
    project: Project | undefined;
    closeForm: () => void;
    createOrEdit: (project: Project) => void;
}

// const categoryOptions = function() {
//     let results = [];
//     let items = Object.keys(ProjectCategory);
//     let keys = items.filter(v => !isNaN(Number(v)));
//     let values = items.filter(v => isNaN(Number(v)));
    
//     for(let i = 0; i < keys.length; i++) {
//         results.push({key: keys[i], value: values[i], text: values[i]})
//     }

//     return results;
// }

export default function ProjectForm(props: Props) {
    const initialState = props.project ??  getDefaultProject();
    // {
    //     id: 0,
    //     title: '',
    //     category: -1,
    //     description: '',
    //     url: '',
    //     createdUtc: '2022-10-02T13:25:47.9805858',
    //     updatedUtc: '2022-10-02T13:25:47.9805858',        
    // }
    const [project, setProject] = useState(initialState);
    
    function getDefaultProject() {
        const newProject: Project = {
            id: 0,
            title: '',
            category: -1,
            description: '',
            url: '',
            createdUtc: new Date(Date.now()),
            updatedUtc: new Date(Date.now()),
            issues: [],
            appUserProjects: []
        }
        return newProject;
    }

    function selected() {
        if(project.category != null && project.category >= 0)
        {
            return CategoryEnumHelper.categoryOptions()[project.category].value;            
        }
        return ''
    }
    function handleSubmit(){
        console.log("submit project", project);
        props.createOrEdit(project);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target;
        setProject({...project, [name]: value});
    }

    function handleDropdownChange(event: SyntheticEvent<HTMLElement, Event>, data: DropdownProps ) {        
        const { value } = data;
        const  key = CategoryEnumHelper.categoryOptions().find(o => o.value === value);
        let keyId = key?.key;
        let category = 'category';
        let valueToParse = key?.key.toString();
        let number;
        if(valueToParse != undefined){
            number = parseInt(valueToParse)
        }
        else {
            number = -1;
        }
        setProject({...project, [category]: number})    
        console.log(project);
    }
    

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' value={project.title} name='title' onChange={handleInputChange} />
                <Form.TextArea placeholder='Description' value={project.description} name='description' onChange={handleInputChange} />                
                <Dropdown placeholder="Select Category"
                    fluid
                    selection
                    onChange={handleDropdownChange}
                    options={CategoryEnumHelper.categoryOptions()}
                    defaultValue={selected()}
                />
                <Form.Input placeholder='URL' value={project.url} name='url' onChange={handleInputChange} />
                <Button floated='right' positive type="submit" content="Submit" />
                <Button floated='right' positive type="button" content="Cancel" onClick={props.closeForm} />
            </Form>
        </Segment>
    )
}