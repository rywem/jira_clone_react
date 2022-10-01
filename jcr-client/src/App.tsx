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
import { useEffect, useState } from "react";
import { Project } from './models/Project';
import { Header, List } from 'semantic-ui-react'
function App() {
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    axios.get('https://localhost:7260/api/Project').then(response => {
      setProjects(response.data);
    })
  }, [])

  return (
    <div>
      <Header as="h2" icon="tasks" content="JCR" />
      <List>
        {projects.map((project: Project) => (
            <List.Item key={project.id}>
              {project.description}
            </List.Item>
        ))}
      </List>        
    </div>
  );
}

export default App;
