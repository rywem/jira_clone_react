import { AppUserIssue } from './AppUserIssue';
import { AppUserProject } from './AppUserProject';
import { Comment } from './Comment'

export interface AppUser {
    avatarUrl: string;
    appUserIssues: AppUserIssue[];
    comments: Comment[];
    appUserProject: AppUserProject;    
}