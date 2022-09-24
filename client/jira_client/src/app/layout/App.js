import React, { useState, useEffect } from 'react';

import NavBar from './NavBar.js';


export default class App extends React.Component {
    constructor() {   
        super();     
        this.state = {
            projects: ['test']
        }
    }

    // loadProjects = () => {
    //     //this.setState({ projects: projectService.getAllProjects()})
    // }


    // static getDerivedStateFromProps(state) {
    //     //this.loadProjects();
    //     //let currentProjects = projectService.getAllProjects()
    //     //this.setState({ projects: currentProjects })
    // }
    render()  {
        return (
            <div className="App">
                <NavBar />
            
            </div>
        )
    }
}