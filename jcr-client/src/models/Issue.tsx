import { IssuePriority } from "../enums/IssuePriority";
import { IssueStatus } from "../enums/IssueStatus";
import { IssueType } from "../enums/IssueType";
import { AppUser } from "./AppUser";
import { AppUserIssue } from "./AppUserIssue";
import { Comment } from "./Comment";
import { Project } from "./Project";

export interface Issue {
    id: number;
    title: string;
    type: IssueType;
    status: IssueStatus;
    priority: IssuePriority;
    listPosition: number;
    description: string;
    descriptionText: string;
    estimate: number;
    timeRemaining: number;
    timeSpent: number;
    createdUtc: Date;
    updatedUtc: Date;
    reporterId: string;
    reporter: AppUser;
    projectId: number;
    project: Project;
    comments: Comment[];
    appUserIssues: AppUserIssue[];
}