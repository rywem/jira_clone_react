import { makeAutoObservable } from "mobx";
import agent from "../api/Agent";
import { Project } from "../models/Project";


export default class ProjectStore {    
    projects: Project[] = [];
    selectedProject: Project | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;
    
    constructor() {
        makeAutoObservable(this);
    }

    loadProjects = async () => {
        this.setLoadingInitial(true);
        try {
            this.projects = await agent.Projects.list();
            this.setLoadingInitial(false);
            // I don't have a date field so I don't need this:
            // How to handle a date
            // projects.forEach(project => {
            //     project.date = project.date.split('T')[0];
            //     this.projects.push(project)
            // })
        }  catch(error) {
            console.error(error);
            this.setLoadingInitial(true);
        }
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    selectProject = (id: number) => {
        this.selectedProject = this.projects.find(a => a.id === id);
    }

    cancelSelectedProject = () => {
        this.selectedProject = undefined;
    }

    openForm = (id?: number) => {
        id ? this.selectProject(id) : this.cancelSelectedProject();
        this.editMode = true;
    }

    closeForm = () => {
       this.editMode = false; 
    }
}