import React from 'react';
import axios from 'axios';
export default class Project extends React.Component {
    state = {
        projects: []
    }

    componentDidMount() {
        axios.get('https://localhost:7260/api/Project').then(res => {
            const projects = res.data;
            console.log("get projects", res.data);
            this.setState({ projects })
        })
    }
    render() {
        return (
        <ul>
            {
                this.state.projects.map(proj => 
                    <li key={proj.id}>{proj.description}</li>
                )
            }
        </ul>
        )
    }
}

// const Project = () => {
//     return <h1>Project</h1>;
// };
  
// export default Project;