import { ProjectCategory } from "../enums/ProjectCategory";
import { AppUserProject } from "./AppUserProject";
import { Issue } from "./Issue";




export interface Project {
    id: number;
    url: string;
    title: string;
    description: string;
    category: number;
    createdUtc: Date;
    updatedUtc: Date;
    issues: Issue[];
    appUserProjects: AppUserProject[];
} 