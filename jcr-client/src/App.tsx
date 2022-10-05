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
import axios from 'axios';
import { Fragment, useEffect, useState } from "react";
import { Project } from './models/Project';
import { Header, List, Container } from 'semantic-ui-react'
import NavBar from "./layout/NavBar";
import ProjectDashboard from "./components/Project/ProjectDashboard";
function App() {
  const [projects, setProjects] = useState<Project[]>([])
  const [selectedProject, setSelectedProject] = useState<Project | undefined>(undefined); 
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get('https://localhost:7260/api/Project').then(response => {
      setProjects(response.data);
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
          />
      </Container>
    </Fragment>
  );
}

export default App;
