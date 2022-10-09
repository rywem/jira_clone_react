import './App.css';
import './styles.css'

import { Fragment, useEffect, useState } from "react";
import { Project } from './models/Project';
import { Container } from 'semantic-ui-react'
import NavBar from "./layout/NavBar";
import ProjectDashboard from "./components/Project/ProjectDashboard";
import LoadingComponent from "./components/LoadingComponent";
import { useStore } from "./stores/store";
import { observer } from "mobx-react-lite";
function App() {
  const { projectStore } = useStore();
  const [projects, setProjects] = useState<Project[]>([])
  const [submitting, setSubmitting] = useState(false);
  useEffect(() => {
    projectStore.loadProjects();
  }, [projectStore])
    
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
          deleteProject={handleDeleteProject}          
          />
      </Container>
    </Fragment>
  );
}

export default observer(App);
