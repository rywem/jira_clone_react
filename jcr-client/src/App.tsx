import './App.css';
import './styles.css'

import { Fragment, useEffect, useState } from "react";
import { Project } from './models/Project';
import { Container } from 'semantic-ui-react'
import NavBar from "./layout/NavBar";
import ProjectDashboard from "./components/Project/ProjectDashboard";
import agent from "./api/Agent";
import LoadingComponent from "./components/LoadingComponent";
import { useStore } from "./stores/store";
import { observer } from "mobx-react-lite";
function App() {
  const { projectStore } = useStore();
  const [projects, setProjects] = useState<Project[]>([])
  const [selectedProject, setSelectedProject] = useState<Project | undefined>(undefined); 
  const [editMode, setEditMode] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  useEffect(() => {
    projectStore.loadProjects();
  }, [projectStore])
  
  function handleCreateOrEditProject(project: Project) {
    setSubmitting(true);
    if(project.id)  {
      agent.Projects.update(project).then(() => {
        setProjects([...projects.filter(x => x.id !== project.id), project])
        setSelectedProject(project);
        setEditMode(false);
        setSelectedProject(project);
        setSubmitting(false);
      })
    }
    else {
      agent.Projects.create(project).then((response) =>{
        setProjects([...projects, response]);
        setEditMode(false);
        setSelectedProject(response);
        setSubmitting(false);
      })
    }    
  }

  function handleDeleteProject(id: number) {
    setProjects([...projects.filter(x => x.id !== id)]);
  }

  if(projectStore.loadingInitial) 
    return <LoadingComponent content="Loading Projects..." />

  return (
    <Fragment>
      <NavBar />
      <Container style={{marginTop: '7em'}}>        
        <ProjectDashboard 
          projects={projectStore.projects}          
          createOrEdit={handleCreateOrEditProject}
          deleteProject={handleDeleteProject}
          submitting={submitting}
          />
      </Container>
    </Fragment>
  );
}

export default observer(App);
