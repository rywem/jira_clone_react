import { AppUser } from "./AppUser";
import { Project } from "./Project";

export interface AppUserProject {
    appUserId: string;
    projectId: number;
    appUser: AppUser;
    project: Project;
}