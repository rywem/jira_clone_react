import React, { ChangeEvent, SyntheticEvent, useState } from 'react';
import { Form, Segment, Button, Dropdown, DropdownProps } from 'semantic-ui-react';
import { ProjectCategory } from '../../enums/ProjectCategory';
import { Project } from '../../models/Project';
import CategoryEnumHelper from '../../helpers/ProjectCategoryHelper';
import { useStore } from '../../stores/store';
import { observer } from 'mobx-react-lite';


export default observer(function ProjectForm() {
        const { projectStore } = useStore();
        const { selectedProject, closeForm, createProject, updateProject, loading } = projectStore;
        const initialState = selectedProject ??  getDefaultProject();
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
            if(project.id > 0) {
                updateProject(project);
            } else  {
                createProject(project)
            }
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
                    <Button loading={loading} floated='right' positive type="submit" content="Submit" />
                    <Button floated='right' positive type="button" content="Cancel" onClick={closeForm} />
                </Form>
            </Segment>
        )
    }
)