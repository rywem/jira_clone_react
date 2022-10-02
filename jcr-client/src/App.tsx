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
import ProjectDashboard from "./features/ProjectDashboard";
function App() {
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    axios.get('https://localhost:7260/api/Project').then(response => {
      setProjects(response.data);
    })
  }, [])

  return (
    <Fragment>
      <NavBar />
      <Container style={{marginTop: '7em'}}>
        <ProjectDashboard projects={projects} />
      </Container>
    </Fragment>
  );
}

export default App;
