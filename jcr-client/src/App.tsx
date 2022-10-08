import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import NoPage from "./pages/NoPage";
import logo from './logo.svg';
import './App.css';
import './styles.css'

import { Fragment, useEffect, useState } from "react";
import { Project } from './models/Project';
import { Header, List, Container } from 'semantic-ui-react'
import NavBar from "./layout/NavBar";
import ProjectDashboard from "./components/Project/ProjectDashboard";
import agent from "./api/Agent";
import LoadingComponent from "./components/LoadingComponent";
function App() {
  const [projects, setProjects] = useState<Project[]>([])
  const [selectedProject, setSelectedProject] = useState<Project | undefined>(undefined); 
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    agent.Projects.list().then(response => {
      setProjects(response);
      setLoading(false);
    })
  }, [])

  function handleSelectProject(id: number) {
    setSelectedProject(projects.find(x => x.id == id))
  }

  function handleCancelSelectProject() {
    setSelectedProject(undefined);
  }

  function handleFormOpen(id?: number) {
    id ? handleSelectProject(id) : handleCancelSelectProject();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }
  function handleCreateOrEditProject(project: Project) {
    project.id 
      ? setProjects([...projects.filter(x => x.id !== project.id), project])
      : setProjects([...projects, project]);

    setEditMode(false);
    setSelectedProject(project);
  }

  function handleDeleteProject(id: number) {
    setProjects([...projects.filter(x => x.id !== id)]);
  }

  if(loading) 
    return <LoadingComponent content="Loading Projects..." />

  return (
    <Fragment>
      <NavBar openForm={handleFormOpen} />
      <Container style={{marginTop: '7em'}}>
        <ProjectDashboard 
          projects={projects} 
          selectedProject={selectedProject}
          selectProject={handleSelectProject}
          cancelSelectProject={handleCancelSelectProject}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditProject}
          deleteProject={handleDeleteProject}
          />
      </Container>
    </Fragment>
  );
}

export default App;
