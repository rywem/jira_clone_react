import { ProjectCategory } from "../enums/ProjectCategory";
import { AppUserProject } from "./AppUserProject";
import { Issue } from "./Issue";


export interface Project {
    id: number;
    url: string;
    description: number;
    category: ProjectCategory;
    createdUtc: Date;
    updatedUtc: Date;
    issues: Issue[];
    AppUserProjects: AppUserProject;
} 