import { Project } from "../models/Project";
import { api } from "./AxiosService";

class ProjectService {
    async getAllProjects() {        
        const res = await api.get('api/Project');
        console.log("projectService.getAllProjects", res.data)
        let results = res.data.results.map(c => new Project(c));
        return results;
    }

}

export const projectService = new ProjectService();